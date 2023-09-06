import { benefitOne, benefitTwo } from "./components/data";

import Benefits from "./components/benefits";
import Cta from "./components/cta";
import Faq from "./components/faq";
import Footer from "./components/footer";
import Hero from "./components/hero";
import Navbar from "./components/navbar";
import SectionTitle from "./components/sectionTitle";
import Testimonials from "./components/testimonials";

const Landing = () => {
  return (
    <div className="scroll-smooth">
        <div className="tablet:h-full">
            <Navbar />
            <Hero />
        </div>
      <SectionTitle
        pretitle="Nexhr Benefits"
        title="Why should you use this NexHR ">
        NexHR is a system that automates complete HR operations support Integrations & guarantee speed without complexities If you are here to automate your HR operations.
      </SectionTitle>
      <Benefits data={benefitOne} />
      <Benefits imgPos="right" data={benefitTwo} />
      <SectionTitle
        pretitle="Testimonials"
        title="Here's what our customers said">
        Testimonails is a great way to increase the brand trust and awareness.
        Use this section to highlight your popular customers.
      </SectionTitle>
      <Testimonials />
      <SectionTitle pretitle="FAQ" title="Frequently Asked Questions">
        Answer your customers possible questions here, it will increase the
        conversion rate as well as support or chat requests.
      </SectionTitle>
      <Faq />
      <Cta />
      <Footer />
    </div>
  );
}

export default Landing;