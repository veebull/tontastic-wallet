// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Game } from './pages/Game';
import { Welcome } from './pages/Welcome';
import { WalletOptions } from './pages/WalletOptions';
import { CreateWallet } from './pages/CreateWallet';
import { CheckNewWallet } from './pages/CheckNewWallet';
import { ImportWallet } from './pages/ImportWallet';
import { SecureOptions } from './pages/SecureOptions';
import { CreatePin } from './pages/CreatePin';
import { Dashboard } from './pages/Dashboard';
import { Dashboard2 } from './pages/Dashboard-2';

import { History } from './pages/History';
import { Receive } from './pages/Receive';
import { Send } from './pages/Send';
import { SplitSending } from './pages/SplitSending';
import { Settings } from './pages/Settings';
import { WalletApp } from './pages/WalletApp';
import { ThemeProvider } from '@/components/theme-provider';

const App: React.FC = () => {
  return (
    <Router>
      <ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
        <div className='min-h-screen bg-gradient-to-b from-blue-900 to-black p-4'>
          <Routes>
            <Route path='/tontastic-wallet/' element={<Welcome />} />
            <Route path='/tontastic-wallet/game' element={<Game />} />
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
              path='/tontastic-wallet/secure-options'
              element={<SecureOptions />}
            />
            <Route
              path='/tontastic-wallet/create-pin'
              element={<CreatePin />}
            />
            <Route path='/tontastic-wallet/dashboard' element={<Dashboard />} />
            <Route
              path='/tontastic-wallet/dashboard-2'
              element={<Dashboard2 />}
            />
            <Route path='/tontastic-wallet/receive' element={<Receive />} />
            <Route path='/tontastic-wallet/history' element={<History />} />
            <Route path='/tontastic-wallet/send' element={<Send />} />
            <Route
              path='/tontastic-wallet/split-sending'
              element={<SplitSending />}
            />
            <Route path='/tontastic-wallet/settings' element={<Settings />} />
            <Route
              path='/tontastic-wallet/wallet-app'
              element={<WalletApp />}
            />
          </Routes>
        </div>
      </ThemeProvider>
    </Router>
  );
};

export default App;
