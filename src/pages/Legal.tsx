import { Box, Container, Typography } from '@mui/material';
import { Helmet } from 'react-helmet-async';
import { legalData } from '../data/uiConfig';


export const Legal = ({ title }: { title: string }) => {
  const renderContent = () => {
    const sections = legalData[title];

    if (!sections) {
      return (
        <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.8, color: 'text.secondary' }}>
          This information is currently being updated. Please check back later.
        </Typography>
      );
    }

    return sections.map((section, index) => (
      <Box key={index}>
        <Typography variant="h5" sx={{ fontWeight: 700, mt: index === 0 ? 0 : 4, mb: 2, color: '#1e1b4b' }}>
          {section.heading}
        </Typography>
        <Typography variant="body1" component="div" sx={{ mb: 3, lineHeight: 1.8, color: 'text.secondary' }}>
          {section.content}
        </Typography>
      </Box>
    ));
  };

  return (
    <Box sx={{ pt: { xs: 12, sm: 16 }, pb: { xs: 8, sm: 12 }, minHeight: '80vh', bgcolor: '#f8fafc', px: { xs: 2, sm: 0 } }}>
      <Helmet>
        <title>{title} • RM AI</title>
        <meta name="description" content={`Read RM AI's ${title}. We are committed to transparency in how we handle your data and protect your privacy.`} />
      </Helmet>

      <Container maxWidth="md">
        <Typography variant="h2" component="h1" sx={{ fontWeight: 800, mb: 2, color: '#1e1b4b', fontSize: { xs: '2rem', sm: '2.75rem', md: '3.75rem' } }}>
          {title}
        </Typography>
        <Typography variant="body2" sx={{ mb: { xs: 3, sm: 6 }, color: 'primary.main', fontWeight: 600 }}>
          Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
        </Typography>
        
        <Box sx={{ bgcolor: 'white', p: { xs: 2.5, sm: 4, md: 6 }, borderRadius: 4, boxShadow: '0 10px 30px rgba(0,0,0,0.03)', border: '1px solid rgba(0,0,0,0.05)' }}>
          {renderContent()}
        </Box>
      </Container>
    </Box>
  );
};
