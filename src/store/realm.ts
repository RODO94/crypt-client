import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { type Realm } from '../copy/button.copy';

// The CSS class applied to <html> for each realm.
// No class is added for 'base' — _theme-base.scss covers :root.
const REALM_CLASSES: Record<Realm, string | null> = {
  base:    null,
  fantasy: 'theme-fantasy',
  fortyk:  'theme-fortyk',
};

interface RealmState {
  realm: Realm;
  setRealm: (realm: Realm) => void;
}

function applyRealmClass(realm: Realm) {
  const html = document.documentElement;
  // Remove any existing realm classes before applying the new one
  Object.values(REALM_CLASSES).forEach((cls) => {
    if (cls) html.classList.remove(cls);
  });
  const newClass = REALM_CLASSES[realm];
  if (newClass) {
    html.classList.add(newClass);
  }
}

export const useRealmStore = create<RealmState>()(
  persist(
    (set) => ({
      realm: 'base',

      setRealm: (realm) => {
        applyRealmClass(realm);
        set({ realm });
      },
    }),
    {
      name: 'realm-storage',
      storage: createJSONStorage(() => localStorage),
      // Re-apply the class on store rehydration so the theme
      // is restored correctly on page load.
      onRehydrateStorage: () => (state) => {
        if (state) {
          applyRealmClass(state.realm);
        }
      },
    }
  )
);
