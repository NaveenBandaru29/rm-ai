import { Box, Container, Typography, Card, CardContent, Button } from '@mui/material';

export const GenericPage = ({ title, subtitle }: { title: string, subtitle: string }) => {
  return (
    <Box sx={{ pt: 16, pb: 12, minHeight: '80vh', bgcolor: '#f8fafc' }}>
      <Container maxWidth="md">
        <Typography variant="h2" component="h1" sx={{ fontWeight: 800, mb: 3, color: '#1e1b4b', textAlign: 'center' }}>
          {title}
        </Typography>
        <Typography variant="h6" color="text.secondary" sx={{ mb: 8, lineHeight: 1.8, textAlign: 'center' }}>
          {subtitle}
        </Typography>
        
        <Card sx={{ borderRadius: 4, border: '1px dashed rgba(0,0,0,0.1)', boxShadow: 'none', bgcolor: 'transparent' }}>
          <CardContent sx={{ textAlign: 'center', py: 10 }}>
            <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>Coming Soon</Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
              We are currently working hard to bring this page to life. Check back later!
            </Typography>
            <Button variant="contained" href="/" sx={{ borderRadius: 6, px: 4 }}>
              Return to Home
            </Button>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
};
