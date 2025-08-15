import { useRef, useState } from 'react';
import { Loader2, RotateCcw, Copy, Download, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { useLanguage } from '@/contexts/LanguageContext';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

interface CatDisplayProps {
	imageUrl: string | null;
	isLoading: boolean;
	onNewSearch: () => void;
	htmlUrl?: string;
	jsonUrl?: string;
}

export default function CatDisplay({ imageUrl, isLoading, onNewSearch, htmlUrl, jsonUrl }: CatDisplayProps) {
	const retryingRef = useRef(false);
	const { t } = useLanguage();
	const [jsonOpen, setJsonOpen] = useState(false);
	const [jsonText, setJsonText] = useState<string>('');

	const handleOpenJson = async () => {
		if (!jsonUrl) return;
		try {
			const res = await fetch(jsonUrl, { headers: { accept: 'application/json' } });
			const text = await res.text();
			setJsonText(text);
			setJsonOpen(true);
		} catch {
			setJsonText('{"error":"Failed to load JSON"}');
			setJsonOpen(true);
		}
	};

	if (isLoading) {
		return (
			<div className="flex flex-col items-center justify-center p-8">
				<Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
				<p className="text-muted-foreground">{t('searchingCat')}</p>
			</div>
		);
	}

	if (!imageUrl && !isLoading) {
		return null;
	}

	return (
		<div className="flex flex-col items-center mt-8 px-4 w-full">
			<div className="relative bg-white rounded-lg shadow-lg overflow-hidden w-full max-w-2xl">
				<img
					src={imageUrl}
					alt={t('catFound')}
					className="w-full h-auto max-h-96 object-contain"
					onError={() => {
						if (retryingRef.current) return;
						retryingRef.current = true;
						onNewSearch();
						setTimeout(() => { retryingRef.current = false; }, 1000);
					}}
				/>
			</div>
			
			<div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-4 w-full max-w-2xl justify-center">
				<Button 
					onClick={onNewSearch}
					variant="outline"
					className="flex items-center gap-2"
				>
					<RotateCcw className="h-4 w-4" />
					{t('newCat')}
				</Button>
				{imageUrl && (
					<Button
						variant="secondary"
						className="flex items-center gap-2"
						onClick={async () => {
							try {
								await navigator.clipboard.writeText(imageUrl);
								toast.success(t('copied'));
							} catch {}
						}}
					>
						<Copy className="h-4 w-4" />
						Copy URL
					</Button>
				)}
				{imageUrl && (
					<a href={imageUrl} target="_blank" rel="noreferrer">
						<Button variant="secondary" className="flex items-center gap-2">
							<ExternalLink className="h-4 w-4" /> Open Image
						</Button>
					</a>
				)}
				{htmlUrl && (
					<a href={htmlUrl} target="_blank" rel="noreferrer">
						<Button variant="secondary">HTML</Button>
					</a>
				)}
				{jsonUrl && (
					<Button variant="secondary" onClick={handleOpenJson}>JSON</Button>
				)}
			</div>

			<Dialog open={jsonOpen} onOpenChange={setJsonOpen}>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>JSON</DialogTitle>
					</DialogHeader>
					<div className="space-y-3">
						<pre className="max-h-80 overflow-auto rounded bg-muted p-3 text-sm whitespace-pre-wrap break-all">{jsonText}</pre>
						<div className="flex gap-2 justify-end">
							<Button
								variant="secondary"
								onClick={async () => { try { await navigator.clipboard.writeText(jsonText); toast.success(t('copied')); } catch {} }}
							>
								<Copy className="h-4 w-4" /> Copy JSON
							</Button>
							{jsonUrl && (
								<a href={jsonUrl} download target="_blank" rel="noreferrer">
									<Button variant="secondary"><Download className="h-4 w-4" /> Download</Button>
								</a>
							)}
						</div>
					</div>
				</DialogContent>
			</Dialog>
		</div>
	);
}