import { useState, useEffect } from 'react';
import { Dialog, Box, InputBase, Typography, IconButton, Chip, List } from '@mui/material';
import { Search as SearchIcon, X, BookOpen, Clock, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { CourseService } from '../../services/CourseService';
import type { Course } from '../../types';

interface SearchModalProps {
  open: boolean;
  onClose: () => void;
}

export const SearchModal = ({ open, onClose }: SearchModalProps) => {
  const [query, setQuery] = useState('');
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (open) {
      setLoading(true);
      CourseService.getAllCourses().then(data => {
        setCourses(data);
        setLoading(false);
      });
    } else {
      // Clear query when closed to reset state for next time
      setTimeout(() => setQuery(''), 300);
    }
  }, [open]);

  const handleClose = () => {
    onClose();
  };

  const handleNavigate = (slug: string) => {
    onClose();
    navigate(`/courses/${slug}`);
  };

  const filteredCourses = courses.filter(course => {
    if (!query) return false;
    const lowerQuery = query.toLowerCase();
    return (
      course.title.toLowerCase().includes(lowerQuery) ||
      course.shortDescription.toLowerCase().includes(lowerQuery) ||
      course.skills.some(skill => skill.toLowerCase().includes(lowerQuery))
    );
  });

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullWidth
      maxWidth="md"
      slotProps={{
        paper: {
          sx: {
            bgcolor: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(16px)',
            borderRadius: 4,
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
            overflow: 'hidden',
            mt: { xs: 4, md: 10 },
            alignSelf: 'flex-start'
          }
        },
        backdrop: {
          sx: {
            backgroundColor: 'rgba(15, 23, 42, 0.4)',
            backdropFilter: 'blur(4px)'
          }
        }
      }}
    >
      <Box sx={{ p: 2, display: 'flex', alignItems: 'center', borderBottom: '1px solid rgba(0,0,0,0.08)' }}>
        <SearchIcon className="h-6 w-6 text-primary-main ml-2" />
        <InputBase
          autoFocus
          fullWidth
          placeholder="Search for courses, skills, or topics..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          sx={{ ml: 2, flex: 1, fontSize: '1.25rem', '& input': { py: 1.5 } }}
        />
        <IconButton onClick={handleClose} sx={{ color: 'text.secondary', '&:hover': { color: 'error.main', bgcolor: 'error.50' } }}>
          <X className="h-5 w-5" />
        </IconButton>
      </Box>

      <Box sx={{ maxHeight: '60vh', overflowY: 'auto', p: 0 }}>
        {loading ? (
          <Box sx={{ p: 4, textAlign: 'center' }}>
            <Typography color="text.secondary">Loading courses...</Typography>
          </Box>
        ) : query && filteredCourses.length === 0 ? (
          <Box sx={{ p: 6, textAlign: 'center' }}>
            <Box sx={{ bgcolor: 'slate.100', width: 64, height: 64, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', mx: 'auto', mb: 2 }}>
              <SearchIcon className="h-8 w-8 text-slate-400" />
            </Box>
            <Typography variant="h6" sx={{ fontWeight: 600, color: '#1e1b4b', mb: 1 }}>No results found</Typography>
            <Typography variant="body2" color="text.secondary">
              We couldn't find anything matching "{query}". Try adjusting your search terms.
            </Typography>
          </Box>
        ) : !query ? (
          <Box sx={{ p: 4 }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 700, color: 'text.secondary', textTransform: 'uppercase', letterSpacing: 1, mb: 3 }}>
              Popular Searches
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {['Machine Learning', 'Python', 'Generative AI', 'Data Analysis', 'Deep Learning'].map(term => (
                <Chip 
                  key={term} 
                  label={term} 
                  onClick={() => setQuery(term)}
                  sx={{ 
                    bgcolor: 'slate.100', 
                    color: 'slate.700', 
                    fontWeight: 500, 
                    borderRadius: 2,
                    '&:hover': { bgcolor: 'primary.50', color: 'primary.main' }
                  }} 
                />
              ))}
            </Box>
          </Box>
        ) : (
          <List sx={{ p: 0 }}>
            <AnimatePresence>
              {filteredCourses.map((course, index) => (
                <motion.div
                  key={course.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2, delay: index * 0.02 }}
                >
                  <Box 
                    onClick={() => handleNavigate(course.slug)}
                    sx={{ 
                      p: 3, 
                      display: 'flex', 
                      gap: 3, 
                      cursor: 'pointer',
                      borderBottom: '1px solid rgba(0,0,0,0.04)',
                      transition: 'all 0.2s',
                      borderLeft: '4px solid transparent',
                      '&:hover': { 
                        bgcolor: 'primary.50',
                        borderLeft: '4px solid #6366f1',
                        pl: 4,
                        '& .arrow-icon': {
                          transform: 'translateX(4px)',
                          color: 'primary.dark'
                        }
                      },
                      '&:last-child': { borderBottom: 'none' }
                    }}
                  >
                    <Box component="img" src={course.thumbnailUrl} sx={{ width: 100, height: 60, borderRadius: 2, objectFit: 'cover' }} />
                    <Box sx={{ flexGrow: 1 }}>
                      <Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#1e1b4b', mb: 0.5 }}>{course.title}</Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, color: 'text.secondary' }}>
                        <Typography variant="caption" sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                          <BookOpen className="h-3 w-3" /> {course.level}
                        </Typography>
                        <Typography variant="caption" sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                          <Clock className="h-3 w-3" /> {course.durationHours}h
                        </Typography>
                      </Box>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <IconButton className="arrow-icon" size="small" sx={{ color: 'primary.main', transition: 'all 0.2s' }}>
                        <ArrowRight className="h-5 w-5" />
                      </IconButton>
                    </Box>
                  </Box>
                </motion.div>
              ))}
            </AnimatePresence>
          </List>
        )}
      </Box>
    </Dialog>
  );
};
