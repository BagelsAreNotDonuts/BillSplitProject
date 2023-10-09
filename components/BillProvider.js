import React, { createContext, useContext, useState } from 'react';

// Create a context with default values
export const BillContext = createContext({
  category: 'All',
  setCategory: () => {},
});

// Create a provider component
export const BillProvider = ({ children }) => {
  const [category, setCategory] = useState('All');

  return (
    <BillContext.Provider value={{ category, setCategory }}>
      {children}
    </BillContext.Provider>
  );
};
