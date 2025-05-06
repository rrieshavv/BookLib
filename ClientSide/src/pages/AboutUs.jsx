import React, { useRef } from 'react';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import AboutUsValues from '../components/AboutUsValues';
import AboutUsTeamMembers from '../components/AboutUsTeamMembers';
import AboutUsHero from '../components/AboutUsHero';

const AboutUsPage = () => {
  // Create a ref for the team members section
  const teamMembersRef = useRef(null);

  // Scroll to team members section on button click
  const scrollToTeamMembers = () => {
    if (teamMembersRef.current) {
      teamMembersRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Hero Section with navbar overlay */}
      <AboutUsHero scrollToTeamMembers={scrollToTeamMembers} />  {/* Pass scroll function to Hero section */}

      {/* Team Members Section with improved cards */}
      <div ref={teamMembersRef}> {/* Reference for scrolling */}
        <AboutUsTeamMembers />
      </div>

      {/* Values Section */}
      <AboutUsValues />

      <Footer />
    </>
  );
};

export default AboutUsPage;
