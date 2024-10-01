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
          <Route path='/' element={<Welcome />} />
          <Route path='/wallet-options' element={<WalletOptions />} />
          <Route path='/create-wallet' element={<CreateWallet />} />
          <Route path='/import-wallet' element={<ImportWallet />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/receive' element={<Receive />} />
          <Route path='/send' element={<Send />} />
          <Route path='/wallet-app' element={<WalletApp />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
