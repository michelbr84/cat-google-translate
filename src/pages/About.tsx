import { useLanguage } from '@/contexts/LanguageContext';

export default function About() {
	const { t } = useLanguage();
	return (
		<div className="max-w-3xl mx-auto p-6 space-y-6">
			<h1 className="text-2xl font-semibold">{t('aboutTitle')}</h1>
			<p>{t('aboutIntro')}</p>
			<ul className="list-disc pl-6 space-y-1">
				<li>{t('aboutListItem1')}</li>
				<li>{t('aboutListItem2')}</li>
				<li>{t('aboutListItem3')}</li>
			</ul>
			<p className="text-sm text-muted-foreground">{t('aboutNote')}</p>
		</div>
	);
}


