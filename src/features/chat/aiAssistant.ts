type Category = 'iphone' | 'tablet' | 'accessory' | null;

let lastCategory: Category = null;
let lastModel: string | null = null;

export const generateAIReply = (message: string): string => {
  const lower = message.toLowerCase().trim();

  if (lower.includes('iphone')) {
    lastCategory = 'iphone';
    return '👍 Яка саме модель iPhone вас цікавить? (наприклад: 15, 17 Pro Max)';
  }

  if (lower.includes('ipad') || lower.includes('планшет')) {
    lastCategory = 'tablet';
    return '📱 Яку модель планшета ви шукаєте?';
  }

  if (
    lower.includes('аксесуар') ||
    lower.includes('case') ||
    lower.includes('чохол')
  ) {
    lastCategory = 'accessory';
    return '🎧 Для якого пристрою потрібен аксесуар?';
  }

  const modelMatch = lower.match(/(\d{2})(\s?pro)?(\s?max)?/);

  if (modelMatch && (lastCategory === 'iphone' || lower.includes('pro'))) {
    const number = modelMatch[1];
    const pro = modelMatch[2] ? ' Pro' : '';
    const max = modelMatch[3] ? ' Max' : '';

    const fullModel = `iPhone ${number}${pro}${max}`;

    lastCategory = 'iphone';
    lastModel = fullModel;

    return `🔥 ${fullModel} — чудовий вибір! Хочете дізнатись ціну чи характеристики?`;
  }

  if (lower.includes('ціна') || lower.includes('price')) {
    if (lastModel) {
      return `💰 ${lastModel} доступний у кількох конфігураціях памʼяті. Сказати приблизну ціну?`;
    }

    if (lastCategory === 'iphone') {
      return 'Напишіть модель iPhone, і я підкажу ціну.';
    }
  }

  if (lower.includes('характеристики') || lower.includes('spec')) {
    if (lastModel) {
      return `⚡ ${lastModel} має потужний процесор, сучасну камеру та відмінну автономність. Хочете більше деталей?`;
    }

    return 'Напишіть модель пристрою, і я покажу характеристики.';
  }

  if (
    lower.includes('hello') ||
    lower.includes('hi') ||
    lower.includes('привіт')
  ) {
    return 'Вітаю 👋 Чим можу допомогти сьогодні?';
  }

  return 'Можете уточнити модель або категорію пристрою? 🙂';
};
