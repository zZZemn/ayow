import { useEffect, useState } from 'react';

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
        </div>
    );
}

export default Home;