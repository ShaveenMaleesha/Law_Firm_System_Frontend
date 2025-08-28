import { useState } from "react";
import { Link } from "react-router";
import PageMeta from "../components/common/PageMeta";
import ConsultationModal from "../components/common/ConsultationModal";
import { ThemeProvider, useTheme } from "../context/ThemeProvider";
import "./landing-page.css";

function LandingPageContent() {
  const [isConsultationModalOpen, setIsConsultationModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  const openConsultationModal = () => setIsConsultationModalOpen(true);
  const closeConsultationModal = () => setIsConsultationModalOpen(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false); // Close mobile menu after navigation
    }
  };

  const navItems = [
    { id: 'hero', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'practice-areas', label: 'Practice Areas' },
    { id: 'blog', label: 'Blog' },
    { id: 'consultation', label: 'Contact' },
  ];

  return (
    <>
      <PageMeta
        title="ASM Legal Association - Law Firm Management System"
        description="Professional law firm management system for efficient case management, client relations, and legal practice administration"
      />
      
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
        {/* Navigation Header */}
        <nav className="bg-white/90 backdrop-blur-md shadow-sm border-b border-gray-200 dark:bg-gray-800/90 dark:border-gray-700 fixed top-0 left-0 right-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-4">
              <div className="flex items-center space-x-3">
                <img 
                  src={theme === 'dark' ? '/images/logo/logo-low-black.png' : '/images/logo/logo-law.png'}
                  alt="ASM Legal Association"
                  className="w-10 h-10 logo-transition"
                />
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">ASM Legal Association</h1>
              </div>
              
              {/* Desktop Navigation Links */}
              <div className="hidden md:flex items-center space-x-8">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className="text-gray-600 hover:text-gray-700 dark:text-gray-300 dark:hover:text-blue-400 transition-colors font-medium"
                  >
                    {item.label}
                  </button>
                ))}
              </div>
              
              <div className="flex items-center space-x-4">
                {/* Dark Mode Toggle */}
                <button
                  onClick={toggleTheme}
                  className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 transition-colors"
                  aria-label="Toggle dark mode"
                >
                  {theme === 'dark' ? (
                    <svg className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.166a.75.75 0 00-1.06-1.06l-1.591 1.59a.75.75 0 101.06 1.061l1.591-1.59zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM17.834 18.894a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 10-1.061 1.06l1.59 1.591zM12 18a.75.75 0 01.75.75V21a.75.75 0 01-1.5 0v-2.25A.75.75 0 0112 18zM7.758 17.303a.75.75 0 00-1.061-1.06l-1.591 1.59a.75.75 0 001.06 1.061l1.591-1.59zM6 12a.75.75 0 01-.75.75H3a.75.75 0 010-1.5h2.25A.75.75 0 016 12zM6.697 7.757a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 00-1.061 1.06l1.59 1.591z" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5 text-gray-700" fill="currentColor" viewBox="0 0 24 24">
                      <path fillRule="evenodd" d="M9.528 1.718a.75.75 0 01.162.819A8.97 8.97 0 009 6a9 9 0 009 9 8.97 8.97 0 003.463-.69.75.75 0 01.981.98 10.503 10.503 0 01-9.694 6.46c-5.799 0-10.5-4.701-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 01.818.162z" clipRule="evenodd" />
                    </svg>
                  )}
                </button>
                
                {/* Desktop Auth Buttons */}
                <div className="hidden md:flex items-center space-x-4">
                  <Link
                    to="/signin"
                    className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors"
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/signup"
                    className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-2 rounded-lg transition-colors"
                    style={{ backgroundColor: 'rgb(146, 148, 146)' }}
                  >
                    Get Started
                  </Link>
                </div>

                {/* Mobile Menu Button */}
                <button
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="md:hidden p-2 rounded-lg bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 transition-colors"
                  aria-label="Toggle mobile menu"
                >
                  {isMobileMenuOpen ? (
                    <svg className="w-6 h-6 text-gray-700 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  ) : (
                    <svg className="w-6 h-6 text-gray-700 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
              <div className="md:hidden border-t border-gray-200 dark:border-gray-700 py-4">
                <div className="flex flex-col space-y-4">
                  {navItems.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => scrollToSection(item.id)}
                      className="text-left text-gray-600 hover:text-gray-700 dark:text-gray-300 dark:hover:text-blue-400 transition-colors font-medium py-2"
                    >
                      {item.label}
                    </button>
                  ))}
                  <div className="flex flex-col space-y-2 pt-4 border-t border-gray-200 dark:border-gray-700">
                    <Link
                      to="/signin"
                      className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors py-2"
                    >
                      Sign In
                    </Link>
                    <Link
                      to="/signup"
                      className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-2 rounded-lg transition-colors text-center"
                      style={{ backgroundColor: 'rgb(146, 148, 146)' }}
                    >
                      Get Started
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>
        </nav>

        {/* Hero Section */}
        <section id="hero" className="relative py-20 pt-32 px-4 sm:px-6 lg:px-8 overflow-hidden">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Left Content */}
              <div>
                <div className="mb-6">
                  <span 
                    className="inline-block bg-gray-100 dark:bg-blue-900 text-gray-800 dark:text-blue-200 px-4 py-2 rounded-full text-sm font-medium"
                    style={{ backgroundColor: 'rgba(146, 148, 146, 0.1)', color: 'rgb(146, 148, 146)' }}
                  >
                    Leading Law Firm Management
                  </span>
                </div>
                <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
                  Justice & Legal
                  <span style={{ color: 'rgb(146, 148, 146)' }}> Solutions</span>
                </h1>
                <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                  We are supported by diverse practice areas including corporate law, litigation, 
                  real estate, and family law. Our comprehensive management system streamlines 
                  your legal practice for maximum efficiency.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link
                    to="/signup"
                    className="bg-gray-600 hover:bg-gray-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-colors inline-flex items-center justify-center"
                    style={{ backgroundColor: 'rgb(146, 148, 146)' }}
                  >
                    Get Started Today
                    <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                  <button
                    onClick={openConsultationModal}
                    className="border-2 text-gray-600 hover:text-white px-8 py-4 rounded-lg text-lg font-semibold transition-colors inline-flex items-center justify-center"
                    style={{ 
                      borderColor: 'rgb(146, 148, 146)', 
                      color: 'rgb(146, 148, 146)'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = 'rgb(146, 148, 146)';
                      e.currentTarget.style.color = 'white';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'transparent';
                      e.currentTarget.style.color = 'rgb(146, 148, 146)';
                    }}
                  >
                    Contact Us
                  </button>
                </div>
              </div>
              
              {/* Right Image */}
              <div className="relative">
                <div className="relative z-10">
                  <div 
                    className="w-full h-96 bg-gradient-to-br from-gray-600 to-gray-800 rounded-lg shadow-2xl flex items-center justify-center text-white"
                    style={{ background: 'linear-gradient(to bottom right, rgb(146, 148, 146), rgb(120, 122, 120))' }}
                  >
                    <div className="text-center">
                      <svg className="w-20 h-20 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      <h3 className="text-xl font-semibold">Professional Legal Expert</h3>
                      <p className="text-blue-100">Experienced Attorney</p>
                    </div>
                  </div>
                </div>
                {/* Background decorations */}
                <div 
                  className="absolute top-4 left-4 w-full h-full bg-gray-700 rounded-lg -z-10"
                  style={{ backgroundColor: 'rgb(120, 122, 120)' }}
                ></div>
                <div 
                  className="absolute -top-4 -right-4 w-24 h-24 bg-yellow-400 rounded-full opacity-20"
                  style={{ backgroundColor: 'rgba(146, 148, 146, 0.3)' }}
                ></div>
                <div 
                  className="absolute bottom-10 -left-6 w-16 h-16 bg-gray-600 rounded-full opacity-30"
                  style={{ backgroundColor: 'rgba(146, 148, 146, 0.5)' }}
                ></div>
              </div>
            </div>
          </div>
        </section>

        {/* About Us Section */}
        <section id="about" className="py-20 bg-white dark:bg-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              {/* Left Image */}
              <div className="relative">
                <div className="w-full h-80 bg-gradient-to-br from-gray-600 to-gray-800 rounded-lg shadow-lg flex items-center justify-center text-white">
                  <div className="text-center">
                    <svg className="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                    <h4 className="text-lg font-semibold">Legal Professional</h4>
                  </div>
                </div>
                <div 
                  className="absolute -bottom-6 -right-6 bg-gray-600 text-white p-6 rounded-lg shadow-lg"
                  style={{ backgroundColor: 'rgb(146, 148, 146)' }}
                >
                  <div className="text-3xl font-bold">25+</div>
                  <div className="text-sm">Years Experience</div>
                </div>
              </div>
              
              {/* Right Content */}
              <div>
                <div className="mb-6">
                  <span 
                    className="text-gray-600 font-semibold text-lg"
                    style={{ color: 'rgb(146, 148, 146)' }}
                  >
                    About Us
                  </span>
                  <h2 className="text-4xl font-bold text-gray-900 dark:text-white mt-2 mb-6">
                    Professional Legal Services You Can Trust
                  </h2>
                </div>
                <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                  With over two decades of experience in providing comprehensive legal solutions, 
                  we have built a reputation for excellence, integrity, and results. Our team of 
                  seasoned attorneys specializes in various practice areas to serve your needs.
                </p>
                <p className="text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                  We understand that legal matters can be complex and overwhelming. That's why we're 
                  committed to providing personalized attention and clear communication throughout 
                  your case, ensuring you're informed every step of the way.
                </p>
                <div className="grid grid-cols-2 gap-6 mb-8">
                  <div className="text-center">
                    <div 
                      className="text-3xl font-bold text-gray-600"
                      style={{ color: 'rgb(146, 148, 146)' }}
                    >
                      500+
                    </div>
                    <div className="text-gray-600 dark:text-gray-300">Cases Won</div>
                  </div>
                  <div className="text-center">
                    <div 
                      className="text-3xl font-bold text-gray-600"
                      style={{ color: 'rgb(146, 148, 146)' }}
                    >
                      1000+
                    </div>
                    <div className="text-gray-600 dark:text-gray-300">Happy Clients</div>
                  </div>
                </div>
                <Link
                  to="/about"
                  className="bg-gray-600 hover:bg-gray-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors inline-flex items-center"
                  style={{ backgroundColor: 'rgb(146, 148, 146)' }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgb(120, 122, 120)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgb(146, 148, 146)';
                  }}
                >
                  Learn More
                  <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Practice Areas Section */}
        <section id="practice-areas" className="py-20 bg-gray-50 dark:bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <span 
                className="text-gray-600 font-semibold text-lg"
                style={{ color: 'rgb(146, 148, 146)' }}
              >
                Our Practice
              </span>
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white mt-2 mb-4">
                Areas Of Practice
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                Our experienced attorneys provide comprehensive legal services across multiple practice areas
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Foreign Investment */}
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 hover:shadow-xl transition-all duration-300 group">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Foreign Investment</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">
                  International investment strategies and regulatory compliance.
                </p>
                <Link to="/foreign-investment" className="text-blue-600 hover:text-blue-700 font-medium text-sm inline-flex items-center">
                  Learn More
                  <svg className="ml-1 w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>

              {/* Banking & Finance */}
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 hover:shadow-xl transition-all duration-300 group">
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <svg className="w-6 h-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Banking & Finance</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">
                  Financial regulations, lending agreements, and banking law.
                </p>
                <Link to="/banking-finance" className="text-green-600 hover:text-green-700 font-medium text-sm inline-flex items-center">
                  Learn More
                  <svg className="ml-1 w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>

              {/* Capital Markets & Securities */}
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 hover:shadow-xl transition-all duration-300 group">
                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <svg className="w-6 h-6 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 00-2-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v6a2 2 0 01-2 2H9z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Capital Markets & Securities</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">
                  Securities law, IPOs, and capital market transactions.
                </p>
                <Link to="/capital-markets" className="text-purple-600 hover:text-purple-700 font-medium text-sm inline-flex items-center">
                  Learn More
                  <svg className="ml-1 w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>

              {/* Mergers and Acquisitions */}
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 hover:shadow-xl transition-all duration-300 group">
                <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <svg className="w-6 h-6 text-orange-600 dark:text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Mergers and Acquisitions</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">
                  Corporate M&A transactions and due diligence.
                </p>
                <Link to="/mergers-acquisitions" className="text-orange-600 hover:text-orange-700 font-medium text-sm inline-flex items-center">
                  Learn More
                  <svg className="ml-1 w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>

              {/* Competition and Anti-trust */}
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 hover:shadow-xl transition-all duration-300 group">
                <div className="w-12 h-12 bg-red-100 dark:bg-red-900 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <svg className="w-6 h-6 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Competition and Anti-trust</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">
                  Competition law and antitrust compliance.
                </p>
                <Link to="/competition-antitrust" className="text-red-600 hover:text-red-700 font-medium text-sm inline-flex items-center">
                  Learn More
                  <svg className="ml-1 w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>

              {/* Infrastructure Development */}
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 hover:shadow-xl transition-all duration-300 group">
                <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <svg className="w-6 h-6 text-indigo-600 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Infrastructure Development</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">
                  Large-scale infrastructure and public projects.
                </p>
                <Link to="/infrastructure" className="text-indigo-600 hover:text-indigo-700 font-medium text-sm inline-flex items-center">
                  Learn More
                  <svg className="ml-1 w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>

              {/* Construction, Real Estate, Labour */}
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 hover:shadow-xl transition-all duration-300 group">
                <div className="w-12 h-12 bg-yellow-100 dark:bg-yellow-900 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <svg className="w-6 h-6 text-yellow-600 dark:text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Construction, Real Estate, Labour</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">
                  Construction contracts, property law, and labor disputes.
                </p>
                <Link to="/construction-realestate" className="text-yellow-600 hover:text-yellow-700 font-medium text-sm inline-flex items-center">
                  Learn More
                  <svg className="ml-1 w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>

              {/* Employment and Immigration */}
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 hover:shadow-xl transition-all duration-300 group">
                <div className="w-12 h-12 bg-pink-100 dark:bg-pink-900 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <svg className="w-6 h-6 text-pink-600 dark:text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V2a2 2 0 012 2v2m0 0v.5c0 .553.45 1.003 1.003 1 .552 0 .997-.447.997-1V6zm2 8.5c0 2.485-4.03 4.5-9 4.5s-9-2.015-9-4.5" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Employment and Immigration</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">
                  Workplace law and immigration legal services.
                </p>
                <Link to="/employment-immigration" className="text-pink-600 hover:text-pink-700 font-medium text-sm inline-flex items-center">
                  Learn More
                  <svg className="ml-1 w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>

              {/* Restructuring and Insolvency */}
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 hover:shadow-xl transition-all duration-300 group">
                <div className="w-12 h-12 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <svg className="w-6 h-6 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Restructuring and Insolvency</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">
                  Corporate restructuring and bankruptcy proceedings.
                </p>
                <Link to="/restructuring-insolvency" className="text-gray-600 hover:text-gray-700 font-medium text-sm inline-flex items-center">
                  Learn More
                  <svg className="ml-1 w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>

              {/* Intellectual Property */}
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 hover:shadow-xl transition-all duration-300 group">
                <div className="w-12 h-12 bg-cyan-100 dark:bg-cyan-900 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <svg className="w-6 h-6 text-cyan-600 dark:text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Intellectual Property</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">
                  Patents, trademarks, copyrights, and IP protection.
                </p>
                <Link to="/intellectual-property" className="text-cyan-600 hover:text-cyan-700 font-medium text-sm inline-flex items-center">
                  Learn More
                  <svg className="ml-1 w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>

              {/* Information Technology */}
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 hover:shadow-xl transition-all duration-300 group">
                <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <svg className="w-6 h-6 text-emerald-600 dark:text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Information Technology</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">
                  Technology law, data protection, and cyber security.
                </p>
                <Link to="/information-technology" className="text-emerald-600 hover:text-emerald-700 font-medium text-sm inline-flex items-center">
                  Learn More
                  <svg className="ml-1 w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>

              {/* Admiralty and Shipping */}
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 hover:shadow-xl transition-all duration-300 group">
                <div className="w-12 h-12 bg-teal-100 dark:bg-teal-900 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <svg className="w-6 h-6 text-teal-600 dark:text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 12H5m14 0a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Admiralty and Shipping</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">
                  Maritime law, shipping disputes, and port regulations.
                </p>
                <Link to="/admiralty-shipping" className="text-teal-600 hover:text-teal-700 font-medium text-sm inline-flex items-center">
                  Learn More
                  <svg className="ml-1 w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>

              {/* Litigation and Dispute Resolution */}
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 hover:shadow-xl transition-all duration-300 group">
                <div className="w-12 h-12 bg-rose-100 dark:bg-rose-900 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <svg className="w-6 h-6 text-rose-600 dark:text-rose-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16l-3-9m3 9l3-9" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Litigation and Dispute Resolution</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">
                  Court litigation, arbitration, and mediation services.
                </p>
                <Link to="/litigation-disputes" className="text-rose-600 hover:text-rose-700 font-medium text-sm inline-flex items-center">
                  Learn More
                  <svg className="ml-1 w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>

              {/* Tax */}
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 hover:shadow-xl transition-all duration-300 group">
                <div className="w-12 h-12 bg-amber-100 dark:bg-amber-900 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <svg className="w-6 h-6 text-amber-600 dark:text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Tax</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">
                  Tax planning, compliance, and dispute resolution.
                </p>
                <Link to="/tax" className="text-amber-600 hover:text-amber-700 font-medium text-sm inline-flex items-center">
                  Learn More
                  <svg className="ml-1 w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>

              {/* Family Law and Testamentary */}
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 hover:shadow-xl transition-all duration-300 group">
                <div className="w-12 h-12 bg-violet-100 dark:bg-violet-900 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <svg className="w-6 h-6 text-violet-600 dark:text-violet-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Family Law and Testamentary</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">
                  Family matters, wills, estates, and probate law.
                </p>
                <Link to="/family-testamentary" className="text-violet-600 hover:text-violet-700 font-medium text-sm inline-flex items-center">
                  Learn More
                  <svg className="ml-1 w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>

              {/* Company Secretaries */}
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 hover:shadow-xl transition-all duration-300 group">
                <div className="w-12 h-12 bg-slate-100 dark:bg-slate-700 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <svg className="w-6 h-6 text-slate-600 dark:text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Company Secretaries</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">
                  Corporate governance and secretarial services.
                </p>
                <Link to="/company-secretaries" className="text-slate-600 hover:text-slate-700 font-medium text-sm inline-flex items-center">
                  Learn More
                  <svg className="ml-1 w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Blog Section */}
        <section id="blog" className="py-20 bg-white dark:bg-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <span 
                className="text-gray-600 font-semibold text-lg"
                style={{ color: 'rgb(146, 148, 146)' }}
              >
                From Our Blog
              </span>
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white mt-2 mb-4">
                Latest Legal Insights
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                Stay informed with our latest articles and legal updates
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Blog Post 1 */}
              <article className="bg-gray-50 dark:bg-gray-700 rounded-xl overflow-hidden hover:shadow-lg transition-shadow">
                <div 
                  className="w-full h-48 bg-gradient-to-br from-gray-500 to-gray-700 flex items-center justify-center text-white"
                  style={{ background: 'linear-gradient(to bottom right, rgb(146, 148, 146), rgb(120, 122, 120))' }}
                >
                  <div className="text-center">
                    <svg className="w-12 h-12 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <span className="text-sm font-medium">Legal Advice</span>
                  </div>
                </div>
                <div className="p-6">
                  <div 
                    className="text-sm text-gray-600 mb-2"
                    style={{ color: 'rgb(146, 148, 146)' }}
                  >
                    Legal Advice
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                    Understanding Your Rights in Employment Disputes
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    Learn about your rights and options when facing workplace discrimination or wrongful termination.
                  </p>
                  <Link 
                    to="/blog/employment-rights" 
                    className="text-gray-600 hover:text-gray-700 font-medium"
                    style={{ color: 'rgb(146, 148, 146)' }}
                  >
                    Read More →
                  </Link>
                </div>
              </article>

              {/* Blog Post 2 */}
              <article className="bg-gray-50 dark:bg-gray-700 rounded-xl overflow-hidden hover:shadow-lg transition-shadow">
                <div 
                  className="w-full h-48 bg-gradient-to-br from-green-500 to-green-700 flex items-center justify-center text-white"
                  style={{ background: 'linear-gradient(to bottom right, rgb(146, 148, 146), rgb(120, 122, 120))' }}
                >
                  <div className="text-center">
                    <svg className="w-12 h-12 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                    <span className="text-sm font-medium">Corporate Law</span>
                  </div>
                </div>
                <div className="p-6">
                  <div 
                    className="text-sm text-gray-600 mb-2"
                    style={{ color: 'rgb(146, 148, 146)' }}
                  >
                    Corporate Law
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                    Key Considerations for Business Mergers
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    Essential legal aspects to consider when planning a merger or acquisition for your business.
                  </p>
                  <Link 
                    to="/blog/business-mergers" 
                    className="text-gray-600 hover:text-gray-700 font-medium"
                    style={{ color: 'rgb(146, 148, 146)' }}
                  >
                    Read More →
                  </Link>
                </div>
              </article>

              {/* Blog Post 3 */}
              <article className="bg-gray-50 dark:bg-gray-700 rounded-xl overflow-hidden hover:shadow-lg transition-shadow">
                <div 
                  className="w-full h-48 bg-gradient-to-br from-purple-500 to-purple-700 flex items-center justify-center text-white"
                  style={{ background: 'linear-gradient(to bottom right, rgb(146, 148, 146), rgb(120, 122, 120))' }}
                >
                  <div className="text-center">
                    <svg className="w-12 h-12 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    <span className="text-sm font-medium">Family Law</span>
                  </div>
                </div>
                <div className="p-6">
                  <div 
                    className="text-sm text-gray-600 mb-2"
                    style={{ color: 'rgb(146, 148, 146)' }}
                  >
                    Family Law
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                    Navigating Child Custody Agreements
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    A comprehensive guide to understanding child custody laws and creating effective agreements.
                  </p>
                  <Link 
                    to="/blog/child-custody" 
                    className="text-gray-600 hover:text-gray-700 font-medium"
                    style={{ color: 'rgb(146, 148, 146)' }}
                  >
                    Read More →
                  </Link>
                </div>
              </article>
            </div>
            
            <div className="text-center mt-12">
              <Link
                to="/blog"
                className="bg-gray-600 hover:bg-gray-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors inline-flex items-center"
                style={{ backgroundColor: 'rgb(146, 148, 146)' }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgb(120, 122, 120)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgb(146, 148, 146)';
                }}
              >
                View All Articles
                <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </div>
        </section>

        {/* Consultation CTA Section */}
        <section 
          id="consultation" 
          className="py-20 bg-gradient-to-r from-gray-600 to-gray-700"
          style={{ background: 'linear-gradient(to right, rgb(146, 148, 146), rgb(120, 122, 120))' }}
        >
          <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-bold text-white mb-4">
              Need Legal Consultation?
            </h2>
            <p className="text-xl text-gray-100 mb-8">
              Get expert legal advice from our experienced attorneys. Schedule your consultation today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={openConsultationModal}
                className="bg-white text-gray-600 hover:bg-gray-100 px-8 py-3 rounded-lg text-lg font-semibold transition-colors inline-flex items-center justify-center"
                style={{ color: 'rgb(146, 148, 146)' }}
              >
                Schedule Consultation
                <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </button>
              <Link
                to="/contact"
                className="border-2 border-white text-white hover:bg-white px-8 py-3 rounded-lg text-lg font-semibold transition-colors inline-flex items-center justify-center"
                style={{ color: 'white' }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'white';
                  e.currentTarget.style.color = 'rgb(146, 148, 146)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.color = 'white';
                }}
              >
                Call Now: (555) 123-4567
                <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </Link>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-gray-900 text-white py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="col-span-1 md:col-span-2">
                <div className="flex items-center space-x-3 mb-4">
                  <div 
                    className="w-8 h-8 bg-gradient-to-r from-gray-600 to-gray-700 rounded-lg flex items-center justify-center"
                    style={{ background: 'linear-gradient(to right, rgb(146, 148, 146), rgb(120, 122, 120))' }}
                  >
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5a2 2 0 012-2h4a2 2 0 012 2v4H8V5z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold">ASM Legal Association</h3>
                </div>
                <p className="text-gray-400 max-w-md">
                  The leading law firm management system designed to streamline your legal practice and improve client relationships.
                </p>
              </div>
              
              <div>
                <h4 className="text-lg font-semibold mb-4">Product</h4>
                <ul className="space-y-2 text-gray-400">
                  <li><Link to="/features" className="hover:text-white transition-colors">Features</Link></li>
                  <li><Link to="/pricing" className="hover:text-white transition-colors">Pricing</Link></li>
                  <li><Link to="/security" className="hover:text-white transition-colors">Security</Link></li>
                </ul>
              </div>
              
              <div>
                <h4 className="text-lg font-semibold mb-4">Company</h4>
                <ul className="space-y-2 text-gray-400">
                  <li><Link to="/about" className="hover:text-white transition-colors">About Us</Link></li>
                  <li><Link to="/contact" className="hover:text-white transition-colors">Contact</Link></li>
                  <li><Link to="/support" className="hover:text-white transition-colors">Support</Link></li>
                </ul>
              </div>
            </div>
            
            <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
              <p>&copy; 2025 ASM Legal Association. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>

      {/* Consultation Modal */}
      <ConsultationModal 
        isOpen={isConsultationModalOpen} 
        onClose={closeConsultationModal} 
      />
    </>
  );
}

export default function LandingPage() {
  return (
    <ThemeProvider>
      <LandingPageContent />
    </ThemeProvider>
  );
}
