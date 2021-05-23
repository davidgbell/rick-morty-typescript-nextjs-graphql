import React, { useState } from 'react';

type SubmitSearchProps = {
  submitSearch: React.FormEvent<HTMLFormElement>;
  searchInputChange: React.ChangeEvent;
  term: string;
};

export const SearchForm = ({
  submitSearch,
  searchInputChange,
  term,
}: SubmitSearchProps) => {
  return (
    <form role='search' onSubmit={submitSearch}>
      <label htmlFor='search' />
      <input
        type='search'
        placeholder='search'
        aria-label='Search database'
        title='search database'
        required
        value={term || ''}
        onChange={searchInputChange}
      />
      <button type='submit' disabled={term === ''} aria-label='search database'>
        Search
      </button>
    </form>
  );
};
