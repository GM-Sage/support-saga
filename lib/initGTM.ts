// lib/initGTM.ts

/**
 * Initializes the dataLayer for Google Tag Manager.
 * Ensures that dataLayer is available before any events are pushed.
 */
export const initializeGTM = () => {
    // Initialize dataLayer if it doesn't exist
    window.dataLayer = window.dataLayer || [];
  };
  
  /**
   * Pushes an event to the dataLayer.
   * @param eventName - The name of the event to track.
   * @param eventData - Additional data associated with the event.
   */
  export const pushToDataLayer = (eventName: string, eventData?: Record<string, unknown>) => {
    if (window && window.dataLayer) {
      window.dataLayer.push({
        event: eventName,
        ...eventData,
      });
    } else {
      console.error('dataLayer is not initialized.');
    }
  };
  
  // Initialize dataLayer immediately when this module is imported
  initializeGTM();