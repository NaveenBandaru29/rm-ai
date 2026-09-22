import { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { Button, TextField, Box, Typography, InputAdornment, IconButton, CircularProgress } from '@mui/material';
import { Mail, Lock, Eye, EyeOff, BookOpen, ArrowRight, User } from 'lucide-react';
import { motion } from 'framer-motion';
import { AuthService } from '../services/AuthService';

export const Register = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setLoading(true);

    try {
      const user = await AuthService.register(name, email, password);
      if (user) {
        navigate('/dashboard'); // Will be created in Phase 5
      } else {
        setError('Failed to create account');
      }
    } catch (err) {
      setError('An error occurred during registration');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', bgcolor: '#f8fafc' }}>
      {/* Left Side - Form */}
      <Box sx={{ flex: { xs: 1, md: 0.5 }, display: 'flex', flexDirection: 'column', p: { xs: 2.5, sm: 4, lg: 8 }, justifyContent: 'center' }}>
        <Box sx={{ maxWidth: 400, width: '100%', mx: 'auto' }}>
          
          <Box component={RouterLink} to="/" sx={{ display: 'flex', alignItems: 'center', gap: 1.5, textDecoration: 'none', mb: 6 }}>
            <Box sx={{ bgcolor: 'primary.main', p: 1, borderRadius: 2, display: 'flex' }}>
              <BookOpen className="h-5 w-5 text-white" />
            </Box>
            <Typography variant="h6" component="span" sx={{ fontWeight: 700, color: 'text.primary', letterSpacing: '-0.02em' }}>
              RM AI
            </Typography>
          </Box>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Typography variant="h3" sx={{ fontWeight: 800, mb: 1, color: 'text.primary' }}>
              Create an account
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
              Join thousands of learners mastering AI today.
            </Typography>

            {error && (
              <Box sx={{ bgcolor: 'error.50', color: 'error.main', p: 2, borderRadius: 2, mb: 4, border: '1px solid', borderColor: 'error.100' }}>
                <Typography variant="body2" sx={{ fontWeight: 500 }}>{error}</Typography>
              </Box>
            )}

            <form onSubmit={handleRegister}>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                <TextField
                  fullWidth
                  label="Full Name"
                  variant="outlined"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  slotProps={{
                    input: {
                      startAdornment: <InputAdornment position="start"><User className="h-5 w-5 text-slate-400" /></InputAdornment>,
                      sx: { borderRadius: 3 }
                    }
                  }}
                />

                <TextField
                  fullWidth
                  label="Email Address"
                  variant="outlined"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  slotProps={{
                    input: {
                      startAdornment: <InputAdornment position="start"><Mail className="h-5 w-5 text-slate-400" /></InputAdornment>,
                      sx: { borderRadius: 3 }
                    }
                  }}
                />
                
                <Box>
                  <TextField
                    fullWidth
                    label="Password"
                    variant="outlined"
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    slotProps={{
                      input: {
                        startAdornment: <InputAdornment position="start"><Lock className="h-5 w-5 text-slate-400" /></InputAdornment>,
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton onClick={() => setShowPassword(!showPassword)} edge="end" size="small">
                              {showPassword ? <EyeOff className="h-5 w-5 text-slate-400" /> : <Eye className="h-5 w-5 text-slate-400" />}
                            </IconButton>
                          </InputAdornment>
                        ),
                        sx: { borderRadius: 3 }
                      }
                    }}
                  />
                  <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 1, ml: 1 }}>
                    Must be at least 6 characters long.
                  </Typography>
                </Box>

                <Button 
                  type="submit" 
                  variant="contained" 
                  size="large" 
                  disabled={loading}
                  sx={{ py: 1.5, borderRadius: 3, fontWeight: 700, mt: 1, fontSize: '1.05rem', boxShadow: '0 8px 16px rgba(99,102,241,0.25)' }}
                >
                  {loading ? <CircularProgress size={24} color="inherit" /> : 'Create Account'}
                </Button>
              </Box>
            </form>

            <Box sx={{ mt: 4, textAlign: 'center' }}>
              <Typography variant="body2" color="text.secondary">
                Already have an account?{' '}
                <Typography component={RouterLink} to="/login" variant="body2" color="primary" sx={{ fontWeight: 600, textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>
                  Sign in instead
                </Typography>
              </Typography>
            </Box>
          </motion.div>
        </Box>
      </Box>

      {/* Right Side - Graphic (Desktop Only) */}
      <Box sx={{ flex: 0.5, display: { xs: 'none', md: 'flex' }, bgcolor: '#1e1b4b', position: 'relative', overflow: 'hidden' }}>
        <Box sx={{ absolute: 'inset', backgroundImage: 'url("https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop")', backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.2, width: '100%', height: '100%' }} />
        <Box sx={{ absolute: 'inset', background: 'linear-gradient(to right, #1e1b4b 0%, transparent 100%)', width: '100%', height: '100%', position: 'absolute' }} />
        
        <Box sx={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', justifyContent: 'center', p: 12 }}>
          <motion.div initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, delay: 0.2 }}>
            <Typography variant="h3" sx={{ color: 'white', fontWeight: 800, mb: 4, lineHeight: 1.2 }}>
              Your journey to <br /> mastery begins here.
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              {[
                'Access to all premium courses',
                'Downloadable resources & labs',
                'Verified certificates of completion',
                'Priority community support'
              ].map((text, i) => (
                <Box key={i} sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Box sx={{ bgcolor: 'primary.main', borderRadius: '50%', p: 0.5 }}>
                    <ArrowRight className="h-4 w-4 text-white" />
                  </Box>
                  <Typography variant="body1" sx={{ color: 'white', fontWeight: 500 }}>{text}</Typography>
                </Box>
              ))}
            </Box>
          </motion.div>
        </Box>
      </Box>
    </Box>
  );
};
