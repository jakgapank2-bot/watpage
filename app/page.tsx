import About from "@/components/About";
import Contact from "@/components/Contact";
import CTA from "@/components/CTA";
import FloatingContact from "@/components/FloatingContact";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import Portfolio from "@/components/Portfolio";
import Process from "@/components/Process";
import Services from "@/components/Services";
import { services } from "@/data/services";
import { contact, site } from "@/data/site";

/** ข้อมูลโครงสร้าง (JSON-LD) ช่วยให้ Google เข้าใจข้อมูลธุรกิจ */
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: site.name,
  slogan: site.tagline,
  description: site.description,
  url: site.url,
  telephone: contact.phone,
  areaServed: "TH",
  openingHours: "Mo-Sa 09:00-18:00",
  makesOffer: services.map((service) => ({
    "@type": "Offer",
    itemOffered: { "@type": "Service", name: service.title, description: service.description },
  })),
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Navbar />

      <main className="flex-1">
        <Hero />
        <Services />
        <Portfolio />
        <About />
        <Process />
        <CTA />
        <Contact />
      </main>

      <Footer />
      <FloatingContact />
    </>
  );
}
