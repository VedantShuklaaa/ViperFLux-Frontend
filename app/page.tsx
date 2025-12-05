import Feature from "./components/ui/landing/feature/features";
import Hero from "./components/ui/landing/hero/hero";

export default function Home() {
  return (
    <div className="h-[110vh] md:h-[200vh] bg-background">
      <Hero />
      <Feature />
    </div>
  );
}
