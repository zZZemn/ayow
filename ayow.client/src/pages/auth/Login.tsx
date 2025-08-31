import { useState } from "react";
import type { LoginDTO } from "../../types/LoginDTO";
import { login } from "../../services/AuthService";

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

            console.log("Login success:", res);
            console.log("Stored token + role:", {
                token: res.auth.token,
                role: res.auth.user.role
            });

            // if (res.role === "Admin") {
            //     window.location.href = "/admin";
            // } else {
            //     window.location.href = "/dashboard";
            // }

        } catch (error) {
            console.error("Login error:", error);
        }
    };

    async function getProtectedTest() {
        const token = sessionStorage.getItem("accessToken");

        console.log(token);

        const response = await fetch("template/test", {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            throw new Error("Unauthorized or failed request");
        }
    }


    return (
        <div>
            <h1>Login</h1>

            <form onSubmit={handleLogin}>
                <input
                    type="email"
                    placeholder="Email"
                    value={credentials.email}
                    onChange={(e) =>
                        setCredentials({ ...credentials, email: e.target.value })
                    }
                />

                <input
                    type="password"
                    placeholder="Password"
                    value={credentials.password}
                    onChange={(e) =>
                        setCredentials({ ...credentials, password: e.target.value })
                    }
                />

                <button type="submit">Login</button>
            </form>


            <button onClick={getProtectedTest}>Test Auth</button>
        </div>
    );
}

export default Login;
