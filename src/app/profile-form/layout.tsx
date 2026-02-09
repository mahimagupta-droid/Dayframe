export default function ProfileFormLayout({children}: {children: React.ReactNode;}) {
  return (
      
        <div className="flex flex-col items-center justify-center min-h-full bg-neutral-1000 p-4"> 
          {children}
        </div>
      
  );
}
