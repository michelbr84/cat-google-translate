import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';

interface SearchButtonsProps {
  onSearch: () => void;
  onLuckySearch: () => void;
  isLoading?: boolean;
}

export default function SearchButtons({ 
  onSearch, 
  onLuckySearch, 
  isLoading = false 
}: SearchButtonsProps) {
  const { t } = useLanguage();
  return (
    <div className="flex gap-4 justify-center mt-8">
      <Button
        onClick={onSearch}
        disabled={isLoading}
        className="google-button min-w-[120px]"
        variant="secondary"
      >
        {isLoading ? t('searchingCat') : t('searchButton')}
      </Button>
      
      <Button
        onClick={onLuckySearch}
        disabled={isLoading}
        className="google-button min-w-[120px]"
        variant="secondary"
      >
        {t('luckyButton')}
      </Button>
    </div>
  );
}