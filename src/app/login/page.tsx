import { SignInButton } from "@clerk/nextjs"
export default async function Login() {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    return (
        <SignInButton mode="modal" />
    )
} 