export default function DashboardLAyout({ children }: { children: React.ReactNode; }) {
    return (
        <div className="bg-black text-white flex justify-center items-center min-h-screen flex-col">
            {children}
        </div>
    );
} 