import { Link as RouterLink } from 'react-router-dom';
import { BookOpen, Mail, Globe, MessageCircle } from 'lucide-react';
import { Box, Container, Typography, Link, IconButton, Button } from '@mui/material';
import { footerLinks } from '../../data/uiConfig';

export const Footer = () => {

  return (
    <Box component="footer" sx={{
      background: 'linear-gradient(180deg, #1e1b4b 0%, #0f172a 100%)',
      color: 'white',
      borderTop: '1px solid',
      borderColor: 'rgba(255,255,255,0.05)',
      mt: 'auto',
      pt: 10,
      pb: 6,
      position: 'relative',
      overflow: 'hidden'
    }}>
      <Box sx={{ position: 'absolute', top: 0, left: '20%', width: '60%', height: '1px', background: 'linear-gradient(90deg, transparent, rgba(99,102,241,0.5), transparent)' }} />
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: '2fr 1fr 1fr 1fr' },
            gap: 6
          }}
        >
          <Box>
            <Box component={RouterLink} to="/" sx={{ display: 'flex', alignItems: 'center', gap: 1.5, textDecoration: 'none', mb: 3 }}>
              <Box sx={{ bgcolor: 'primary.main', p: 1, borderRadius: 2, display: 'flex' }}>
                <BookOpen className="h-4 w-4 text-white" />
              </Box>
              <Typography variant="h6" component="span" sx={{ fontWeight: 700, color: 'white', letterSpacing: '-0.02em' }}>
                RM AI
              </Typography>
            </Box>
            <Typography variant="body2" sx={{ mb: 4, pr: 2, color: 'rgba(255,255,255,0.7)', lineHeight: 1.6 }}>
              Empowering the next generation of AI and Data Science professionals with premium, hands-on learning experiences.
            </Typography>
            <Box sx={{ display: 'flex', gap: 1.5 }}>
              <IconButton component="a" href="mailto:contact@rmai.com" size="small" aria-label="email" sx={{ color: 'rgba(255,255,255,0.7)', bgcolor: 'rgba(255,255,255,0.05)', '&:hover': { color: 'white', bgcolor: 'primary.main' } }}>
                <Mail className="h-4 w-4" />
              </IconButton>
              <IconButton component="a" href="https://github.com/your-repo" target="_blank" size="small" aria-label="website" sx={{ color: 'rgba(255,255,255,0.7)', bgcolor: 'rgba(255,255,255,0.05)', '&:hover': { color: 'white', bgcolor: 'primary.main' } }}>
                <Globe className="h-4 w-4" />
              </IconButton>
              <IconButton component="a" href="https://twitter.com" target="_blank" size="small" aria-label="chat" sx={{ color: 'rgba(255,255,255,0.7)', bgcolor: 'rgba(255,255,255,0.05)', '&:hover': { color: 'white', bgcolor: 'primary.main' } }}>
                <MessageCircle className="h-4 w-4" />
              </IconButton>
            </Box>
          </Box>

          {footerLinks.map((section) => (
            <Box key={section.title}>
              <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 3, color: 'white' }}>{section.title}</Typography>
              <Box component="ul" sx={{ listStyle: 'none', p: 0, m: 0, display: 'flex', flexDirection: 'column', gap: 2 }}>
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link component={RouterLink} to={link.path} sx={{ color: 'rgba(255,255,255,0.7)', '&:hover': { color: 'primary.light' } }} underline="none">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </Box>
            </Box>
          ))}

          <Box>
            <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 3, color: 'white' }}>Stay Updated</Typography>
            <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)', mb: 2, lineHeight: 1.5 }}>
              Subscribe to our newsletter for the latest AI trends and course updates.
            </Typography>
            <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
              <Box sx={{ display: 'flex', bgcolor: 'rgba(255,255,255,0.05)', borderRadius: 2, border: '1px solid', borderColor: 'rgba(255,255,255,0.1)', p: 0.5 }}>
                <Box component="input" type="email" placeholder="Enter your email" sx={{ flexGrow: 1, bgcolor: 'transparent', border: 'none', color: 'white', px: 2, py: 1, outline: 'none', '&::placeholder': { color: 'rgba(255,255,255,0.4)' } }} />
              </Box>
              <Button variant="contained" color="primary" fullWidth sx={{ borderRadius: 2, py: 1, fontWeight: 600, boxShadow: '0 4px 12px rgba(99,102,241,0.2)' }}>
                Subscribe
              </Button>
            </Box>
          </Box>
        </Box>

        <Box sx={{ borderTop: '1px solid', borderColor: 'rgba(255,255,255,0.1)', mt: 8, pt: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.5)' }}>
            &copy; {new Date().getFullYear()} RM AI. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};
