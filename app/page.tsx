import React from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import Services from '../components/Services';
import About from '../components/About';
import Doctors from '../components/Doctors';
import Testimonials from '../components/Testimonials';
import Articles from '../components/Articles';
import FAQ from '../components/FAQ';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <Header />
      <Hero />
      <Services />
      <About />
      <Doctors />
      <Articles />
      <Testimonials />
      <FAQ />
      <Footer />
    </main>
  );
}
