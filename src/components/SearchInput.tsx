import { useState } from 'react';
import { Search } from 'lucide-react';

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  onSearch: () => void;
  placeholder?: string;
}

export default function SearchInput({ 
  value, 
  onChange, 
  onSearch, 
  placeholder = "Digite uma tag para o gato..." 
}: SearchInputProps) {
  const [isFocused, setIsFocused] = useState(false);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      onSearch();
    }
  };

  return (
    <div className="relative w-full max-w-xl mx-auto">
      <div className={`
        relative flex items-center rounded-full border-2 bg-search-background
        transition-all duration-200 shadow-sm hover:shadow-md
        ${isFocused ? 'border-search-border-hover shadow-md' : 'border-search-border'}
      `}>
        <Search className="ml-4 h-5 w-5 text-muted-foreground" />
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          className="flex-1 h-11 px-4 bg-transparent text-foreground placeholder:text-muted-foreground focus:outline-none"
        />
      </div>
    </div>
  );
}