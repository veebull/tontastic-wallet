import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from 'react-router-dom';
import { AccountLayout } from './components/account-layout';
import { Welcome } from './pages/Welcome';
import { WalletOptions } from './pages/WalletOptions';
import { CreateWallet } from './pages/CreateWallet';
import { CheckNewWallet } from './pages/CheckNewWallet';
import { ImportWallet } from './pages/ImportWallet';
import { WalletName } from './pages/WalletName';
import { SecureOptions } from './pages/SecureOptions';
import { CreatePin } from './pages/CreatePin';
import { CheckPin } from './pages/CheckPin';
import { Dashboard } from './pages/Dashboard';
import { History } from './pages/History';
import { Receive } from './pages/Receive';
import { Send } from './pages/Send';
import { SplitSending } from './pages/SplitSending';
import { Settings } from './pages/Settings';
import { WalletApp } from './pages/WalletApp';
import { ThemeProvider } from '@/components/theme-provider';
import { NavigationController } from './components/navigation-controller';
// AppWrapper component with authentication check

// Placeholder component for undefined routes
const PlaceholderPage: React.FC = () => {
  const location = useLocation();
  return (
    <div className='flex flex-col items-center justify-center h-full'>
      <h1 className='text-2xl font-bold mb-4'>Page Not Found</h1>
      <p>
        The page "{location.pathname.split('/').pop()}" is under construction.
      </p>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
        <NavigationController>
          <div className='min-h-screen bg-gradient-to-b from-blue-900 to-black p-4'>
            <Routes>
              <Route path='/tontastic-wallet/' element={<Welcome />} />
              <Route
                path='/tontastic-wallet/wallet-options'
                element={<WalletOptions />}
              />
              <Route
                path='/tontastic-wallet/create-wallet'
                element={<CreateWallet />}
              />
              <Route
                path='/tontastic-wallet/check-new-wallet'
                element={<CheckNewWallet />}
              />
              <Route
                path='/tontastic-wallet/import-wallet'
                element={<ImportWallet />}
              />
              <Route
                path='/tontastic-wallet/wallet-name'
                element={<WalletName />}
              />
              <Route
                path='/tontastic-wallet/secure-options'
                element={<SecureOptions />}
              />
              <Route
                path='/tontastic-wallet/create-pin'
                element={<CreatePin />}
              />
              <Route
                path='/tontastic-wallet/check-pin'
                element={<CheckPin />}
              />

              {/* Routes with AccountLayout (bottom menu) */}
              <Route
                path='/tontastic-wallet/dashboard'
                element={
                  <AccountLayout>
                    <Dashboard />
                  </AccountLayout>
                }
              />
              <Route
                path='/tontastic-wallet/receive'
                element={
                  <AccountLayout>
                    <Receive />
                  </AccountLayout>
                }
              />
              <Route
                path='/tontastic-wallet/history'
                element={
                  <AccountLayout>
                    <History />
                  </AccountLayout>
                }
              />
              <Route
                path='/tontastic-wallet/send'
                element={
                  <AccountLayout>
                    <Send />
                  </AccountLayout>
                }
              />
              <Route
                path='/tontastic-wallet/split-sending'
                element={
                  <AccountLayout>
                    <SplitSending />
                  </AccountLayout>
                }
              />
              <Route
                path='/tontastic-wallet/settings'
                element={
                  <AccountLayout>
                    <Settings />
                  </AccountLayout>
                }
              />
              <Route
                path='/tontastic-wallet/wallet-app'
                element={
                  <AccountLayout>
                    <WalletApp />
                  </AccountLayout>
                }
              />

              {/* Placeholder route for undefined paths */}
              <Route
                path='/tontastic-wallet/*'
                element={
                  <AccountLayout>
                    <PlaceholderPage />
                  </AccountLayout>
                }
              />
            </Routes>
          </div>
        </NavigationController>
      </ThemeProvider>
    </Router>
  );
};

export default App;
