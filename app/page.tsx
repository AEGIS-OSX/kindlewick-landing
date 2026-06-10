import { Nav } from "@/app/components/Nav";
import { Hero } from "@/app/components/Hero";
import TheCollection from "@/components/TheCollection";
import { OurCraft } from "@/app/components/OurCraft";
import Footer from "@/app/components/Footer";

export default function Home() {
  return (
    <main id="top">
      <Nav />
      <Hero />
      <TheCollection />
      <OurCraft />
      <Footer />
    </main>
  );
}
