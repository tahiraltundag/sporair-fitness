import { Navbar }       from "@/components/Navbar";
import { Hero }         from "@/components/sections/Hero";
import { Stats }        from "@/components/sections/Stats";
import { ClassSchedule }from "@/components/sections/ClassSchedule";
import { ROICalculator }from "@/components/sections/ROICalculator";
import { Trainers }     from "@/components/sections/Trainers";
import { Testimonials } from "@/components/sections/Testimonials";
import { CTA }          from "@/components/sections/CTA";
import { Footer }       from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Stats />
        <ClassSchedule />
        <ROICalculator />
        <Trainers />
        <Testimonials />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
