import { useLanguage } from '@/contexts/LanguageContext';
import Logo from '@/components/Logo';
import LanguageSelector from '@/components/LanguageSelector';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

export default function About() {
	const { t } = useLanguage();
	return (
		<div className="min-h-screen bg-background">
			<header className="absolute top-2 right-2 sm:top-4 sm:right-4">
				<LanguageSelector />
			</header>
			<div className="flex flex-col items-center justify-center min-h-screen px-4 sm:px-6">
				<div className="mb-8"><Logo /></div>
				<div className="w-full max-w-3xl p-6 space-y-6 bg-card rounded-lg border shadow-sm">
					<h1 className="text-2xl font-semibold">{t('aboutTitle')}</h1>
					<p>{t('aboutIntro')}</p>
					<ul className="list-disc pl-6 space-y-1">
						<li>{t('aboutListItem1')}</li>
						<li>{t('aboutListItem2')}</li>
						<li>{t('aboutListItem3')}</li>
					</ul>
					<p className="text-sm text-muted-foreground">{t('aboutNote')}</p>
					<div className="pt-2">
						<Link to="/">
							<Button variant="secondary">{t('back')}</Button>
						</Link>
					</div>
				</div>
				<footer className="mt-auto w-full py-4 text-center text-sm text-muted-foreground">
					<div className="space-x-4">
						<span>{t('poweredBy')}</span>
						<span>•</span>
						<span>{t('madeWith')}</span>
					</div>
				</footer>
			</div>
		</div>
	);
}


