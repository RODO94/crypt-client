import { useRealmStore } from '../store/realm';
import { buttonCopy, type ButtonCopyKey } from './button.copy';

/**
 * Returns a `getCopy` function that resolves button labels for the
 * current realm. If the realm does not define a specific override for
 * the requested key, it falls back to the `base` copy.
 *
 * @example
 * const { getCopy } = useRealmCopy();
 * <button>{getCopy('battle.create')}</button>
 */
export function useRealmCopy() {
  const realm = useRealmStore((s) => s.realm);

  function getCopy(key: ButtonCopyKey): string {
    const realmOverride = buttonCopy[realm]?.[key];
    return realmOverride ?? buttonCopy.base[key];
  }

  return { getCopy, realm };
}
