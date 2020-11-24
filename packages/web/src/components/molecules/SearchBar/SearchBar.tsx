import React, { useState } from 'react';
import { useRouter } from 'next/router';

import { Input, Button } from '@Atoms';

import './SearchBar.scss';

export interface SearchBarProps {
  primary?: boolean;
  size?: 'small' | 'medium' | 'large';
  active: boolean;
  searchLabel: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  primary = true,
  size = 'medium',
  active = false,
  searchLabel = 'Search',
}) => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push('?title=' + searchQuery);
  };

  const handleChange = (e: React.FormEvent<HTMLInputElement>) =>
    setSearchQuery(e.currentTarget.value);

  return active ? (
    <form className="SearchBar" action="/" onSubmit={handleSubmit}>
      <Input
        primary={primary}
        size={size}
        value={searchQuery}
        onChange={handleChange}
      />
      <Button primary={primary} label={searchLabel} size={size} type="submit" />
    </form>
  ) : null;
};
