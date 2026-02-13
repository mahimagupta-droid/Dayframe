import Link from "next/link";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
export default async function Navigation() {
    return (
        <nav className="fixed top-0 z-50 h-16 w-full border-b bg-black text-white">
            <div className="mx-auto flex h-full items-center justify-between px-6">

                <Link href="/" className="cursor-pointer">
                    <div className="flex items-center">
                    <span className="text-2xl font-semibold tracking-wide ml-4">
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
                        <NavLink href="/calendar">Calendar</NavLink>
                        <NavLink href="/profile-form">Profile Form</NavLink>
                    </div>

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