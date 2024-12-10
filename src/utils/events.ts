import type { CustomEvents, ProductsSelectedEvent } from '@/types/events';
export function createCustomEvent<K extends keyof CustomEvents>(
  eventName: K,
  detail: CustomEvents[K]
): CustomEvent<CustomEvents[K]> {
  return new CustomEvent(eventName, {
    detail,
    bubbles: true,
    composed: true
  });
}

export function dispatchProductsSelected(selectedIds: string[]): void {
  const event = createCustomEvent('productsSelected', selectedIds);
  window.dispatchEvent(event);
}

export function addProductsSelectedListener(
  handler: (selectedIds: string[]) => void
): () => void {
  const wrappedHandler = ((event: ProductsSelectedEvent) => {
    handler(event.detail);
  }) as EventListener;

  window.addEventListener('productsSelected', wrappedHandler);
  return () => window.removeEventListener('productsSelected', wrappedHandler);
}