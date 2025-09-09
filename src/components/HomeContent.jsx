
import { useState } from "react";

import Hero from "./Home";
import About from "./About";
import Services from "./Services";
import Instructors from "./Instructors";
import Portfolio from "./Portfolio";
import Gallery from "./Gallery";
import Testimonials from "./Testimonials";
import Contact from "./Contact";

export default function HomeContent() {

  const [showLogin, setShowLogin] = useState(false);
    const [showRegister, setShowRegister] = useState(false);
  return (
    <>
      <Hero 
      onSignIn={() => setShowLogin(true)}
        onSignUp={() => setShowRegister(true)}
      />
      <About />
      <Services />
      <Instructors />
      <Portfolio />
      <Gallery />
      <Testimonials />
      <Contact />

      {showLogin && <LoginModal onClose={() => setShowLogin(false)} />}
            {showRegister && <RegisterModal onClose={() => setShowRegister(false)} />}
    </>
  );
}
