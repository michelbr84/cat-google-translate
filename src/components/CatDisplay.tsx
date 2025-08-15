import { useRef } from 'react';
import { Loader2, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';

interface CatDisplayProps {
  imageUrl: string | null;
  isLoading: boolean;
  onNewSearch: () => void;
}

export default function CatDisplay({ imageUrl, isLoading, onNewSearch }: CatDisplayProps) {
  const retryingRef = useRef(false);
  const { t } = useLanguage();

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
    <div className="flex flex-col items-center mt-8">
      <div className="relative bg-white rounded-lg shadow-lg overflow-hidden max-w-2xl">
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
      
      <div className="flex gap-4 mt-4">
        <Button 
          onClick={onNewSearch}
          variant="outline"
          className="flex items-center gap-2"
        >
          <RotateCcw className="h-4 w-4" />
          {t('newCat')}
        </Button>
      </div>
    </div>
  );
}