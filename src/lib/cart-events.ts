export const CART_DRAWER_OPEN = "layxes:cart-drawer-open";

export function openCartDrawer() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event(CART_DRAWER_OPEN));
  }
}
