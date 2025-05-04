import { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import ParticleBackground from './ParticleBackground';
import { updateParticleConfig } from '../redux/slices/particleSlice';

// Custom particle config specifically for the header
const headerParticleConfig = {
  particleCount: 150,
  color: '#264190',
  opacity: 0.7,
  speed: 0.5,
  size: {
    min: 0.5,
    max: 3
  },
  connectParticles: true,
  connectionDistance: 150
};

const AnimatedHeader = ({ 
  title, 
  subtitle, 
  children,
  className,
  fixed = false,
  blurOnScroll = true,
  maskEdges = true,
  showScrollIndicator = true,
  particleConfig = headerParticleConfig
}) => {
  const [scrollY, setScrollY] = useState(0);
  const [isFullyVisible, setIsFullyVisible] = useState(true);
  const dispatch = useDispatch();
  const defaultParticleConfig = useSelector(state => state.particles.config);
  const headerRef = useRef(null);

  // Track scroll position
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      
      // Check if header is still fully visible
      if (headerRef.current) {
        const headerHeight = headerRef.current.offsetHeight;
        setIsFullyVisible(window.scrollY < headerHeight * 0.5);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Apply custom particle config for header
  useEffect(() => {
    // Save the original config
    const originalConfig = { ...defaultParticleConfig };
    
    // Apply header-specific particle config
    dispatch(updateParticleConfig(particleConfig));
    
    // Restore original config when component unmounts
    return () => {
      dispatch(updateParticleConfig(originalConfig));
    };
  }, [dispatch]);

  // Scroll to content function
  const scrollToContent = () => {
    if (headerRef.current) {
      window.scrollTo({
        top: headerRef.current.offsetHeight,
        behavior: 'smooth'
      });
    }
  };

  // Calculate blur amount based on scroll position
  const getBlurValue = () => {
    // Start blurring after 100px scroll and reach max blur at 300px
    const maxBlur = 6; // Max blur in pixels
    const scrollThreshold = 300;
    const minScrollForBlur = 100;
    
    if (scrollY < minScrollForBlur) return 0;
    
    const blurAmount = Math.min(
      maxBlur, 
      ((scrollY - minScrollForBlur) / (scrollThreshold - minScrollForBlur)) * maxBlur
    );
    
    return blurAmount.toFixed(1);
  };

  // Calculate opacity for header content based on scroll
  const getHeaderContentOpacity = () => {
    const fadeStartPoint = 150;
    const fadeEndPoint = 350;
    
    if (scrollY <= fadeStartPoint) return 1;
    if (scrollY >= fadeEndPoint) return 0.3;
    
    return 1 - ((scrollY - fadeStartPoint) / (fadeEndPoint - fadeStartPoint) * 0.7);
  };

  return (
    <header 
      ref={headerRef}
      className={`
        relative bg-[#949494] flex items-center justify-center overflow-hidden
        ${fixed ? 'fixed top-0 left-0 right-0 z-50' : 'relative'}
        ${className || ''}
      `}
    >
      {/* Particle animation background with dynamic blur */}
      <div 
        className="absolute inset-0 transition-all duration-200"
        style={{ 
          filter: blurOnScroll ? `blur(${getBlurValue()}px)` : 'none',
        }}
      >
        <ParticleBackground className="z-0" />
      </div>
      
      {/* Gradient mask for bottom edge */}
      {maskEdges && (
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent z-10" />
      )}
      
      {/* Header content with dynamic opacity */}
      <div 
        className="relative z-20 text-center px-4 w-full transition-opacity duration-200"
        style={{ opacity: getHeaderContentOpacity() }}
      >
        {title && <h1 className="text-4xl md:text-5xl font-bold mb-4">{title}</h1>}
        {subtitle && <p className="text-xl text-blue-100">{subtitle}</p>}
        {children}
        
        {/* Scroll Indicator */}
        <AnimatePresence>
          {showScrollIndicator && isFullyVisible && (
            <motion.div 
              className="absolute bottom-12 left-0 right-0 flex justify-center"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <button 
                onClick={scrollToContent}
                className="flex flex-col items-center text-white/80 hover:text-white transition-colors"
              >
                <span className="text-sm mb-2">Scroll Down</span>
                <motion.div
                  animate={{ y: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <ChevronDown size={24} />
                </motion.div>
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};

export default AnimatedHeader;