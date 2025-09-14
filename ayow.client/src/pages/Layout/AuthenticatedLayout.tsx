import { useState, useEffect, type ReactNode } from "react";
import { NavLink, useNavigate } from "react-router-dom";

import { useLoading } from "../../context/LoadingContext";

import { Menu, X } from "lucide-react";
import { IoCaretDown } from "react-icons/io5";

import ApplicationLogo from "../../components/ApplicationLogo";

interface UserAuthenticatedLayoutProps {
    children: ReactNode;
}

export default function UserAuthenticatedLayout({ children }: UserAuthenticatedLayoutProps) {
    const { isLoading, setIsLoading } = useLoading();

    const [isNavOpen, setIsNavOpen] = useState(false);
    const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);


    const [isAuthChecked, setIsAuthChecked] = useState(false);
    const navigate = useNavigate();

    const handleLogout = () => {
        setIsLoading(true);

        sessionStorage.removeItem("accessToken");
        navigate("/login");
    }

    useEffect(() => {
        const checkAuth = async () => {
            setIsLoading(true);

            try {
                const res = await fetch("/auth/verify", {
                    headers: {
                        Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
                    },
                });

                if (!res.ok) {
                    handleLogout();
                    return;
                }

                const data = await res.json();
                const role = data.auth.role;

                if (role !== "USER") {
                    handleLogout();
                }

            } catch (err) {
                handleLogout();
            } finally {
                setIsAuthChecked(true);
                setIsLoading(false);
            }
        };

        if (!isAuthChecked && sessionStorage.getItem("accessToken")) {
            checkAuth();
        } else {
            setIsLoading(false);
        }
    }, [isAuthChecked, navigate]);

    return (
        <div className="">

            <nav className="flex items-center justify-between bg-gray-800 p-4 px-6 text-white">
                <div className="flex items-center">
                    <NavLink to="/user">
                        <ApplicationLogo className="h-10" />
                    </NavLink>
                </div>

                <ul className="hidden gap-8 md:flex">
                    {/* <li><a href="#">Link</a></li>
                    <li><a href="#">Link</a></li>
                    <li><a href="#">Link</a></li> */}
                    <li className="relative">
                        <button
                            onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                            className="flex cursor-pointer items-center gap-1"
                        >
                            Profile <IoCaretDown />
                        </button>

                        {isProfileDropdownOpen && (
                            <ul className="absolute right-0 mt-2 w-26 rounded-b-sm bg-gray-800 shadow-gray-600 shadow-md">
                                {/* <li><a href="#" className="block p-2 hover:bg-gray-700">Link</a></li>
                                <li><a href="#" className="block p-2 hover:bg-gray-700">Link</a></li>
                                <li><a href="#" className="block p-2 hover:bg-gray-700">Link</a></li> */}
                                <button onClick={handleLogout} className="hover:bg-gray-700 flex p-2 w-full cursor-pointer rounded-b-sm">Logout</button>
                            </ul>
                        )}
                    </li>
                </ul>



                <button
                    className="cursor-pointer md:hidden text-2xl"
                    onClick={() => setIsNavOpen(!isNavOpen)}
                >
                    {isNavOpen ? <X /> : <Menu />}
                </button>

                {isNavOpen && (
                    <ul className="absolute left-0 top-18 flex w-full flex-col gap-1 pb-1 bg-gray-800 border-t-2 border-gray-700 md:hidden">
                        {/* <li><a href="#" className="hover:bg-gray-700 flex p-2">Link</a></li>
                        <li><a href="#" className="hover:bg-gray-700 flex p-2">Link</a></li>
                        <li><a href="#" className="hover:bg-gray-700 flex p-2">Link</a></li> */}

                        <li>
                            <button
                                onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                                className="hover:bg-gray-700 cursor-pointer flex items-center w-full p-2"
                            >
                                Profile <IoCaretDown />
                            </button>

                            {isProfileDropdownOpen && (
                                <ul className="mt-1 flex flex-col gap-1">
                                    {/* <li><a href="#" className="hover:bg-gray-700 flex p-2">Link</a></li>
                                    <li><a href="#" className="hover:bg-gray-700 flex p-2">Link</a></li>
                                    <li><a href="#" className="hover:bg-gray-700 flex p-2">Link</a></li> */}
                                    <li>
                                        <button onClick={handleLogout} className="hover:bg-gray-700 flex p-2 w-full cursor-pointer">Logout</button>
                                    </li>
                                </ul>
                            )}
                        </li>
                    </ul>
                )}
            </nav>

            <div className="bg-gray-50 px-3">
                {children}
            </div>
        </div>
    );
}
