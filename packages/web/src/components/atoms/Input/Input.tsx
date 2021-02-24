import React from 'react';

import './Input.scss';

export interface InputProps {
  primary?: boolean;
  required?: boolean;
  type?: string;
  name?: string;
  size?: 'small' | 'medium' | 'large';
  placeHolder?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  class?: string;
  value?: string;
  pattern?: string;
  title?: string;
}

export const Input: React.FC<InputProps> = ({
  name,
  type = 'search',
  primary = false,
  size = 'medium',
  placeHolder = '',
  value = '',
  required = false,
  pattern,
  title,
  ...props
}) => {
  const mode = primary ? 'Input--primary' : 'Input--secondary';
  return (
    <input
      type={type}
      name={name}
      value={value}
      placeholder={placeHolder}
      className={['Input', `Input--${size}`, mode].join(' ')}
      onChange={props.onChange}
      required={required}
      pattern={pattern}
      title={title}
    />
  );
};
