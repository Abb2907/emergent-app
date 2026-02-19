import React from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { LearningPaths } from './components/LearningPaths';
import { RepoGrid } from './components/RepoGrid';
import { ResourceLibrary } from './components/ResourceLibrary';
import { BadgeSystem } from './components/BadgeSystem';
import { NewsletterCTA } from './components/NewsletterCTA';
import { Footer } from './components/Footer';

function App() {
  return (
    <div className="min-h-screen text-white selection:bg-aether-primary selection:text-white">
      <Navbar />
      <Hero />
      <div className="relative">
        <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-aether-dark to-transparent z-10 pointer-events-none" />
        <LearningPaths />
        <RepoGrid />
        <ResourceLibrary />
        <BadgeSystem />
        <NewsletterCTA />
        <Footer />
      </div>
    </div>
  );
}

export default App;
