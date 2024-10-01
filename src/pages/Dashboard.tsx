// App.tsx
import { Button } from '@/components/ui/button';

import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';

import { QrCode } from 'lucide-react';

export const Dashboard = () => {
  return (
    <div className=' text-white'>
      {/* First Card */}
      <Card className='bg-opacity-30 p-6 rounded-2xl shadow-lg mb-6'>
        <div className='flex items-center justify-between'>
          <div className='flex items-center space-x-3'>
            <img
              src='user-avatar.jpg'
              alt='User Avatar'
              className='w-12 h-12 rounded-full'
            />
            <p className='text-lg'>What's my Top 3 controls for CISO?</p>
          </div>
          <QrCode name='menu' className='text-white' />
        </div>

        {/* Likelihood and Loss Magnitude Tabs */}

        <Tabs defaultValue='account' className='my-4 w-[400px]'>
          <TabsList>
            <TabsTrigger value='account'>Likelihood</TabsTrigger>
            <TabsTrigger value='password'>Loss Magnitude</TabsTrigger>
          </TabsList>
          <TabsContent value='account'>
            Make changes to your account here.
          </TabsContent>
          <TabsContent value='password'>Change your password here.</TabsContent>
        </Tabs>

        {/* Delta Loss Percentage */}
        <div className='text-5xl font-bold'>24%</div>
        <div className='mt-2'>
          {/* Custom graph visualization goes here */}
          <div className='h-24 bg-blue-600 rounded-lg'></div>
        </div>

        {/* Maturity Level Controls */}
        <div className='flex justify-between mt-4'>
          <Button>Maturity 2</Button>
          <Button>Maturity 3</Button>
        </div>
      </Card>

      {/* Second Card */}
      <Card className='bg-opacity-30 p-6 rounded-2xl shadow-lg'>
        <div className='flex items-center justify-between'>
          <div className='flex items-center space-x-3'>
            <img
              src='user-avatar.jpg'
              alt='User Avatar'
              className='w-12 h-12 rounded-full'
            />
            <p className='text-lg'>Tell me more about my peer comparison</p>
          </div>
        </div>

        {/* Likelihood and Loss Magnitude Tabs */}
        <Tabs defaultValue='account' className='my-4 w-[400px]'>
          <TabsList>
            <TabsTrigger value='account'>Likelihood</TabsTrigger>
            <TabsTrigger value='password'>Loss Magnitude</TabsTrigger>
          </TabsList>
          <TabsContent value='account'>
            Make changes to your account here.
          </TabsContent>
          <TabsContent value='password'>Change your password here.</TabsContent>
        </Tabs>

        {/* Peer Comparison Progress */}
        <div className='space-y-4'>
          <div className='flex items-center justify-between'>
            <span>Peers</span>
            <Progress value={90} className='w-48' />
            <span>90%</span>
          </div>
          <div className='flex items-center justify-between'>
            <span>Current</span>
            <Progress value={40} className='w-48' />
            <span>40%</span>
          </div>
        </div>
      </Card>
    </div>
  );
};
