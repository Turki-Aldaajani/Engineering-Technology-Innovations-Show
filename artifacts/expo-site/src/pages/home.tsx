import { Navbar } from "@/components/sections/navbar";
import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { Audience } from "@/components/sections/audience";
import { Why } from "@/components/sections/why";
import { FAQ } from "@/components/sections/faq";
import { Speakers } from "@/components/sections/speakers";
import { Workshops } from "@/components/sections/workshops";
import { SponsorsPartners } from "@/components/sections/sponsors-partners";
import { ContactFooter } from "@/components/sections/contact-footer";

export default function Home() {
  return (
    <div className="min-h-[100dvh] flex flex-col w-full overflow-x-hidden font-sans text-primary-foreground bg-background">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <About />
        <Audience />
        <Why />
        <Speakers />
        <Workshops />
        <SponsorsPartners />
        <FAQ />
        <ContactFooter />
      </main>
    </div>
  );
}
