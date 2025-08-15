import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type Language = 'pt' | 'en' | 'es' | 'fr' | 'de' | 'it' | 'ja' | 'zh' | 'ru' | 'ar';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  getRandomLanguage: () => void;
}

const translations = {
  pt: {
    cat: 'Gato',
    searchPlaceholder: 'Digite uma tag para o gato (ex: cute, funny, sleeping)',
    searchButton: 'Buscar Gato',
    luckyButton: 'Estou com Sorte',
    advancedOptions: 'Opções Avançadas',
    imageType: 'Tipo de Imagem',
    default: 'Padrão',
    extraSmall: 'Extra Pequeno',
    small: 'Pequeno',
    medium: 'Médio',
    square: 'Quadrado',
    enableGif: 'Usar GIF em vez de imagem',
    enableText: 'Adicionar texto na imagem',
    customText: 'Texto personalizado',
    textColor: 'Cor do texto',
    fontSize: 'Tamanho da fonte',
    filter: 'Filtro',
    none: 'Nenhum',
    blur: 'Desfoque',
    mono: 'Preto e Branco',
    negative: 'Negativo',
    custom: 'Personalizado',
    brightness: 'Brilho',
    lightness: 'Luminosidade',
    saturation: 'Saturação',
    hue: 'Matiz',
    rgbFilters: 'Filtros RGB',
    red: 'Vermelho',
    green: 'Verde',
    blue: 'Azul',
    dimensions: 'Dimensões',
    width: 'Largura',
    height: 'Altura',
    searchingCat: 'Buscando o gato perfeito...',
    errorLoadingImage: 'Erro ao carregar a imagem do gato',
    tryAgain: 'Tentar Novamente',
    newCat: 'Novo Gato',
    catFound: 'Gato encontrado!',
    luckyCatFound: 'Gato da sorte encontrado!',
    poweredBy: 'Powered by cataas.com API',
    madeWith: 'Feito com ❤️ para amantes de gatos',
    language: 'Idioma'
  },
  en: {
    cat: 'Cat',
    searchPlaceholder: 'Type a tag for the cat (e.g: cute, funny, sleeping)',
    searchButton: 'Search Cat',
    luckyButton: "I'm Feeling Lucky",
    advancedOptions: 'Advanced Options',
    imageType: 'Image Type',
    default: 'Default',
    extraSmall: 'Extra Small',
    small: 'Small',
    medium: 'Medium',
    square: 'Square',
    enableGif: 'Use GIF instead of image',
    enableText: 'Add text to image',
    customText: 'Custom text',
    textColor: 'Text color',
    fontSize: 'Font size',
    filter: 'Filter',
    none: 'None',
    blur: 'Blur',
    mono: 'Black & White',
    negative: 'Negative',
    custom: 'Custom',
    brightness: 'Brightness',
    lightness: 'Lightness',
    saturation: 'Saturation',
    hue: 'Hue',
    rgbFilters: 'RGB Filters',
    red: 'Red',
    green: 'Green',
    blue: 'Blue',
    dimensions: 'Dimensions',
    width: 'Width',
    height: 'Height',
    searchingCat: 'Searching for the perfect cat...',
    errorLoadingImage: 'Error loading cat image',
    tryAgain: 'Try Again',
    newCat: 'New Cat',
    catFound: 'Cat found!',
    luckyCatFound: 'Lucky cat found!',
    poweredBy: 'Powered by cataas.com API',
    madeWith: 'Made with ❤️ for cat lovers',
    language: 'Language'
  },
  es: {
    cat: 'Gato',
    searchPlaceholder: 'Escribe una etiqueta para el gato (ej: cute, funny, sleeping)',
    searchButton: 'Buscar Gato',
    luckyButton: 'Voy a tener suerte',
    advancedOptions: 'Opciones Avanzadas',
    imageType: 'Tipo de Imagen',
    default: 'Por Defecto',
    extraSmall: 'Extra Pequeño',
    small: 'Pequeño',
    medium: 'Mediano',
    square: 'Cuadrado',
    enableGif: 'Usar GIF en lugar de imagen',
    enableText: 'Agregar texto a la imagen',
    customText: 'Texto personalizado',
    textColor: 'Color del texto',
    fontSize: 'Tamaño de fuente',
    filter: 'Filtro',
    none: 'Ninguno',
    blur: 'Desenfoque',
    mono: 'Blanco y Negro',
    negative: 'Negativo',
    custom: 'Personalizado',
    brightness: 'Brillo',
    lightness: 'Luminosidad',
    saturation: 'Saturación',
    hue: 'Matiz',
    rgbFilters: 'Filtros RGB',
    red: 'Rojo',
    green: 'Verde',
    blue: 'Azul',
    dimensions: 'Dimensiones',
    width: 'Ancho',
    height: 'Alto',
    searchingCat: 'Buscando el gato perfecto...',
    errorLoadingImage: 'Error al cargar la imagen del gato',
    tryAgain: 'Intentar de Nuevo',
    newCat: 'Nuevo Gato',
    catFound: '¡Gato encontrado!',
    luckyCatFound: '¡Gato de la suerte encontrado!',
    poweredBy: 'Powered by cataas.com API',
    madeWith: 'Hecho con ❤️ para amantes de gatos',
    language: 'Idioma'
  },
  fr: {
    cat: 'Chat',
    searchPlaceholder: 'Tapez un tag pour le chat (ex: cute, funny, sleeping)',
    searchButton: 'Chercher Chat',
    luckyButton: 'Je me sens chanceux',
    advancedOptions: 'Options Avancées',
    imageType: 'Type d\'Image',
    default: 'Défaut',
    extraSmall: 'Très Petit',
    small: 'Petit',
    medium: 'Moyen',
    square: 'Carré',
    enableGif: 'Utiliser GIF au lieu d\'image',
    enableText: 'Ajouter du texte à l\'image',
    customText: 'Texte personnalisé',
    textColor: 'Couleur du texte',
    fontSize: 'Taille de police',
    filter: 'Filtre',
    none: 'Aucun',
    blur: 'Flou',
    mono: 'Noir et Blanc',
    negative: 'Négatif',
    custom: 'Personnalisé',
    brightness: 'Luminosité',
    lightness: 'Clarté',
    saturation: 'Saturation',
    hue: 'Teinte',
    rgbFilters: 'Filtres RGB',
    red: 'Rouge',
    green: 'Vert',
    blue: 'Bleu',
    dimensions: 'Dimensions',
    width: 'Largeur',
    height: 'Hauteur',
    searchingCat: 'Recherche du chat parfait...',
    errorLoadingImage: 'Erreur lors du chargement de l\'image du chat',
    tryAgain: 'Réessayer',
    newCat: 'Nouveau Chat',
    catFound: 'Chat trouvé!',
    luckyCatFound: 'Chat porte-bonheur trouvé!',
    poweredBy: 'Powered by cataas.com API',
    madeWith: 'Fait avec ❤️ pour les amoureux des chats',
    language: 'Langue'
  },
  de: {
    cat: 'Katze',
    searchPlaceholder: 'Geben Sie ein Tag für die Katze ein (z.B: cute, funny, sleeping)',
    searchButton: 'Katze Suchen',
    luckyButton: 'Auf gut Glück',
    advancedOptions: 'Erweiterte Optionen',
    imageType: 'Bildtyp',
    default: 'Standard',
    extraSmall: 'Extra Klein',
    small: 'Klein',
    medium: 'Mittel',
    square: 'Quadrat',
    enableGif: 'GIF statt Bild verwenden',
    enableText: 'Text zum Bild hinzufügen',
    customText: 'Benutzerdefinierter Text',
    textColor: 'Textfarbe',
    fontSize: 'Schriftgröße',
    filter: 'Filter',
    none: 'Keine',
    blur: 'Unschärfe',
    mono: 'Schwarz-Weiß',
    negative: 'Negativ',
    custom: 'Benutzerdefiniert',
    brightness: 'Helligkeit',
    lightness: 'Lichtstärke',
    saturation: 'Sättigung',
    hue: 'Farbton',
    rgbFilters: 'RGB-Filter',
    red: 'Rot',
    green: 'Grün',
    blue: 'Blau',
    dimensions: 'Abmessungen',
    width: 'Breite',
    height: 'Höhe',
    searchingCat: 'Suche nach der perfekten Katze...',
    errorLoadingImage: 'Fehler beim Laden des Katzenbildes',
    tryAgain: 'Erneut Versuchen',
    newCat: 'Neue Katze',
    catFound: 'Katze gefunden!',
    luckyCatFound: 'Glückskatze gefunden!',
    poweredBy: 'Powered by cataas.com API',
    madeWith: 'Mit ❤️ für Katzenliebhaber gemacht',
    language: 'Sprache'
  },
  it: {
    cat: 'Gatto',
    searchPlaceholder: 'Digita un tag per il gatto (es: cute, funny, sleeping)',
    searchButton: 'Cerca Gatto',
    luckyButton: 'Mi sento fortunato',
    advancedOptions: 'Opzioni Avanzate',
    imageType: 'Tipo di Immagine',
    default: 'Predefinito',
    extraSmall: 'Extra Piccolo',
    small: 'Piccolo',
    medium: 'Medio',
    square: 'Quadrato',
    enableGif: 'Usa GIF invece di immagine',
    enableText: 'Aggiungi testo all\'immagine',
    customText: 'Testo personalizzato',
    textColor: 'Colore del testo',
    fontSize: 'Dimensione carattere',
    filter: 'Filtro',
    none: 'Nessuno',
    blur: 'Sfocatura',
    mono: 'Bianco e Nero',
    negative: 'Negativo',
    custom: 'Personalizzato',
    brightness: 'Luminosità',
    lightness: 'Chiarezza',
    saturation: 'Saturazione',
    hue: 'Tonalità',
    rgbFilters: 'Filtri RGB',
    red: 'Rosso',
    green: 'Verde',
    blue: 'Blu',
    dimensions: 'Dimensioni',
    width: 'Larghezza',
    height: 'Altezza',
    searchingCat: 'Cercando il gatto perfetto...',
    errorLoadingImage: 'Errore nel caricamento dell\'immagine del gatto',
    tryAgain: 'Riprova',
    newCat: 'Nuovo Gatto',
    catFound: 'Gatto trovato!',
    luckyCatFound: 'Gatto fortunato trovato!',
    poweredBy: 'Powered by cataas.com API',
    madeWith: 'Fatto con ❤️ per gli amanti dei gatti',
    language: 'Lingua'
  },
  ja: {
    cat: 'ネコ',
    searchPlaceholder: '猫のタグを入力してください (例: cute, funny, sleeping)',
    searchButton: '猫を検索',
    luckyButton: '気まぐれ検索',
    advancedOptions: '詳細オプション',
    imageType: '画像タイプ',
    default: 'デフォルト',
    extraSmall: '極小',
    small: '小',
    medium: '中',
    square: '正方形',
    enableGif: '画像の代わりにGIFを使用',
    enableText: '画像にテキストを追加',
    customText: 'カスタムテキスト',
    textColor: 'テキストの色',
    fontSize: 'フォントサイズ',
    filter: 'フィルター',
    none: 'なし',
    blur: 'ぼかし',
    mono: '白黒',
    negative: 'ネガティブ',
    custom: 'カスタム',
    brightness: '明度',
    lightness: '輝度',
    saturation: '彩度',
    hue: '色相',
    rgbFilters: 'RGBフィルター',
    red: '赤',
    green: '緑',
    blue: '青',
    dimensions: '寸法',
    width: '幅',
    height: '高さ',
    searchingCat: '完璧な猫を探しています...',
    errorLoadingImage: '猫の画像の読み込みエラー',
    tryAgain: '再試行',
    newCat: '新しい猫',
    catFound: '猫が見つかりました！',
    luckyCatFound: 'ラッキー猫が見つかりました！',
    poweredBy: 'Powered by cataas.com API',
    madeWith: '猫愛好家のために❤️で作成',
    language: '言語'
  },
  zh: {
    cat: '猫',
    searchPlaceholder: '输入猫的标签 (例如: cute, funny, sleeping)',
    searchButton: '搜索猫',
    luckyButton: '手气不错',
    advancedOptions: '高级选项',
    imageType: '图像类型',
    default: '默认',
    extraSmall: '超小',
    small: '小',
    medium: '中',
    square: '正方形',
    enableGif: '使用GIF代替图像',
    enableText: '为图像添加文字',
    customText: '自定义文字',
    textColor: '文字颜色',
    fontSize: '字体大小',
    filter: '过滤器',
    none: '无',
    blur: '模糊',
    mono: '黑白',
    negative: '负片',
    custom: '自定义',
    brightness: '亮度',
    lightness: '明度',
    saturation: '饱和度',
    hue: '色调',
    rgbFilters: 'RGB过滤器',
    red: '红',
    green: '绿',
    blue: '蓝',
    dimensions: '尺寸',
    width: '宽度',
    height: '高度',
    searchingCat: '正在寻找完美的猫...',
    errorLoadingImage: '加载猫图像错误',
    tryAgain: '重试',
    newCat: '新猫',
    catFound: '找到猫了！',
    luckyCatFound: '找到幸运猫了！',
    poweredBy: 'Powered by cataas.com API',
    madeWith: '为爱猫人士用❤️制作',
    language: '语言'
  },
  ru: {
    cat: 'Кот',
    searchPlaceholder: 'Введите тег для кота (например: cute, funny, sleeping)',
    searchButton: 'Найти Кота',
    luckyButton: 'Мне повезёт',
    advancedOptions: 'Дополнительные Опции',
    imageType: 'Тип Изображения',
    default: 'По умолчанию',
    extraSmall: 'Очень маленький',
    small: 'Маленький',
    medium: 'Средний',
    square: 'Квадрат',
    enableGif: 'Использовать GIF вместо изображения',
    enableText: 'Добавить текст к изображению',
    customText: 'Пользовательский текст',
    textColor: 'Цвет текста',
    fontSize: 'Размер шрифта',
    filter: 'Фильтр',
    none: 'Нет',
    blur: 'Размытие',
    mono: 'Чёрно-белый',
    negative: 'Негатив',
    custom: 'Пользовательский',
    brightness: 'Яркость',
    lightness: 'Светлота',
    saturation: 'Насыщенность',
    hue: 'Оттенок',
    rgbFilters: 'RGB Фильтры',
    red: 'Красный',
    green: 'Зелёный',
    blue: 'Синий',
    dimensions: 'Размеры',
    width: 'Ширина',
    height: 'Высота',
    searchingCat: 'Ищем идеального кота...',
    errorLoadingImage: 'Ошибка загрузки изображения кота',
    tryAgain: 'Попробовать снова',
    newCat: 'Новый кот',
    catFound: 'Кот найден!',
    luckyCatFound: 'Счастливый кот найден!',
    poweredBy: 'Powered by cataas.com API',
    madeWith: 'Сделано с ❤️ для любителей котов',
    language: 'Язык'
  },
  ar: {
    cat: 'قط',
    searchPlaceholder: 'اكتب علامة للقط (مثل: cute, funny, sleeping)',
    searchButton: 'البحث عن قط',
    luckyButton: 'أشعر بالحظ',
    advancedOptions: 'خيارات متقدمة',
    imageType: 'نوع الصورة',
    default: 'افتراضي',
    extraSmall: 'صغير جداً',
    small: 'صغير',
    medium: 'متوسط',
    square: 'مربع',
    enableGif: 'استخدم GIF بدلاً من الصورة',
    enableText: 'أضف نص للصورة',
    customText: 'نص مخصص',
    textColor: 'لون النص',
    fontSize: 'حجم الخط',
    filter: 'مرشح',
    none: 'لا شيء',
    blur: 'ضبابية',
    mono: 'أبيض وأسود',
    negative: 'سلبي',
    custom: 'مخصص',
    brightness: 'السطوع',
    lightness: 'الإضاءة',
    saturation: 'التشبع',
    hue: 'اللون',
    rgbFilters: 'مرشحات RGB',
    red: 'أحمر',
    green: 'أخضر',
    blue: 'أزرق',
    dimensions: 'الأبعاد',
    width: 'العرض',
    height: 'الارتفاع',
    searchingCat: 'البحث عن القط المثالي...',
    errorLoadingImage: 'خطأ في تحميل صورة القط',
    tryAgain: 'حاول مرة أخرى',
    newCat: 'قط جديد',
    catFound: 'تم العثور على قط!',
    luckyCatFound: 'تم العثور على قط محظوظ!',
    poweredBy: 'Powered by cataas.com API',
    madeWith: 'صنع بـ ❤️ لمحبي القطط',
    language: 'اللغة'
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const languages: Language[] = ['pt', 'en', 'es', 'fr', 'de', 'it', 'ja', 'zh', 'ru', 'ar'];

// Função para detectar idioma baseado no país/IP
const detectLanguageFromIP = async (): Promise<Language> => {
  try {
    const response = await fetch('https://ipapi.co/json/');
    const data = await response.json();
    const country = data.country_code?.toLowerCase();
    
    const countryToLanguage: Record<string, Language> = {
      'br': 'pt', 'pt': 'pt',
      'us': 'en', 'gb': 'en', 'ca': 'en', 'au': 'en',
      'es': 'es', 'mx': 'es', 'ar': 'es', 'co': 'es',
      'fr': 'fr', 'be': 'fr', 'ch': 'fr',
      'de': 'de', 'at': 'de',
      'it': 'it',
      'jp': 'ja',
      'cn': 'zh', 'tw': 'zh', 'hk': 'zh',
      'ru': 'ru', 'by': 'ru', 'kz': 'ru',
      'sa': 'ar', 'ae': 'ar', 'eg': 'ar'
    };
    
    return countryToLanguage[country] || 'en';
  } catch {
    return 'en'; // fallback para inglês
  }
};

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');

  useEffect(() => {
    const initLanguage = async () => {
      const savedLanguage = localStorage.getItem('language') as Language;
      if (savedLanguage && languages.includes(savedLanguage)) {
        setLanguage(savedLanguage);
      } else {
        const detectedLanguage = await detectLanguageFromIP();
        setLanguage(detectedLanguage);
        localStorage.setItem('language', detectedLanguage);
      }
    };
    
    initLanguage();
  }, []);

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('language', lang);
  };

  const getRandomLanguage = () => {
    const randomIndex = Math.floor(Math.random() * languages.length);
    const randomLang = languages[randomIndex];
    handleSetLanguage(randomLang);
  };

  const t = (key: string): string => {
    return translations[language]?.[key as keyof typeof translations[typeof language]] || 
           translations.en[key as keyof typeof translations.en] || 
           key;
  };

  return (
    <LanguageContext.Provider value={{ 
      language, 
      setLanguage: handleSetLanguage, 
      t, 
      getRandomLanguage 
    }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}