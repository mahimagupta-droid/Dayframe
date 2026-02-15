export default function TasksLayout({children}: {children: React.ReactNode;}) {
  return (
    <div className="flex flex-col h-[calc(100vh-64px)] bg-neutral-1000 overflow-hidden mt-16"> 
      {children}
    </div>
  );
}