import React from 'react';

import { Badge, BadgeProps } from '@Atoms';

import './BadgeList.scss';

type BadgeListProps = {
  /**
   * Array of Badge data to be displayed as list
   */
  badges: BadgeProps[];
  /**
   * Custom CSS class
   */
  className?: string;
};

export const BadgeList: React.FC<BadgeListProps> = ({ badges, className }) => {
  return (
    <ul className={['BadgeList', className].join(' ')}>
      {badges.map(badge => (
        <li className="BadgeList__item" key={badge.label}>
          <Badge {...badge} />
        </li>
      ))}
    </ul>
  );
};
