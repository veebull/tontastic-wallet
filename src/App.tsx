// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Welcome } from './pages/Welcome';
import { WalletOptions } from './pages/WalletOptions';
import { CreateWallet } from './pages/CreateWallet';
import { ImportWallet } from './pages/ImportWallet';
import { Dashboard } from './pages/Dashboard';
import { Receive } from './pages/Receive';
import { Send } from './pages/Send';
import { WalletApp } from './pages/WalletApp';

const App: React.FC = () => {
  return (
    <Router>
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
            path='/tontastic-wallet/import-wallet'
            element={<ImportWallet />}
          />
          <Route path='/tontastic-wallet/dashboard' element={<Dashboard />} />
          <Route path='/tontastic-wallet/receive' element={<Receive />} />
          <Route path='/tontastic-wallet/send' element={<Send />} />
          <Route path='/tontastic-wallet/wallet-app' element={<WalletApp />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
