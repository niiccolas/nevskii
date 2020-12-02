import React from 'react';

import { Badge, BadgeProps } from '@Atoms';

import './BadgeList.scss';

type BadgeListProps = {
  badges: BadgeProps[];
};

export const BadgeList: React.FC<BadgeListProps> = ({ badges }) => {
  return (
    <ul className="BadgeList">
      {badges.map(badge => (
        <li className="BadgeList__item" key={badge.label}>
          <Badge {...badge} />
        </li>
      ))}
    </ul>
  );
};
