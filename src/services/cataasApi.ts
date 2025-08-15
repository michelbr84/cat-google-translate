const BASE_URL = 'https://cataas.com';

export interface CatOptions {
  tag?: string;
  useGif?: boolean;
  customText?: string;
  enableText?: boolean;
  textColor?: string;
  fontSize?: number;
  imageType?: string;
  filter?: string;
  width?: number;
  height?: number;
  brightness?: number;
  lightness?: number;
  saturation?: number;
  hue?: number;
  red?: number;
  green?: number;
  blue?: number;
}

export class CataasService {
  static buildUrl(options: CatOptions = {}): string {
    let url = BASE_URL;
    
    // Determinar tipo base da URL
    if (options.useGif) {
      url += '/cat/gif';
    } else {
      url += '/cat';
    }
    
    // Adicionar tag se especificada
    if (options.tag && options.tag.trim()) {
      url += `/${encodeURIComponent(options.tag.trim())}`;
    }
    
    // Adicionar texto se habilitado
    if (options.enableText && options.customText && options.customText.trim()) {
      url += `/says/${encodeURIComponent(options.customText.trim())}`;
    }
    
    // Construir query parameters
    const params = new URLSearchParams();
    
    // Tipo de imagem
    if (options.imageType && options.imageType !== 'default') {
      params.append('type', options.imageType);
    }
    
    // Filtros
    if (options.filter && options.filter !== 'none') {
      params.append('filter', options.filter);
      
      if (options.filter === 'custom') {
        // Filtros HSL personalizados
        if (options.brightness !== undefined && options.brightness !== 100) {
          params.append('brightness', options.brightness.toString());
        }
        if (options.lightness !== undefined && options.lightness !== 100) {
          params.append('lightness', options.lightness.toString());
        }
        if (options.saturation !== undefined && options.saturation !== 100) {
          params.append('saturation', options.saturation.toString());
        }
        if (options.hue !== undefined && options.hue !== 0) {
          params.append('hue', options.hue.toString());
        }
        
        // Filtros RGB personalizados
        if (options.red !== undefined && options.red !== 100) {
          params.append('r', options.red.toString());
        }
        if (options.green !== undefined && options.green !== 100) {
          params.append('g', options.green.toString());
        }
        if (options.blue !== undefined && options.blue !== 100) {
          params.append('b', options.blue.toString());
        }
      }
    }
    
    // Dimensões
    if (options.width && options.width > 0) {
      params.append('width', options.width.toString());
    }
    if (options.height && options.height > 0) {
      params.append('height', options.height.toString());
    }
    
    // Opções de texto
    if (options.enableText && options.customText) {
      if (options.fontSize && options.fontSize !== 20) {
        params.append('fontSize', options.fontSize.toString());
      }
      if (options.textColor && options.textColor !== '#ffffff') {
        // Remover # se presente
        const color = options.textColor.replace('#', '');
        params.append('fontColor', color);
      }
    }
    
    // Adicionar parâmetros à URL se existirem
    const queryString = params.toString();
    if (queryString) {
      url += `?${queryString}`;
    }
    
    return url;
  }
  
  static async getCatImage(options: CatOptions = {}): Promise<string> {
    const url = this.buildUrl(options);
    
    // Para garantir que a imagem seja carregada corretamente,
    // retornamos a URL construída que será usada diretamente no src da imagem
    return url;
  }
  
  static async getRandomCat(): Promise<string> {
    return this.getCatImage();
  }
  
  static async getCatWithTag(tag: string): Promise<string> {
    return this.getCatImage({ tag });
  }
  
  static async getCatGif(options: CatOptions = {}): Promise<string> {
    return this.getCatImage({ ...options, useGif: true });
  }
  
  static async getCatWithText(text: string, options: CatOptions = {}): Promise<string> {
    return this.getCatImage({ 
      ...options, 
      enableText: true, 
      customText: text 
    });
  }
  
  // Método para testar se a API está acessível
  static async testConnection(): Promise<boolean> {
    try {
      const response = await fetch(`${BASE_URL}/cat?width=100&height=100`);
      return response.ok;
    } catch {
      return false;
    }
  }
}