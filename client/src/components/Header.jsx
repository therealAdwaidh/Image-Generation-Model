import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { Sparkles, LogOut, User } from 'lucide-react';

const Header = () => {
  const { currentUser, googleSignIn, logout } = useAuth();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSignIn = async () => {
    try {
      await googleSignIn();
    } catch (error) {
      console.error("Failed to sign in", error);
    }
  };

  const handleSignOut = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("Failed to log out", error);
    }
  };

  return (
    <motion.header 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 30, delay: 0.1 }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        display: 'flex',
        justifyContent: 'center',
        padding: scrolled ? '1rem' : '1.5rem 2rem',
        transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
      }}
    >
      <div 
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: scrolled ? 'rgba(15, 15, 20, 0.75)' : 'rgba(15, 15, 20, 0.4)',
          backdropFilter: 'blur(24px) saturate(180%)',
          WebkitBackdropFilter: 'blur(24px)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          borderRadius: scrolled ? '2rem' : '1.5rem',
          padding: '0.75rem 1.5rem',
          width: '100%',
          maxWidth: '1000px',
          boxShadow: scrolled ? '0 20px 40px -10px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.1)' : '0 10px 30px -10px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.05)',
          transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        <motion.a 
          href="#hero"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          style={{ 
            cursor: 'pointer', 
            textDecoration: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'linear-gradient(135deg, rgba(0, 255, 231, 0.2), rgba(123, 92, 255, 0.2))',
            padding: '0.6rem',
            borderRadius: '1rem',
            border: '1px solid rgba(0, 255, 231, 0.15)'
          }}
        >
          <Sparkles size={20} color="#00FFE7" style={{ filter: 'drop-shadow(0 0 8px rgba(0, 255, 231, 0.6))' }} />
        </motion.a>
        
        <nav className="header-nav">
          {['Models', 'Features', 'Pricing'].map((item) => (
            <motion.a 
              key={item}
              href={`#${item.toLowerCase()}`} 
              whileHover={{ y: -2, color: '#00FFE7' }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
              style={{
                color: 'rgba(255, 255, 255, 0.7)',
                fontSize: '0.9rem',
                fontWeight: 600,
                letterSpacing: '0.05em',
                textTransform: 'uppercase',
                textDecoration: 'none',
                position: 'relative',
                transition: 'color 0.2s ease',
              }}
            >
              {item}
            </motion.a>
          ))}
        </nav>
        
        <div style={{ display: 'flex', alignItems: 'center' }}>
          {!currentUser ? (
            <motion.button 
              whileHover={{ scale: 1.05, background: 'rgba(0, 255, 231, 0.15)', borderColor: 'rgba(0, 255, 231, 0.5)', color: '#00FFE7' }}
              whileTap={{ scale: 0.95 }}
              onClick={handleSignIn}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                color: '#fff',
                padding: '0.5rem 1.25rem',
                borderRadius: '9999px',
                fontSize: '0.85rem',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                boxShadow: '0 0 15px rgba(0, 255, 231, 0.0)'
              }}
            >
              <User size={16} />
              <span>Sign In</span>
            </motion.button>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', background: 'rgba(255, 255, 255, 0.03)', padding: '0.35rem 0.35rem 0.35rem 0.75rem', borderRadius: '9999px', border: '1px solid rgba(255, 255, 255, 0.05)' }}>
              <span style={{ fontSize: '0.85rem', color: 'rgba(255, 255, 255, 0.8)', fontWeight: 600, maxWidth: '100px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {currentUser.displayName || 'User'}
              </span>
              {currentUser.photoURL ? (
                <motion.img 
                  whileHover={{ scale: 1.1 }}
                  src={currentUser.photoURL} 
                  alt="User" 
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    border: '2px solid rgba(0, 255, 231, 0.5)',
                    objectFit: 'cover'
                  }}
                />
              ) : (
                <div style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  background: 'rgba(0, 255, 231, 0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '2px solid rgba(0, 255, 231, 0.5)',
                }}>
                  <User size={16} color="#00FFE7" />
                </div>
              )}
              <motion.button 
                whileHover={{ scale: 1.1, backgroundColor: 'rgba(239, 68, 68, 0.2)', color: '#ef4444' }}
                whileTap={{ scale: 0.95 }}
                onClick={handleSignOut}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: 'transparent',
                  border: 'none',
                  color: 'rgba(255, 255, 255, 0.5)',
                  cursor: 'pointer',
                  padding: '0.4rem',
                  borderRadius: '50%',
                  marginLeft: '0.2rem',
                  transition: 'color 0.2s ease, background-color 0.2s ease'
                }}
                title="Sign Out"
              >
                <LogOut size={16} />
              </motion.button>
            </div>
          )}
        </div>
      </div>
    </motion.header>
  );
};

export default Header;
