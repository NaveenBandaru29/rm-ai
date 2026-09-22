import { useState, useEffect } from 'react';
import { Fab, Zoom } from '@mui/material';
import { ArrowUp } from 'lucide-react';

export const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 400) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <Zoom in={isVisible}>
      <Fab 
        color="primary" 
        size="medium" 
        onClick={scrollToTop} 
        aria-label="scroll back to top"
        sx={{ 
          position: 'fixed', 
          bottom: { xs: 32, md: 40 }, 
          right: { xs: 32, md: 40 },
          zIndex: 1000,
          boxShadow: '0 8px 24px rgba(99,102,241,0.4)',
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: '0 12px 28px rgba(99,102,241,0.6)',
            bgcolor: 'primary.dark'
          },
          transition: 'transform 0.2s, box-shadow 0.2s, background-color 0.2s'
        }}
      >
        <ArrowUp className="h-6 w-6 text-white" />
      </Fab>
    </Zoom>
  );
};
