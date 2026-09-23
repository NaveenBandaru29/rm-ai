import { Box, Container, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';

export const NotFound = () => {
  return (
    <Box sx={{ pt: 20, pb: 16, minHeight: '80vh', bgcolor: '#f8fafc', display: 'flex', alignItems: 'center' }}>
      <Helmet>
        <title>404 • Page Not Found • RM AI</title>
        <meta name="description" content="The page you're looking for does not exist on RM AI." />
      </Helmet>
      <Container maxWidth="md" sx={{ textAlign: 'center' }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <Typography variant="h1" sx={{ fontWeight: 900, color: 'primary.main', fontSize: { xs: '6rem', md: '10rem' }, lineHeight: 1 }}>
            404
          </Typography>
          
          <Typography variant="h3" sx={{ fontWeight: 800, color: '#1e1b4b', mb: 3, mt: 2 }}>
            Page Not Found
          </Typography>
          
          <Typography variant="h6" color="text.secondary" sx={{ mb: 6, maxWidth: 600, mx: 'auto', fontWeight: 400 }}>
            Oops! The page you're looking for seems to have wandered off. It might have been moved or deleted.
          </Typography>
          
          <Box sx={{ display: 'flex', gap: 3, justifyContent: 'center' }}>
            <Button 
              component={Link} 
              to="/" 
              variant="contained" 
              size="large"
              startIcon={<Home className="h-5 w-5" />}
              sx={{ borderRadius: 6, px: 4, py: 1.5, fontWeight: 600, boxShadow: '0 8px 20px rgba(99,102,241,0.3)' }}
            >
              Back to Home
            </Button>
            <Button 
              onClick={() => window.history.back()} 
              variant="outlined" 
              size="large"
              startIcon={<ArrowLeft className="h-5 w-5" />}
              sx={{ borderRadius: 6, px: 4, py: 1.5, fontWeight: 600, borderColor: 'rgba(0,0,0,0.1)', color: 'text.primary', '&:hover': { borderColor: 'primary.main', bgcolor: 'primary.50' } }}
            >
              Go Back
            </Button>
          </Box>
        </motion.div>
      </Container>
    </Box>
  );
};
