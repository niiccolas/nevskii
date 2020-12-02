import React from 'react';

import { Avatar } from '@Atoms';

import './AvatarList.scss';

export type AvatarListProps = {
  /**
   * Array of Avatar objects produced by API call
   */
  avatars:
    | {
        src: string | null;
        name: string;
      }[]
    | undefined;
  /**
   * Display as a stack of overlapping images
   */
  stacked?: boolean;
  /**
   * Convert images or placeholders backgrounds to grayscale
   */
  desaturate?: boolean;
  /**
   * Custom CSS styles
   */
  style?: object;
  /**
   * Display tooltip on hover
   */
  customTooltip?: boolean;
  /**
   * How large should the Avatars be?
   */
  size?: 'small' | 'medium' | 'large';
};

export const AvatarList: React.FC<AvatarListProps> = ({
  avatars,
  stacked = true,
  desaturate,
  style,
  customTooltip,
  size,
}) =>
  !avatars || avatars.length === 0 ? null : (
    <ul
      className={['AvatarList', stacked && 'AvatarList--stacked'].join(' ')}
      style={style}
    >
      {avatars.map(avatar => (
        <li
          className={[
            'AvatarList__item',
            stacked && 'AvatarList__item--stacked',
          ].join(' ')}
          key={avatar.name}
        >
          <Avatar
            label={avatar.name}
            imageUrl={avatar.src}
            desaturate={desaturate}
            customTooltip={customTooltip}
            key={avatar.name}
            size={size}
          />
        </li>
      ))}
    </ul>
  );
