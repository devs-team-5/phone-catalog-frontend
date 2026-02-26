export type ParsedQuery = {
  model?: string;
  color?: string;
  capacity?: string;
  maxPrice?: number;
  minPrice?: number;
  sort?: 'asc' | 'desc';
  recommend?: boolean;
};

export const parseUserMessage = (message: string): ParsedQuery => {
  const text = message.toLowerCase().trim();
  const result: ParsedQuery = {};

  const modelMatch = text.match(/iphone\s?\d+\s?(pro|max|plus)?/i);

  if (modelMatch) {
    result.model = modelMatch[0].trim();
  }

  const capacityMatch = text.match(/(64|128|256|512|1024)\s?(gb|гб)?/i);

  if (capacityMatch) {
    result.capacity = capacityMatch[1];
  }

  const maxPriceMatch = text.match(/до\s?(\d+)/) || text.match(/under\s?(\d+)/);

  if (maxPriceMatch) {
    result.maxPrice = Number(maxPriceMatch[1]);
  }

  const minPriceMatch = text.match(/від\s?(\d+)/) || text.match(/from\s?(\d+)/);

  if (minPriceMatch) {
    result.minPrice = Number(minPriceMatch[1]);
  }

  const colorMap: Record<string, string> = {
    білий: 'white',
    белый: 'white',
    white: 'white',

    чорний: 'black',
    черный: 'black',
    black: 'black',

    синій: 'blue',
    blue: 'blue',

    червоний: 'red',
    red: 'red',

    зелений: 'green',
    green: 'green',

    фіолет: 'purple',
    purple: 'purple',
    lavender: 'purple',

    золотий: 'gold',
    gold: 'gold',

    сірий: 'gray',
    gray: 'gray',
    grey: 'gray',

    рожевий: 'pink',
    pink: 'pink',

    sage: 'sage',
  };

  Object.keys(colorMap).forEach((key) => {
    if (text.includes(key)) {
      result.color = colorMap[key];
    }
  });

  if (
    text.includes('дешев') ||
    text.includes('cheap') ||
    text.includes('cheapest')
  ) {
    result.sort = 'asc';
  }

  if (
    text.includes('дорог') ||
    text.includes('expensive') ||
    text.includes('premium')
  ) {
    result.sort = 'desc';
  }

  if (
    text.includes('порад') ||
    text.includes('рекоменду') ||
    text.includes('recommend') ||
    text.includes('help me choose')
  ) {
    result.recommend = true;
  }

  return result;
};
