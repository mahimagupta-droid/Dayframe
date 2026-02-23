"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { Menu, X } from "lucide-react";
import ToolTip from "@/components/tootTip";

export default function Navigation() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    return (
        <>
            <nav className="fixed top-0 z-[100] h-16 w-full border-b bg-black text-white">
                <div className="mx-auto flex h-full items-center justify-between px-6">
                    <Link href="/" className="cursor-pointer">
                        <div className="flex items-center">
                            <span className="text-2xl font-semibold tracking-wide ml-4 z-30">
                                Dayframe
                            </span>
                        </div>
                    </Link>
                    <div className="flex items-center gap-6 mr-4">
                        <div className="hidden md:flex items-center gap-6">
                            <NavLink href="/">Home</NavLink>
                            <NavLink href="/dashboard">Dashboard</NavLink>
                            <NavLink href="/tasks">Tasks</NavLink>
                            <NavLink href="/goals">Goals</NavLink>
                            <NavLink href="/profile-form">Profile Form</NavLink>
                        </div>
                        <ToolTip text="Toggle Menu">
                            <button
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                                className="md:hidden p-2 hover:bg-gray-800 rounded transition-colors"
                                aria-label="Toggle menu"
                            >
                                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                            </button>
                        </ToolTip>
                        <div className="hidden md:flex items-center gap-4">
                            <SignedOut>
                                <Link
                                    href="/profile-form"
                                    className="inline-block ml-2 hover:bg-blue-600 hover:!p-2 hover:rounded transition-all"
                                >
                                    Login
                                </Link>
                            </SignedOut>
                            <SignedIn>
                                <UserButton />
                            </SignedIn>
                        </div>
                    </div>
                </div>
            </nav>
            {isMenuOpen && (
                <div className="fixed top-16 left-0 w-full bg-black border-t border-gray-800 z-[100] md:hidden">
                    <div className="flex flex-col p-4 space-y-2">
                        <MobileNavLink
                            href="/"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Home
                        </MobileNavLink>
                        <MobileNavLink
                            href="/dashboard"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Dashboard
                        </MobileNavLink>
                        <MobileNavLink
                            href="/tasks"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Tasks
                        </MobileNavLink>
                        <MobileNavLink
                            href="/goals"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Goals
                        </MobileNavLink>
                        <MobileNavLink
                            href="/profile-form"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Profile Form
                        </MobileNavLink>
                        <div className="border-t border-gray-700 my-2" />
                        <SignedOut>
                            <Link
                                href="/profile-form"
                                onClick={() => setIsMenuOpen(false)}
                                className="block w-full text-center py-3 px-4 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
                            >
                                Login
                            </Link>
                        </SignedOut>

                        <SignedIn>
                            <div className="flex items-center gap-3 py-2 px-4">
                                <UserButton />
                                <span className="text-sm text-gray-300">Your Profile</span>
                            </div>
                        </SignedIn>
                    </div>
                </div>
            )}
        </>
    );
}


function NavLink({
    href,
    children,
}: {
    href: string;
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const isActive = pathname === href;

    return (
        <Link
            href={href}
            className={`relative text-sm font-medium transition-all after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:bg-blue-600 after:transition-all ${isActive
                    ? "text-white after:w-full"
                    : "text-gray-300 hover:text-white after:w-0 hover:after:w-full"
                }`}
        >
            {children}
        </Link>
    );
}

function MobileNavLink({
    href,
    onClick,
    children,
}: {
    href: string;
    onClick: () => void;
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const isActive = pathname === href;

    return (
        <Link
            href={href}
            onClick={onClick}
            className={`block py-3 px-4 text-base font-medium rounded-lg transition-colors ${isActive
                    ? "text-white bg-gray-800"
                    : "text-gray-300 hover:text-white hover:bg-gray-800"
                }`}
        >
            {children}
        </Link>
    );
}