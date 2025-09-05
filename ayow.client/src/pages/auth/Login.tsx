import { useState } from "react";
import type { LoginDTO } from "../../types/LoginDTO";
import { login } from "../../services/AuthService";
import GuestLayout from "../Layout/GuestLayout";
import TextInput from "../../components/TextInput";
import PrimaryButton from "../../components/PrimaryButton";

function Login() {
    const [credentials, setCredentials] = useState<LoginDTO>({
        email: "",
        password: ""
    });

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const res = await login(credentials);

            sessionStorage.setItem("accessToken", res.auth.token);
            sessionStorage.setItem("userRole", res.auth.user.role);

            window.location.reload();

        } catch (error) {
            console.error("Login error:", error);
        }
    };

    return (
        <GuestLayout>
            <div>
                <h1 className="text-center">Login</h1>

                <form onSubmit={handleLogin}>

                    <div>
                        <TextInput
                            type="email"
                            placeholder="Email"
                            className="mt-3 w-full"
                            value={credentials.email}
                            onChange={(e) =>
                                setCredentials({ ...credentials, email: e.target.value })
                            }
                        />
                    </div>

                    <div>
                        <TextInput
                            type="password"
                            placeholder="Password"
                            className="mt-3 w-full"
                            value={credentials.password}
                            onChange={(e) =>
                                setCredentials({ ...credentials, password: e.target.value })
                            }
                        />
                    </div>

                    <div className="flex justify-end">
                        <PrimaryButton type="submit" className="mt-3"><span>Login</span></PrimaryButton>
                    </div>
                </form>
            </div>
        </GuestLayout>
    );
}

export default Login;
