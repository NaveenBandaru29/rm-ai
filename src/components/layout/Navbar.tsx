import { useState } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { AppBar, Toolbar, Button, IconButton, Drawer, List, ListItem, Box, useScrollTrigger, Menu, MenuItem, Divider, Avatar, ListItemIcon, Typography, Chip, Dialog, DialogTitle, DialogContent, DialogActions, Switch } from '@mui/material';
import { BookOpen, Search, Menu as MenuIcon, X, User as UserIcon, LogOut, LayoutDashboard, Settings, Sparkles, ChevronDown, Shield } from 'lucide-react';
import { motion } from 'framer-motion';
import { AuthService } from '../../services/AuthService';
import { SearchModal } from '../common/SearchModal';
import { navLinks } from '../../data/uiConfig';
import type { User } from '../../types';

export const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [learningReminders, setLearningReminders] = useState(true);
  const [soundEffects, setSoundEffects] = useState(true);
  const location = useLocation();

  const isTransparentRoute =
    location.pathname === '/' ||
    location.pathname.startsWith('/courses') ||
    location.pathname.startsWith('/categories');

  const forceSolid = !isTransparentRoute;
  const isScrolled = useScrollTrigger({ disableHysteresis: true, threshold: 50 }) || forceSolid;

  // AuthService & user state temporarily disabled until backend integration
  // useEffect(() => {
  //   AuthService.getCurrentUser().then(u => setUser(u));
  // }, [location.pathname]);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleOpenSettings = () => {
    handleMenuClose();
    setSettingsOpen(true);
  };

  const handleCloseSettings = () => {
    setSettingsOpen(false);
  };

  const handleLogout = () => {
    AuthService.logout();
    setUser(null);
    handleMenuClose();
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center', pt: 2, bgcolor: '#1e1b4b', color: 'white', height: '100%' }}>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', px: 2, pb: 1 }}>
        <IconButton onClick={handleDrawerToggle} sx={{ color: 'white' }}>
          <X className="h-6 w-6" />
        </IconButton>
      </Box>
      {/* User profile card commented out for now */}
      <List>
        {navLinks.map((item) => (
          <ListItem key={item.name} disablePadding>
            <Button
              component={RouterLink}
              to={item.path}
              fullWidth
              sx={{
                py: 1.5,
                justifyContent: 'flex-start',
                px: 4,
                color: location.pathname === item.path ? 'primary.light' : 'white'
              }}
            >
              {item.name}
            </Button>
          </ListItem>
        ))}
        {/* <Box sx={{ p: 2, display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
          <Button component={RouterLink} to="/courses" variant="contained" fullWidth sx={{ borderRadius: 6, fontWeight: 700 }}>
            Explore Courses
          </Button>
        </Box> */}
      </List>
    </Box>
  );

  return (
    <>
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          borderBottom: '1px solid',
          borderColor: isScrolled ? 'rgba(0,0,0,0.06)' : 'transparent',
          bgcolor: isScrolled ? 'rgba(255, 255, 255, 0.9)' : 'transparent',
          backdropFilter: isScrolled ? 'blur(16px)' : 'none',
          color: isScrolled ? '#1e1b4b' : 'white',
          transition: 'all 0.3s ease'
        }}
      >
        <Toolbar sx={{ justifyContent: 'space-between', maxWidth: 'lg', width: '100%', mx: 'auto', py: 1 }}>

          {/* Logo */}
          <Box component={RouterLink} to="/" sx={{ display: 'flex', alignItems: 'center', gap: 1.5, textDecoration: 'none' }}>
            <Box sx={{ background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)', p: 1, borderRadius: 2, display: 'flex', boxShadow: '0 4px 12px rgba(99,102,241,0.3)' }}>
              <BookOpen className="h-5 w-5 text-white" />
            </Box>
            <Box component="span" sx={{ fontFamily: "'Inter', sans-serif", fontWeight: 800, fontSize: '1.25rem', color: isScrolled ? '#1e1b4b' : 'white', letterSpacing: '-0.02em', transition: 'color 0.3s ease' }}>
              RM AI
            </Box>
          </Box>

          {/* Desktop Nav */}
          <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: 4 }}>
            <Box sx={{ display: 'flex', gap: 3 }}>
              {navLinks.map((item) => (
                <Button
                  key={item.name}
                  component={RouterLink}
                  to={item.path}
                  sx={{
                    color: location.pathname === item.path ? 'primary.main' : (isScrolled ? '#475569' : 'rgba(255,255,255,0.9)'),
                    fontWeight: 600,
                    borderRadius: 2,
                    px: 2,
                    py: 1,
                    position: 'relative',
                    transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                    '&:hover': {
                      backgroundColor: isScrolled ? 'rgba(99,102,241,0.08)' : 'rgba(255,255,255,0.1)',
                      color: isScrolled ? 'primary.main' : 'white',
                      transform: 'translateY(-2px)'
                    }
                  }}
                  disableRipple
                >
                  {item.name}
                  {location.pathname === item.path && (
                    <Box
                      component={motion.div}
                      layoutId="navbar-active-indicator"
                      sx={{
                        position: 'absolute',
                        bottom: 4,
                        left: '15%',
                        width: '70%',
                        height: '3px',
                        borderRadius: '3px',
                        bgcolor: 'primary.main',
                      }}
                    />
                  )}
                </Button>
              ))}
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, pl: 3, borderLeft: '1px solid', borderColor: isScrolled ? 'rgba(0,0,0,0.1)' : 'rgba(255,255,255,0.2)', transition: 'border-color 0.3s ease' }}>
              <IconButton onClick={() => setSearchOpen(true)} size="small" sx={{ color: isScrolled ? '#64748b' : 'rgba(255,255,255,0.9)', transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)', '&:hover': { color: isScrolled ? 'primary.main' : 'white', transform: 'scale(1.1) translateY(-2px)', bgcolor: isScrolled ? 'rgba(99,102,241,0.08)' : 'rgba(255,255,255,0.1)' } }}>
                <Search className="h-5 w-5" />
              </IconButton>
              {user ? (
                <>
                  <Button
                    onClick={handleMenuOpen}
                    variant="text"
                    sx={{
                      display: 'flex', alignItems: 'center', gap: 1.2,
                      color: isScrolled ? '#1e1b4b' : 'white',
                      textTransform: 'none', fontWeight: 700,
                      fontSize: '0.9rem',
                      borderRadius: 8,
                      px: 1.5,
                      py: 0.6,
                      bgcolor: isScrolled ? 'rgba(0,0,0,0.03)' : 'rgba(255,255,255,0.1)',
                      border: '1px solid',
                      borderColor: isScrolled ? 'rgba(0,0,0,0.08)' : 'rgba(255,255,255,0.25)',
                      backdropFilter: 'blur(8px)',
                      transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                      '&:hover': {
                        bgcolor: isScrolled ? 'rgba(99,102,241,0.08)' : 'rgba(255,255,255,0.2)',
                        borderColor: isScrolled ? 'primary.main' : 'white',
                        transform: 'translateY(-1px)'
                      }
                    }}
                  >
                    <Avatar
                      src={user.avatarUrl}
                      sx={{
                        width: 30, height: 30,
                        bgcolor: 'primary.main',
                        border: '2px solid white',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.15)'
                      }}
                    >
                      {!user.avatarUrl && <UserIcon className="h-4 w-4" />}
                    </Avatar>
                    <Box sx={{ display: { xs: 'none', sm: 'block' } }}>{user.name.split(' ')[0]}</Box>
                    <ChevronDown
                      className="h-4 w-4"
                      style={{
                        transform: Boolean(anchorEl) ? 'rotate(180deg)' : 'rotate(0deg)',
                        transition: 'transform 0.2s ease',
                        opacity: 0.8
                      }}
                    />
                  </Button>
                  <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleMenuClose}
                    transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                    anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                    slotProps={{
                      list: {
                        sx: { p: 0 }
                      },
                      paper: {
                        elevation: 0,
                        sx: {
                          overflow: 'visible',
                          boxShadow: '0 20px 40px -15px rgba(15,23,42,0.18), 0 0 0 1px rgba(15,23,42,0.08)',
                          mt: 1.5,
                          borderRadius: 4,
                          minWidth: 300,
                          p: 0,
                          bgcolor: '#ffffff',
                          '&:before': {
                            content: '""',
                            display: 'block',
                            position: 'absolute',
                            top: 0,
                            right: 28,
                            width: 12,
                            height: 12,
                            bgcolor: '#0f172a',
                            transform: 'translateY(-50%) rotate(45deg)',
                            zIndex: 10,
                          },
                        },
                      }
                    }}
                  >
                    {/* User Profile Header Card */}
                    <Box sx={{
                      background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%)',
                      p: 2.5,
                      color: 'white',
                      position: 'relative',
                      overflow: 'hidden',
                      borderTopLeftRadius: 16,
                      borderTopRightRadius: 16,
                    }}>
                      <Box sx={{ position: 'absolute', top: '-30%', right: '-20%', width: 120, height: 120, background: 'radial-gradient(circle, rgba(99,102,241,0.3) 0%, transparent 70%)', pointerEvents: 'none' }} />
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, position: 'relative', zIndex: 1 }}>
                        <Avatar
                          src={user.avatarUrl}
                          sx={{
                            width: 46, height: 46,
                            bgcolor: 'primary.main',
                            border: '2px solid rgba(255,255,255,0.4)',
                            boxShadow: '0 4px 12px rgba(0,0,0,0.3)'
                          }}
                        >
                          {!user.avatarUrl && <UserIcon className="h-6 w-6" />}
                        </Avatar>
                        <Box sx={{ overflow: 'hidden' }}>
                          <Typography sx={{ fontWeight: 800, fontSize: '0.95rem', color: '#ffffff', lineHeight: 1.2 }}>
                            {user.name}
                          </Typography>
                          <Typography sx={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.7)', mt: 0.3, textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap', maxWidth: 190 }}>
                            {user.email}
                          </Typography>
                          <Chip
                            icon={<Sparkles className="h-3 w-3 text-amber-400" />}
                            label="Active Learner"
                            size="small"
                            sx={{
                              bgcolor: 'rgba(255,255,255,0.12)',
                              color: 'white',
                              fontWeight: 700,
                              fontSize: '0.65rem',
                              height: 20,
                              mt: 0.8,
                              backdropFilter: 'blur(4px)',
                              border: '1px solid rgba(255,255,255,0.15)',
                              '& .MuiChip-icon': { ml: 0.5 }
                            }}
                          />
                        </Box>
                      </Box>
                    </Box>

                    {/* Actions List */}
                    <Box sx={{ p: 1 }}>
                      <MenuItem
                        component={RouterLink}
                        to="/dashboard"
                        onClick={handleMenuClose}
                        sx={{
                          py: 1.2, px: 1.5,
                          borderRadius: 2.5,
                          my: 0.3,
                          transition: 'all 0.2s ease',
                          '&:hover': { bgcolor: 'rgba(99,102,241,0.08)', transform: 'translateX(3px)' }
                        }}
                      >
                        <ListItemIcon sx={{ minWidth: 40 }}>
                          <Box sx={{ p: 0.8, borderRadius: 2, bgcolor: 'rgba(99,102,241,0.1)', color: '#6366f1', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <LayoutDashboard className="h-4 w-4" />
                          </Box>
                        </ListItemIcon>
                        <Box>
                          <Typography sx={{ fontWeight: 700, fontSize: '0.875rem', color: '#0f172a' }}>Dashboard</Typography>
                          <Typography sx={{ fontSize: '0.725rem', color: '#64748b' }}>Your learning progress</Typography>
                        </Box>
                      </MenuItem>

                      <MenuItem
                        component={RouterLink}
                        to="/courses"
                        onClick={handleMenuClose}
                        sx={{
                          py: 1.2, px: 1.5,
                          borderRadius: 2.5,
                          my: 0.3,
                          transition: 'all 0.2s ease',
                          '&:hover': { bgcolor: 'rgba(59,130,246,0.08)', transform: 'translateX(3px)' }
                        }}
                      >
                        <ListItemIcon sx={{ minWidth: 40 }}>
                          <Box sx={{ p: 0.8, borderRadius: 2, bgcolor: 'rgba(59,130,246,0.1)', color: '#3b82f6', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <BookOpen className="h-4 w-4" />
                          </Box>
                        </ListItemIcon>
                        <Box>
                          <Typography sx={{ fontWeight: 700, fontSize: '0.875rem', color: '#0f172a' }}>Browse Courses</Typography>
                          <Typography sx={{ fontSize: '0.725rem', color: '#64748b' }}>Explore AI & Data curriculum</Typography>
                        </Box>
                      </MenuItem>

                      <MenuItem
                        onClick={handleOpenSettings}
                        sx={{
                          py: 1.2, px: 1.5,
                          borderRadius: 2.5,
                          my: 0.3,
                          transition: 'all 0.2s ease',
                          '&:hover': { bgcolor: 'rgba(100,116,139,0.08)', transform: 'translateX(3px)' }
                        }}
                      >
                        <ListItemIcon sx={{ minWidth: 40 }}>
                          <Box sx={{ p: 0.8, borderRadius: 2, bgcolor: 'rgba(100,116,139,0.1)', color: '#475569', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Settings className="h-4 w-4" />
                          </Box>
                        </ListItemIcon>
                        <Box>
                          <Typography sx={{ fontWeight: 700, fontSize: '0.875rem', color: '#0f172a' }}>Account Settings</Typography>
                          <Typography sx={{ fontSize: '0.725rem', color: '#64748b' }}>Preferences & profile</Typography>
                        </Box>
                      </MenuItem>

                      <Divider sx={{ my: 1, borderColor: 'rgba(0,0,0,0.06)' }} />

                      <MenuItem
                        onClick={handleLogout}
                        sx={{
                          py: 1.2, px: 1.5,
                          borderRadius: 2.5,
                          my: 0.3,
                          color: '#ef4444',
                          transition: 'all 0.2s ease',
                          '&:hover': { bgcolor: 'rgba(239,68,68,0.08)', color: '#dc2626', transform: 'translateX(3px)' }
                        }}
                      >
                        <ListItemIcon sx={{ minWidth: 40 }}>
                          <Box sx={{ p: 0.8, borderRadius: 2, bgcolor: 'rgba(239,68,68,0.1)', color: '#ef4444', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <LogOut className="h-4 w-4" />
                          </Box>
                        </ListItemIcon>
                        <Box>
                          <Typography sx={{ fontWeight: 700, fontSize: '0.875rem' }}>Sign Out</Typography>
                          <Typography sx={{ fontSize: '0.725rem', color: '#94a3b8' }}>End current session</Typography>
                        </Box>
                      </MenuItem>
                    </Box>
                  </Menu>

                  {/* Interactive Account Settings Dialog */}
                  <Dialog
                    open={settingsOpen}
                    onClose={handleCloseSettings}
                    maxWidth="sm"
                    fullWidth
                    slotProps={{
                      paper: {
                        sx: {
                          borderRadius: 4,
                          p: 1,
                          boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)'
                        }
                      }
                    }}
                  >
                    <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', pb: 1 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                        <Box sx={{ bgcolor: 'primary.50', p: 1, borderRadius: 2, color: 'primary.main', display: 'flex' }}>
                          <Settings className="h-5 w-5" />
                        </Box>
                        <Typography variant="h6" sx={{ fontWeight: 800, color: '#0f172a' }}>
                          Account Settings
                        </Typography>
                      </Box>
                      <IconButton onClick={handleCloseSettings} size="small" sx={{ color: '#64748b' }}>
                        <X className="h-5 w-5" />
                      </IconButton>
                    </DialogTitle>
                    <Divider />
                    <DialogContent sx={{ py: 3 }}>
                      {/* Profile Card inside Settings */}
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2.5, p: 2.5, bgcolor: '#f8fafc', borderRadius: 3, border: '1px solid #e2e8f0', mb: 3 }}>
                        <Avatar src={user?.avatarUrl} sx={{ width: 56, height: 56, border: '3px solid white', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
                        <Box sx={{ flexGrow: 1 }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Typography sx={{ fontWeight: 800, color: '#0f172a', fontSize: '1.05rem' }}>{user?.name}</Typography>
                            <Chip label="Pro Student" size="small" color="primary" sx={{ height: 20, fontSize: '0.7rem', fontWeight: 700 }} />
                          </Box>
                          <Typography sx={{ color: '#64748b', fontSize: '0.85rem', mt: 0.3 }}>{user?.email}</Typography>
                        </Box>
                      </Box>

                      <Typography variant="subtitle2" sx={{ fontWeight: 800, color: '#0f172a', textTransform: 'uppercase', letterSpacing: '0.05em', fontSize: '0.75rem', mb: 2 }}>
                        Learning Preferences
                      </Typography>

                      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, mb: 3 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 1.5, border: '1px solid #f1f5f9', borderRadius: 2, bgcolor: '#fcfcfd' }}>
                          <Box>
                            <Typography sx={{ fontWeight: 600, fontSize: '0.875rem', color: '#0f172a' }}>Weekly Progress Digest</Typography>
                            <Typography sx={{ fontSize: '0.75rem', color: '#64748b' }}>Summaries of completed lessons & milestones</Typography>
                          </Box>
                          <Switch checked={emailNotifications} onChange={(e) => setEmailNotifications(e.target.checked)} color="primary" />
                        </Box>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 1.5, border: '1px solid #f1f5f9', borderRadius: 2, bgcolor: '#fcfcfd' }}>
                          <Box>
                            <Typography sx={{ fontWeight: 600, fontSize: '0.875rem', color: '#0f172a' }}>Study Routine Reminders</Typography>
                            <Typography sx={{ fontSize: '0.75rem', color: '#64748b' }}>Gentle reminders to maintain daily momentum</Typography>
                          </Box>
                          <Switch checked={learningReminders} onChange={(e) => setLearningReminders(e.target.checked)} color="primary" />
                        </Box>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 1.5, border: '1px solid #f1f5f9', borderRadius: 2, bgcolor: '#fcfcfd' }}>
                          <Box>
                            <Typography sx={{ fontWeight: 600, fontSize: '0.875rem', color: '#0f172a' }}>Lesson Audio & Celebrations</Typography>
                            <Typography sx={{ fontSize: '0.75rem', color: '#64748b' }}>Audio chimes when finishing quizzes and modules</Typography>
                          </Box>
                          <Switch checked={soundEffects} onChange={(e) => setSoundEffects(e.target.checked)} color="primary" />
                        </Box>
                      </Box>

                      <Box sx={{ p: 2, bgcolor: 'primary.50', borderRadius: 2.5, border: '1px solid rgba(99,102,241,0.2)', display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Shield className="h-6 w-6 text-indigo-600 flex-shrink-0" />
                        <Box>
                          <Typography sx={{ fontWeight: 700, color: 'primary.dark', fontSize: '0.85rem' }}>Authenticated via Secure Cloud</Typography>
                          <Typography sx={{ color: '#475569', fontSize: '0.75rem' }}>Your credentials and course completions are synced safely across all devices.</Typography>
                        </Box>
                      </Box>
                    </DialogContent>
                    <DialogActions sx={{ px: 3, pb: 2 }}>
                      <Button onClick={handleCloseSettings} sx={{ color: '#64748b', fontWeight: 600 }}>
                        Close
                      </Button>
                      <Button onClick={handleCloseSettings} variant="contained" sx={{ borderRadius: 6, px: 3, fontWeight: 700, boxShadow: '0 4px 12px rgba(99,102,241,0.25)' }}>
                        Save Preferences
                      </Button>
                    </DialogActions>
                  </Dialog>
                </>
              ) : (
                <>
                  {/* <Button
                    component={RouterLink}
                    to="/courses"
                    variant="contained"
                    disableElevation
                    sx={{
                      borderRadius: 6,
                      px: 3,
                      py: 1,
                      fontWeight: 700,
                      background: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)',
                      boxShadow: '0 4px 14px rgba(99,102,241,0.3)',
                      transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                      '&:hover': {
                        boxShadow: '0 6px 20px rgba(99,102,241,0.5)',
                        transform: 'translateY(-2px)'
                      }
                    }}
                  >
                    Explore Courses
                  </Button> */}
                </>
              )}
            </Box>
          </Box>

          {/* Mobile Actions (Search + Hamburger Menu) */}
          <Box sx={{ display: { xs: 'flex', md: 'none' }, alignItems: 'center', gap: 2 }}>
            <IconButton onClick={() => setSearchOpen(true)} size="small" sx={{ color: isScrolled ? '#1e1b4b' : 'white', p: 1 }}>
              <Search className="h-5 w-5" />
            </IconButton>
            <IconButton
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ color: isScrolled ? '#1e1b4b' : 'white', transition: 'color 0.3s ease', p: 1 }}
            >
              <MenuIcon className="h-6 w-6" />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 280, bgcolor: '#1e1b4b' },
        }}
      >
        {drawer}
      </Drawer>

      <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
};
