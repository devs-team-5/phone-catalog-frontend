import { create } from 'zustand';
import { supabase } from '@/utils/supabaseClient';
import type { User } from '@/types/User';
import type { Session } from '@supabase/supabase-js';

type AuthState = {
  isLoggedIn: boolean;
  user: User | null;
  session: Session | null;
  isInitialized: boolean;
  setUser: (user: User | null) => void;
  setSession: (session: Session | null) => void;
  setInitialized: (isInitialized: boolean) => void;
  logout: () => Promise<void>;
};

export const useAuth = create<AuthState>((set) => ({
  isLoggedIn: false,
  user: null,
  session: null,
  isInitialized: false,
  setUser: (user) => set({ user, isLoggedIn: !!user }),
  setSession: (session) => set({ session }),
  setInitialized: (isInitialized) => set({ isInitialized }),
  logout: async () => {
    await supabase.auth.signOut();
    set({ user: null, session: null, isLoggedIn: false });
  },
}));

// Initialize auth state
let isFirstSyncDone = false;

supabase.auth.getSession().then(({ data: { session } }) => {
  useAuth.getState().setSession(session);
  useAuth.getState().setUser(session?.user as User | null);
  useAuth.getState().setInitialized(true);

  if (session?.user && !isFirstSyncDone) {
    import('@/api/sync').then(({ syncCartAndFavourites }) => {
      syncCartAndFavourites(session.user as User);
      isFirstSyncDone = true;
    });
  }
});

supabase.auth.onAuthStateChange(async (_event, session) => {
  useAuth.getState().setSession(session);
  useAuth.getState().setUser(session?.user as User | null);

  if (session?.user && _event === 'SIGNED_IN') {
    const { syncCartAndFavourites } = await import('@/api/sync');
    syncCartAndFavourites(session.user as User);
    isFirstSyncDone = true;
  }
});
