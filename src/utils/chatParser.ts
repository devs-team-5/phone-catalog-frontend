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
  const text = message.toLowerCase();
  const result: ParsedQuery = {};

  const modelMatch = text.match(/iphone\s?\d+/);
  if (modelMatch) {
    result.model = modelMatch[0];
  }

  const capacityMatch = text.match(/(128|256|512|1024)\s?gb/);
  if (capacityMatch) {
    result.capacity = capacityMatch[1];
  }

  if (text.includes('білий') || text.includes('white')) result.color = 'white';

  if (text.includes('чорний') || text.includes('black')) result.color = 'black';

  if (text.includes('фіолет') || text.includes('lavender'))
    result.color = 'lavender';

  if (text.includes('sage')) result.color = 'sage';

  const maxPriceMatch = text.match(/до\s?(\d+)/);
  if (maxPriceMatch) {
    result.maxPrice = Number(maxPriceMatch[1]);
  }

  if (text.includes('дешев')) result.sort = 'asc';

  if (text.includes('дорог')) result.sort = 'desc';

  if (text.includes('порадь') || text.includes('щось')) result.recommend = true;

  return result;
};
