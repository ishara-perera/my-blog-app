'use client'

import Navbar from "@/app/Navbar";
import {useState} from "react";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";

export default function HomePage() {
    const [queryClient] = useState(() => new QueryClient());
    return (
        <div>
            <QueryClientProvider client={queryClient}>
            <Navbar />
            <h1>Home Page</h1>
            </QueryClientProvider>
        </div>
    );
}
