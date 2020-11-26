import React from 'react';
import Link from 'next/link';
import { ConditonalWrapper } from '@utils';
import color from 'color';

import './Badge.scss';

export interface BadgeProps {
  /**
   * Is this badge more than an isolated visual accent
   */
  primary?: boolean;
  /**
   * What background color to use
   */
  backgroundColor?: string;
  /**
   * How large should the badge be?
   */
  size?: 'small' | 'medium' | 'large';
  /**
   * Badge contents
   */
  label: string;
  /**
   * Optional click handler
   */
  onClick?: () => void;
  /**
   * Custom CSS class
   */
  class?: string;
  /**
   * Make badge capsule shaped (more rounded corners)
   */
  capsule?: boolean;
  /**
   * Make badge an actionnable URL link
   */
  link?: string;
  /**
   * Use Next.js prefetch feature on Linked Badges
   */
  prefetch?: boolean;
}

export const Badge: React.FC<BadgeProps> = ({
  primary = true,
  size = 'medium',
  backgroundColor = '#1ea',
  label,
  capsule,
  link,
  prefetch = true,
  ...props
}) => {
  const mode = primary ? 'Badge--primary' : 'Badge--secondary';

  /**
   * Dynamic & WCAG compliant font/background colors
   */
  const textColor = color(backgroundColor).isLight() ? '#000' : '#fff';

  return (
    <ConditonalWrapper
      condition={link !== undefined}
      wrapper={children => (
        <Link href={link || '#'} prefetch={prefetch}>
          {children}
        </Link>
      )}
    >
      <aside
        className={[
          'Badge',
          `Badge--${size}`,
          mode,
          capsule && 'Badge--capsule',
          link && 'Badge--linked',
        ].join(' ')}
        style={{
          backgroundColor,
          color: primary
            ? textColor
            : backgroundColor /* stylelint-disable-line value-keyword-case */,
        }}
        {...props}
      >
        <span className="">{label}</span>
      </aside>
    </ConditonalWrapper>
  );
};
