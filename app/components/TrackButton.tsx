// app/components/TrackButton.tsx

import React from 'react';
import { pushToDataLayer } from '../../lib/initGTM'; // Adjust the import path as necessary
import styles from './TrackButton.module.css'; // Import CSS module for styling

interface TrackButtonProps {
  /**
   * The text displayed on the button.
   */
  label: string;

  /**
   * The name of the event to push to dataLayer when the button is clicked.
   */
  eventName: string;

  /**
   * Additional data to include with the event.
   */
  eventData?: Record<string, unknown>;

  /**
   * Optional click handler for additional functionality.
   */
  onClick?: () => void;
}

/**
 * A button component that tracks clicks by pushing events to Google Tag Manager's dataLayer.
 */
const TrackButton: React.FC<TrackButtonProps> = ({ label, eventName, eventData, onClick }) => {
  /**
   * Handles the button click event.
   * Pushes the specified event to the dataLayer and executes any additional click handlers.
   */
  const handleClick = () => {
    // Push the event to dataLayer
    pushToDataLayer(eventName, eventData);

    // Execute additional click handler if provided
    if (onClick) {
      onClick();
    }
  };

  return (
    <button onClick={handleClick} className={styles.trackButton}>
      {label}
    </button>
  );
};

export default TrackButton;