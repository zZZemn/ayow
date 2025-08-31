export interface User {
    id: string;
    firstName: string;
    middleName?: string;
    lastName: string;
    birthDate: string;
    gender: string;
    country: string;
    email: string;
    contactNo?: string;
    password: string;
    role: string;
}