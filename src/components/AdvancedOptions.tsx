import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
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

interface AdvancedOptionsProps {
	options: LocalCatOptions;
	onChange: (options: LocalCatOptions) => void;
}

export default function AdvancedOptions({ options, onChange }: AdvancedOptionsProps) {
	const [isOpen, setIsOpen] = useState(false);
	const { t } = useLanguage();

	// Restrict text colors to exact, known-safe names for CATAAS (value = color name)
	const allowedColors: { label: string; value: string; hex: string }[] = [
		{ label: 'Black', value: 'Black', hex: '#000000' },
		{ label: 'White', value: 'White', hex: '#ffffff' },
		{ label: 'Red', value: 'Red', hex: '#ff0000' },
		{ label: 'Lime', value: 'Lime', hex: '#00ff00' },
		{ label: 'Blue', value: 'Blue', hex: '#0000ff' },
		{ label: 'Yellow', value: 'Yellow', hex: '#ffff00' },
		{ label: 'Orange', value: 'Orange', hex: '#ffa500' },
		{ label: 'Purple', value: 'Purple', hex: '#800080' },
		{ label: 'Pink', value: 'Pink', hex: '#ffc0cb' },
		{ label: 'Gray', value: 'Gray', hex: '#808080' },
		{ label: 'Aqua', value: 'Aqua', hex: '#00ffff' },
		{ label: 'Fuchsia', value: 'Fuchsia', hex: '#ff00ff' },
		{ label: 'Brown', value: 'Brown', hex: '#a52a2a' },
		{ label: 'Navy', value: 'Navy', hex: '#000080' },
	];

	const updateOption = (key: keyof LocalCatOptions, value: any) => {
		onChange({ ...options, [key]: value });
	};

	const clampNumber = (value: number, min: number, max: number, fallback: number) => {
		if (Number.isNaN(value)) return fallback;
		if (value < min) return min;
		if (value > max) return max;
		return value;
	};

	const updateClamped = (
		key: keyof LocalCatOptions,
		raw: number | string,
		min: number,
		max: number,
		fallback: number
	) => {
		const n = typeof raw === 'string' ? parseInt(raw) : raw;
		const clamped = clampNumber(n as number, min, max, fallback);
		updateOption(key, clamped);
	};

	return (
		<div className="w-full max-w-4xl mx-auto mt-6">
			<Collapsible open={isOpen} onOpenChange={setIsOpen}>
				<CollapsibleTrigger asChild>
					<Button
						variant="ghost"
						className="flex items-center gap-2 mx-auto"
						aria-expanded={isOpen}
						aria-controls="advanced-options-content"
					>
						{t('advancedOptions')}
						{isOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
					</Button>
				</CollapsibleTrigger>
				
				<CollapsibleContent id="advanced-options-content">
					<div className="advanced-panel space-y-6">
						{/* Opções Básicas */}
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
							
							{/* GIF Toggle */}
							<div className="flex items-center space-x-2">
								<Switch
									checked={options.useGif}
									onCheckedChange={(checked) => updateOption('useGif', checked)}
								/>
								<Label className="cursor-pointer select-none hover:opacity-90">{t('enableGif')}</Label>
							</div>

							{/* Texto Personalizado */}
							<div className="flex items-center space-x-2">
								<Switch
									checked={options.enableText}
									onCheckedChange={(checked) => updateOption('enableText', checked)}
								/>
								<Label className="cursor-pointer select-none hover:opacity-90">{t('enableText')}</Label>
							</div>

							{/* Tipo de Imagem */}
							<div className="space-y-2">
								<Label>{t('imageType')}</Label>
								<Select value={options.imageType} onValueChange={(value) => updateOption('imageType', value)}>
									<SelectTrigger>
										<SelectValue />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value="default">{t('default')}</SelectItem>
										<SelectItem value="xsmall">{t('extraSmall')}</SelectItem>
										<SelectItem value="small">{t('small')}</SelectItem>
										<SelectItem value="medium">{t('medium')}</SelectItem>
										<SelectItem value="square">{t('square')}</SelectItem>
									</SelectContent>
								</Select>
							</div>

							{/* Saídas alternativas */}
							<div className="flex items-center space-x-4">
								<div className="flex items-center space-x-2">
									<Switch
										checked={!!options.html}
										disabled={!!options.json}
										onCheckedChange={(checked) => {
											if (checked) {
												onChange({ ...options, html: true, json: false });
											} else {
												updateOption('html', false);
											}
										}}
									/>
									<Label className="cursor-pointer select-none hover:opacity-90">HTML</Label>
								</div>
								<div className="flex items-center space-x-2">
									<Switch
										checked={!!options.json}
										disabled={!!options.html}
										onCheckedChange={(checked) => {
											if (checked) {
												onChange({ ...options, json: true, html: false });
											} else {
												updateOption('json', false);
											}
										}}
									/>
									<Label className="cursor-pointer select-none hover:opacity-90">JSON</Label>
								</div>
							</div>
						</div>

						{/* Opções de Texto */}
						{options.enableText && (
							<div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-advanced-background rounded-lg border">
								<div className="space-y-2">
									<Label>{t('customText')}</Label>
									<Input
										value={options.customText}
										onChange={(e) => updateOption('customText', e.target.value)}
										placeholder={t('customText')}
									/>
								</div>
								
								<div className="space-y-2">
									<Label>{t('textColor')}</Label>
									<Select value={options.textColor} onValueChange={(v) => updateOption('textColor', v)}>
										<SelectTrigger>
											<SelectValue placeholder="Black" />
										</SelectTrigger>
										<SelectContent>
											{allowedColors.map((c) => (
												<SelectItem key={c.value} value={c.value}>
													<span className="inline-flex items-center gap-2">
														<span
															className="inline-block w-3 h-3 rounded border"
															style={{ backgroundColor: c.hex }}
														/>
														{c.label} ({c.hex})
													</span>
												</SelectItem>
											))}
										</SelectContent>
									</Select>
									<span className="text-xs text-muted-foreground">Only exact supported color names are available (e.g., Orange)</span>
								</div>
								
								<div className="space-y-2">
									<Label>{t('fontSize')}</Label>
									<Input
										type="number"
										value={options.fontSize}
										onChange={(e) => updateClamped('fontSize', e.target.value, 10, 100, 20)}
										min="10"
										max="100"
									/>
								</div>
							</div>
						)}

						{/* Filtros */}
						<div className="space-y-4">
							<Label className="text-lg font-semibold">{t('filter')}</Label>
							
							<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
								<div className="space-y-2">
									<Label>{t('filter')}</Label>
									<Select value={options.filter} onValueChange={(value) => updateOption('filter', value)}>
										<SelectTrigger>
											<SelectValue />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value="none">{t('none')}</SelectItem>
											<SelectItem value="blur">{t('blur')}</SelectItem>
											<SelectItem value="mono">{t('mono')}</SelectItem>
											<SelectItem value="negate">{t('negative')}</SelectItem>
											<SelectItem value="custom">{t('custom')}</SelectItem>
										</SelectContent>
									</Select>
								</div>

								<div className="grid grid-cols-2 gap-2">
									<div className="space-y-2">
										<Label>{t('width')}</Label>
										<Input
											type="number"
											value={options.width || ''}
											onChange={(e) => updateOption('width', parseInt(e.target.value) || 0)}
											placeholder="Auto"
										/>
									</div>
									<div className="space-y-2">
										<Label>{t('height')}</Label>
										<Input
											type="number"
											value={options.height || ''}
											onChange={(e) => updateOption('height', parseInt(e.target.value) || 0)}
											placeholder="Auto"
										/>
									</div>
								</div>
							</div>

							{/* Filtros Personalizados */}
							{options.filter === 'custom' && (
								<div className="p-4 bg-advanced-background rounded-lg border space-y-4">
									<Label className="font-semibold">{t('brightness')}/{t('lightness')}/{t('saturation')}/{t('hue')}</Label>
									<div className="grid grid-cols-2 md:grid-cols-4 gap-4">
										<div className="space-y-2">
											<Label>{t('brightness')}</Label>
											<Input
												type="number"
												value={options.brightness}
												onChange={(e) => updateClamped('brightness', e.target.value, 0, 200, 100)}
												min="0"
												max="200"
											/>
										</div>
										<div className="space-y-2">
											<Label>{t('lightness')}</Label>
											<Input
												type="number"
												value={options.lightness}
												onChange={(e) => updateClamped('lightness', e.target.value, 0, 200, 100)}
												min="0"
												max="200"
											/>
										</div>
										<div className="space-y-2">
											<Label>{t('saturation')}</Label>
											<Input
												type="number"
												value={options.saturation}
												onChange={(e) => updateClamped('saturation', e.target.value, 0, 200, 100)}
												min="0"
												max="200"
											/>
										</div>
										<div className="space-y-2">
											<Label>{t('hue')}</Label>
											<Input
												type="number"
												value={options.hue}
												onChange={(e) => updateClamped('hue', e.target.value, 0, 360, 0)}
												min="0"
												max="360"
											/>
										</div>
									</div>

									<Label className="font-semibold">{t('rgbFilters')}</Label>
									<div className="grid grid-cols-3 gap-4">
										<div className="space-y-2">
											<Label>{t('red')}</Label>
											<Input
												type="number"
												value={options.red}
												onChange={(e) => updateClamped('red', e.target.value, 0, 255, 100)}
												min="0"
												max="255"
											/>
										</div>
										<div className="space-y-2">
											<Label>{t('green')}</Label>
											<Input
												type="number"
												value={options.green}
												onChange={(e) => updateClamped('green', e.target.value, 0, 255, 100)}
												min="0"
												max="255"
											/>
										</div>
										<div className="space-y-2">
											<Label>{t('blue')}</Label>
											<Input
												type="number"
												value={options.blue}
												onChange={(e) => updateClamped('blue', e.target.value, 0, 255, 100)}
												min="0"
												max="255"
											/>
										</div>
									</div>
								</div>
							)}
						</div>
					</div>
				</CollapsibleContent>
			</Collapsible>
		</div>
	);
}