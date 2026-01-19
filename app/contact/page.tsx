import Footer from "../components/Footer";
import LattechHeader from "../components/Headerop2";
import ContactHero from "../sections/Contacthero";
import ContactUsSection from "../sections/ContactSection";
import ContactInfoStrip from "../sections/Contactstrip";
import NewsletterStrip from "../sections/Newsletterstrip";

export default function Contact() {
  return (
    <div>
       <LattechHeader/>
       <ContactHero/>
       <ContactUsSection/>
       <ContactInfoStrip/>
       <NewsletterStrip/>
     <Footer/>
    </div>
  );
}
