import { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';

const ParticleBackground = ({ className }) => {
  const canvasRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [particles, setParticles] = useState([]);
  const animationFrameRef = useRef(null);
  const containerRef = useRef(null);
  
  // Get particle configuration from Redux store
  const { enabled, config } = useSelector(state => state.particles);
  
  // Initialize and update canvas dimensions
  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const { width, height } = containerRef.current.getBoundingClientRect();
        setDimensions({ width, height });
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    
    return () => {
      window.removeEventListener('resize', updateDimensions);
    };
  }, []);
  
  // Initialize particles
  useEffect(() => {
    if (!dimensions.width || !dimensions.height || !enabled) return;
    
    const createParticles = () => {
      const newParticles = [];
      
      for (let i = 0; i < config.particleCount; i++) {
        const size = Math.random() * (config.size.max - config.size.min) + config.size.min;
        
        newParticles.push({
          x: Math.random() * dimensions.width,
          y: Math.random() * dimensions.height,
          size,
          speedX: (Math.random() - 0.5) * config.speed,
          speedY: (Math.random() - 0.5) * config.speed,
        });
      }
      
      setParticles(newParticles);
    };
    
    createParticles();
  }, [dimensions, config.particleCount, config.size.min, config.size.max, config.speed, enabled]);

  // Animation loop
  useEffect(() => {
    if (!enabled || particles.length === 0 || !canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    const animate = () => {
      ctx.clearRect(0, 0, dimensions.width, dimensions.height);
      
      // Update and draw particles
      const updatedParticles = particles.map(particle => {
        // Update position
        let newX = particle.x + particle.speedX;
        let newY = particle.y + particle.speedY;
        
        // Bounce off edges
        if (newX < 0 || newX > dimensions.width) {
          particle.speedX *= -1;
          newX = particle.x + particle.speedX;
        }
        
        if (newY < 0 || newY > dimensions.height) {
          particle.speedY *= -1;
          newY = particle.y + particle.speedY;
        }
        
        // Draw particle
        ctx.beginPath();
        ctx.arc(newX, newY, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = config.color;
        ctx.globalAlpha = config.opacity;
        ctx.fill();
        
        return {
          ...particle,
          x: newX,
          y: newY
        };
      });
      
      // Draw connections between particles
      if (config.connectParticles) {
        ctx.globalAlpha = config.opacity * 0.5;
        ctx.strokeStyle = config.color;
        ctx.lineWidth = 0.5;
        
        for (let i = 0; i < updatedParticles.length; i++) {
          for (let j = i + 1; j < updatedParticles.length; j++) {
            const dx = updatedParticles[i].x - updatedParticles[j].x;
            const dy = updatedParticles[i].y - updatedParticles[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < config.connectionDistance) {
              const opacity = 1 - (distance / config.connectionDistance);
              ctx.globalAlpha = opacity * config.opacity * 0.5;
              ctx.beginPath();
              ctx.moveTo(updatedParticles[i].x, updatedParticles[i].y);
              ctx.lineTo(updatedParticles[j].x, updatedParticles[j].y);
              ctx.stroke();
            }
          }
        }
      }
      
      setParticles(updatedParticles);
      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animationFrameRef.current = requestAnimationFrame(animate);
    
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [particles, dimensions, config, enabled]);

  if (!enabled) return null;

  return (
    <div 
      ref={containerRef} 
      className={`absolute inset-0 overflow-hidden pointer-events-none ${className || ''}`}
    >
      <canvas
        ref={canvasRef}
        width={dimensions.width}
        height={dimensions.height}
        className="absolute inset-0"
      />
    </div>
  );
};

export default ParticleBackground;