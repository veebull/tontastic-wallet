import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '@/components/theme-provider';
import {
  SettingsIcon,
  PlusIcon,
  Sun,
  Moon,
  ChevronDown,
  ArrowRight,
  ArrowUpRight,
  ArrowDownLeft,
  X,
  CopyIcon,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from '@/components/ui/sheet';
import { Checkbox } from '@/components/ui/checkbox';

// Assume these functions are implemented in @/lib/ton-api
import {
  getWalletBalance,
  getWalletStatus,
  getLastTransfers,
  getSubscriptions,
  getPopularTokens,
  getNFTs,
  getAvailableTokens,
  getTonPrice,
} from '@/lib/ton-api';

interface Wallet {
  address: string;
  name: string;
  emoji: string;
  chain: 'mainnet' | 'testnet';
}

export const Dashboard: React.FC = () => {
  const { theme, setTheme } = useTheme();
  const [currentWallet, setCurrentWallet] = useState<Wallet | null>(null);
  const [wallets, setWallets] = useState<Wallet[]>([]);
  const [balance, setBalance] = useState<string>('0');
  const [tonBalance, setTonBalance] = useState<string>('0');
  const [tonPrice, setTonPrice] = useState<string>('0');
  const [walletStatus, setWalletStatus] = useState<string>('');
  const [lastTransfers, setLastTransfers] = useState<any[]>([]);
  const [subscriptions, setSubscriptions] = useState<any[]>([]);
  const [popularTokens, setPopularTokens] = useState<any[]>([]);
  const [nfts, setNFTs] = useState<any[]>([]);
  const [availableTokens, setAvailableTokens] = useState<any[]>([]);
  console.log(availableTokens);
  const [isWalletSheetOpen, setIsWalletSheetOpen] = useState(false);
  const [isNewWalletSheetOpen, setIsNewWalletSheetOpen] = useState(false);
  const [isTestnetMode, setIsTestnetMode] = useState(false);
  useEffect(() => {
    const storedWallets = JSON.parse(localStorage.getItem('wallets') || '[]');
    setWallets(storedWallets);
    const activeWallet = JSON.parse(
      localStorage.getItem('activeWallet') || 'null'
    );
    if (activeWallet) {
      setCurrentWallet(activeWallet);
      fetchWalletData(activeWallet.address);
    }
  }, []);

  const fetchWalletData = async (address: string) => {
    const tonBalanceValue = await getWalletBalance(address);
    setTonBalance(tonBalanceValue);
    const tonPriceValue = await getTonPrice();
    setTonPrice(tonPriceValue);
    setBalance(
      (parseFloat(tonBalanceValue) * parseFloat(tonPriceValue)).toFixed(2)
    );
    setWalletStatus(await getWalletStatus(address));
    setLastTransfers(await getLastTransfers(address));
    setSubscriptions(await getSubscriptions(address));
    setPopularTokens(await getPopularTokens());
    setNFTs(await getNFTs(address));
    setAvailableTokens(await getAvailableTokens(address));
  };

  const handleWalletChange = (wallet: Wallet) => {
    setCurrentWallet(wallet);
    localStorage.setItem('activeWallet', JSON.stringify(wallet));
    fetchWalletData(wallet.address);
    setIsWalletSheetOpen(false);
    window.dispatchEvent(
      new CustomEvent('activeWalletChanged', { detail: wallet })
    );
  };

  const shortenAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  return (
    <div
      className={`min-h-screen ${
        theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'
      } p-6 flex flex-col`}
      style={{ maxWidth: '390px', margin: '0 auto' }}
    >
      <div className='flex justify-between items-center mt-6'>
        <Sheet open={isWalletSheetOpen} onOpenChange={setIsWalletSheetOpen}>
          <SheetTrigger asChild>
            <div className='flex items-center space-x-2 cursor-pointer'>
              <div
                className={`w-10 h-10 ${
                  theme === 'dark' ? 'bg-gray-800' : 'bg-gray-200'
                } rounded-full flex items-center justify-center`}
              >
                <span className='text-sm'>{currentWallet?.emoji || '👤'}</span>
              </div>
              <div>
                <h1 className='text-xl font-semibold'>
                  {currentWallet?.name ??
                    (currentWallet?.address &&
                      shortenAddress(currentWallet.address)) ??
                    'Select Wallet'}
                </h1>
              </div>
              <ChevronDown size={16} />
            </div>
          </SheetTrigger>
          <SheetContent
            side='bottom'
            className={`${
              theme === 'dark'
                ? 'bg-gray-800 text-white'
                : 'bg-white text-gray-900'
            }`}
          >
            <SheetHeader>
              <SheetTitle>Select Wallet</SheetTitle>
              <SheetDescription>
                Choose a wallet to view its dashboard
              </SheetDescription>
            </SheetHeader>
            <SheetClose className='absolute right-4 top-4'>
              <X className='h-4 w-4 text-gray-500' />
            </SheetClose>
            <div className='mt-4'>
              {wallets.map((wallet, index) => (
                <Button
                  key={index}
                  onClick={() => handleWalletChange(wallet)}
                  className={`w-full mb-2 justify-between py-6 ${
                    theme === 'dark'
                      ? 'bg-gray-700 hover:bg-gray-600'
                      : 'bg-gray-100 hover:bg-gray-200'
                  } ${
                    wallet.address === currentWallet?.address
                      ? 'border-2 border-blue-500'
                      : ''
                  }`}
                  variant='ghost'
                >
                  <div className='flex items-center'>
                    <span className='mr-2 text-xl'>{wallet.emoji} </span>
                    <span className='flex flex-col text-left'>
                      <span>{wallet.name}</span>
                      <span
                        className={`${
                          wallet.chain === 'testnet'
                            ? 'text-yellow-500'
                            : 'text-green-500'
                        }`}
                      >
                        ({wallet.chain})
                      </span>
                    </span>
                  </div>
                  <p
                    className={`${
                      wallet.chain === 'testnet'
                        ? 'text-yellow-500'
                        : 'text-green-500'
                    }`}
                  >
                    {shortenAddress(wallet.address)}
                  </p>
                </Button>
              ))}
              <Button
                onClick={() => {
                  setIsWalletSheetOpen(false);
                  setIsNewWalletSheetOpen(true);
                }}
                className={`w-full mt-4 ${
                  theme === 'dark'
                    ? 'bg-blue-600 hover:bg-blue-700'
                    : 'bg-blue-500 hover:bg-blue-600'
                } text-white`}
              >
                <PlusIcon className='mr-2' /> Add New Wallet
              </Button>
            </div>
          </SheetContent>
        </Sheet>
        <Sheet
          open={isNewWalletSheetOpen}
          onOpenChange={setIsNewWalletSheetOpen}
        >
          <SheetContent
            side='bottom'
            className={`${
              theme === 'dark'
                ? 'bg-gray-800 text-white'
                : 'bg-white text-gray-900'
            }`}
          >
            <SheetHeader>
              <SheetTitle>
                Add New{' '}
                <span
                  className={
                    isTestnetMode ? 'text-yellow-500' : 'text-green-500'
                  }
                >
                  {isTestnetMode ? 'Testnet' : 'Mainnet'}
                </span>{' '}
                Wallet
              </SheetTitle>
              <SheetDescription>
                Create a new wallet or import an existing one
              </SheetDescription>
            </SheetHeader>
            <SheetClose className='absolute right-4 top-4'>
              <X className='h-4 w-4 text-gray-500' />
            </SheetClose>
            <div className='mt-6 space-y-4'>
              <Link
                to='/tontastic-wallet/create-wallet'
                className={`block w-full p-4 rounded-lg ${
                  theme === 'dark'
                    ? 'bg-gray-700 hover:bg-gray-600'
                    : 'bg-gray-100 hover:bg-gray-200'
                } text-center`}
              >
                Create New Wallet
              </Link>
              <Link
                to='/tontastic-wallet/import-wallet'
                className={`block w-full p-4 rounded-lg ${
                  theme === 'dark'
                    ? 'bg-gray-700 hover:bg-gray-600'
                    : 'bg-gray-100 hover:bg-gray-200'
                } text-center`}
              >
                Import Existing Wallet
              </Link>
              <div className='flex items-center space-x-2'>
                <Checkbox
                  id='testnet-mode'
                  checked={isTestnetMode}
                  onCheckedChange={(checked) => {
                    setIsTestnetMode(checked as boolean);
                    localStorage.setItem('isTestnetMode', checked.toString());
                  }}
                />
                <label
                  htmlFor='testnet-mode'
                  className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
                >
                  Testnet Mode
                </label>
              </div>
            </div>
          </SheetContent>
        </Sheet>
        <div className='flex flex-col-reverse '>
          <div className='flex items-end'>
            <Switch
              checked={theme === 'dark'}
              onCheckedChange={() =>
                setTheme(theme === 'dark' ? 'light' : 'dark')
              }
            />
            {theme === 'dark' ? (
              <Moon className='ml-2' />
            ) : (
              <Sun className='ml-2' />
            )}
            <Link to='/tontastic-wallet/settings' className='ml-4'>
              <SettingsIcon
                className={theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}
              />
            </Link>
          </div>
        </div>
      </div>

      <div className='mt-6'>
        <div className='flex items-center'>
          <span
            className={`flex items-center px-3 py-2 rounded-lg ${
              theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'
            }`}
          >
            <p
              className='text-sm font-bold cursor-pointer'
              onClick={() => {
                if (currentWallet) {
                  navigator.clipboard.writeText(currentWallet.address);
                  // You might want to add a toast or notification here to inform the user that the address has been copied
                }
              }}
            >
              {currentWallet
                ? `${currentWallet.address.slice(
                    0,
                    4
                  )}...${currentWallet.address.slice(-4)}`
                : 'No wallet selected'}
            </p>
            <CopyIcon
              className='ml-2 h-4 w-4 cursor-pointer'
              onClick={() => {
                if (currentWallet) {
                  navigator.clipboard.writeText(currentWallet.address);
                  // You might want to add a toast or notification here to inform the user that the address has been copied
                }
              }}
            />
          </span>
        </div>
        <p className='text-3xl font-bold'>{tonBalance} TON</p>
        <p className='text-lg text-gray-500'>${balance} USD</p>
        <p className='text-sm text-gray-400'>TON = ${tonPrice} USD</p>
        <p
          className={`text-sm ${
            walletStatus === 'active' ? 'text-green-500' : 'text-yellow-500'
          }`}
        >
          Status: {walletStatus}
        </p>
      </div>

      <div className='flex justify-between mt-6'>
        {['Buy', 'Swap', 'Send', 'Receive', 'More'].map((action, index) => (
          <Link
            key={index}
            to={`/tontastic-wallet/${action.toLowerCase()}`}
            className={`w-16 h-16 rounded-full flex flex-col items-center justify-center ${
              [
                'bg-blue-100',
                'bg-green-100',
                'bg-purple-100',
                'bg-yellow-100',
                'bg-gray-100',
              ][index]
            } ${theme === 'dark' ? 'text-gray-900' : 'text-black'}`}
          >
            {index === 0 && <PlusIcon className='mb-1' />}
            {index === 1 && <ArrowRight className='mb-1' />}
            {index === 2 && <ArrowUpRight className='mb-1' />}
            {index === 3 && <ArrowDownLeft className='mb-1' />}
            {index === 4 && <SettingsIcon className='mb-1' />}
            <span className='text-xs mt-1'>{action}</span>
          </Link>
        ))}
      </div>

      <div className='mt-6'>
        <div className='flex justify-between items-center mb-2'>
          <h2 className='font-semibold'>Subscriptions</h2>
          <Button
            variant='link'
            className={
              theme === 'dark' ? 'text-blue-400' : 'text-blue-600 bg-gray-100'
            }
          >
            View All
          </Button>
        </div>
        <div className='flex space-x-4 overflow-x-auto'>
          <div
            className={`min-w-[120px] h-[140px] ${
              theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'
            } rounded-lg flex items-center justify-center`}
          >
            <PlusIcon className='text-gray-400' />
          </div>
          {subscriptions.map((sub, index) => (
            <div
              key={index}
              className={`min-w-[120px] h-[140px] ${
                ['bg-blue-100', 'bg-green-100'][index % 2]
              } rounded-lg p-4 flex flex-col justify-between`}
            >
              <div className='flex justify-between items-center'>
                <span className={theme === 'dark' ? 'text-gray-800' : ''}>
                  {sub.name}
                </span>
                <span
                  className={`text-xs ${
                    theme === 'dark' ? 'text-gray-700' : ''
                  }`}
                >
                  {sub.symbol}
                </span>
              </div>
              <div>
                <p
                  className={`font-bold ${
                    theme === 'dark' ? 'text-gray-800' : ''
                  }`}
                >
                  ${sub.amount}
                </p>
                <p
                  className={`text-sm ${
                    ['text-red-500', 'text-green-500'][index % 2]
                  }`}
                >
                  {index % 2 === 0 ? '▼ 3.85%' : '▲ 5.18%'}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className='mt-6'>
        <h2 className='font-semibold mb-2'>Make a transfer</h2>
        <div className='flex space-x-4 overflow-x-auto'>
          {[
            'New Transfer',
            'Send to yourself',
            ...lastTransfers.slice(0, 3).map((t) => t.address),
          ].map((person, index) => (
            <div key={index} className='flex flex-col items-center'>
              <div
                className={`w-12 h-12 ${
                  theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'
                } rounded-full flex items-center justify-center mb-1`}
              >
                {index === 0 ? (
                  <PlusIcon className='text-gray-400' />
                ) : (
                  <span className='text-sm'>👤</span>
                )}
              </div>
              <span className='text-xs text-center'>
                {index === 0 ? person : shortenAddress(person)}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div
        className={`mt-6 ${
          theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'
        } rounded-lg p-4`}
      >
        <div className='flex justify-between mb-4'>
          <span className='font-semibold'>Total</span>
          <span className='font-semibold'>Per Platform</span>
          <span className='font-semibold'>Month ▼</span>
        </div>
        <div className='flex flex-wrap justify-between'>
          {popularTokens.map((token, index) => (
            <div
              key={index}
              className={`w-20 h-20 ${
                [
                  'bg-yellow-200',
                  'bg-green-200',
                  'bg-blue-200',
                  'bg-purple-200',
                  'bg-red-200',
                  'bg-pink-200',
                ][index % 6]
              } rounded-full flex items-center justify-center mb-2`}
            >
              <span className='font-semibold text-black'>{token.symbol}</span>
            </div>
          ))}
        </div>
      </div>

      <div className='mt-6 mb-20'>
        <div className='flex justify-between items-center mb-2'>
          <h2 className='font-semibold'>NFTs</h2>
          <Button
            variant='link'
            className={
              theme === 'dark' ? 'text-blue-400' : 'text-blue-600 bg-gray-100'
            }
          >
            View All
          </Button>
        </div>
        <div className='flex space-x-4 overflow-x-auto'>
          {nfts.map((nft, index) => (
            <div
              key={index}
              className={`min-w-[100px] h-[100px] ${
                theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'
              } rounded-lg flex items-center justify-center`}
            >
              <span>{nft.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
