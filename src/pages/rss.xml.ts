import rss from '@astrojs/rss'
import { getCollection } from 'astro:content'
import { siteConfig } from '@/site-config'
import { DEFAULT_LOCALE, getLocalePrefix, stripLocaleFromSlug } from '@/utils'

export async function get() {
	const locale = DEFAULT_LOCALE
	const localePrefix = getLocalePrefix(locale)
	const posts = (await getCollection('blog')).filter((post) => post.id.startsWith(`${locale}/`))
	return rss({
		title: siteConfig.title,
		description: siteConfig.description,
		site: import.meta.env.SITE,
		items: posts.map((post) => ({
			...post.data,
			pubDate: new Date(post.data.pubDate ?? post.data.date ?? new Date()),
			link: `${localePrefix}/blog/${stripLocaleFromSlug(post.slug, locale)}/`
		}))
	})
}
