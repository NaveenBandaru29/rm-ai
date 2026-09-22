import { Box, Container, Typography, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import { ChevronDown } from 'lucide-react';
import { faqs } from '../data/uiConfig';

export const FAQ = () => {

  return (
    <Box sx={{ pt: { xs: 12, sm: 16 }, pb: { xs: 8, sm: 12 }, minHeight: '80vh', bgcolor: '#f8fafc', px: { xs: 2, sm: 0 } }}>
      <Container maxWidth="md">
        <Typography variant="h2" component="h1" sx={{ fontWeight: 800, mb: 6, color: '#1e1b4b', textAlign: 'center', fontSize: { xs: '2rem', sm: '2.75rem', md: '3.75rem' } }}>
          Frequently Asked Questions
        </Typography>
        
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {faqs.map((faq, index) => (
            <Accordion key={index} elevation={0} sx={{ border: '1px solid rgba(0,0,0,0.05)', borderRadius: '12px !important', '&:before': { display: 'none' } }}>
              <AccordionSummary expandIcon={<ChevronDown className="h-5 w-5" />} sx={{ fontWeight: 600, fontSize: { xs: '1rem', sm: '1.1rem' }, p: { xs: 2, sm: 3 } }}>
                {faq.q}
              </AccordionSummary>
              <AccordionDetails sx={{ px: { xs: 2, sm: 3 }, pb: 4, pt: 0, color: 'text.secondary', lineHeight: 1.7 }}>
                {faq.a}
              </AccordionDetails>
            </Accordion>
          ))}
        </Box>
      </Container>
    </Box>
  );
};
