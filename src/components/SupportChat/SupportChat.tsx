import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './SupportChat.module.scss';
import type { Product } from '@/types/Product';
import { getProductsByQuery, getProducts } from '@/api/products';
import { getImageUrl } from '@/api/products';
import { useToastStore } from '@/store/toast';
import { parseUserMessage } from '@/utils/chatParser';

type Message =
  | {
      type: 'text';
      sender: 'user' | 'bot';
      text: string;
    }
  | {
      type: 'product';
      product: Product;
    };

export const SupportChat = () => {
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const toasts = useToastStore((state) => state.toasts);

  const [chatStep, setChatStep] = useState<
    'idle' | 'askBudget' | 'askMemory' | 'askColor'
  >('idle');

  const [selection, setSelection] = useState<{
    budget?: number;
    capacity?: string;
    color?: string;
  }>({});

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const WELCOME_TEXT =
    'Вітаю 👋 Я AI-консультант магазину. Можу допомогти з iPhone, планшетами та аксесуарами.';

  const typeMessage = (fullText: string) => {
    let index = 0;

    setIsTyping(true);

    setMessages((prev) => [...prev, { type: 'text', sender: 'bot', text: '' }]);

    const interval = setInterval(() => {
      index++;

      setMessages((prev) => {
        const updated = [...prev];
        const lastMessage = updated[updated.length - 1];

        if (lastMessage?.type === 'text' && lastMessage.sender === 'bot') {
          lastMessage.text = fullText.slice(0, index);
        }

        return updated;
      });

      if (index >= fullText.length) {
        clearInterval(interval);
        setIsTyping(false);
      }
    }, 15);
  };

  const handleOpenChat = () => {
    setIsOpen(true);

    if (messages.length === 0) {
      typeMessage(WELCOME_TEXT);
    }
  };

  const handleCloseChat = () => {
    setIsOpen(false);
  };

  const handleSend = async () => {
    if (!inputValue.trim()) return;

    const userMessage = inputValue.trim();
    const lower = userMessage.toLowerCase();

    setMessages((prev) => [
      ...prev,
      { type: 'text', sender: 'user', text: userMessage },
    ]);

    setInputValue('');

    if (chatStep === 'idle') {
      try {
        const foundProducts = await getProductsByQuery(userMessage);

        if (foundProducts.length > 0) {
          setMessages((prev) => [
            ...prev,
            {
              type: 'text',
              sender: 'bot',
              text: `Ось що я знайшов (${foundProducts.length}) 👇`,
            },
            ...foundProducts.slice(0, 6).map((product) => ({
              type: 'product' as const,
              product,
            })),
          ]);

          return;
        }
      } catch (error) {
        console.error(error);
      }
    }

    if (
      chatStep === 'idle' &&
      (lower.includes('порад') ||
        lower.includes('recommend') ||
        lower.includes('мені треба') ||
        lower.includes('need phone'))
    ) {
      setChatStep('askBudget');

      typeMessage('Зараз підберемо найкращий варіант 🔥 Який у вас бюджет?');

      return;
    }

    if (chatStep === 'askBudget') {
      const price = parseInt(lower.replace(/\D/g, ''));

      if (!price) {
        typeMessage('Будь ласка, напишіть бюджет числом 🙂');
        return;
      }

      setSelection((prev) => ({ ...prev, budget: price }));
      setChatStep('askMemory');

      typeMessage('Скільки потрібно памʼяті? (64GB, 128GB, 256GB...)');

      return;
    }

    if (chatStep === 'askMemory') {
      const capacityMatch = lower.match(/\d+/);

      if (!capacityMatch) {
        typeMessage('Напишіть обʼєм памʼяті, наприклад 128 🙂');
        return;
      }

      setSelection((prev) => ({
        ...prev,
        capacity: capacityMatch[0],
      }));

      setChatStep('askColor');

      typeMessage('Який колір вас цікавить?');

      return;
    }

    if (chatStep === 'askColor') {
      const colorMap: Record<string, string> = {
        black: 'black',
        white: 'white',
        blue: 'blue',
        red: 'red',
        green: 'green',
        gold: 'gold',
        silver: 'silver',
        purple: 'purple',
        pink: 'pink',
        yellow: 'yellow',
      };

      const detectedColor =
        Object.keys(colorMap).find((c) => lower.includes(c)) || lower;

      setSelection((prev) => ({
        ...prev,
        color: detectedColor,
      }));

      const allProducts = await getProducts();

      let filtered = allProducts;

      if (selection.budget) {
        filtered = filtered.filter((p) => p.price <= selection.budget!);
      }

      if (selection.capacity) {
        filtered = filtered.filter((p) =>
          p.capacity?.includes(selection.capacity!),
        );
      }

      if (detectedColor) {
        filtered = filtered.filter((p) =>
          p.color?.toLowerCase().includes(detectedColor),
        );
      }

      setChatStep('idle');
      setSelection({});

      if (filtered.length > 0) {
        setMessages((prev) => [
          ...prev,
          {
            type: 'text',
            sender: 'bot',
            text: `Ось найкращі варіанти для вас (${filtered.length}) 👇`,
          },
          ...filtered.slice(0, 6).map((product) => ({
            type: 'product' as const,
            product,
          })),
        ]);
      } else {
        typeMessage(
          'На жаль, нічого не знайшов 😔 Спробуйте трохи збільшити бюджет.',
        );
      }

      return;
    }

    try {
      const allProducts = await getProducts();
      const parsed = parseUserMessage(userMessage);

      let filtered = [...allProducts];

      if (parsed.model) {
        filtered = filtered.filter((p) =>
          p.name.toLowerCase().includes(parsed.model!),
        );
      }

      if (parsed.capacity) {
        filtered = filtered.filter((p) =>
          p.capacity?.includes(parsed.capacity!),
        );
      }

      if (parsed.color) {
        filtered = filtered.filter(
          (p) => p.color?.toLowerCase() === parsed.color,
        );
      }

      if (parsed.maxPrice) {
        filtered = filtered.filter((p) => p.price <= parsed.maxPrice!);
      }

      if (filtered.length > 0) {
        setMessages((prev) => [
          ...prev,
          {
            type: 'text',
            sender: 'bot',
            text: `Ось що я можу запропонувати (${filtered.length}) 👇`,
          },
          ...filtered.slice(0, 6).map((product) => ({
            type: 'product' as const,
            product,
          })),
        ]);
      } else {
        typeMessage(
          'Я не зовсім зрозумів 🤔 Спробуйте написати модель або "порадь телефон".',
        );
      }
    } catch (error) {
      console.error(error);
      typeMessage('Сталася помилка 😔');
    }
  };

  return (
    <>
      <button
        className={styles.floatingButton}
        onClick={handleOpenChat}
        style={{
          opacity: toasts.length > 0 ? 0 : 1,
          pointerEvents: toasts.length > 0 ? 'none' : 'auto',
        }}
      >
        💬
      </button>

      {isOpen && toasts.length === 0 && (
        <div className={styles.chatWindow}>
          <div className={styles.header}>
            <span>Support</span>
            <button
              className={styles.closeButton}
              onClick={handleCloseChat}
            >
              ✕
            </button>
          </div>

          <div className={styles.messages}>
            {messages.map((msg, index) => {
              if (msg.type === 'text') {
                return (
                  <div
                    key={index}
                    className={
                      msg.sender === 'user' ?
                        styles.userMessage
                      : styles.botMessage
                    }
                  >
                    {msg.text}
                  </div>
                );
              }

              if (msg.type === 'product') {
                return (
                  <div
                    key={index}
                    className={styles.productCard}
                    onClick={() =>
                      navigate(`/${msg.product.category}/${msg.product.itemId}`)
                    }
                  >
                    <img
                      src={getImageUrl(msg.product.image)}
                      alt={msg.product.name}
                      className={styles.productImage}
                      loading="lazy"
                    />

                    <div className={styles.productInfo}>
                      <div className={styles.productName}>
                        {msg.product.name}
                      </div>

                      <div className={styles.productPrice}>
                        ${msg.product.price}
                      </div>

                      <button className={styles.viewButton}>
                        Переглянути →
                      </button>
                    </div>
                  </div>
                );
              }

              return null;
            })}

            {isTyping && (
              <div className={styles.botMessage}>
                <div className={styles.typing}>
                  <span />
                  <span />
                  <span />
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          <div className={styles.inputArea}>
            <input
              type="text"
              placeholder="Напишіть повідомлення..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleSend();
              }}
            />

            <button
              className={styles.sendButton}
              onClick={handleSend}
            >
              ➤
            </button>
          </div>
        </div>
      )}
    </>
  );
};
