import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

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
}

interface AdvancedOptionsProps {
  options: LocalCatOptions;
  onChange: (options: LocalCatOptions) => void;
}

export default function AdvancedOptions({ options, onChange }: AdvancedOptionsProps) {
  const [isOpen, setIsOpen] = useState(false);

  const updateOption = (key: keyof LocalCatOptions, value: any) => {
    onChange({ ...options, [key]: value });
  };

  return (
    <div className="w-full max-w-4xl mx-auto mt-6">
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger asChild>
          <Button variant="ghost" className="flex items-center gap-2 mx-auto">
            Opções Avançadas
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
                <Label>Usar GIF em vez de imagem</Label>
              </div>

              {/* Texto Personalizado */}
              <div className="flex items-center space-x-2">
                <Switch
                  checked={options.enableText}
                  onCheckedChange={(checked) => updateOption('enableText', checked)}
                />
                <Label>Adicionar texto</Label>
              </div>

              {/* Tipo de Imagem */}
              <div className="space-y-2">
                <Label>Tamanho da Imagem</Label>
                <Select value={options.imageType} onValueChange={(value) => updateOption('imageType', value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Padrão</SelectItem>
                    <SelectItem value="xsmall">Extra Pequeno</SelectItem>
                    <SelectItem value="small">Pequeno</SelectItem>
                    <SelectItem value="medium">Médio</SelectItem>
                    <SelectItem value="square">Quadrado</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Opções de Texto */}
            {options.enableText && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-advanced-background rounded-lg border">
                <div className="space-y-2">
                  <Label>Texto</Label>
                  <Input
                    value={options.customText}
                    onChange={(e) => updateOption('customText', e.target.value)}
                    placeholder="Digite o texto aqui"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label>Cor do Texto</Label>
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
                      placeholder="#ffffff"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label>Tamanho da Fonte</Label>
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
              <Label className="text-lg font-semibold">Filtros de Imagem</Label>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Filtro</Label>
                  <Select value={options.filter} onValueChange={(value) => updateOption('filter', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">Nenhum</SelectItem>
                      <SelectItem value="blur">Desfoque</SelectItem>
                      <SelectItem value="mono">Preto e Branco</SelectItem>
                      <SelectItem value="negate">Negativo</SelectItem>
                      <SelectItem value="custom">Personalizado</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-2">
                    <Label>Largura</Label>
                    <Input
                      type="number"
                      value={options.width || ''}
                      onChange={(e) => updateOption('width', parseInt(e.target.value) || 0)}
                      placeholder="Auto"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Altura</Label>
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
                  <Label className="font-semibold">Ajustes de Cor (HSL)</Label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="space-y-2">
                      <Label>Brilho</Label>
                      <Input
                        type="number"
                        value={options.brightness}
                        onChange={(e) => updateOption('brightness', parseInt(e.target.value) || 100)}
                        min="0"
                        max="200"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Luminosidade</Label>
                      <Input
                        type="number"
                        value={options.lightness}
                        onChange={(e) => updateOption('lightness', parseInt(e.target.value) || 100)}
                        min="0"
                        max="200"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Saturação</Label>
                      <Input
                        type="number"
                        value={options.saturation}
                        onChange={(e) => updateOption('saturation', parseInt(e.target.value) || 100)}
                        min="0"
                        max="200"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Matiz</Label>
                      <Input
                        type="number"
                        value={options.hue}
                        onChange={(e) => updateOption('hue', parseInt(e.target.value) || 0)}
                        min="0"
                        max="360"
                      />
                    </div>
                  </div>

                  <Label className="font-semibold">Ajustes RGB</Label>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label>Vermelho</Label>
                      <Input
                        type="number"
                        value={options.red}
                        onChange={(e) => updateOption('red', parseInt(e.target.value) || 100)}
                        min="0"
                        max="255"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Verde</Label>
                      <Input
                        type="number"
                        value={options.green}
                        onChange={(e) => updateOption('green', parseInt(e.target.value) || 100)}
                        min="0"
                        max="255"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Azul</Label>
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