import { createContext, useState } from "react";

// Create Context
export const WalletContext = createContext();

// Provider Component
export const WalletProvider = ({ children }) => {
  const [walletBalance, setWalletBalance] = useState(0);

  return (
    <WalletContext.Provider value={{ walletBalance, setWalletBalance }}>
      {children}
    </WalletContext.Provider>
  );
};
