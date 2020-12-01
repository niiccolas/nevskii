import React from 'react';
import Link from 'next/link';
import { ConditonalWrapper, formatInitials } from '@utils';
import color from 'color';
import randomcolor from 'randomcolor';

import './Avatar.scss';

export interface AvatarProps {
  /**
   * How large should the Avatar be?
   */
  size?: 'small' | 'medium' | 'large';
  /**
   * Custom CSS class
   */
  className?: string;
  /**
   * Make Avatar an actionnable URL link
   */
  link?: string;
  /**
   * Use Next.js prefetch feature on Linked Avatars
   */
  prefetch?: boolean;
  /**
   * URL of avatar image
   */
  imageUrl?: string | null;
  /**
   * Convert images or placeholders backgrounds to grayscale
   */
  desaturate?: boolean;
  /**
   * What background color to use when no image is provided. Default value uses a color randomization package!
   */
  backgroundColor?: string;
  /**
   * When image is provided, used for Avatar alt description & title. Otherwise, transformed into initials display as an image fallback, and on hover, inside a custom tooltip.
   */
  label: string;
  /**
   * Display tooltip on hover
   */
  customTooltip?: boolean;
}

// const randomColor = randomcolor();

export const Avatar: React.FC<AvatarProps> = ({
  size = 'medium',
  className,
  customTooltip = true,
  desaturate,
  label,
  link,
  prefetch = true,
  imageUrl,
  backgroundColor,
}) => {
  /**
   * Dynamic & WCAG compliant font/background colors
   */
  if (!backgroundColor)
    backgroundColor = randomcolor({
      ...(desaturate && { hue: 'monochrome' }),
    });
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
      <div
        className={[
          'Avatar',
          `Avatar--${size}`,
          link && 'Avatar--linked',
          className,
        ].join(' ')}
        style={{
          ...(imageUrl
            ? {
                backgroundImage: `url(${imageUrl})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }
            : { backgroundColor }),
          ...(desaturate && { filter: 'saturate(0)' }),
        }}
      >
        {customTooltip && (
          <span className="Avatar__label--tooltip">{label}</span>
        )}
        {!imageUrl && (
          <span
            className="Avatar__label"
            style={{
              color: textColor /* stylelint-disable-line value-keyword-case */,
            }}
          >
            {formatInitials(label)}
          </span>
        )}
      </div>
    </ConditonalWrapper>
  );
};
