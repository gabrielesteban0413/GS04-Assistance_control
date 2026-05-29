import { UserSessionEntity } from '@/services/auth.service';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

type SessionStore = {
    session: UserSessionEntity | null;
    setSession: (session: UserSessionEntity) => void;
    clearSession: () => void;
};

export const useSession = create(
    persist<SessionStore>(
        (set) => ({
            session: null,
            setSession(session) {
                set({ session });
            },
            clearSession() {
                set({ session: null });
            },
        }),
        {
            name: 'session-app',
            storage: createJSONStorage(() => localStorage),
        },
    ),
);
