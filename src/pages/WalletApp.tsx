import { WalletHeader } from '@/components/wallet-app/WalletHeader';
import { ActionButtons } from '@/components/wallet-app/ActionButtons';
import { FavouritesSection } from '@/components/wallet-app/CoinProps';
import { CoinsList } from '@/components/wallet-app/CoinsList';
import { BottomNavigation } from '@/components/wallet-app/BottomNavigation';
export const WalletApp = () => {
  return (
    <div className='max-w-sm mx-auto bg-gray-50 shadow-md rounded-lg overflow-hidden'>
      <WalletHeader />
      <ActionButtons />
      <FavouritesSection />
      <CoinsList />
      <BottomNavigation />
    </div>
  );
};
