import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './SupportChat.module.scss';
import type { Product } from '@/types/Product';
import { getProductsByQuery, getProducts } from '@/api/products';
import { getImageUrl } from '@/api/products';
import { useToastStore } from '@/store/toast';

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
    }, 20);
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
    const normalizedMessage = userMessage.toLowerCase();

    setMessages((prev) => [
      ...prev,
      { type: 'text', sender: 'user', text: userMessage },
    ]);

    setInputValue('');
    setIsTyping(true);

    try {
      const foundProducts = await getProductsByQuery(userMessage);

      if (foundProducts.length > 0) {
        setIsTyping(false);

        setMessages((prev) => [
          ...prev,
          {
            type: 'text',
            sender: 'bot',
            text: `Ось що я знайшов (${foundProducts.length}) 👇`,
          },
          ...foundProducts.map((product) => ({
            type: 'product' as const,
            product,
          })),
        ]);

        return;
      }

      const allProducts = await getProducts();
      let filtered = [...allProducts];

      const modelMatch = normalizedMessage.match(/iphone\s?\d+/);
      if (modelMatch) {
        filtered = filtered.filter((product) =>
          product.name.toLowerCase().includes(modelMatch[0]),
        );
      }

      const colors = ['black', 'white', 'lavender', 'sage'];
      const foundColor = colors.find((color) =>
        normalizedMessage.includes(color),
      );

      if (foundColor) {
        filtered = filtered.filter(
          (product) => product.color.toLowerCase() === foundColor,
        );
      }

      if (normalizedMessage.includes('білий')) {
        filtered = filtered.filter((p) => p.color === 'white');
      }

      if (normalizedMessage.includes('чорний')) {
        filtered = filtered.filter((p) => p.color === 'black');
      }

      if (normalizedMessage.includes('фіолет')) {
        filtered = filtered.filter((p) => p.color === 'lavender');
      }

      if (
        normalizedMessage.includes('порадь') ||
        normalizedMessage.includes('щось')
      ) {
        filtered = [...allProducts]
          .sort((a, b) => b.price - a.price)
          .slice(0, 4);
      }

      if (normalizedMessage.includes('дешев')) {
        filtered = [...filtered].sort((a, b) => a.price - b.price);
      }

      if (normalizedMessage.includes('дорог')) {
        filtered = [...filtered].sort((a, b) => b.price - a.price);
      }

      setIsTyping(false);

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
          'На жаль, я нічого не знайшов 😔 Спробуйте уточнити модель або колір.',
        );
      }
    } catch (error) {
      console.error(error);
      setIsTyping(false);
      typeMessage('Сталася помилка при пошуку 😔');
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
              placeholder="Enter your message..."
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
