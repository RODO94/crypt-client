// ─────────────────────────────────────────────
// Button Copy
//
// Central source of truth for all button labels.
// Three realm keys: base (current neutral), fantasy (1a Tome of War),
// fortyk (2a Imperial Gothic).
//
// Usage:
//   const { getCopy } = useRealmCopy();
//   <button>{getCopy('battle.create')}</button>
// ─────────────────────────────────────────────

export type Realm = 'base' | 'fantasy' | 'fortyk';

export type ButtonCopyKey =
  // ── Battle ──────────────────────────────────
  | 'battle.create'
  | 'battle.submit'
  | 'battle.resubmit'
  | 'battle.editCombatants'
  | 'battle.finishEditing'
  | 'battle.remove'
  | 'battle.delete'
  | 'battle.confirmDelete'
  | 'battle.cancel'
  // ── Army ─────────────────────────────────────
  | 'army.add'
  | 'army.edit'
  | 'army.finishEdit'
  | 'army.updateName'
  | 'army.updateUser'
  | 'army.updateType'
  | 'army.updateEmblem'
  | 'army.success'
  // ── Auth ─────────────────────────────────────
  | 'auth.login'
  | 'auth.signup'
  | 'auth.forgotPassword'
  // ── Home / Dashboard ─────────────────────────
  | 'home.logIn'
  | 'home.signUp'
  | 'home.addArmy'
  | 'home.createBattle';

type BaseButtonCopy = Record<ButtonCopyKey, string>;
type RealmButtonCopy = Partial<Record<ButtonCopyKey, string>>;

interface ButtonCopyMap {
  base: BaseButtonCopy;
  fantasy: RealmButtonCopy;
  fortyk: RealmButtonCopy;
}

export const buttonCopy: ButtonCopyMap = {
  // ── Base (current neutral copy) ──────────────
  base: {
    'battle.create': 'Create Battle',
    'battle.submit': 'Submit',
    'battle.resubmit': 'Re-Submit',
    'battle.editCombatants': 'Edit Combatants',
    'battle.finishEditing': 'Finish editing',
    'battle.remove': 'Remove',
    'battle.delete': 'Delete battle',
    'battle.confirmDelete': 'Click to confirm',
    'battle.cancel': 'Cancel',

    'army.add': 'Add Army',
    'army.edit': 'Edit Army',
    'army.finishEdit': 'Finish Edit',
    'army.updateName': 'Update Name',
    'army.updateUser': 'Update User',
    'army.updateType': 'Update Type',
    'army.updateEmblem': 'Update Emblem',
    'army.success': 'Success!',

    'auth.login': 'Login',
    'auth.signup': 'Sign Up',
    'auth.forgotPassword': 'Forgot Password',

    'home.logIn': 'Log In',
    'home.signUp': 'Sign Up',
    'home.addArmy': 'Add Army',
    'home.createBattle': 'Create Battle',
  },

  // ── Fantasy — 1a Tome of War ─────────────────
  // Auth copy intentionally omitted (stays neutral in all realms).
  fantasy: {
    'battle.create': '⚔ Raise a Battle',
    'battle.submit': 'Seal the Verdict',
    'battle.resubmit': 'Amend the Record',
    'battle.delete': 'Strike from Record',
    'battle.confirmDelete': 'Confirm',

    'army.add': 'Muster a Host',
    'army.edit': 'Edit Host',
    'army.finishEdit': 'Finish Edit',

    'home.addArmy': 'Muster a Host',
    'home.createBattle': '⚔ Raise a Battle',
  },

  // ── 40,000 — 2a Imperial Gothic ──────────────
  // Auth copy intentionally omitted (stays neutral in all realms).
  fortyk: {
    'battle.create': '☠ Declare War',
    'battle.submit': 'Commit to Archive',
    'battle.resubmit': 'Amend Dataslate',
    'battle.delete': 'Withdraw Battle',
    'battle.confirmDelete': 'Confirm',

    'army.add': 'Deploy a Force',
    'army.edit': 'Edit Force',
    'army.finishEdit': 'Finish Edit',

    'home.addArmy': 'Deploy a Force',
    'home.createBattle': '☠ Launch a Battle',
  },
};
