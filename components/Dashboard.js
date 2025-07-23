"use client";
import React, { useEffect, useState } from 'react';
import { useSession, signOut } from "next-auth/react";
import { update } from "next-auth/react";
import * as NextAuthReact from "next-auth/react";
import { useRouter } from 'next/navigation';
import { fetchuserByEmail, updateProfile } from '@/actions/useractions';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Bounce } from 'react-toastify';

const Dashboard = () => {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [form, setForm] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (status === "loading") return;
        if (!session) {
            router.push('/login');
        } else {
            getData();
        }
    }, [session, status]);

    const getData = async () => {
        try {
            const userData = await fetchuserByEmail(session.user.email);
            console.log("Fetched userData:", userData);
            setForm(userData || {});
        } catch (err) {
            console.error("Error fetching user:", err);
            setForm({});
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log("Submitting form:", form);
            await updateProfile(form, session.user.name);

             // If username changed, refresh session
        // if (form.username !== session.user.name) {
        //     await update(); // This will fetch the latest username from the DB
        // }
            toast('Profile Updated', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: "light",
                transition: Bounce,
            });
            await getData();
            if (form.username !== session.user.name) {
                setTimeout(() => {
                    router.push(`/${form.username}`);
                }, 1000);
            }
        } catch (error) {
            toast.error('Update failed! Try again.', {
                position: "top-right",
                theme: "dark"
            });
            console.error("Error updating profile:", error);
        }
    };

    if (status === "loading" || loading) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <ToastContainer />
            <div className='container mx-auto py-5 px-6'>
                <h1 className='text-center my-5 text-3xl font-bold'>Welcome to your Dashboard</h1>
                <form className="max-w-2xl mx-auto" onSubmit={handleSubmit}>
                    {["name", "email", "username", "profilepic", "coverpic", "razorpayid", "razorpaysecret"].map(field => (
                        <div className='my-2' key={field}>
                            <label htmlFor={field} className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                {field.charAt(0).toUpperCase() + field.slice(1).replace(/([A-Z])/g, ' $1')}
                            </label>
                            <input
                                value={form[field] || ""}
                                onChange={handleChange}
                                type="text"
                                name={field}
                                id={field}
                                className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            />
                        </div>
                    ))}
                    <div className="my-6">
                        <button type="submit" className="block w-full p-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:ring-blue-500 focus:ring-4 focus:outline-none dark:focus:ring-blue-800 font-medium text-sm">
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default Dashboard;
