import { useLanguage } from '@/contexts/LanguageContext';

export default function About() {
	const { t } = useLanguage();
	return (
		<div className="max-w-3xl mx-auto p-6 space-y-6">
			<h1 className="text-2xl font-semibold">{t('cat')} Google Translate</h1>
			<p>
				Search and generate cat images via CATAAS using a Google-like interface. Use the language selector (top-right)
				to change the site language. The logo word toggles language independently on click.
			</p>
			<ul className="list-disc pl-6 space-y-1">
				<li>Type tags (you can combine with commas: orange,cute)</li>
				<li>Use Advanced Options for filters, sizes, GIF and text overlays</li>
				<li>HTML output opens a new tab; JSON shows a modal with copy/download</li>
			</ul>
			<p className="text-sm text-muted-foreground">
				Note: Some browsers/extensions may print console warnings. They do not affect the app.
			</p>
		</div>
	);
}


