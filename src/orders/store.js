/* The staff order board keeps everything on this one device, in
   localStorage. One device was the brief: the waiter takes orders on it and
   clears them on it, so nothing has to travel between screens.

   An order: { id, no, label, items: [{ n, q }], note, at, status, clearedAt }
   status is 'stored' until the team clears it, then 'cleared'.

   Cleared orders from before today are dropped on load, and the order
   number starts again at 1 each day. */

const KEY = 'yard-orders-v1';

const today = () => new Date().toDateString();

export function load() {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return { day: today(), next: 1, orders: [] };
    const s = JSON.parse(raw);
    if (s.day !== today()) {
      /* new day: stored orders carry over (they were never cleared),
         yesterday's cleared ones go */
      return { day: today(), next: 1, orders: s.orders.filter((o) => o.status === 'stored') };
    }
    return s;
  } catch {
    return { day: today(), next: 1, orders: [] };
  }
}

export function save(state) {
  try {
    localStorage.setItem(KEY, JSON.stringify(state));
  } catch {
    /* private mode or full storage: the board still works for this visit */
  }
}
