import { useEffect, useState } from 'react';
import PrimaryButton from '../components/PrimaryButton';
import FileInput from '../components/FileInput';
import TextInput from '../components/TextInput';

interface Home {
    date: string;
    temperatureC: number;
    temperatureF: number;
    summary: string;
}

function Home() {
    return (
        <div>
            <h1>Home</h1>

            <div className='mt-5'></div>
            <PrimaryButton>Test</PrimaryButton>

            <div className='mt-5'></div>
            <FileInput />

            <div className='mt-5'></div>
            <TextInput />
        </div>
    );
}

export default Home;