import React, { useState, useEffect } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup,
  SelectLabel,
} from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import {
  Clipboard,
  Plus,
  Minus,
  ChevronDown,
  ChevronUp,
  Moon,
  Sun,
} from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { useTheme } from '@/components/theme-provider';

type DeeplinkType = 'transfer' | 'donate';
type DeeplinkPrefix = 'ton://' | 'https://app.tonkeeper.com/';

interface DeeplinkParams {
  type: DeeplinkType;
  prefix: DeeplinkPrefix;
  address: string;
  amount: string;
  text: string;
  bin: string;
}

const NANOTON_MULTIPLIER = 1000000000;

export const TonDeeplinkGenerator: React.FC = () => {
  const [params, setParams] = useState<DeeplinkParams>(() => {
    const savedParams = localStorage.getItem('tonDeeplinkParams');
    return savedParams
      ? JSON.parse(savedParams)
      : {
          type: 'transfer',
          prefix: 'ton://',
          address: '',
          amount: '',
          text: '',
          bin: '',
        };
  });
  const [amountTON, setAmountTON] = useState<string>('');
  const [deeplink, setDeeplink] = useState<string>('');
  const [isBinOpen, setIsBinOpen] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    localStorage.setItem('tonDeeplinkParams', JSON.stringify(params));
  }, [params]);

  useEffect(() => {
    if (amountTON) {
      const nanoTON = Math.floor(
        parseFloat(amountTON) * NANOTON_MULTIPLIER
      ).toString();
      setParams((prev) => ({ ...prev, amount: nanoTON }));
    } else {
      setParams((prev) => ({ ...prev, amount: '' }));
    }
  }, [amountTON]);

  const generateDeeplink = () => {
    const queryParams = new URLSearchParams();
    if (params.amount) queryParams.append('amount', params.amount);
    if (params.text)
      queryParams.append('text', encodeURIComponent(params.text));
    if (params.bin) queryParams.append('bin', encodeURIComponent(params.bin));
    const url = `${params.prefix}${params.type}/${
      params.address
    }?${queryParams.toString()}`;
    setDeeplink(url);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(deeplink);
  };

  const formatTON = (value: number): string => {
    return value.toFixed(9);
  };

  const handleAmountChange = (value: string) => {
    let numericValue = value.replace(/\D/g, '');
    let tonValue = (parseInt(numericValue) / 100).toFixed(2);
    let nanoTonValue = (parseFloat(tonValue) * NANOTON_MULTIPLIER).toString();
    setAmountTON(tonValue);
    setParams((prev) => ({ ...prev, amount: nanoTonValue }));
  };

  const handleSliderChange = (value: number[]) => {
    setAmountTON(formatTON(value[0]));
  };

  const handlePresetAmount = (amount: number) => {
    setAmountTON(formatTON(amount));
  };

  const handleIncreaseDecrease = (increment: boolean) => {
    const currentAmount = parseFloat(amountTON) || 0;
    const newAmount = increment
      ? currentAmount + 0.05
      : Math.max(currentAmount - 0.05, 0);
    setAmountTON(formatTON(newAmount));
  };

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <Card className='w-full max-w-md mx-auto'>
      <CardHeader className='flex flex-row items-center justify-between'>
        <CardTitle>TON Deeplink Generator</CardTitle>
        <Button
          variant='outline'
          size='icon'
          className='p-0'
          onClick={toggleTheme}
        >
          {theme === 'dark' ? (
            <Sun className='h-5 w-5' />
          ) : (
            <Moon className='h-5 w-5' />
          )}
        </Button>
      </CardHeader>
      <CardContent className='space-y-4'>
        <div>
          <Label htmlFor='prefix'>Prefix</Label>
          <Select
            value={params.prefix}
            onValueChange={(value: DeeplinkPrefix) =>
              setParams({ ...params, prefix: value })
            }
          >
            <SelectTrigger className='text-left w-full'>
              <SelectValue placeholder='Select a prefix' />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Choose a prefix</SelectLabel>
                <SelectItem value='ton://'>
                  ton://
                  <span className='text-xs text-muted-foreground block'>
                    Standard TON protocol prefix
                  </span>
                </SelectItem>
                <SelectItem value='https://app.tonkeeper.com/'>
                  https://app.tonkeeper.com/
                  <span className='text-xs text-muted-foreground block'>
                    Web-based Tonkeeper URL
                  </span>
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor='type'>Type</Label>
          <Select
            value={params.type}
            onValueChange={(value: DeeplinkType) =>
              setParams({ ...params, type: value })
            }
          >
            <SelectTrigger className='text-left w-full'>
              <SelectValue placeholder='Select a type' />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Choose a type</SelectLabel>
                <SelectItem value='transfer '>
                  Transfer
                  <div className='text-xs text-muted-foreground'>
                    Send TON to an address
                  </div>
                </SelectItem>
                <SelectItem value='donate'>
                  Donate
                  <span className='text-xs text-muted-foreground block'>
                    Make a donation to an address
                  </span>
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor='address'>Address</Label>
          <Input
            id='address'
            value={params.address}
            onChange={(e) => setParams({ ...params, address: e.target.value })}
            placeholder='Enter TON address'
          />
        </div>
        <div>
          <Label htmlFor='amount'>Amount (TON)</Label>
          <div className='flex items-center space-x-2'>
            <Button
              variant='outline'
              size='icon'
              className='p-0'
              onClick={() => handleIncreaseDecrease(false)}
            >
              <Minus className='h-4 w-4' />
            </Button>
            <div className='relative flex-grow'>
              <Input
                id='amount'
                value={amountTON}
                onChange={(e) => handleAmountChange(e.target.value)}
                placeholder='0.000000000'
                type='text'
                className='pl-8'
              />
              <span className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='20'
                  height='20'
                  viewBox='0 0 24 24'
                >
                  <path
                    fill='#08C'
                    d='M19.011 9.201L12.66 19.316a.857.857 0 0 1-1.453-.005L4.98 9.197a1.8 1.8 0 0 1-.266-.943a1.856 1.856 0 0 1 1.881-1.826h10.817c1.033 0 1.873.815 1.873 1.822c0 .334-.094.664-.274.951M6.51 8.863l4.632 7.144V8.143H6.994c-.48 0-.694.317-.484.72m6.347 7.144l4.633-7.144c.214-.403-.005-.72-.485-.72h-4.148z'
                  />
                </svg>
              </span>
            </div>
            <Button
              variant='outline'
              size='icon'
              onClick={() => handleIncreaseDecrease(true)}
              className='p-0'
            >
              <Plus className='h-4 w-4' />
            </Button>
          </div>
        </div>
        <div className='space-y-2'>
          <Slider
            max={100}
            step={0.000000001}
            value={[parseFloat(amountTON) || 0]}
            onValueChange={handleSliderChange}
          />
          <div className='flex justify-between'>
            <Button
              variant='outline'
              size='sm'
              onClick={() => handlePresetAmount(5)}
            >
              5 TON
            </Button>
            <Button
              variant='outline'
              size='sm'
              onClick={() => handlePresetAmount(10)}
            >
              10 TON
            </Button>
            <Button
              variant='outline'
              size='sm'
              onClick={() => handlePresetAmount(100)}
            >
              100 TON
            </Button>
          </div>
        </div>
        <div>
          <Label htmlFor='text'>Text (optional)</Label>
          <Input
            id='text'
            value={params.text}
            onChange={(e) => setParams({ ...params, text: e.target.value })}
            placeholder='Enter message'
          />
        </div>
        <Collapsible open={isBinOpen} onOpenChange={setIsBinOpen}>
          <CollapsibleTrigger asChild>
            <Button variant='outline' className='flex w-full justify-between'>
              Binary Data (optional)
              {isBinOpen ? (
                <ChevronUp className='h-4 w-4' />
              ) : (
                <ChevronDown className='h-4 w-4' />
              )}
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Input
                    id='bin'
                    value={params.bin}
                    onChange={(e) =>
                      setParams({ ...params, bin: e.target.value })
                    }
                    placeholder='Enter base64-encoded binary data'
                  />
                </TooltipTrigger>
                <TooltipContent>
                  <p>
                    Enter base64-encoded binary data. This can be used for
                    encrypted comments or additional payload data.
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </CollapsibleContent>
        </Collapsible>
        <Button onClick={generateDeeplink} className='w-full'>
          Generate Deeplink
        </Button>
        {deeplink && (
          <div className='mt-4 space-y-4'>
            <div className='flex items-center justify-between'>
              <Input value={deeplink} readOnly />
              <Button
                variant='outline'
                size='icon'
                className='p-0'
                onClick={copyToClipboard}
              >
                <Clipboard className='h-4 w-4' />
              </Button>
            </div>
            <div className='flex justify-center'>
              <QRCodeSVG value={deeplink} size={200} />
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
