import React from 'react';
import { BottomMenu } from './bottom-menu';

interface MainLayoutProps {
  children: React.ReactNode;
}

export const AccountLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <>
      {children}
      <BottomMenu />
    </>
  );
};
