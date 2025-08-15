import { Button } from '@/components/ui/button';

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
  return (
    <div className="flex gap-4 justify-center mt-8">
      <Button
        onClick={onSearch}
        disabled={isLoading}
        className="google-button min-w-[120px]"
        variant="secondary"
      >
        {isLoading ? 'Buscando...' : 'Buscar Gato'}
      </Button>
      
      <Button
        onClick={onLuckySearch}
        disabled={isLoading}
        className="google-button min-w-[120px]"
        variant="secondary"
      >
        Estou com Sorte
      </Button>
    </div>
  );
}