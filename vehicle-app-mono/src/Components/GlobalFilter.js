import React from 'react';

export const GlobalFilter = ({ filter, setFilter }) => {
  return (
    <div className='m-4'>
      <div>Search: </div>
      <input value={filter || ''} onChange={(e) => setFilter(e.target.value)} />
    </div>
  );
};
