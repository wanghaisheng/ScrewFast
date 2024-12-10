// Define base custom event types
export interface CustomEvents {
  productsSelected: string[];
  // Add other custom events here
}

// Create type for specific custom events
export type ProductsSelectedEvent = CustomEvent<CustomEvents['productsSelected']>;

// Extend global WindowEventMap
declare global {
  interface WindowEventMap {
    productsSelected: ProductsSelectedEvent;
  }
}