import { useState, useCallback, useEffect } from 'react';
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
  const [ariaMessage, setAriaMessage] = useState('');

  // Persist advanced options in localStorage
  useEffect(() => {
    try {
      const raw = localStorage.getItem('advancedOptions_v1');
      if (raw) {
        const parsed = JSON.parse(raw);
        setAdvancedOptions((prev) => ({
          ...prev,
          ...parsed,
        }));
      }
    } catch {}
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('advancedOptions_v1', JSON.stringify(advancedOptions));
    } catch {}
  }, [advancedOptions]);

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
      if (import.meta.env.DEV) {
        // Log de início da busca (dev only)
        console.info('metrics_search_start', { isLucky, hasTag: !!baseOptions.tag });
      }
      
      const imageUrl = await CataasService.getCatImage(baseOptions);
      setCatImageUrl(imageUrl);
      setLastOptionsBase(baseOptions);
      
      const successMsg = isLucky ? t('luckyCatFound') : t('catFound');
      toast.success(successMsg);
      setAriaMessage(successMsg);
      if (import.meta.env.DEV) {
        const key = 'metrics_success';
        const v = Number(localStorage.getItem(key) || 0) + 1;
        localStorage.setItem(key, String(v));
        console.info('metrics_search_success', { isLucky, totalSuccess: v });
      }
    } catch (error) {
      console.error('Erro ao buscar gato, fazendo fallback para /cat:', error);
      const fallbackUrl = await CataasService.getRandomCat();
      setCatImageUrl(fallbackUrl);
      setAriaMessage(t('errorLoadingImage'));
      if (import.meta.env.DEV) {
        const key = 'metrics_error';
        const v = Number(localStorage.getItem(key) || 0) + 1;
        localStorage.setItem(key, String(v));
        console.info('metrics_search_error', { totalError: v });
      }
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
      <div aria-live="polite" role="status" className="sr-only">{ariaMessage}</div>
      {/* Header com seletor de idioma */}
      <header className="absolute top-2 right-2 sm:top-4 sm:right-4">
        <LanguageSelector />
      </header>
      
      {/* Layout estilo Google */}
      <div className="flex flex-col items-center justify-center min-h-screen px-4 sm:px-6">
        
        {/* Logo */}
        <div className="mb-8">
          <Logo />
        </div>
        
        {/* Barra de Pesquisa */}
        <div className="w-full max-w-xl mb-8 px-2 sm:px-0">
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
            <span>•</span>
            <a href="/about" className="underline hover:no-underline">
              {t('aboutLink')}
            </a>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Index;
