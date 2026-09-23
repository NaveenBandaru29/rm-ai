import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link as RouterLink } from 'react-router-dom';
import { Button, TextField, Box, Typography, Card, CardContent, Divider, CircularProgress, Alert } from '@mui/material';
import { CreditCard, CheckCircle, ShieldCheck, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import { CourseService } from '../services/CourseService';
import { EnrollmentService } from '../services/EnrollmentService';
import { AuthService } from '../services/AuthService';
import { Helmet } from 'react-helmet-async';
import type { Course } from '../types';

export const Checkout = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const navigate = useNavigate();
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState('');
  
  // Mock Payment Details
  const [name, setName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const allCourses = await CourseService.getAllCourses();
        const found = allCourses.find(c => c.id === courseId);
        setCourse(found || null);
      } catch (err) {
        console.error("Failed to fetch course for checkout");
      } finally {
        setLoading(false);
      }
    };
    if (courseId) fetchCourse();
  }, [courseId]);

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!course) return;
    
    setError('');
    setProcessing(true);

    try {
      // Simulate payment delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const user = await AuthService.getCurrentUser();
      const userId = user ? user.id : 'usr-demo123';

      const success = await EnrollmentService.enrollInCourse(userId, course.id);
      if (success) {
        navigate('/courses');
      } else {
        setError('Payment failed. Please try again.');
      }
    } catch (err) {
      setError('An unexpected error occurred during payment processing.');
    } finally {
      setProcessing(false);
    }
  };

  if (loading) {
    return (
      <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: '#f8fafc' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!course) {
    return (
      <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: '#f8fafc', flexDirection: 'column', gap: 2 }}>
        <Typography variant="h5">Course not found for checkout</Typography>
        <Button component={RouterLink} to="/courses" variant="contained">Browse Courses</Button>
      </Box>
    );
  }

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#f8fafc', py: { xs: 4, md: 8 }, px: { xs: 2, sm: 4 } }}>
      <Helmet>
        <title>{course ? `Checkout • ${course.title} • RM AI` : 'Checkout • RM AI'}</title>
        <meta name="description" content={`Complete your enrollment in ${course?.title || 'course'} on RM AI.`} />
      </Helmet>
      <Box sx={{ maxWidth: 1000, mx: 'auto' }}>
        
        <Box sx={{ mb: { xs: 4, sm: 6 } }}>
          <Button component={RouterLink} to={`/courses/${course.slug}`} startIcon={<ArrowLeft />} sx={{ color: 'text.secondary', mb: 2 }}>
            Back to Course
          </Button>
          <Typography variant="h3" sx={{ fontWeight: 800, color: '#1e1b4b', fontSize: { xs: '1.75rem', sm: '2.5rem', md: '3rem' } }}>
            Secure Checkout
          </Typography>
        </Box>

        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', lg: '1fr 400px' }, gap: { xs: 3, md: 4 } }}>
          
          {/* Payment Form */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} style={{ order: 0 }}>
            <Card sx={{ borderRadius: 4, boxShadow: '0 10px 30px rgba(0,0,0,0.03)' }}>
              <CardContent sx={{ p: { xs: 2.5, sm: 3.5, md: 5 } }}>
                <Typography variant="h5" sx={{ fontWeight: 700, mb: 4, display: 'flex', alignItems: 'center', gap: 1, fontSize: { xs: '1.25rem', sm: '1.5rem' } }}>
                  <CreditCard className="h-6 w-6 text-primary-main" /> Payment Details
                </Typography>

                {error && <Alert severity="error" sx={{ mb: 4, borderRadius: 2 }}>{error}</Alert>}

                <form onSubmit={handlePayment}>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                    <TextField
                      fullWidth label="Name on Card" variant="outlined" required
                      value={name} onChange={e => setName(e.target.value)}
                    />
                    <TextField
                      fullWidth label="Card Number" variant="outlined" required
                      placeholder="0000 0000 0000 0000"
                      value={cardNumber} onChange={e => setCardNumber(e.target.value)}
                    />
                    <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
                      <TextField
                        fullWidth label="Expiry Date" variant="outlined" required
                        placeholder="MM/YY"
                        value={expiry} onChange={e => setExpiry(e.target.value)}
                      />
                      <TextField
                        fullWidth label="CVV" variant="outlined" required
                        placeholder="123" type="password"
                        value={cvv} onChange={e => setCvv(e.target.value)}
                      />
                    </Box>

                    <Divider sx={{ my: 2 }} />

                    <Button 
                      type="submit" 
                      variant="contained" 
                      size="large" 
                      disabled={processing}
                      sx={{ py: 2, borderRadius: 3, fontWeight: 700, fontSize: { xs: '1rem', sm: '1.1rem' }, boxShadow: '0 8px 16px rgba(99,102,241,0.25)' }}
                    >
                      {processing ? <CircularProgress size={26} color="inherit" /> : `Pay ₹${course.discountedPrice.toLocaleString('en-IN')} securely`}
                    </Button>
                    
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1, mt: 1, color: 'text.secondary' }}>
                      <ShieldCheck className="h-4 w-4" />
                      <Typography variant="caption">256-bit SSL encrypted & secure</Typography>
                    </Box>
                  </Box>
                </form>
              </CardContent>
            </Card>
          </motion.div>

          {/* Order Summary */}
          <Box sx={{ order: { xs: -1, lg: 0 } }}>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}>
              <Card sx={{ borderRadius: 4, boxShadow: '0 10px 30px rgba(0,0,0,0.03)', bgcolor: '#1e1b4b', color: 'white' }}>
                <CardContent sx={{ p: { xs: 2.5, sm: 3.5, md: 5 } }}>
                  <Typography variant="h6" sx={{ fontWeight: 700, mb: 3, color: 'white' }}>Order Summary</Typography>
                  
                  <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
                    <img src={course.thumbnailUrl} alt={course.title} className="w-20 h-14 sm:w-24 sm:h-16 object-cover rounded-md flex-shrink-0" />
                    <Box>
                      <Typography variant="subtitle2" sx={{ fontWeight: 600, lineHeight: 1.3 }}>{course.title}</Typography>
                      <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.6)' }}>Full Lifetime Access</Typography>
                    </Box>
                  </Box>

                <Divider sx={{ borderColor: 'rgba(255,255,255,0.1)', mb: 3 }} />

                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                  <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)' }}>Original Price</Typography>
                  <Typography variant="body2">₹{course.actualPrice.toLocaleString('en-IN')}</Typography>
                </Box>
                
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                  <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)' }}>Discount</Typography>
                  <Typography variant="body2" sx={{ color: 'error.light' }}>-₹{(course.actualPrice - course.discountedPrice).toLocaleString('en-IN')}</Typography>
                </Box>

                <Divider sx={{ borderColor: 'rgba(255,255,255,0.1)', mb: 3 }} />

                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 4, alignItems: 'center' }}>
                  <Typography variant="h6" sx={{ fontWeight: 700 }}>Total</Typography>
                  <Typography variant="h4" sx={{ fontWeight: 800 }}>₹{course.discountedPrice.toLocaleString('en-IN')}</Typography>
                </Box>

                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, color: 'rgba(255,255,255,0.7)' }}>
                    <CheckCircle className="h-5 w-5 text-green-400" />
                    <Typography variant="caption">30-Day Money-Back Guarantee</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, color: 'rgba(255,255,255,0.7)' }}>
                    <CheckCircle className="h-5 w-5 text-green-400" />
                    <Typography variant="caption">Interactive Labs & Projects</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, color: 'rgba(255,255,255,0.7)' }}>
                    <CheckCircle className="h-5 w-5 text-green-400" />
                    <Typography variant="caption">Verified Certificate</Typography>
                  </Box>
                </Box>
                
              </CardContent>
            </Card>
          </motion.div>
        </Box>
      </Box>
        
    </Box>
  </Box>
);
};
