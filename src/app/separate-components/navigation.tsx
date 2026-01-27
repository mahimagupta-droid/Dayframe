// src/components/Navbar.tsx
import Link from "next/link";
import {
    SignedIn,
    SignedOut,
    SignInButton,
    SignUpButton,
} from "@clerk/nextjs";

export default function Navigation() {
    return (
        <nav className="sticky top-0 z-50 h-16 w-full border-b bg-black text-white">
            <div className="mx-auto grid h-full max-w-7xl grid-cols-3 items-center px-10">

                {/* Left: Logo */}
                <div className="flex items-center">
                    <span className="text-2xl font-semibold tracking-wide">
                        Dayframe
                    </span>
                </div>

                {/* Center: Page Links */}
                <div className="hidden md:flex items-center justify-center gap-10 text-[50px]">
                    <NavLink href="/dashboard">Dashboard</NavLink>
                    <NavLink href="/tasks">Tasks</NavLink>
                    <NavLink href="/calendar">Calendar</NavLink>
                </div>

                {/* Right: Auth Buttons */}
                <div className="flex items-center justify-end gap-4">
                    <SignedOut>
                        <SignInButton>
                            <button className="text-l text-white hover:text-blue-500">
                                Login
                            </button>
                        </SignInButton>

                        <SignUpButton>
                            <button className="rounded-lg px-4 py-2 text-l font-medium transition hover:text-blue-500">
                                Sign Up
                            </button>
                        </SignUpButton>
                    </SignedOut>

                    <SignedIn>
                        <span className="text-sm opacity-80">Logged in</span>
                    </SignedIn>
                </div>

            </div>
        </nav>
    );
}


function NavLink({
    href,
    children,
}: {
    href: string;
    children: React.ReactNode;
}) {
    return (
        <Link
            href={href}
            className="relative text-sm font-medium text-gray-300 transition hover:text-white
                 after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-0
                 after:bg-blue-600 after:transition-all hover:after:w-full"
        >
            {children}
        </Link>
    );
}
