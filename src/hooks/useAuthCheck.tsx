import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const useAuthCheck = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const checkWalletData = () => {
      const walletData = localStorage.getItem('wallets');
      if (walletData) {
        // Wallet data exists, navigate to dashboard
        navigate('/dashboard');
      } else {
        // No wallet data, navigate to root
        navigate('/');
      }
    };

    checkWalletData();
  }, [navigate]);
};
