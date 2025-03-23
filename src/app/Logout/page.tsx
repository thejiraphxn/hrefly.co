"use client"; // ✅ ต้องใช้ "use client" เพราะ useEffect ใช้ใน Client Component

import { useEffect } from "react";
import { signOut } from "next-auth/react";
import { redirect } from "next/navigation";

const Logout: React.FC = () => {
    useEffect(() => {
        signOut({ redirect: false }).then(() => {
            redirect("/"); // ✅ ใช้ redirect() แทน router.push("/")
        });
    }, []);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <h1 className="text-2xl font-bold text-blue-950">Logging out...</h1>
        </div>
    );
};

export default Logout;
