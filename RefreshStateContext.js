import React, { createContext, useContext, useState, useCallback } from 'react';

const RefreshStateContext = createContext();

export function RefreshStateProvider({ children }) {
  const [refreshState, setRefreshState] = useState(false);

  // Function to toggle the refreshState
  const toggleRefresh = useCallback(() => {
    setRefreshState((prevState) => !prevState);
  }, []);

  return (
    <RefreshStateContext.Provider value={{ refreshState, toggleRefresh }}>
      {children}
    </RefreshStateContext.Provider>
  );
}

export function useRefreshState() {
  return useContext(RefreshStateContext);
}