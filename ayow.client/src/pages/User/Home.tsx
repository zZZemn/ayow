import { useEffect, useState } from 'react';
import UserAuthenticatedLayout from '../Layout/AuthenticatedLayout';
import DailyWordDisplay from '../../components/DailyWord';

function UserDashboard() {
    return (
        <UserAuthenticatedLayout>
            <div>
                <h1>User Home</h1>
            </div>

            <hr />

            <DailyWordDisplay />
        </UserAuthenticatedLayout>
    );
}

export default UserDashboard;