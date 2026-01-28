import { SignUpButton } from "@clerk/nextjs"
export default async function SignUp() {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    return (
        <SignUpButton mode="modal" />
    )
}

