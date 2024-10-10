# TON Wallet - React Web App

## Demo

Check out the live demo of TON Wallet: [https://veebull.github.io/tontastic-wallet](https://veebull.github.io/tontastic-wallet)

Experience the features and user interface of our TON Wallet web application without the need for installation. The demo provides a simulated environment where you can explore the wallet's functionality, including:

- Creating a new wallet
- Importing an existing wallet
- Viewing wallet balances and transaction history
- Simulating sending and receiving TON coins
- Switching between light and dark themes
- Testing the PIN-based security feature

Please note that the demo uses testnet data and does not interact with real TON coins or the mainnet blockchain.

TON Wallet is a decentralized web application built with React for managing and interacting with the TON blockchain. This wallet provides a user-friendly interface for creating and importing wallets, sending and receiving TON coins, and managing various crypto assets on the TON network.

## Table of Contents

- [TON Wallet - React Web App](#ton-wallet---react-web-app)
  - [Demo](#demo)
  - [Table of Contents](#table-of-contents)
  - [Features](#features)
  - [Technologies Used](#technologies-used)
  - [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Installation](#installation)
  - [Usage](#usage)
  - [Components](#components)
  - [State Management](#state-management)
  - [Theming](#theming)
  - [Security](#security)
  - [Contributing](#contributing)
  - [License](#license)

## Features

- Create new TON wallets
- Import existing wallets using mnemonic phrases
- Send and receive TON coins
- View transaction history
- Manage multiple wallets
- Dark and light theme support
- PIN-based security for wallet access
- QR code generation for receiving payments
- Support for mainnet and testnet
- Split sending feature for distributing funds to multiple recipients
- Integration with Telegram for sharing wallet addresses

## Technologies Used

- React
- TypeScript
- React Router for navigation
- Framer Motion for animations
- Lucide React for icons
- TailwindCSS for styling
- shadcn/ui for UI components
- TON SDK (@ton/ton) for blockchain interactions
- QRCode.react for QR code generation

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm or yarn

### Installation

1. Clone the repository:

   ```
   git clone https://github.com/your-username/ton-wallet-react.git
   ```

2. Navigate to the project directory:

   ```
   cd ton-wallet-react
   ```

3. Install dependencies:

   ```
   npm install
   ```

   or

   ```
   yarn install
   ```

4. Start the development server:

   ```
   npm start
   ```

   or

   ```
   yarn start
   ```

5. Open `http://localhost:3000` in your browser to view the app.

## Usage

1. **Welcome Screen**: Upon launching the app, users are greeted with a welcome screen introducing the TON Wallet.

2. **Wallet Options**: Users can choose to create a new wallet or import an existing one.

3. **Create Wallet**: Generates a new 24-word mnemonic phrase for users to securely store.

4. **Import Wallet**: Allows users to enter their 24-word mnemonic phrase to recover an existing wallet.

5. **Dashboard**: Displays wallet balance, recent transactions, and quick action buttons for sending and receiving TON.

6. **Send**: Enables users to send TON to other addresses, with options for amount and transaction speed.

7. **Receive**: Generates a QR code and displays the wallet address for receiving TON.

8. **Settings**: Provides options for wallet management, security settings, and app preferences.

## Components

- `Welcome`: Introduction screen for new users
- `WalletOptions`: Screen for choosing to create or import a wallet
- `CreateWallet`: Wallet creation process
- `ImportWallet`: Wallet import process
- `Dashboard`: Main screen displaying wallet information and actions
- `Send`: Transaction creation and sending interface
- `Receive`: QR code and address display for receiving funds
- `History`: Transaction history view
- `Settings`: App and wallet settings management

## State Management

The app uses React's Context API and local storage for state management:

- `ThemeProvider`: Manages the app's theme (dark/light mode)
- `LocalStorage`: Stores encrypted wallet data and user preferences

## Theming

The app supports both dark and light themes:

- Uses TailwindCSS for responsive and theme-aware styling
- Theme can be toggled in the settings or main navigation

## Security

- PIN-based authentication for accessing the wallet
- Encrypted storage of sensitive data in local storage
- Option to enable biometric authentication (if supported by the device)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.
