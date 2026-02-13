export default function TasksLayout({children}: {children: React.ReactNode;}) {
  return (
        <div className="flex flex-col items-center justify-center min-h-full bg-neutral-1000 p-4 mt-20"> 
          {children}
        </div>
      
  );
}
