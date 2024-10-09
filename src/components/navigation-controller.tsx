import { useToast } from '@/hooks/use-toast';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export const NavigationController: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const handleAuthAndRouting = async () => {
      const searchParams = new URLSearchParams(window.location.search);
      const transferData = searchParams.get('transfer');
      const activeWallet = localStorage.getItem('activeWallet');
      const wallets = localStorage.getItem('wallets');
      if (transferData) {
        // Handle transfer link
        const params = new URLSearchParams(transferData);
        const addressTo = params.get('addressTo');
        const amount = params.get('amount');
        console.log(addressTo, amount);

        if (!addressTo || !amount) {
          toast({
            title: 'Invalid link',
            description: 'The wallet link is invalid.',
            variant: 'destructive',
          });
          setIsLoading(false);
          // return;
        }

        localStorage.setItem(
          'transferData',
          JSON.stringify({ addressTo, amount })
        );
      }

      const transferDataStorage = localStorage.getItem('transferData');
      if (transferDataStorage) {
        if (activeWallet) {
          const { addressTo, amount } = JSON.parse(transferDataStorage);
          // Active wallet exists, go to send page
          navigate('/tontastic-wallet/send', {
            state: { addressTo, amount, wallet: activeWallet },
          });
        } else {
          // No active wallet, go to create wallet page
          navigate('/tontastic-wallet/');
        }
      } else {
        // No transfer data, check wallet status
        console.log('asd', transferData);
        if (wallets && location.pathname === '/tontastic-wallet/') {
          navigate('/tontastic-wallet/check-pin');
        } else if (activeWallet && location.pathname === '/') {
          navigate('/tontastic-wallet/check-pin');
        } else if (
          !wallets &&
          !location.pathname.startsWith('/tontastic-wallet/')
        ) {
          navigate('/tontastic-wallet/');
        }
      }

      // Check if we're on the dashboard and there's transfer data
      if (location.pathname === '/tontastic-wallet/check-pin') {
        const storedTransferData = localStorage.getItem('transferData');
        if (storedTransferData && activeWallet) {
          const { addressTo, amount } = JSON.parse(storedTransferData);
          navigate('/tontastic-wallet/send', {
            state: { addressTo, amount, wallet: activeWallet },
          });
        }
      }

      setIsLoading(false);
    };

    handleAuthAndRouting();
  }, [navigate, location, toast]);

  if (isLoading) {
    return <div>Loading...</div>; // Or your custom loading component
  }

  return <>{children}</>;
};
