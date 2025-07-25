"use client";
import React, { useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const { data: session } = useSession();
  const [showdropdown, setShowdropdown] = useState(false);
  const router = useRouter();

  return (
    <nav className="bg-gray-900 shadow-xl shadow-white text-white flex justify-between items-center px-4 md:h-16">
      <Link
        className="logo font-bold text-lg flex justify-center items-center"
        href={"/"}
      >
        <img className="invertImg" src="tea.gif" width={44} alt="" />
        <span className="text-xl md:text-base my-3 md:my-0">
          Get Me a Chai!
        </span>
      </Link>

      <div className="relative flex justify-center items-center  md:block gap-4">
        {session && (
          <span className="mr-4 text-green-300 font-semibold">
            Logged in as {session.user.name}
          </span>
        )}
        {session && (
          <>
            <button
              onClick={() => setShowdropdown(!showdropdown)}
              onBlur={() => {
                setTimeout(() => {
                  setShowdropdown(false);
                }, 100);
              }}
              id="dropdownDefaultButton"
              data-dropdown-toggle="dropdown"
              className="text-white mx-2 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-2 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              type="button"
            >
              Account
              <svg
                className="w-2.5 h-2.5 ms-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 10 6"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 4 4 4-4"
                />
              </svg>
            </button>

            <div
              id="dropdown"
              className={`z-10 ${
                showdropdown ? "" : "hidden"
              } fixed right-[16px] top-[65px] bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700`}
              onMouseLeave={() => {
                setTimeout(() => setShowdropdown(false), 100);
              }}
            >
              <ul
                className="py-2 text-sm text-gray-700 dark:text-gray-200"
                aria-labelledby="dropdownDefaultButton"
              >
                <li>
                  <button
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    onMouseDown={() => router.push("/dashboard")}
                  >
                    Dashboard
                  </button>
                </li>
                <li>
                  <button
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    onMouseDown={() => router.push(`/${session.user.name}`)}
                  >
                    Your Page
                  </button>
                </li>
                <li>
                  <button
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    onMouseDown={() => signOut({ callbackUrl: "/" })}
                  >
                    Sign out
                  </button>
                </li>
              </ul>
            </div>
          </>
        )}

        {session && (
          <button
            className="text-white w-fit bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 "
            onClick={() => signOut({ callbackUrl: "/" })}
          >
            Logout
          </button>
        )}
        {!session && (
          <Link href={"/login"}>
            <button className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 ">
              Login
            </button>
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
