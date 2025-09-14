import { useEffect, useState } from 'react';
import AdminAuthenticatedLayout from '../Layout/AdminAuthenticatedLayout';
import PageTitle from '../../components/PageTitle';

function AdminDashboard() {
    return (
        <AdminAuthenticatedLayout>
            <div className='flex justify-between items-center py-3'>
                <PageTitle title='Home' />
            </div>
        </AdminAuthenticatedLayout>
    );
}

export default AdminDashboard;