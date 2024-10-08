import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

export const useAuthCheck = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const handleAuth = async () => {
      const searchParams = new URLSearchParams(window.location.search);
      const transferData = searchParams.get('transfer');
      const activeWallet = localStorage.getItem('activeWallet');

      if (transferData) {
        console.log('here');
        // Handle transfer link
        const params = new URLSearchParams(transferData);
        const addressTo = params.get('addressTo');
        const amount = params.get('amount');

        if (!addressTo || !amount) {
          toast({
            title: 'Invalid link',
            description: 'The wallet link is invalid.',
            variant: 'destructive',
          });
          setIsLoading(false);
          return;
        }

        localStorage.setItem(
          'transferData',
          JSON.stringify({ addressTo, amount })
        );

        if (activeWallet) {
          // Active wallet exists, go to send page
          navigate('/tontastic-wallet/send', {
            state: { addressTo, amount, wallet: activeWallet },
          });
        } else {
          // No active wallet, go to create wallet page
          navigate('/tontastic-wallet/');
        }
      } else {
        // No transfer link
        if (activeWallet) {
          // Active wallet exists, go to dashboard
          navigate('/dashboard');
        } else {
          // No active wallet, check for any wallets
          const wallets = localStorage.getItem('wallets');
          if (wallets) {
            // Wallets exist but none active, go to dashboard
            navigate('/dashboard');
          } else {
            // No wallets at all, go to create wallet page
            navigate('/tontastic-wallet/');
          }
        }
      }

      setIsLoading(false);
    };

    handleAuth();
  }, [navigate, toast]);

  return { isLoading };
};
