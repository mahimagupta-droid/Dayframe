export default function ProfileFormLayout({ children }: { children: React.ReactNode; }) {
  return (
    <div className="min-h-[calc(100vh-64px)] bg-black text-white">
      {children}
    </div>

  );
}