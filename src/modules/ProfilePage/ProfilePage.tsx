import { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/auth';
import { useNavigate } from 'react-router-dom';
import { getUserOrders } from '@/api/orders';
import { Typography } from '@/components/ui/Typography/Typography';
import type { Order } from '@/types/Order';
import styles from './ProfilePage.module.scss';
import { useTranslation } from 'react-i18next';

export const ProfilePage = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  const { t } = useTranslation<'translation'>();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  useEffect(() => {
    let isMounted = true;

    const fetchOrders = async () => {
      if (!user?.id) {
        if (isMounted) setLoading(false);
        return;
      }

      try {
        const data = await getUserOrders(user.id);
        if (isMounted) {
          setOrders(data || []);
          setLoading(false);
        }
      } catch (err) {
        console.error('Failed to load orders', err);
        if (isMounted) setLoading(false);
      }
    };

    fetchOrders();
    return () => {
      isMounted = false;
    };
  }, [user]);

  if (!user) return null;

  return (
    <div className={styles.container}>
      <div className={styles.profileHeader}>
        <div className={styles.avatar}>
          {user.user_metadata?.avatar_url ?
            <img
              src={user.user_metadata.avatar_url}
              alt="User Avatar"
            />
          : <div className={styles.avatarPlaceholder}>
              {user.email?.charAt(0).toUpperCase()}
            </div>
          }
        </div>
        <div className={styles.userInfo}>
          <Typography variant="h2">
            {user.user_metadata?.full_name || 'User'}
          </Typography>
          <Typography
            variant="small"
            color="secondary"
          >
            {user.email || ''}
          </Typography>
        </div>
        <button
          className={styles.logoutButton}
          onClick={handleLogout}
        >
          {t('profile.logout')}
        </button>
      </div>

      <div className={styles.ordersSection}>
        <Typography
          variant="h2"
          className={styles.ordersTitle}
        >
          {t('profile.orderHistory')}
        </Typography>

        {loading ?
          <Typography variant="small">{t('profile.loadingOrders')}</Typography>
        : orders.length === 0 ?
          <Typography
            variant="small"
            color="secondary"
          >
            {t('profile.noOrders')}
          </Typography>
        : <div className={styles.ordersList}>
            {orders.map((order) => (
              <div
                key={order.id}
                className={styles.orderCard}
              >
                <div className={styles.orderHeader}>
                  <Typography
                    variant="small"
                    className={styles.orderId}
                  >
                    {t('profile.order')} #{order.id.slice(0, 8)}
                  </Typography>
                  <Typography
                    variant="small"
                    color="secondary"
                  >
                    {new Date(order.created_at).toLocaleDateString()}
                  </Typography>
                </div>
                <div className={styles.orderDetails}>
                  <div className={styles.orderInfoLeft}>
                    <Typography variant="small">
                      {t('profile.status')}: {order.status}
                    </Typography>
                    <Typography variant="small">
                      {t('profile.total')}: {order.total_amount}{' '}
                      {order.currency}
                    </Typography>
                  </div>
                  {(order.delivery_city || order.delivery_branch) && (
                    <div className={styles.orderDelivery}>
                      <Typography
                        variant="small"
                        color="secondary"
                      >
                        {t('profile.deliveryAddress')}
                      </Typography>
                      <Typography variant="small">
                        {order.delivery_city}, {order.delivery_branch}
                      </Typography>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        }
      </div>
    </div>
  );
};
