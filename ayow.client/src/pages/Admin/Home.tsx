import { useEffect, useState } from 'react';
import AdminAuthenticatedLayout from '../Layout/AdminAuthenticatedLayout';

function AdminDashboard() {
    return (
        <AdminAuthenticatedLayout>
            <div>
                <h1>Admin Home</h1>
            </div>
        </AdminAuthenticatedLayout>
    );
}

export default AdminDashboard;