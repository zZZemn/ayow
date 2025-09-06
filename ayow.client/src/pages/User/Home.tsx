import { useEffect, useState } from 'react';
import UserAuthenticatedLayout from '../Layout/AuthenticatedLayout';

function UserDashboard() {
    return (
        <UserAuthenticatedLayout>
            <div>
                <h1>User Home</h1>
            </div>
        </UserAuthenticatedLayout>
    );
}

export default UserDashboard;