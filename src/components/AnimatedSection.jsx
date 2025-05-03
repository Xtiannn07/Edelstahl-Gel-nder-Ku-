import { useRef, useEffect, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'framer-motion';

export default function AnimatedSection({ 
  children,
  threshold = 0.1,
  animationType = 'fadeUp'
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, threshold });
  const controls = useAnimation();
  const [hasAnimated, setHasAnimated] = useState(false);

  // Animation variants
  const animations = {
    fadeUp: {
      hidden: { opacity: 0, y: 50 },
      visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
    },
    fadeIn: {
      hidden: { opacity: 0 },
      visible: { opacity: 1, transition: { duration: 0.6 } }
    },
    scaleUp: {
      hidden: { opacity: 0, scale: 0.8 },
      visible: { opacity: 1, scale: 1, transition: { duration: 0.6 } }
    },
    slideRight: {
      hidden: { opacity: 0, x: -50 },
      visible: { opacity: 1, x: 0, transition: { duration: 0.6 } }
    },
    slideLeft: {
      hidden: { opacity: 0, x: 50 },
      visible: { opacity: 1, x: 0, transition: { duration: 0.6 } }
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