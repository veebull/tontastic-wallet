import { TonClient, WalletContractV4, internal } from '@ton/ton';
import { mnemonicNew, mnemonicToPrivateKey } from '@ton/crypto';

async function setupWallet(isTestnet: boolean) {
  // Create Client
  const client = new TonClient({
    endpoint: isTestnet
      ? 'https://testnet.toncenter.com/api/v2/jsonRPC'
      : 'https://toncenter.com/api/v2/jsonRPC',
  });

  // Generate new key
  let mnemonics = await mnemonicNew();
  let keyPair = await mnemonicToPrivateKey(mnemonics);

  // Create wallet contract
  let workchain = 0; // Usually you need a workchain 0
  let wallet = WalletContractV4.create({
    workchain,
    publicKey: keyPair.publicKey,
  });
  let contract = client.open(wallet);

  return { contract, keyPair };
}

async function sendMessage(
  contract: any,
  keyPair: any,
  toAddress: string,
  amount: string,
  message: string
) {
  // Get balance
  let balance: bigint = await contract.getBalance();
  console.log(`Current balance: ${balance}`);

  // Create a transfer
  let seqno: number = await contract.getSeqno();
  let transfer = await contract.createTransfer({
    seqno,
    secretKey: keyPair.secretKey,
    messages: [
      internal({
        value: amount,
        to: toAddress,
        body: message,
      }),
    ],
  });

  // Send the transfer
  await contract.send(transfer);
  console.log('Transfer sent successfully');
}

async function main() {
  // Setup for testnet
  const testnetWallet = await setupWallet(true);
  await sendMessage(
    testnetWallet.contract,
    testnetWallet.keyPair,
    'EQAtNrQVf9fNAlnDZKBNgHa7qqLkURturGrC68Gk7ax5n8Aq', // Example testnet address
    '0.1',
    'Hello testnet'
  );

  // Setup for mainnet
  const mainnetWallet = await setupWallet(false);
  await sendMessage(
    mainnetWallet.contract,
    mainnetWallet.keyPair,
    'EQCD39VS5jcptHL8vMjEXrzGaRcCVYto7HUn4bpAOg8xqB2N', // Example mainnet address
    '0.1',
    'Hello mainnet'
  );
}

main().catch(console.error);
