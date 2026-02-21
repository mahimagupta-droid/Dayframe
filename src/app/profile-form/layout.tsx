import { DottedGlowBackground } from "@/components/ui/dotted-glow-background";
export default function ProfileFormLayout({ children }: { children: React.ReactNode; }) {
  return (
    <div className="min-h-[calc(100vh-64px)] bg-black text-white">
      <DottedGlowBackground
                    glowColor="rgb(209, 255, 0)"      
                    radius={3.5}                           
                    opacity={1}                         
                    speedScale={0.24}
                  />
      {children}
    </div>

  );
}