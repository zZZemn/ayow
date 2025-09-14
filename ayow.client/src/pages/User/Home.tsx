import { useEffect, useState } from 'react';
import UserAuthenticatedLayout from '../Layout/AuthenticatedLayout';
import DailyWordDisplay from '../../components/DailyWord';
import PageTitle from '../../components/PageTitle';

function UserDashboard() {
    return (
        <UserAuthenticatedLayout>
            <div className='flex justify-between items-center py-3'>
                <PageTitle title='Home' />
            </div>
            
            <DailyWordDisplay />
        </UserAuthenticatedLayout>
    );
}

export default UserDashboard;