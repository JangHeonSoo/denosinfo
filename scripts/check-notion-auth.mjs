import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'

const primaryAuthPath =
	process.env.OPENCODE_MCP_AUTH_PATH ||
	path.join(os.homedir(), '.local/share/opencode/mcp-auth.json')

const fallbackEnv = process.env.OPENCODE_MCP_AUTH_FALLBACKS
const fallbackPaths = fallbackEnv ? fallbackEnv.split(path.delimiter).filter(Boolean) : []

const commonPaths = [
	path.join(os.homedir(), '.local/share/opencode/mcp-auth.json'),
	path.join(os.homedir(), '.config/opencode/mcp-auth.json'),
	path.join(os.homedir(), 'Library/Application Support/opencode/mcp-auth.json')
]

const args = new Set(process.argv.slice(2))
const allowRestore = args.has('--restore') || process.env.OPENCODE_MCP_AUTH_AUTO_RESTORE === '1'

function fail(message) {
	console.error(message)
	process.exitCode = 1
}

function readAuthFile(filePath) {
	if (!fs.existsSync(filePath)) {
		return { status: 'missing' }
	}

	let raw
	try {
		raw = fs.readFileSync(filePath, 'utf8')
	} catch (error) {
		return { status: 'unreadable', error }
	}

	try {
		const data = JSON.parse(raw)
		return { status: 'ok', data }
	} catch (error) {
		return { status: 'invalid', error }
	}
}

function getNotionExpiresAt(data) {
	const expiresAt = Number(data?.notion?.tokens?.expiresAt)
	return Number.isFinite(expiresAt) ? expiresAt : null
}

function dedupe(paths) {
	const seen = new Set()
	const result = []
	for (const candidate of paths) {
		if (!candidate || seen.has(candidate)) continue
		seen.add(candidate)
		result.push(candidate)
	}
	return result
}

function describeReadFailure(status, filePath) {
	if (status === 'missing') return `Notion MCP auth file not found: ${filePath}`
	if (status === 'unreadable') return `Failed to read auth file: ${filePath}`
	if (status === 'invalid') return `Invalid JSON in auth file: ${filePath}`
	return `Unknown error reading auth file: ${filePath}`
}

const candidates = dedupe([primaryAuthPath, ...fallbackPaths, ...commonPaths])

let activePath = primaryAuthPath
let activeRead = readAuthFile(activePath)

if (activeRead.status !== 'ok' || !getNotionExpiresAt(activeRead.data)) {
	let fallbackMatch
	for (const candidate of candidates) {
		if (candidate === primaryAuthPath) continue
		const readResult = readAuthFile(candidate)
		const expiresAt = readResult.status === 'ok' ? getNotionExpiresAt(readResult.data) : null
		if (expiresAt) {
			fallbackMatch = { path: candidate, data: readResult.data, expiresAt }
			break
		}
	}

	if (fallbackMatch) {
		if (allowRestore) {
			fs.mkdirSync(path.dirname(primaryAuthPath), { recursive: true })
			fs.copyFileSync(fallbackMatch.path, primaryAuthPath)
			console.log(`Restored Notion MCP auth to ${primaryAuthPath} from ${fallbackMatch.path}.`)
			activePath = primaryAuthPath
			activeRead = readAuthFile(activePath)
		} else {
			console.log(
				`Found Notion MCP auth at ${fallbackMatch.path}. Set OPENCODE_MCP_AUTH_PATH to use it, or run with --restore / OPENCODE_MCP_AUTH_AUTO_RESTORE=1 to copy it to ${primaryAuthPath}.`
			)
			activePath = fallbackMatch.path
			activeRead = { status: 'ok', data: fallbackMatch.data }
		}
	}
}

if (activeRead.status !== 'ok') {
	fail(describeReadFailure(activeRead.status, activePath))
	process.exit(1)
}

const expiresAt = getNotionExpiresAt(activeRead.data)
if (!expiresAt) {
	fail('Notion MCP auth is missing. Please authenticate with Notion MCP.')
	process.exit(1)
}

const now = Date.now() / 1000
const secondsLeft = Math.floor(expiresAt - now)
if (secondsLeft <= 0) {
	fail('Notion MCP auth is expired. Re-authentication required.')
	process.exit(1)
}

const hoursLeft = Math.floor(secondsLeft / 3600)
console.log(`Notion MCP auth OK. Expires in ~${hoursLeft}h. (${activePath})`)
