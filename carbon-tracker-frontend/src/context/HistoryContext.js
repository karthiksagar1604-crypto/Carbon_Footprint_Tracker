import { createContext, useContext, useState } from 'react';

const HistoryContext = createContext();

export const useHistoryRefresh = () => {
  const context = useContext(HistoryContext);
  if (!context) throw new Error('useHistoryRefresh must be used within a HistoryProvider');
  return context.refresh; // assuming you provide a refresh function in the context
};

export const HistoryProvider = ({ children }) => {
  const [refresh, setRefresh] = useState(false);

  const toggleRefresh = () => setRefresh(prev => !prev);

  return (
    <HistoryContext.Provider value={{ refresh, toggleRefresh }}>
      {children}
    </HistoryContext.Provider>
  );
};

export default HistoryContext;
