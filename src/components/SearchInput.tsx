import { useEffect, useMemo, useRef, useState } from 'react';
import { Search } from 'lucide-react';
import { CataasService } from '@/services/cataasApi';

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
	const [tags, setTags] = useState<string[]>([]);
	const containerRef = useRef<HTMLDivElement | null>(null);

	// Load tags with 24h cache
	useEffect(() => {
		const now = Date.now();
		const cached = localStorage.getItem('cataas_tags_cache');
		const cachedAt = Number(localStorage.getItem('cataas_tags_cache_at') || 0);
		if (cached && cachedAt && now - cachedAt < 24 * 60 * 60 * 1000) {
			try {
				setTags(JSON.parse(cached));
			} catch {}
		} else {
			CataasService.getAllTags().then((list) => {
				setTags(list);
				localStorage.setItem('cataas_tags_cache', JSON.stringify(list));
				localStorage.setItem('cataas_tags_cache_at', String(now));
			}).catch(() => {});
		}
	}, []);

	const suggestions = useMemo(() => {
		const current = value.split(',').pop()?.trim().toLowerCase() || '';
		if (!current) return [] as string[];
		return tags.filter((t) => t.toLowerCase().startsWith(current)).slice(0, 8);
	}, [value, tags]);

	useEffect(() => {
		const onDocClick = (e: MouseEvent) => {
			if (!containerRef.current) return;
			if (!containerRef.current.contains(e.target as Node)) {
				// close suggestions when clicking outside
				const dropdown = document.getElementById('tag-suggestions');
				if (dropdown) dropdown.style.display = 'none';
			}
		};
		document.addEventListener('click', onDocClick);
		return () => document.removeEventListener('click', onDocClick);
	}, []);

	const handleKeyDown = (e: React.KeyboardEvent) => {
		if (e.key === 'Enter') {
			onSearch();
		}
		if (e.key === 'ArrowDown') {
			const first = document.querySelector<HTMLButtonElement>('#tag-suggestions button');
			first?.focus();
		}
	};

	const applySuggestion = (s: string) => {
		const parts = value.split(',');
		parts[parts.length - 1] = ` ${s}`;
		const next = parts.join(',').replace(/^\s+/, '').replace(/\s+,/g, ',');
		onChange(next);
	};

	return (
		<div className="relative w-full max-w-xl mx-auto" ref={containerRef}>
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
					aria-label={placeholder}
					className="flex-1 h-11 px-4 pr-10 bg-transparent text-foreground placeholder:text-muted-foreground focus:outline-none"
				/>
			</div>
			{suggestions.length > 0 && (
				<div id="tag-suggestions" role="listbox" aria-label="tag suggestions" className="absolute left-0 right-0 mt-1 bg-popover border rounded-md shadow z-20 max-h-56 overflow-auto">
					{suggestions.map((s, idx) => (
						<button
							key={s}
							role="option"
							type="button"
							className="w-full text-left px-3 py-2 hover:bg-accent focus:bg-accent focus:outline-none"
							onMouseDown={(e) => { e.preventDefault(); applySuggestion(s); }}
							onKeyDown={(e) => {
								if (e.key === 'Enter') { e.preventDefault(); applySuggestion(s); }
								if (e.key === 'ArrowDown') {
									const next = (e.currentTarget.parentElement?.querySelectorAll('button')[idx + 1]) as HTMLButtonElement | undefined;
									next?.focus();
								}
								if (e.key === 'ArrowUp') {
									if (idx === 0) {
										(containerRef.current?.querySelector('input') as HTMLInputElement | null)?.focus();
									} else {
										const prev = (e.currentTarget.parentElement?.querySelectorAll('button')[idx - 1]) as HTMLButtonElement | undefined;
										prev?.focus();
									}
								}
							}}
						>
							{s}
						</button>
					))}
				</div>
			)}
		</div>
	);
}