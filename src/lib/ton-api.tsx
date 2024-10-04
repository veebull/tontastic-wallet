import { getHttpEndpoint } from '@orbs-network/ton-access';
import { TonClient, WalletContractV4, fromNano } from '@ton/ton';
import { Address } from '@ton/core';

// Helper function to create TonClient
async function createClient() {
  const endpoint = await getHttpEndpoint({ network: 'mainnet' });
  return new TonClient({ endpoint });
}

export async function getWalletBalance(address: string): Promise<string> {
  const client = await createClient();
  const balance = await client.getBalance(Address.parse(address));
  return fromNano(balance);
}

export async function getWalletStatus(address: string): Promise<string> {
  const client = await createClient();
  const contract = client.open(
    WalletContractV4.create({
      workchain: 0, // Assuming default workchain
      publicKey: Buffer.from(address, 'hex'), // Convert address to Buffer
      // walletId: optional, add if needed
    })
  );
  console.log(contract);
  //   const state = await contract.getFullState();
  const state = 'active';
  return state === 'active' ? 'active' : 'uninit';
}

export async function getLastTransfers(
  address: string,
  limit: number = 10
): Promise<any[]> {
  const client = await createClient();
  const transactions = await client.getTransactions(Address.parse(address), {
    limit,
  });
  console.log(transactions);

  return [
    {
      address: 'addressssss',
      amount: '10',
      timestamp: 1234567890,
    },
    {
      address: 'addressssss',
      amount: '10',
      timestamp: 1234567890,
    },
  ];
  //   transactions.map((tx) => ({
  //     address:
  //       tx.inMessage?.src?.toString() ||
  //       tx.outMessages[0]?.destination?.toString() ||
  //       'Unknown',
  //     amount: fromNano(tx.inMessage?.value || tx.outMessages[0]?.value || 0),
  //     timestamp: tx.now,
  //   }));
}

export async function getSubscriptions(address: string): Promise<any[]> {
  // This is a placeholder. Actual implementation would depend on how subscriptions are stored/managed in TON
  console.log(address);

  return [
    { name: 'TON Subscription 1', amount: '10' },
    { name: 'TON Subscription 2', amount: '5' },
  ];
}

export async function getPopularTokens(): Promise<any[]> {
  // This is a placeholder. You would typically fetch this from a price API or your own backend
  return [
    { symbol: 'TON', name: 'Toncoin' },
    { symbol: 'USDT', name: 'Tether' },
    { symbol: 'BTC', name: 'Bitcoin' },
    { symbol: 'ETH', name: 'Ethereum' },
    { symbol: 'TGR', name: 'Tegro' },
  ];
}

export async function getNFTs(address: string): Promise<any[]> {
  // This is a placeholder. Actual implementation would involve querying NFT contracts
  console.log(address);

  return [
    { name: 'TON NFT 1', id: '1' },
    { name: 'TON NFT 2', id: '2' },
    { name: 'TON NFT 3', id: '3' },
  ];
}

export async function getAvailableTokens(address: string): Promise<any[]> {
  // This is a placeholder. Actual implementation would involve querying token contracts
  console.log(address);
  return [
    { symbol: 'TON', balance: '100' },
    { symbol: 'USDT', balance: '50' },
    { symbol: 'TGR', balance: '200' },
  ];
}

export async function getTonPrice(): Promise<string> {
  try {
    const response = await fetch(
      'https://api.coingecko.com/api/v3/simple/price?ids=the-open-network&vs_currencies=usd'
    );
    const data = await response.json();
    const price = data['the-open-network'].usd;
    return price.toFixed(2); // Return price with 2 decimal places
  } catch (error) {
    console.error('Error fetching TON price:', error);
    return '0.00'; // Return a default value in case of error
  }
}
