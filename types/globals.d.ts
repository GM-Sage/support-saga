// types/globals.d.ts

export {}; // Ensures this file is treated as a module

declare global {
  interface Window {
    /**
     * The dataLayer array is used by Google Tag Manager to receive and manage event data.
     * Each entry in the array represents an event with its associated data.
     */
    dataLayer: Array<DataLayerEvent>;
  }
}

/**
 * Defines the structure of each event object within the dataLayer.
 * - `event`: The name of the event.
 * - `[key: string]: unknown`: Allows for additional properties with unknown types.
 */
interface DataLayerEvent {
  event: string;
  [key: string]: unknown;
}