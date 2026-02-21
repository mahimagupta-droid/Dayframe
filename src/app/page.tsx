import { auth } from "@clerk/nextjs/server";
import Link from "next/link";
import BackgroundBoxesDemo from "@/components/background-boxes-demo";
export default async function Home() {
  const { userId } = await auth();
  if (!userId) {
    return (
      <BackgroundBoxesDemo>
      <div className="flex items-center justify-center min-h-screen text-4xl italic flex-col">
        <div className="underline pointer-events-auto z-50">
          Dayframe -  Student Productivity and Life Manager
        </div>
        <Link href='/profile-form' className="pointer-events-auto z-50">
          <div className="text-2xl mt-12 not-italic bg-slate-800 p-4 rounded-xl border-slate-800 opacity-80 transition-opacity hover:opacity-100">Please login to continue</div>
        </Link>
      </div>
      </BackgroundBoxesDemo>
    )
  }
  return (
    <BackgroundBoxesDemo>
    <div className="flex items-center justify-center min-h-screen text-4xl italic">
      <div className="pointer-events-auto z-50">Dayframe -  Student Productivity and Life Manager</div>
    </div>
    </BackgroundBoxesDemo>
  );
}