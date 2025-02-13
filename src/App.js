import React, { useState } from 'react';
import { motion } from 'framer-motion';
import MapComponent from './MapComponent';
import './App.css';

// Animation variants
const fadeUp = {
  hidden: { y: 50, opacity: 0 },
  show: { y: 0, opacity: 1, transition: { duration: 0.8, ease: 'easeOut' } },
};

const scaleIn = {
  hidden: { scale: 0.95, opacity: 0 },
  show: { scale: 1, opacity: 1, transition: { duration: 0.5 } },
};

// Header with simple navigation functionality
function Header() {
  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="header">
      <h1 className="header-title" onClick={() => scrollTo('intro')}>
        ZeV's Place
      </h1>
      <nav className="nav-links">
        <button onClick={() => scrollTo('intro')}>Intro</button>
        <button onClick={() => scrollTo('menu')}>Menu</button>
        <button onClick={() => scrollTo('location')}>Locatie</button>
        <button onClick={() => scrollTo('hours')}>Openingstijden</button>
        <button onClick={() => scrollTo('contact')}>Contact</button>
      </nav>
    </header>
  );
}

// Landing Page using a fullscreen YouTube video as background
function LandingPage({ onContinue }) {
  return (
    <div className="landing-container" onClick={onContinue}>
      <div className="video-wrapper">
        <iframe
          className="video-background"
          src="https://www.youtube.com/embed/U0eCDEpZ51k?autoplay=1&mute=1&controls=0&loop=1&playlist=U0eCDEpZ51k&modestbranding=1&rel=0&start=20"
          frameBorder="0"
          allow="autoplay; fullscreen"
          title="Background Video"
        ></iframe>
      </div>
      <div className="landing-content">
        <h1 className="landing-heading">Welcome to ZeV's Place</h1>
        <p className="landing-subtext">Click anywhere to continue</p>
      </div>
    </div>
  );
}

// A reusable card component for each section
function SectionCard({ children, id }) {
  return (
    <div className="card" id={id}>
      {children}
    </div>
  );
}

// Divider between sections
function Divider() {
  return <div className="divider" />;
}

// Title/Introduction Section (full viewport height)
function TitleSection() {
  return (
    <>
      <SectionCard id="intro">
        <h1 className="title-heading">ZeV - Zuipen en Vreten</h1>
        <p className="title-description">
          ZeV heeft midden in Rotterdam een spot neergezet waar je kunt chillen, vreten en genieten van
          vette graffiti vibes. Neem de tijd en ontdek de unieke sfeer van onze plek.
        </p>
      </SectionCard>
      <Divider />
    </>
  );
}

// Menu Section (appears after scrolling)
function MenuSection() {
  const items = [
    'Bitterballen',
    'Kaastengels',
    'Mini Frikandellen',
    "Nacho's met kaas",
    'Kroketten',
  ];
  return (
    <>
      <SectionCard id="menu">
        <h2 className="menu-heading">Menu</h2>
        <ul className="menu-list">
          {items.map((item) => (
            <li key={item} className="menu-item">{item}</li>
          ))}
        </ul>
      </SectionCard>
      <Divider />
    </>
  );
}

// Location Section (always shows the map)
function LocationSection() {
  return (
    <>
      <SectionCard id="location">
        <h2 className="location-heading">Locatie</h2>
        <MapComponent />
      </SectionCard>
      <Divider />
    </>
  );
}

// Openingstijden Section (new layout)
function HoursSection() {
  return (
    <>
      <SectionCard id="hours">
        <h2 className="hours-heading">Openingstijden</h2>
        <div className="hours-card">
          <div className="hours-row">
            <span className="hours-day">Ma - Vr:</span>
            <span className="hours-time">15:00 - 02:00</span>
          </div>
          <div className="hours-row">
            <span className="hours-day">Za:</span>
            <span className="hours-time">13:00 - 04:00</span>
          </div>
          <div className="hours-row">
            <span className="hours-day">Zo:</span>
            <span className="hours-time">13:00 - 01:00</span>
          </div>
        </div>
      </SectionCard>
      <Divider />
    </>
  );
}

// Contact Modal (overlays all content)
function ContactModal({ isOpen, onClose, onSubmit }) {
  if (!isOpen) return null;
  return (
    <div className="modal-overlay">
      <motion.div className="modal-content" variants={scaleIn} initial="hidden" animate="show">
        <button onClick={onClose} className="modal-close">✕</button>
        <h2 className="modal-heading" style={{ fontFamily: 'Permanent Marker, sans-serif' }}>Contact</h2>
        <form onSubmit={onSubmit} className="contact-form">
          <input type="text" placeholder="Naam" required />
          <input type="email" placeholder="Email" required />
          <textarea placeholder="Bericht" required></textarea>
          <div className="contact-form-buttons">
            <button type="button" onClick={onClose} className="cancel-button">Sluit</button>
            <button type="submit" className="submit-button">Verzenden</button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}

// Main Site Component (shown after landing)
function ZeVGraffitiSite() {
  const [isModalOpen, setModalOpen] = useState(false);

  const handleContactSubmit = (e) => {
    e.preventDefault();
    alert('Email verzonden!');
    setModalOpen(false);
  };

  return (
    <>
      <Header />
      <div className="main-site">
        <TitleSection />
        <MenuSection />
        <LocationSection />
        <HoursSection />
        <div className="contact-button-container" id="contact">
          <motion.button
            className="contact-button"
            variants={scaleIn}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            onClick={() => setModalOpen(true)}
          >
            Contact
          </motion.button>
        </div>
        <ContactModal
          isOpen={isModalOpen}
          onClose={() => setModalOpen(false)}
          onSubmit={handleContactSubmit}
        />
      </div>
    </>
  );
}

function App() {
  const [showLanding, setShowLanding] = useState(true);

  return (
    <>
      {showLanding ? (
        <LandingPage onContinue={() => setShowLanding(false)} />
      ) : (
        <ZeVGraffitiSite />
      )}
    </>
  );
}

export default App;
