import { supabase } from '@/utils/supabaseClient';
import { useCart } from '@/hooks/cart';
import { useFavourites } from '@/hooks/favourites';
import type { User } from '@/types/User';

export const syncCartAndFavourites = async (user: User) => {
  if (!user?.id) return;

  const getLocalCart = () => useCart.getState().cart;
  const getLocalFavs = () => useFavourites.getState().favourites;

  const setLocalCart = (cart: { itemId: string; count: number }[]) =>
    useCart.getState().syncWithServer(cart);
  const setLocalFavs = (favs: string[]) =>
    useFavourites.getState().syncWithServer(favs);

  const isPaymentSuccess =
    window.location.search.includes('payment=success') ||
    window.location.hash.includes('payment=success');

  try {
    let serverCart: { item_id: string; count: number }[] | null = null;

    if (!isPaymentSuccess) {
      const { data } = await supabase
        .from('cart_items')
        .select('item_id, count')
        .eq('user_id', user.id);
      serverCart = data;
    }

    const { data: serverFavs } = await supabase
      .from('favorites')
      .select('item_id')
      .eq('user_id', user.id);

    const localCart = getLocalCart();
    const localFavs = getLocalFavs();

    if (!isPaymentSuccess) {
      const mergedCart = new Map<string, { itemId: string; count: number }>();

      serverCart?.forEach((item) => {
        mergedCart.set(item.item_id, {
          itemId: item.item_id,
          count: item.count,
        });
      });

      const itemsToAddToServerCart: {
        user_id: string;
        item_id: string;
        count: number;
      }[] = [];
      localCart.forEach((item) => {
        if (!mergedCart.has(item.itemId)) {
          mergedCart.set(item.itemId, item);
          itemsToAddToServerCart.push({
            user_id: user.id,
            item_id: item.itemId,
            count: item.count,
          });
        }
      });

      if (itemsToAddToServerCart.length > 0) {
        await supabase.from('cart_items').insert(itemsToAddToServerCart);
      }

      setLocalCart(Array.from(mergedCart.values()));
    }

    const mergedFavs = new Set<string>();
    serverFavs?.forEach((item) => mergedFavs.add(item.item_id));

    const favsToAddToServer: { user_id: string; item_id: string }[] = [];
    localFavs.forEach((item) => {
      if (!mergedFavs.has(item)) {
        mergedFavs.add(item);
        favsToAddToServer.push({
          user_id: user.id,
          item_id: item,
        });
      }
    });

    if (favsToAddToServer.length > 0) {
      await supabase.from('favorites').insert(favsToAddToServer);
    }

    setLocalFavs(Array.from(mergedFavs.values()));
  } catch (err) {
    console.error('Failed to sync data with server:', err);
  }
};
