import dotenv from 'dotenv'
dotenv.config()
import { queries } from '../utils/algolia-queries'

interface SiteConfig {
	author: {
		name: string
		summary: string
	}
	title: string
	description: string
	siteUrl: string
	social: {
		twitter: string
		github: string
	}
	config: {
		categoryNameForAll: string
		paginationPageSize: number
		// contentPath: string
		// assetPath: string
		commentsEnabled: boolean
		commentsProps: {
			repo: string
			repoId: string
			category: string
			categoryId: string
			mapping: string
			strict: string
			reactionsEnabled: string
			emitMetadata: string
			inputPosition: string
			theme: string
			lang: string
			loading: string
		}
		algoliaProps: {
			indexName: string
			appId: string
			apiKey: string
			dryRun: boolean
			continueOnFailure: boolean
			queries: any
		}
	}
	lang: string
	ogLocale: string
	shareMessage: string
	paginationSize: number
}

export const siteConfig: SiteConfig = {
	author: {
		name: `Denosinfo`,
		summary: `자동차, AI, 테크, 오픈소스, 여행 등 다양한 관심사를 기록하는 블로그입니다.`
	},
	title: `Denosinfo - Tech & Life Blog`,
	description: `자동차, AI, 기술, 여행 그리고 일상`,
	siteUrl: `https://denosinfo.com/`,
	social: {
		twitter: ``,
		github: ``
	},
	config: {
		// contentPath: `${__dirname}/../content`,
		// assetPath: `${__dirname}/../assets`,
		categoryNameForAll: 'all',
		paginationPageSize: 10,
		commentsEnabled: true,
		commentsProps: {
			repo: 'JangHeonSoo/denosinfo',
			repoId: 'R_kgDORD8Vdw',
			category: 'Announcements',
			categoryId: 'DIC_kwDORD8Vd84C1mNX',
			mapping: 'pathname',
			strict: '0',
			reactionsEnabled: '1',
			emitMetadata: '0',
			inputPosition: 'bottom',
			theme: 'preferred_color_scheme',
			lang: 'ko',
			loading: 'lazy'
		},
		algoliaProps: {
			indexName: 'Pages',
			appId: process.env.GATSBY_ALGOLIA_APP_ID ?? '',
			apiKey: process.env.GATSBY_ALGOLIA_WRITE_KEY ?? '',
			dryRun: process.env.GATSBY_ALGOLIA_DRY_RUN === 'true',
			continueOnFailure: process.env.GATSBY_ALGOLIA_CONTINUE_ON_FAILURE === 'true',
			queries: queries
		}
	},
	lang: 'ko-KR',
	ogLocale: 'ko_KR',
	shareMessage: 'Share this post', // Message to share a post on social media
	paginationSize: 6 // Number of posts per page
}
