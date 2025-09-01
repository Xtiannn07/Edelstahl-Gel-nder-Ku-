import { useRef, useEffect, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'framer-motion';

export default function AnimatedSection({ 
  children,
  animationType = 'fadeUp'
}) {
  const ref = useRef(null);
  const controls = useAnimation();
  const [hasAnimated, setHasAnimated] = useState(false);
  
  // Using rootMargin to trigger when element is 25% from the bottom of viewport
  const isInView = useInView(ref, { 
    once: false, 
    rootMargin: "-25% 0px -75% 0px" 
  });

  // Animation variants
  const animations = {
    fadeUp: {
      hidden: { opacity: 0, y: 50 },
      visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
    },
    fadeIn: {
      hidden: { opacity: 0 },
      visible: { opacity: 1, transition: { duration: 0.5 } }
    },
    scaleUp: {
      hidden: { opacity: 0, scale: 0.8 },
      visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } }
    },
    slideRight: {
      hidden: { opacity: 0, x: -50 },
      visible: { opacity: 1, x: 0, transition: { duration: 0.5 } }
    },
    slideLeft: {
      hidden: { opacity: 0, x: 50 },
      visible: { opacity: 1, x: 0, transition: { duration: 0.5 } }
    }
  };

  const variant = animations[animationType] || animations.fadeUp;

  useEffect(() => {
    if (isInView && !hasAnimated) {
      controls.start('visible');
      setHasAnimated(true);
    } else if (!isInView && hasAnimated) {
      controls.start('hidden');
      setHasAnimated(false);
    }
  }, [isInView, controls, hasAnimated]);

  return (
    <div ref={ref} className="overflow-hidden">
      <motion.div
        initial="hidden"
        animate={controls}
        variants={variant}
      >
        {children}
      </motion.div>
    </div>
  );
}