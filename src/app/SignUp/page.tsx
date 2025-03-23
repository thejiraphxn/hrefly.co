"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation"; 
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import NavBar from "../Navbar/Navbar";

const SignupForm = () => {
  const router = useRouter();
  const MySwal = withReactContent(Swal);

  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [disableButton, setDisableButton] = useState(false);
  const [viewPassword, setViewPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const SubmitForm = async (e: React.FormEvent) => {
    e.preventDefault();
    setDisableButton(true);

    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/SignUp`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
        });

        const resData = await response.json();
        console.log(resData)

        if (!response.ok) {
            throw new Error(resData.errors[0]);
        }

        MySwal.fire({
            title: "Success",
            text: "You have successfully signed up!",
            icon: "success",
        });

        setTimeout(() => {
            router.push("/Login"); 
        }, 1000);
    } catch (error:any) {
        console.log("SignUp failed:", error);
        MySwal.fire({
            title: "Error",
            text: error,
            icon: "error",
        });
    } 
    setDisableButton(false);
    
  };

  return (
    <div className="bg-sky-40 h-screen flex flex-col">
        <NavBar/>
        <main className="content-center flex justify-center items-center">
            <form className="lg:pt-5 lg:mx-auto w-full md:w-2/6 p-6 bg-white rounded-xl" onSubmit={SubmitForm}>
                <h2 className="text-2xl font-bold text-sky-950 text-center mb-5">Sign Up</h2>

                {/* Firstname & Lastname */}
                <div className="grid sm:grid-cols-2 gap-3">
                    <div className="mb-3">
                        <label htmlFor="firstname" className="block mb-2 text-sm font-medium text-sky-950">Firstname</label>
                        <input
                            type="text"
                            id="firstname"
                            className="shadow-sm border bg-sky-40 text-sky-950 border-zinc-200 text-sm rounded-lg block w-full p-2.5 placeholder-gray-400"
                            placeholder="John"
                            value={formData.firstname}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="lastname" className="block mb-2 text-sm font-medium text-sky-950">Lastname</label>
                        <input
                            type="text"
                            id="lastname"
                            className="shadow-sm border bg-sky-40 text-sky-950 border-zinc-200 text-sm rounded-lg block w-full p-2.5 placeholder-gray-400"
                            placeholder="Doe"
                            value={formData.lastname}
                            onChange={handleChange}
                            required
                        />
                    </div>
                </div>

                {/* Username */}
                <div className="mb-3">
                    <label htmlFor="username" className="block mb-2 text-sm font-medium text-sky-950">Username</label>
                    <input
                    type="text"
                    id="username"
                    className="shadow-sm border bg-sky-40 text-sky-950 border-zinc-200 text-sm rounded-lg block w-full p-2.5 placeholder-gray-400"
                    placeholder="JohnDoe123"
                    value={formData.username}
                    onChange={handleChange}
                    required
                    />
                </div>

                {/* Email */}
                <div className="mb-3">
                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-sky-950">Email</label>
                    <input
                    type="email"
                    id="email"
                    className="shadow-sm border bg-sky-40 text-sky-950 border-zinc-200 text-sm rounded-lg block w-full p-2.5 placeholder-gray-400"
                    placeholder="example@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    />
                </div>

                {/* Password */}
                <div className="mb-3">
                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-sky-950">Password</label>
                    <input
                    type={viewPassword ? "text" : "password"}
                    id="password"
                    className="shadow-sm border bg-sky-40 text-sky-950 border-zinc-200 text-sm rounded-lg block w-full p-2.5 placeholder-gray-400"
                    placeholder="********"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    />
                </div>

                {/* Confirm Password */}
                <div className="mb-3">
                    <label htmlFor="confirmPassword" className="block mb-2 text-sm font-medium text-sky-950">Confirm Password</label>
                    <input
                    type={viewPassword ? "text" : "password"}
                    id="confirmPassword"
                    className="shadow-sm border bg-sky-40 text-sky-950 border-zinc-200 text-sm rounded-lg block w-full p-2.5 placeholder-gray-400"
                    placeholder="********"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                    />
                </div>

                {/* Show Password Checkbox */}
                <div className="flex items-start mb-5">
                    <div className="flex items-center h-5">
                        <input
                            id="viewPassword"
                            type="checkbox"
                            checked={viewPassword}
                            onChange={() => setViewPassword(!viewPassword)}
                            className="w-4 h-4 border-gray-300 rounded-2xl bg-gray-50 focus:ring-3 focus:ring-sky-300"
                        />
                    </div>
                    <label htmlFor="viewPassword" className="ms-2 text-sm font-medium text-sky-950">
                        Show Password
                    </label>
                </div>

                {/* Submit Button */}
                <button
                    disabled={disableButton}
                    type="submit"
                    className="py-3 px-5 inline-flex items-center gap-x-2 text-sm font-medium rounded-xl border-transparent bg-sky-900 text-white hover:bg-sky-950 transition disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:bg-sky-900"
                >
                    Sign Up
                </button>
            </form>
        </main>
    </div>
  );
};

export default SignupForm;


