import { useState, useCallback } from 'react';
import { toast } from 'sonner';
import Logo from '@/components/Logo';
import SearchInput from '@/components/SearchInput';
import SearchButtons from '@/components/SearchButtons';
import CatDisplay from '@/components/CatDisplay';
import AdvancedOptions from '@/components/AdvancedOptions';
import { CataasService, CatOptions } from '@/services/cataasApi';

interface LocalCatOptions {
  useGif: boolean;
  customText: string;
  enableText: boolean;
  textColor: string;
  fontSize: number;
  imageType: string;
  filter: string;
  width: number;
  height: number;
  brightness: number;
  lightness: number;
  saturation: number;
  hue: number;
  red: number;
  green: number;
  blue: number;
}

const Index = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [catImageUrl, setCatImageUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  
  const [advancedOptions, setAdvancedOptions] = useState<LocalCatOptions>({
    useGif: false,
    customText: '',
    enableText: false,
    textColor: '#ffffff',
    fontSize: 20,
    imageType: '',
    filter: '',
    width: 0,
    height: 0,
    brightness: 100,
    lightness: 100,
    saturation: 100,
    hue: 0,
    red: 100,
    green: 100,
    blue: 100,
  });

  const performSearch = useCallback(async (isLucky = false) => {
    setIsLoading(true);
    
    try {
      let options: CatOptions = { ...advancedOptions };
      
      // Para busca normal, usar a query de pesquisa como tag
      if (!isLucky && searchQuery.trim()) {
        options.tag = searchQuery.trim();
      }
      
      // Para "Estou com sorte", não usar nenhuma tag específica (gato aleatório)
      if (isLucky) {
        options.tag = '';
      }
      
      const imageUrl = await CataasService.getCatImage(options);
      setCatImageUrl(imageUrl);
      
      toast.success(isLucky ? 'Gato da sorte encontrado!' : 'Gato encontrado!');
    } catch (error) {
      console.error('Erro ao buscar gato:', error);
      toast.error('Erro ao buscar gato. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  }, [searchQuery, advancedOptions]);

  const handleSearch = () => {
    performSearch(false);
  };

  const handleLuckySearch = () => {
    performSearch(true);
  };

  const handleNewSearch = () => {
    performSearch(true); // Novo gato aleatório
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Layout estilo Google */}
      <div className="flex flex-col items-center justify-center min-h-screen px-4">
        
        {/* Logo */}
        <div className="mb-8">
          <Logo />
        </div>
        
        {/* Barra de Pesquisa */}
        <div className="w-full max-w-xl mb-8">
          <SearchInput
            value={searchQuery}
            onChange={setSearchQuery}
            onSearch={handleSearch}
            placeholder="Digite uma tag para o gato (ex: cute, funny, sleeping)"
          />
        </div>
        
        {/* Botões de Busca */}
        <SearchButtons
          onSearch={handleSearch}
          onLuckySearch={handleLuckySearch}
          isLoading={isLoading}
        />
        
        {/* Opções Avançadas */}
        <AdvancedOptions
          options={advancedOptions}
          onChange={setAdvancedOptions}
        />
        
        {/* Resultado do Gato */}
        {(catImageUrl || isLoading) && (
          <div className="w-full max-w-4xl mt-8">
            <CatDisplay
              imageUrl={catImageUrl}
              isLoading={isLoading}
              onNewSearch={handleNewSearch}
            />
          </div>
        )}
        
        {/* Footer estilo Google */}
        <footer className="mt-auto w-full py-4 text-center text-sm text-muted-foreground">
          <div className="space-x-4">
            <span>Powered by cataas.com API</span>
            <span>•</span>
            <span>Feito com ❤️ para amantes de gatos</span>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Index;
