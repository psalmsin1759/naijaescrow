import NavBar from "@/components/header/NavBar";
import Hero from "@/components/home/Hero";
import Workflow from "@/components/home/Workflow";
import Testimonial from "@/components/home/Testimonial";
import Footer from "@/components/Footer/Footer";

export default function Home() {
  return (
    <div className="overflow-x-hidden">
        
        {/* Navbar */}
        <NavBar />
        {/* Hero  */}
        <Hero />
        {/* Banner */}
        <Workflow />
        {/* Workflow  */}
        {/* Testimonial  */}
        <Testimonial />
        {/* Footer  */}
        <Footer />

    </div>
  );
}
