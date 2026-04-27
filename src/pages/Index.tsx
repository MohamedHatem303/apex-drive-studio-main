import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { Loader } from "@/components/showroom/Loader";
import { Navbar } from "@/components/showroom/Navbar";
import { Hero } from "@/components/showroom/Hero";
import { FeaturedCars } from "@/components/showroom/FeaturedCars";
import { CarViewer3D } from "@/components/showroom/CarViewer3D";
import { Compare } from "@/components/showroom/Compare";
import { Stats } from "@/components/showroom/Stats";
import { Interior } from "@/components/showroom/Interior";
import { Configurator } from "@/components/showroom/Configurator";
import { Testimonials } from "@/components/showroom/Testimonials";
import { Contact } from "@/components/showroom/Contact";
import { Footer } from "@/components/showroom/Footer";
import { useLenis } from "@/hooks/useLenis";

const Index = () => {
  const [loaded, setLoaded] = useState(false);
  useLenis();

  return (
    <>
      <AnimatePresence>{!loaded && <Loader onComplete={() => setLoaded(true)} />}</AnimatePresence>

      <main className="relative">
        <title>Apex Motors — Mercedes-AMG & BMW M Luxury Showroom</title>
        <meta
          name="description"
          content="A cinematic private showroom for Mercedes-AMG and BMW M performance cars. Explore, configure, and book a test drive."
        />
        <Navbar />
        <Hero />
        <FeaturedCars />
        <CarViewer3D />
        <Compare />
        <Stats />
        <Interior />
        <Configurator />
        <Testimonials />
        <Contact />
        <Footer />
      </main>
    </>
  );
};

export default Index;
