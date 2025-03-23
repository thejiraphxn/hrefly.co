"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { signIn } from "next-auth/react";
import { useSession } from "next-auth/react";
import NavBar from "../Navbar/Navbar";

const MySwal = withReactContent(Swal);

// Schema สำหรับตรวจสอบค่าของฟอร์ม
const LoginSchema = z.object({
  username_or_email: z.string().min(1, "Username or Email is required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginFormInputs = z.infer<typeof LoginSchema>;

export default function Login() {
  const { data: session } = useSession();
  const router = useRouter();
  const [disableButton, setDisableButton] = useState<boolean>(false);
  const [viewPassword, setViewPassword] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>({
    resolver: zodResolver(LoginSchema),
  });

  const onSubmit = async (data: LoginFormInputs) => {
    setDisableButton(true);

    try {
      const res = await signIn("credentials", {
        username_or_email: data.username_or_email,
        password: data.password,
        redirect: false, // ❌ ปิด Redirect อัตโนมัติ
      });

      if (res?.ok) {
        MySwal.fire({
          title: "Success",
          text: "Login successful",
          icon: "success",
        });
        router.push("/"); // ✅ Redirect ไป Home
      } else {
        throw new Error("Invalid username or password");
      }
    } catch (error: any) {
      MySwal.fire({
        title: "Error",
        text: error.message || "Login failed. Please try again.",
        icon: "error",
      });
    }

    setDisableButton(false);
  };

  useEffect(() => {
    if (session) {
      router.push("/");
    }
  }, [session]);

  return (
    <div className="bg-sky-40 h-screen">
        <NavBar />
        <main className="content-center h-3/5 px-5">
            <form className="lg:pt-5 lg:mx-auto lg:w-2/6" onSubmit={handleSubmit(onSubmit)}>
            <h2 className="text-2xl font-bold text-sky-950 text-center mb-5">Login</h2>

            <div className="mb-3">
                <label className="block mb-2 text-sm font-medium text-sky-950">Email or Username</label>
                <input
                type="text"
                {...register("username_or_email")}
                className={`shadow-sm border ${
                    errors.username_or_email ? "border-red-500" : "border-zinc-200"
                } text-sm rounded-lg block w-full p-2.5 bg-sky-40 placeholder-gray-400 text-sky-950`}
                />
                {errors.username_or_email && (
                <div className="text-red-500 text-sm mt-1">{errors.username_or_email.message}</div>
                )}
            </div>

            <div className="mb-3">
                <label className="block mb-2 text-sm font-medium text-sky-950">Password</label>
                <input
                type={viewPassword ? "text" : "password"}
                {...register("password")}
                className={`shadow-sm border ${
                    errors.password ? "border-red-500" : "border-zinc-200"
                } text-sm rounded-lg block w-full p-2.5 bg-sky-40 placeholder-gray-400 text-sky-950`}
                />
                {errors.password && <div className="text-red-500 text-sm mt-1">{errors.password.message}</div>}
            </div>

            <div className="flex items-start mb-5">
                <input
                type="checkbox"
                checked={viewPassword}
                onChange={() => setViewPassword(!viewPassword)}
                className="w-4 h-4 border-gray-300 rounded-2xl bg-gray-50 focus:ring-3 focus:ring-sky-300"
                />
                <label className="ms-2 text-sm font-medium text-sky-950">Show Password</label>
            </div>

            <button
                disabled={disableButton}
                type="submit"
                className="py-3 px-5 text-sm font-medium rounded-xl border-transparent transition bg-sky-900 text-white hover:bg-sky-950"
            >
                Login
            </button>
            </form>
        </main>
    </div>
  );
}
