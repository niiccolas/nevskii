import React from 'react';
import Link from 'next/link';

import './Logo.scss';

export interface LogoProps {
  onClick?: () => void;
  class?: string;
  prefetch: boolean;
  logo: string;
  logoMobile: string;
}

export const Logo: React.FC<LogoProps> = ({
  prefetch = false,
  logo,
  logoMobile,
}) => {
  return (
    <Link href="/" prefetch={prefetch}>
      <div className="Logo">
        <span className="Logo--tablet">{logo}</span>
        <span className="Logo--mobile">{logoMobile}</span>
      </div>
    </Link>
  );
};
