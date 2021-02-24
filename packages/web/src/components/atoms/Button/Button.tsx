import React from 'react';

import './Button.scss';

export interface ButtonProps {
  /**
   * Is this the principal call to action on the page?
   */
  primary?: boolean;
  /**
   * What background color to use
   */
  backgroundColor?: string;
  /**
   * How large should the button be?
   */
  size?: 'small' | 'medium' | 'large';
  /**
   * Button contents
   */
  label?: string;
  /**
   * Optional click handler
   */
  onClick?: (e: React.MouseEvent<HTMLElement>) => any;
  className?: string;
  type: 'button' | 'submit';
}

/**
 * Primary UI component for user interaction
 */
export const Button: React.FC<ButtonProps> = ({
  children,
  primary = false,
  size = 'medium',
  type = 'button',
  backgroundColor,
  className = '',
  label,
  ...props
}) => {
  const mode = primary ? 'Button--primary' : 'Button--secondary';
  return (
    <button
      type={type}
      className={['Button', `Button--${size}`, mode, className].join(' ')}
      style={{ backgroundColor }}
      {...props}
    >
      {label}
      {children}
    </button>
  );
};
