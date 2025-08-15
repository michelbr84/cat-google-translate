import { useState, useEffect } from 'react';

const translations = {
  'pt': 'Gato',
  'en': 'Cat',
  'es': 'Gato', 
  'fr': 'Chat',
  'de': 'Katze',
  'it': 'Gatto',
  'ja': 'ネコ',
  'zh': '猫',
  'ru': 'Кот',
  'ar': 'قط'
};

interface LogoProps {
  onClick?: () => void;
}

export default function Logo({ onClick }: LogoProps) {
  const [currentText, setCurrentText] = useState('Gato');

  // Simular detecção de país por IP (fallback para português)
  useEffect(() => {
    // Em um cenário real, aqui faria uma chamada para API de geolocalização
    // Por ora, usar português como padrão
    const detectLanguage = async () => {
      try {
        // Simular detecção - em produção usaria serviço como ipapi.co
        const randomLanguages = Object.keys(translations);
        const randomLang = randomLanguages[Math.floor(Math.random() * randomLanguages.length)];
        setCurrentText(translations[randomLang as keyof typeof translations]);
      } catch {
        setCurrentText('Gato'); // fallback
      }
    };

    detectLanguage();
  }, []);

  const handleClick = () => {
    // Trocar para idioma aleatório ao clicar
    const languages = Object.keys(translations);
    const randomLang = languages[Math.floor(Math.random() * languages.length)];
    setCurrentText(translations[randomLang as keyof typeof translations]);
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
      {renderColoredLetters(currentText)}
    </div>
  );
}