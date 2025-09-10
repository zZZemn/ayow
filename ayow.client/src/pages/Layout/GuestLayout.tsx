import { useState, useEffect, type ReactNode } from "react";
import { useNavigate } from "react-router-dom";

import { useLoading } from "../../context/LoadingContext";

import ApplicationLogo from "../../components/ApplicationLogo";

interface GuestLayoutProps {
    children: ReactNode;
}

export default function GuestLayout({ children }: GuestLayoutProps) {
    const { isLoading, setIsLoading } = useLoading();

    const [isAuthChecked, setIsAuthChecked] = useState(false);
    const navigate = useNavigate();

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
                    sessionStorage.removeItem("accessToken");
                    navigate("/login");
                    return;
                }

                const data = await res.json();
                const role = data.auth.role;

                if (role === "ADMIN") {
                    navigate("/admin");
                } else if (role === "USER") {
                    navigate("/user");
                } else {
                    sessionStorage.removeItem("accessToken");
                }
            } catch (err) {
                console.error("Auth check failed:", err);
                sessionStorage.removeItem("accessToken");
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
        <div className="flex min-h-screen flex-col items-center bg-gray-100 pt-6 sm:justify-center sm:pt-0">

            <div>
                <a href="/">
                    <ApplicationLogo className="h-20" />
                </a>
            </div>

            <div className="mt-6 w-full overflow-hidden bg-white px-6 py-4 shadow-md sm:max-w-md sm:rounded-lg">
                {children}
            </div>
        </div>
    );
}
