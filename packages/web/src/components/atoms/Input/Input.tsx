import React from 'react';

import './Input.scss';

export interface InputProps {
  primary?: boolean;
  size?: 'small' | 'medium' | 'large';
  placeHolder?: string;
  onChange?: (e: React.FormEvent<HTMLInputElement>) => void;
  class?: string;
  value?: string;
}

export const Input: React.FC<InputProps> = ({
  primary = false,
  size = 'medium',
  placeHolder = 'Enter search…',
  value = '',
  ...props
}) => {
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
