import { Hero } from "@/components/sections/Hero";
import { TrustBar } from "@/components/sections/TrustBar";
import { AudienceSelector } from "@/components/sections/AudienceSelector";
import { Technologies } from "@/components/sections/Technologies";
import { MirasTeaser } from "@/components/sections/MirasTeaser";
import { Cases } from "@/components/sections/Cases";
import { Markets } from "@/components/sections/Markets";
import { Partners } from "@/components/sections/Partners";
import { Certifications } from "@/components/sections/Certifications";
import { Contact } from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      <Hero />
      <TrustBar />
      <AudienceSelector />
      <Technologies />
      <MirasTeaser />
      <Cases />
      <Markets />
      <Partners />
      <Certifications />
      <Contact />
    </>
  );
}
