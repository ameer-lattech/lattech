
import Footer from "./components/Footer";
import LattechHeader from "./components/Headerop2";
import ServicesPinnedScroll from "./sections/Aboutservices";
import AwardsRecognition from "./sections/AwardsRecognition";
import LatestTechUpdatesSection from "./sections/Blogs";
import ContactSplitSection from "./sections/ContactSection";
import ContactInfoStrip from "./sections/Contactstrip";
import KeyFactsCounter from "./sections/Counter";
import FaqSplitSection from "./sections/Faqs";
import FeaturedCaseStudySlider from "./sections/FeaturedCaseStudySlider";
import Hero from "./sections/hero";
import IndustriesWeServed from "./sections/Industriesserved";
import NewsletterStrip from "./sections/Newsletterstrip";
import OurProcessPinnedScroll from "./sections/OurProcessPinnedScroll";
import ProjectSuccessSection from "./sections/ProjectSuccessSection";
import SecureSuccessSection from "./sections/Securesuccess";
import SolutionForEveryone from "./sections/SolutionForEveryone";
import StartProjectSection from "./sections/Startproject";
import JourneyTestimonials from "./sections/TestimonialsSection";
import TrustTransparencySection from "./sections/TrustTransparencySection";
import WhatsNewAtLattech from "./sections/WhatsNewAtLattech";
import WhatWeHaveBuilt from "./sections/WhatWeHaveBuilt";


export default function Home() {
  return (
    <div>
    {/* <LattechHeader/> */}
    <LattechHeader/>
      <Hero/>
      <AwardsRecognition/>
      <WhatsNewAtLattech/>
      <ServicesPinnedScroll/>
      <StartProjectSection/>
    <SolutionForEveryone/>
    <IndustriesWeServed/>
    <WhatWeHaveBuilt/>
    <OurProcessPinnedScroll/>
    <FeaturedCaseStudySlider/>
    <KeyFactsCounter/>
    <JourneyTestimonials/>
    <TrustTransparencySection/> 
    <ContactSplitSection/>
    <ProjectSuccessSection/>
      <SecureSuccessSection/> 
      <LatestTechUpdatesSection/>
      <FaqSplitSection/>
      <ContactInfoStrip/>
      <NewsletterStrip/>
      <Footer/>
      {/* <Services/>
      <About/>  
      <CaseStudies/>  
      <Benefits/> */}
    </div>
  );
}
