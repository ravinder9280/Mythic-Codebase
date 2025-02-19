import { Tv } from 'lucide-react';
import React from 'react';
import { Button } from '~/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '~/components/ui/card';

const NewMeeting = () => {
  return (
    <Card className=" relative col-span-2">
        <CardContent className='flex flex-col items-center justify-center'>
            <Tv className="size-16 text-primary"/>
            <h1 className='text-gray-700 text-center'>Create new Meeting</h1>
            <p className='text-gray-400 text-center'>Analyse your meeting with powered by MythicCodebase</p>
            <div className="mt-4"></div>
            <Button>Start Meeting</Button>
        </CardContent>

     
    </Card>
  );
};

export default NewMeeting;