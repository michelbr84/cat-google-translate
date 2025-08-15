import { useLanguage } from '@/contexts/LanguageContext';

interface LogoProps {
  onClick?: () => void;
}

export default function Logo({ onClick }: LogoProps) {
  const { t, getRandomLanguage } = useLanguage();

  const handleClick = () => {
    getRandomLanguage();
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
      {renderColoredLetters(t('cat'))}
    </div>
  );
}