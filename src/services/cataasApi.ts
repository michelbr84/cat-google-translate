const BASE_URL = 'https://cataas.com';

// CSS color keywords accepted by many renderers; cataas.com supports named colors (e.g., fontColor=red)
// Source: CSS Color Module Level 4 keywords
const CSS_COLOR_KEYWORDS = new Set<string>([
  'aliceblue','antiquewhite','aqua','aquamarine','azure','beige','bisque','black','blanchedalmond','blue','blueviolet','brown','burlywood','cadetblue','chartreuse','chocolate','coral','cornflowerblue','cornsilk','crimson','cyan','darkblue','darkcyan','darkgoldenrod','darkgray','darkgreen','darkgrey','darkkhaki','darkmagenta','darkolivegreen','darkorange','darkorchid','darkred','darksalmon','darkseagreen','darkslateblue','darkslategray','darkslategrey','darkturquoise','darkviolet','deeppink','deepskyblue','dimgray','dimgrey','dodgerblue','firebrick','floralwhite','forestgreen','fuchsia','gainsboro','ghostwhite','gold','goldenrod','gray','green','greenyellow','grey','honeydew','hotpink','indianred','indigo','ivory','khaki','lavender','lavenderblush','lawngreen','lemonchiffon','lightblue','lightcoral','lightcyan','lightgoldenrodyellow','lightgray','lightgreen','lightgrey','lightpink','lightsalmon','lightseagreen','lightskyblue','lightslategray','lightslategrey','lightsteelblue','lightyellow','lime','limegreen','linen','magenta','maroon','mediumaquamarine','mediumblue','mediumorchid','mediumpurple','mediumseagreen','mediumslateblue','mediumspringgreen','mediumturquoise','mediumvioletred','midnightblue','mintcream','mistyrose','moccasin','navajowhite','navy','oldlace','olive','olivedrab','orange','orangered','orchid','palegoldenrod','palegreen','paleturquoise','palevioletred','papayawhip','peachpuff','peru','pink','plum','powderblue','purple','rebeccapurple','red','rosybrown','royalblue','saddlebrown','salmon','sandybrown','seagreen','seashell','sienna','silver','skyblue','slateblue','slategray','slategrey','snow','springgreen','steelblue','tan','teal','thistle','tomato','turquoise','violet','wheat','white','whitesmoke','yellow','yellowgreen'
]);

// Allowed exact hex colors known to work reliably with CATAAS
const ALLOWED_HEX = new Set<string> ([
  '000000','ffffff','ff0000','00ff00','0000ff','ffff00','ffa500','800080','ffc0cb','808080','00ffff','ff00ff','a52a2a','000080'
]);

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
  html?: boolean;
  json?: boolean;
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

    // Saídas alternativas
    if (options.html) {
      params.append('html', 'true');
    }
    if (options.json) {
      params.append('json', 'true');
    }
    
    // Opções de texto - só adicionar se não tem texto na URL
    if (options.enableText && options.customText && options.fontSize && options.fontSize !== 20) {
      params.append('fontSize', options.fontSize.toString());
    }
    if (options.enableText && options.customText && options.textColor) {
      const raw = options.textColor.trim();
      const rawLower = raw.toLowerCase();
      let colorParam = '';
      if (!rawLower.startsWith('#')) {
        // Se vier sem # (nome), não enviar
        colorParam = '';
      } else {
        // Normalizar HEX (remover # e validar 3/6 dígitos)
        let hex = rawLower.replace('#', '');
        if (/^[0-9a-f]{3}$/.test(hex)) {
          hex = hex
            .split('')
            .map((c) => c + c)
            .join('');
        }
        if (/^[0-9a-f]{6}$/.test(hex)) {
          if (ALLOWED_HEX.has(hex)) {
            colorParam = hex;
          }
        }
      }
      if (colorParam) {
        params.append('fontColor', colorParam);
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

  // Tags
  static async getAllTags(): Promise<string[]> {
    const url = `${BASE_URL}/api/tags`;
    const response = await fetch(url, { headers: { 'accept': 'application/json' } });
    if (!response.ok) {
      return [];
    }
    const data = await response.json();
    if (Array.isArray(data)) {
      return data.map((t) => String(t)).filter(Boolean);
    }
    return [];
  }
}