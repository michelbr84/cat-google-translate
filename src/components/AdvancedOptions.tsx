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

  const updateOption = (key: keyof LocalCatOptions, value: any) => {
    onChange({ ...options, [key]: value });
  };

  return (
    <div className="w-full max-w-4xl mx-auto mt-6">
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger asChild>
          <Button variant="ghost" className="flex items-center gap-2 mx-auto">
            {t('advancedOptions')}
            {isOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </Button>
        </CollapsibleTrigger>
        
        <CollapsibleContent>
          <div className="advanced-panel space-y-6">
            {/* Opções Básicas */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              
              {/* GIF Toggle */}
              <div className="flex items-center space-x-2">
                <Switch
                  checked={options.useGif}
                  onCheckedChange={(checked) => updateOption('useGif', checked)}
                />
                <Label>{t('enableGif')}</Label>
              </div>

              {/* Texto Personalizado */}
              <div className="flex items-center space-x-2">
                <Switch
                  checked={options.enableText}
                  onCheckedChange={(checked) => updateOption('enableText', checked)}
                />
                <Label>{t('enableText')}</Label>
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
                    onCheckedChange={(checked) => updateOption('html', checked)}
                  />
                  <Label>HTML</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    checked={!!options.json}
                    onCheckedChange={(checked) => updateOption('json', checked)}
                  />
                  <Label>JSON</Label>
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
                  <div className="flex gap-2">
                    <input
                      type="color"
                      value={options.textColor}
                      onChange={(e) => updateOption('textColor', e.target.value)}
                      className="w-12 h-8 rounded border"
                    />
                    <Input
                      value={options.textColor}
                      onChange={(e) => updateOption('textColor', e.target.value)}
                      placeholder="red | #ff0000"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label>{t('fontSize')}</Label>
                  <Input
                    type="number"
                    value={options.fontSize}
                    onChange={(e) => updateOption('fontSize', parseInt(e.target.value) || 20)}
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
                        onChange={(e) => updateOption('brightness', parseInt(e.target.value) || 100)}
                        min="0"
                        max="200"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>{t('lightness')}</Label>
                      <Input
                        type="number"
                        value={options.lightness}
                        onChange={(e) => updateOption('lightness', parseInt(e.target.value) || 100)}
                        min="0"
                        max="200"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>{t('saturation')}</Label>
                      <Input
                        type="number"
                        value={options.saturation}
                        onChange={(e) => updateOption('saturation', parseInt(e.target.value) || 100)}
                        min="0"
                        max="200"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>{t('hue')}</Label>
                      <Input
                        type="number"
                        value={options.hue}
                        onChange={(e) => updateOption('hue', parseInt(e.target.value) || 0)}
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
                        onChange={(e) => updateOption('red', parseInt(e.target.value) || 100)}
                        min="0"
                        max="255"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>{t('green')}</Label>
                      <Input
                        type="number"
                        value={options.green}
                        onChange={(e) => updateOption('green', parseInt(e.target.value) || 100)}
                        min="0"
                        max="255"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>{t('blue')}</Label>
                      <Input
                        type="number"
                        value={options.blue}
                        onChange={(e) => updateOption('blue', parseInt(e.target.value) || 100)}
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