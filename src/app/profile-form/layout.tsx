export default function ProfileFormLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      
        <div className="flex items-center justify-center min-h-screen bg-neutral-1000 p-4"> 
          
          {children}
        </div>
      
  );
}
