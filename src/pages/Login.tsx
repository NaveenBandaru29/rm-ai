import { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { Button, TextField, Box, Typography, InputAdornment, IconButton, CircularProgress } from '@mui/material';
import { Mail, Lock, Eye, EyeOff, BookOpen, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { AuthService } from '../services/AuthService';

export const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const user = await AuthService.login(email, password);
      if (user) {
        navigate('/dashboard'); // Will be created in Phase 5
      } else {
        setError('Invalid email or password');
      }
    } catch (err) {
      setError('An error occurred during login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', bgcolor: '#f8fafc' }}>
      {/* Left Side - Form */}
      <Box sx={{ flex: { xs: 1, md: 0.5 }, display: 'flex', flexDirection: 'column', p: { xs: 2.5, sm: 4, lg: 8 }, justifyContent: 'center' }}>
        <Box sx={{ maxWidth: 400, width: '100%', mx: 'auto' }}>
          
          <Box component={RouterLink} to="/" sx={{ display: 'flex', alignItems: 'center', gap: 1.5, textDecoration: 'none', mb: 8 }}>
            <Box sx={{ bgcolor: 'primary.main', p: 1, borderRadius: 2, display: 'flex' }}>
              <BookOpen className="h-5 w-5 text-white" />
            </Box>
            <Typography variant="h6" component="span" sx={{ fontWeight: 700, color: 'text.primary', letterSpacing: '-0.02em' }}>
              RM AI
            </Typography>
          </Box>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Typography variant="h3" sx={{ fontWeight: 800, mb: 1, color: 'text.primary' }}>
              Welcome back
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
              Sign in to continue your learning journey.
            </Typography>

            {error && (
              <Box sx={{ bgcolor: 'error.50', color: 'error.main', p: 2, borderRadius: 2, mb: 4, border: '1px solid', borderColor: 'error.100' }}>
                <Typography variant="body2" sx={{ fontWeight: 500 }}>{error}</Typography>
              </Box>
            )}

            <form onSubmit={handleLogin}>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
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
                  <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 1 }}>
                    <Typography component={RouterLink} to="#" variant="body2" color="primary" sx={{ textDecoration: 'none', fontWeight: 600, '&:hover': { textDecoration: 'underline' } }}>
                      Forgot password?
                    </Typography>
                  </Box>
                </Box>

                <Button 
                  type="submit" 
                  variant="contained" 
                  size="large" 
                  disabled={loading}
                  sx={{ py: 1.5, borderRadius: 3, fontWeight: 700, mt: 2, fontSize: '1.05rem', boxShadow: '0 8px 16px rgba(99,102,241,0.25)' }}
                >
                  {loading ? <CircularProgress size={24} color="inherit" /> : 'Sign In'}
                </Button>
              </Box>
            </form>

            <Box sx={{ mt: 5, textAlign: 'center' }}>
              <Typography variant="body2" color="text.secondary">
                Don't have an account?{' '}
                <Typography component={RouterLink} to="/register" variant="body2" color="primary" sx={{ fontWeight: 600, textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>
                  Sign up for free
                </Typography>
              </Typography>
            </Box>
          </motion.div>
        </Box>
      </Box>

      {/* Right Side - Graphic (Desktop Only) */}
      <Box sx={{ flex: 0.5, display: { xs: 'none', md: 'flex' }, bgcolor: '#1e1b4b', position: 'relative', overflow: 'hidden' }}>
        <Box sx={{ absolute: 'inset', backgroundImage: 'url("https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop")', backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.2, width: '100%', height: '100%' }} />
        <Box sx={{ absolute: 'inset', background: 'linear-gradient(to right, #1e1b4b 0%, transparent 100%)', width: '100%', height: '100%', position: 'absolute' }} />
        
        <Box sx={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', justifyContent: 'center', p: 12 }}>
          <motion.div initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, delay: 0.2 }}>
            <Typography variant="h3" sx={{ color: 'white', fontWeight: 800, mb: 4, lineHeight: 1.2 }}>
              Join the top 1% of <br /> AI Professionals.
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, mb: 6 }}>
              {[1, 2, 3].map(i => (
                <Box key={i} sx={{ display: 'flex', alignItems: 'center', gap: 1, bgcolor: 'rgba(255,255,255,0.1)', px: 2, py: 1, borderRadius: 2, backdropFilter: 'blur(10px)' }}>
                  <ArrowRight className="h-4 w-4 text-blue-400" />
                  <Typography variant="body2" sx={{ color: 'white', fontWeight: 600 }}>Top Instructors</Typography>
                </Box>
              ))}
            </Box>
          </motion.div>
        </Box>
      </Box>
    </Box>
  );
};
