import { auth } from "@clerk/nextjs/server";

export default async function Home() {
  const {userId} = await auth();
  if(!userId){
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-4xl italic">
       <div className="underline">
         Dayframe -  Student Productivity and Life Manager
       </div>
        <div className="text-2xl mt-12 not-italic bg-slate-800 p-4 rounded-xl border-slate-800 opacity-80">Please login to continue</div>
    </div>
    )
  }
  return (
    <div className="flex items-center justify-center min-h-screen text-4xl italic">
        Dayframe -  Student Productivity and Life Manager
    </div>
  );
}
