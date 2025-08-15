import { useState } from 'react';
import { Loader2, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface CatDisplayProps {
  imageUrl: string | null;
  isLoading: boolean;
  onNewSearch: () => void;
}

export default function CatDisplay({ imageUrl, isLoading, onNewSearch }: CatDisplayProps) {
  const [imageError, setImageError] = useState(false);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
        <p className="text-muted-foreground">Buscando o gato perfeito...</p>
      </div>
    );
  }

  if (!imageUrl && !isLoading) {
    return null;
  }

  if (imageError) {
    return (
      <div className="flex flex-col items-center justify-center p-8">
        <p className="text-destructive mb-4">Erro ao carregar a imagem do gato</p>
        <Button onClick={onNewSearch} variant="outline">
          <RotateCcw className="h-4 w-4 mr-2" />
          Tentar Novamente
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center mt-8">
      <div className="relative bg-white rounded-lg shadow-lg overflow-hidden max-w-2xl">
        <img
          src={imageUrl}
          alt="Gato encontrado"
          className="w-full h-auto max-h-96 object-contain"
          onError={() => setImageError(true)}
          onLoad={() => setImageError(false)}
        />
      </div>
      
      <div className="flex gap-4 mt-4">
        <Button 
          onClick={onNewSearch}
          variant="outline"
          className="flex items-center gap-2"
        >
          <RotateCcw className="h-4 w-4" />
          Novo Gato
        </Button>
      </div>
    </div>
  );
}