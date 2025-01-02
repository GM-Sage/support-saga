// components/Button.tsx

import React from 'react';
import Link from 'next/link';

interface ButtonProps {
  href: string;
  variant?: 'primary' | 'outline' | 'icon';
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ href, variant = 'primary', children }) => {
  // Determine the class based on the variant prop
  let className = '';

  switch (variant) {
    case 'primary':
      className = 'homepage-button';
      break;
    case 'outline':
      className = 'homepage-button-outline';
      break;
    case 'icon':
      className = 'homepage-button-icon';
      break;
    default:
      className = 'homepage-button';
  }

  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
};

export default Button;