import { useState } from "react";
import { NavLink } from "react-router-dom";
import GuestLayout from "../Layout/GuestLayout";

import type { RegisterDTO } from "../../types/RegisterDTO";

import { register } from "../../services/AuthService";

import TextInput from "../../components/TextInput";
import PrimaryButton from "../../components/PrimaryButton";

function Register() {
    const [form, setForm] = useState<RegisterDTO>({
        firstName: "Emmanuel",
        middleName: "Andan",
        lastName: "Ugaban",
        birthDate: "2002-03-12",
        gender: "M",
        country: "Philippines",
        email: "ugabane0516@gmail.com",
        contactNo: "09666888756",
        password: "password",
        confirmPassword: "password",
    });

    const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (form.password !== form.confirmPassword) {
            alert("Passwords do not match!"); // make and customize alerts
            return;
        }

        try {
            const res = await register(form);

            sessionStorage.setItem("accessToken", res.auth.token);
            sessionStorage.setItem("userRole", res.auth.user.role);

            window.location.reload();
        } catch (error) {
            console.error("Register error:", error);
        }
    };

    return (
        <GuestLayout>
            <div>
                <h1 className="text-center text-3xl text-gray-800 font-bold my-5">Register</h1>

                <form onSubmit={handleRegister} >
                    <div className="grid grid-cols-12 gap-4">

                        <TextInput
                            type="text"
                            placeholder="First Name"
                            className="w-full col-span-12 md:col-span-6"
                            value={form.firstName}
                            onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                        />

                        <TextInput
                            type="text"
                            placeholder="Middle Name"
                            className="w-full col-span-12 md:col-span-6"
                            value={form.middleName}
                            onChange={(e) => setForm({ ...form, middleName: e.target.value })}
                        />

                        <TextInput
                            type="text"
                            placeholder="Last Name"
                            className="w-full col-span-12 md:col-span-6"
                            value={form.lastName}
                            onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                        />

                        <TextInput
                            type="date"
                            placeholder="Birth Date"
                            className="w-full col-span-12 md:col-span-6"
                            value={form.birthDate}
                            onChange={(e) => setForm({ ...form, birthDate: e.target.value })}
                        />

                        <TextInput
                            type="text"
                            placeholder="Gender"
                            className="w-full col-span-12 md:col-span-6"
                            value={form.gender}
                            onChange={(e) => setForm({ ...form, gender: e.target.value })}
                        />

                        <TextInput
                            type="text"
                            placeholder="Country"
                            className="w-full col-span-12 md:col-span-6"
                            value={form.country}
                            onChange={(e) => setForm({ ...form, country: e.target.value })}
                        />

                        <TextInput
                            type="email"
                            placeholder="Email"
                            className="w-full col-span-12"
                            value={form.email}
                            onChange={(e) => setForm({ ...form, email: e.target.value })}
                        />

                        <TextInput
                            type="text"
                            placeholder="Contact Number"
                            className="w-full col-span-12"
                            value={form.contactNo}
                            onChange={(e) => setForm({ ...form, contactNo: e.target.value })}
                        />

                        <TextInput
                            type="password"
                            placeholder="Password"
                            className="w-full col-span-12 md:col-span-6"
                            value={form.password}
                            onChange={(e) => setForm({ ...form, password: e.target.value })}
                        />

                        <TextInput
                            type="password"
                            placeholder="Confirm Password"
                            className="w-full col-span-12 md:col-span-6"
                            value={form.confirmPassword}
                            onChange={(e) =>
                                setForm({ ...form, confirmPassword: e.target.value })
                            }
                        />
                    </div>

                    <div className="text-xs text-gray-600 mt-2">
                        Already have an account? <NavLink to="/login" className="text-blue-600">Login</NavLink>
                    </div>

                    <div className="flex justify-end">
                        <PrimaryButton type="submit">
                            <span>Register</span>
                        </PrimaryButton>
                    </div>
                </form>
            </div>
        </GuestLayout>
    );
}

export default Register;
