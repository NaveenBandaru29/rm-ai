import { Box, Container, Typography } from '@mui/material';

export const About = () => {
  return (
    <Box sx={{ pt: { xs: 12, sm: 16 }, pb: { xs: 8, sm: 12 }, minHeight: '80vh', bgcolor: '#f8fafc', px: { xs: 2, sm: 0 } }}>
      <Container maxWidth="md">
        <Typography variant="h2" component="h1" sx={{ fontWeight: 800, mb: 4, color: '#1e1b4b', fontSize: { xs: '2rem', sm: '2.75rem', md: '3.75rem' } }}>
          About RM AI
        </Typography>
        <Typography variant="h6" color="text.secondary" sx={{ mb: 6, lineHeight: 1.8, fontSize: { xs: '1rem', sm: '1.25rem' } }}>
          We are on a mission to democratize elite-level AI and Data Science education. 
          Founded by industry veterans, our platform bridges the gap between academic theory and real-world engineering.
        </Typography>
        <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.8 }}>
          Our curriculum is designed to be highly interactive, completely project-based, and aligned with the latest industry standards. 
          Whether you are a beginner taking your first steps in Python or an advanced engineer diving into deep learning architectures, 
          we have the resources to accelerate your career.
        </Typography>
      </Container>
    </Box>
  );
};
