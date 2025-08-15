import { useLanguage, Language } from '@/contexts/LanguageContext';
import { useMemo, useState } from 'react';

interface LogoProps {
  onClick?: () => void;
}

export default function Logo({ onClick }: LogoProps) {
  const { translate } = useLanguage();
  const languages: Language[] = useMemo(() => ['pt', 'en', 'es', 'fr', 'de', 'it', 'ja', 'zh', 'ru', 'ar'], []);
  const [logoLang, setLogoLang] = useState<Language>('pt');

  const handleClick = () => {
    const randomIndex = Math.floor(Math.random() * languages.length);
    setLogoLang(languages[randomIndex]);
    onClick?.();
  };

  const renderColoredLetters = (text: string) => {
    const colors = ['logo-blue', 'logo-red', 'logo-yellow', 'logo-green'];
    
    return text.split('').map((letter, index) => (
      <span 
        key={index} 
        className={`text-${colors[index % colors.length]}`}
        style={{ 
          color: `hsl(var(--${colors[index % colors.length]}))` 
        }}
      >
        {letter}
      </span>
    ));
  };

  return (
    <div 
      className="logo-text cursor-pointer select-none hover:opacity-80 transition-opacity"
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && handleClick()}
    >
      {renderColoredLetters(translate(logoLang, 'cat'))}
    </div>
  );
}