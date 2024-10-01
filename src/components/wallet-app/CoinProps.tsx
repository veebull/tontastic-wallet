interface CoinProps {
  name: string;
  symbol: string;
  price: string;
  change: string;
  color: string;
}

const CoinCard: React.FC<CoinProps> = ({
  name,
  symbol,
  price,
  change,
  color,
}) => {
  return (
    <div className={`p-4 rounded-lg bg-${color}-200`}>
      <h2 className='font-semibold'>
        {name} ({symbol})
      </h2>
      <p className='text-xl font-bold'>${price}</p>
      <p className='text-green-600'>↑ {change}%</p>
    </div>
  );
};

export const FavouritesSection = () => {
  return (
    <div className='p-4'>
      <h3 className='text-lg font-semibold'>Favourites</h3>
      <div className='grid grid-cols-2 gap-4 mt-4'>
        <CoinCard
          name='Casper'
          symbol='CSPR'
          price='34,459.04'
          change='+3.85'
          color='blue'
        />
        <CoinCard
          name='Bitcoin'
          symbol='BTC'
          price='78,686.25'
          change='+5.18'
          color='green'
        />
      </div>
    </div>
  );
};
