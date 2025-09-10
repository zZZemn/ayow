import { createContext, useContext, useState } from "react";

import Loading from "../components/Loading";

const LoadingContext = createContext<any>(null);

export function LoadingProvider({ children }: { children: React.ReactNode }) {
    const [isLoading, setIsLoading] = useState(false);

    return (
        <LoadingContext.Provider value={{ isLoading, setIsLoading }}>
            {isLoading && <Loading />}
            {children}
        </LoadingContext.Provider>
    );
}

export function useLoading() {
    const context = useContext(LoadingContext);
    if (!context) throw new Error("useLoading must be used inside LoadingProvider");
    return context;
}
