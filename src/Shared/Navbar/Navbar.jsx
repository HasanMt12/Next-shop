"use client";
import Link from "next/link";
import NavLink from "./NavLink";
import { toast } from "react-hot-toast";
import {  useState } from "react";
import Image from "next/image";
import useAuth from "@/hooks/useAuth";
import { afterLoginNavData, beforeLoginNavData } from "@/Data/navData";
import { usePathname, useRouter } from "next/navigation";

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    
    const { user, logout } = useAuth();
  const { uid, displayName, photoURL } = user || {};

  const navData = uid ? afterLoginNavData : beforeLoginNavData;
 
  const { replace, refresh } = useRouter();
  const path = usePathname();

  const handleLogout = async () => {
    const toastId = toast.loading("Loading...");
    try {
      await logout();
      const res = await fetch("/api/auth/logout", {
        method: "POST",
      });
      await res.json();
      if (path.includes("/dashboard") || path.includes("/profile")) {
        replace(`/login?redirectUrl=${path}`);
      }
      toast.dismiss(toastId);
      toast.success("Successfully logout!");
      startTransition(() => {
        refresh();
      });
    } catch (error) {
      toast.error("Successfully not logout!");
      toast.dismiss(toastId);
    }
  };
      
    return (
        <div className="sticky top-0 z-10 ">
        <div className = "bg-[#ee7da8] bg-opacity-60" >
          <div className="px-4 py-2 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl ">
            <div className="relative flex items-center  justify-between ">
              <a
                href="/"
                aria-label="Company"
                title="Company"
                className="inline-flex items-center"
              >
                <div className="flex items-center justify-center w-12 h-12 mx-2 overflow-hidden rounded-full">
                  <Image width={100} height={100} src="/logo.jpg" alt="logo" />
                </div>
              </a>
              <ul className="text-black cursor-pointer text-lg items-center hidden space-x-8 lg:flex">
               {navData.map(({ path, title }) => (
            <li key = { path}
            className = "mx-auto text-[#f1f3f5]" >
              <NavLink
               
                href={path}
                activeClassName="text-[#24657e]"
                exact={path === "/"}
              >
                {title}
              </NavLink>
            </li>
          ))}

                  {uid && (
          <div className="dropdown-end dropdown">
            <label tabIndex={0} className="btn-ghost btn-circle avatar btn">
              <div className="w-10 rounded-full">
                <Image
                  alt="user-logo"
                  title={displayName}
                  src={
                    photoURL ||
                    "https://i.ibb.co/0QZCv5C/png-clipart-user-profile-computer-icons-login-user-avatars-monochrome-black.png"
                  }
                  width={40}
                  height={40}
                  className="h-10 w-10 rounded-full"
                />
              </div>
            </label>
            <ul
              tabIndex={0}
              className="menu-compact dropdown-content menu rounded-box mt-3 w-52 bg-base-100 p-2 shadow"
            >
              <li className="mb-2 mt-1 text-center font-semibold">
                {displayName}
              </li>
              <div className="divider my-0"></div>
              <li className="mb-2">
                <NavLink
                  href="/profile"
                  className="text-lg"
                  activeClassName="text-blue-500"
                >
                  Profile
                </NavLink>
              </li>
              <li className="">
                <button
                  onClick={handleLogout}
                  className="btn-warning btn content-center text-white"
                >
                  Logout
                </button>
              </li>
            </ul>
          </div>
        )}
              </ul>

              

              <div className="lg:hidden ">
                <button
                  aria-label="Open Menu"
                  title="Open Menu"
                  className="p-2 -mr-1 transition duration-200 rounded focus:outline-none focus:shadow-outline"
                  onClick={() => setIsMenuOpen(true)}
                >
                  <svg className="w-5 text-[#EA0F62]" viewBox="0 0 24 24">
                    <path
                      fill="currentColor"
                      d="M23,13H1c-0.6,0-1-0.4-1-1s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,13,23,13z"
                    />
                    <path
                      fill="currentColor"
                      d="M23,6H1C0.4,6,0,5.6,0,5s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,6,23,6z"
                    />
                    <path
                      fill="currentColor"
                      d="M23,20H1c-0.6,0-1-0.4-1-1s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,20,23,20z"
                    />
                  </svg>
                </button>
                {isMenuOpen && (
                  <div className="absolute z-10 top-0 left-0 w-full bg-[hsl(197,47%,29%)]">
                    <div className="p-5  border rounded shadow-lg">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <a
                            href="/"
                            aria-label="Company"
                            title="Company"
                            className="inline-flex items-center"
                          >
                            {/* <img
                              className="w-[30%] h-[30%] lg:w-[100%] lg:h-[100%] md:h-[80%] md:w-[65%]"
                              src={logo99}
                              alt=""
                            ></img> */}
                          </a>
                        </div>
                        <div>
                          <button
                            aria-label="Close Menu"
                            title="Close Menu"
                            className="p-2 -mt-2 bg-[#EA0F62]  -mr-2 transition duration-200 rounded hover:bg-[#c7497a] focus:bg-[#EA0F62] focus:outline-none focus:shadow-outline"
                            onClick={() => setIsMenuOpen(false)}
                          >
                            <svg
                              className="w-5 text-gray-600"
                              viewBox="0 0 24 24"
                            >
                              <path
                                fill="currentColor"
                                d="M19.7,4.3c-0.4-0.4-1-0.4-1.4,0L12,10.6L5.7,4.3c-0.4-0.4-1-0.4-1.4,0s-0.4,1,0,1.4l6.3,6.3l-6.3,6.3 c-0.4,0.4-0.4,1,0,1.4C4.5,19.9,4.7,20,5,20s0.5-0.1,0.7-0.3l6.3-6.3l6.3,6.3c0.2,0.2,0.5,0.3,0.7,0.3s0.5-0.1,0.7-0.3 c0.4-0.4,0.4-1,0-1.4L13.4,12l6.3-6.3C20.1,5.3,20.1,4.7,19.7,4.3z"
                              />
                            </svg>
                          </button>
                        </div>
                      </div>
                      <nav>
                        <ul className="space-y-4 text-start font-bold ">
                            {navData.map(({ path, title }) => (
            <li key={path} className="mx-auto">
              <NavLink
               
                href={path}
                activeClassName="text-blue-500"
                exact={path === "/"}
              >
                {title}
              </NavLink>
            </li>
          ))}
                        </ul>
                      </nav>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
};

export default Navbar;