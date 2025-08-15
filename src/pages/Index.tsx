import { useState, useCallback } from 'react';
import { toast } from 'sonner';
import Logo from '@/components/Logo';
import SearchInput from '@/components/SearchInput';
import SearchButtons from '@/components/SearchButtons';
import CatDisplay from '@/components/CatDisplay';
import AdvancedOptions from '@/components/AdvancedOptions';
import LanguageSelector from '@/components/LanguageSelector';
import { CataasService, CatOptions } from '@/services/cataasApi';
import { useLanguage } from '@/contexts/LanguageContext';

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
  html?: boolean;
  json?: boolean;
}

const Index = () => {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [catImageUrl, setCatImageUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [lastOptionsBase, setLastOptionsBase] = useState<CatOptions | null>(null);
  
  const [advancedOptions, setAdvancedOptions] = useState<LocalCatOptions>({
    useGif: false,
    customText: '',
    enableText: false,
    textColor: '#ffffff',
    fontSize: 20,
    imageType: 'default',
    filter: 'none',
    width: 0,
    height: 0,
    brightness: 100,
    lightness: 100,
    saturation: 100,
    hue: 0,
    red: 100,
    green: 100,
    blue: 100,
    html: false,
    json: false,
  });

  const performSearch = useCallback(async (isLucky = false) => {
    setIsLoading(true);
    
    try {
      // Base options for image rendering (avoid html/json for <img src>)
      let baseOptions: CatOptions = { ...advancedOptions };
      delete (baseOptions as any).html;
      delete (baseOptions as any).json;
      
      // Para busca normal, usar a query de pesquisa como tag
      if (!isLucky && searchQuery.trim()) {
        baseOptions.tag = searchQuery.trim();
      }
      
      // Para "Estou com sorte", não usar nenhuma tag específica (gato aleatório)
      if (isLucky) {
        baseOptions.tag = '';
      }
      
      const imageUrl = await CataasService.getCatImage(baseOptions);
      setCatImageUrl(imageUrl);
      setLastOptionsBase(baseOptions);
      
      toast.success(isLucky ? t('luckyCatFound') : t('catFound'));
    } catch (error) {
      console.error('Erro ao buscar gato, fazendo fallback para /cat:', error);
      const fallbackUrl = await CataasService.getRandomCat();
      setCatImageUrl(fallbackUrl);
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
    const doRandom = async () => {
      setIsLoading(true);
      try {
        const fallbackUrl = await CataasService.getRandomCat();
        setCatImageUrl(fallbackUrl);
      } finally {
        setIsLoading(false);
      }
    };
    void doRandom();
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header com seletor de idioma */}
      <header className="absolute top-4 right-4">
        <LanguageSelector />
      </header>
      
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
            placeholder={t('searchPlaceholder')}
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
              htmlUrl={lastOptionsBase ? CataasService.buildUrl({ ...lastOptionsBase, html: true }) : undefined}
              jsonUrl={lastOptionsBase ? CataasService.buildUrl({ ...lastOptionsBase, json: true }) : undefined}
            />
          </div>
        )}
        
        {/* Footer estilo Google */}
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
};

export default Index;
