import React, { useState } from 'react';

import './Input.scss';

export interface InputProps {
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
   * Input contents
   */
  placeHolder?: string;
  /**
   * Optional click handler
   */
  onClick?: () => React.FormHTMLAttributes<any>;
  onChange?: (e: React.FormEvent<HTMLInputElement>) => void;
  class?: string;
  value?: string;
}

/**
 * Primary UI component for user interaction
 */
export const Input: React.FC<InputProps> = ({
  primary = false,
  size = 'medium',
  backgroundColor,
  placeHolder = 'Enter search…',
  value = '',
  ...props
}) => {
  // const [input, setInput] = useState('');

  // const handleChange = e => setInput(e.target.value);

  const mode = primary ? 'Input--primary' : 'Input--secondary';
  return (
    <input
      type="search"
      name="Input"
      value={value}
      placeholder={placeHolder}
      className={['Input', `Input--${size}`, mode].join(' ')}
      onChange={props.onChange}
    />
  );
};
