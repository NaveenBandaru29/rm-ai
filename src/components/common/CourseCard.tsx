import { Link } from 'react-router-dom';
import { Star, BookOpen, PlayCircle, ArrowRight } from 'lucide-react';
import { Card, CardContent, Typography, Box, Chip, Tooltip, Button } from '@mui/material';
import type { Course } from '../../types';

interface CourseCardProps {
  course: Course;
}

export const CourseCard = ({ course }: CourseCardProps) => {
  const discountPercent = course.actualPrice > course.discountedPrice
    ? Math.round(((course.actualPrice - course.discountedPrice) / course.actualPrice) * 100)
    : 0;

  return (
    <Card sx={{
      display: 'flex', flexDirection: 'column', height: '100%',
      borderRadius: { xs: 3, sm: 4 }, overflow: 'hidden',
      boxShadow: '0 10px 30px rgba(0,0,0,0.04)', border: '1px solid rgba(0,0,0,0.08)',
      transition: 'all 0.3s ease',
      '&:hover': { boxShadow: '0 25px 50px rgba(99,102,241,0.15)', borderColor: 'primary.300', transform: { sm: 'translateY(-4px)' } }
    }}>
      {/* Thumbnail area with responsive height */}
      <Box sx={{ position: 'relative', height: { xs: 180, sm: 205, md: 225 }, overflow: 'hidden' }}>
        <Box
          component="img"
          src={course.thumbnailUrl}
          alt={course.title}
          sx={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.7s ease', '&:hover': { transform: 'scale(1.08)' } }}
        />
        <Box sx={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(15,23,42,0.9) 0%, rgba(15,23,42,0.2) 50%, transparent 100%)' }} />

        {/* Top Badges */}
        <Box sx={{ position: 'absolute', top: { xs: 10, sm: 14 }, left: { xs: 10, sm: 14 }, display: 'flex', gap: 1 }}>
          <Chip 
            label={course.level} 
            size="small" 
            sx={{ 
              bgcolor: 'rgba(255,255,255,0.95)', 
              color: '#1e1b4b', 
              fontWeight: 700, 
              fontSize: { xs: '0.7rem', sm: '0.75rem' },
              height: { xs: 22, sm: 24 },
              backdropFilter: 'blur(8px)', 
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)' 
            }} 
          />
          {course.isBestseller && (
            <Chip 
              label="Bestseller" 
              size="small" 
              sx={{ 
                bgcolor: 'warning.main', 
                color: 'warning.contrastText', 
                fontWeight: 700, 
                fontSize: { xs: '0.7rem', sm: '0.75rem' },
                height: { xs: 22, sm: 24 },
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)' 
              }} 
            />
          )}
        </Box>

        {/* Play Icon on hover */}
        <Box sx={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: 0, transition: 'opacity 0.3s', '&:hover': { opacity: 1 } }}>
          <Box sx={{ bgcolor: 'primary.main', borderRadius: '50%', p: { xs: 1, sm: 1.5 }, display: 'flex', boxShadow: '0 0 30px rgba(99,102,241,0.6)' }}>
            <PlayCircle className="h-10 w-10 sm:h-12 sm:w-12 text-white" />
          </Box>
        </Box>

        {/* Bottom Metadata Badges */}
        <Box sx={{ position: 'absolute', bottom: { xs: 10, sm: 14 }, left: { xs: 10, sm: 14 }, right: { xs: 10, sm: 14 }, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, bgcolor: 'rgba(255,255,255,0.18)', border: '1px solid rgba(255,255,255,0.25)', px: { xs: 1.25, sm: 1.5 }, py: { xs: 0.4, sm: 0.6 }, borderRadius: 2.5, backdropFilter: 'blur(8px)' }}>
            <Star className="h-3.5 w-3.5 sm:h-4 sm:w-4 fill-yellow-400 text-yellow-400" />
            <Typography variant="body2" sx={{ fontWeight: 700, color: 'white', fontSize: { xs: '0.75rem', sm: '0.85rem' } }}>{course.rating}</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, bgcolor: 'rgba(255,255,255,0.18)', border: '1px solid rgba(255,255,255,0.25)', px: { xs: 1.25, sm: 1.5 }, py: { xs: 0.4, sm: 0.6 }, borderRadius: 2.5, backdropFilter: 'blur(8px)' }}>
            <BookOpen className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-white" />
            <Typography variant="body2" sx={{ fontWeight: 600, color: 'white', fontSize: { xs: '0.75rem', sm: '0.85rem' } }}>{course.durationHours}h</Typography>
          </Box>
        </Box>
      </Box>

      {/* Card Content with responsive padding */}
      <CardContent sx={{ flexGrow: 1, p: { xs: 2.5, sm: 3 } }}>
        <Typography 
          component={Link}
          to={`/courses/${course.slug}`}
          variant="h5" 
          sx={{ 
            textDecoration: 'none',
            display: 'block',
            fontWeight: 800, 
            mb: { xs: 1, sm: 1.5 }, 
            lineHeight: 1.3, 
            color: '#1e1b4b', 
            fontSize: { xs: '1.1rem', sm: '1.25rem', md: '1.35rem' },
            minHeight: { sm: '3.2rem', md: '3.5rem' },
            transition: 'color 0.2s', 
            '&:hover': { color: 'primary.main' } 
          }}
        >
          {course.title}
        </Typography>

        <Typography variant="body2" color="text.secondary" sx={{ 
          display: '-webkit-box', 
          WebkitLineClamp: 2, 
          WebkitBoxOrient: 'vertical', 
          overflow: 'hidden', 
          mb: { xs: 2, sm: 2.5 }, 
          lineHeight: 1.6,
          fontSize: { xs: '0.85rem', sm: '0.875rem' }
        }}>
          {course.shortDescription}
        </Typography>

        {/* Skills Chips */}
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: { xs: 0.75, sm: 1 }, mb: 1 }}>
          {course.skills.slice(0, 3).map(skill => (
            <Chip 
              key={skill} 
              label={skill} 
              size="small" 
              sx={{ 
                bgcolor: 'slate.100', 
                color: 'slate.700', 
                fontWeight: 600, 
                fontSize: { xs: '0.7rem', sm: '0.75rem' },
                height: { xs: 24, sm: 26 },
                borderRadius: 1.5, 
                '&:hover': { bgcolor: 'slate.200' } 
              }} 
            />
          ))}
          {course.skills.length > 3 && (
            <Tooltip
              title={
                <Box sx={{ p: 0.75 }}>
                  <Typography variant="caption" sx={{ display: 'block', color: '#94a3b8', fontWeight: 700, mb: 1.2, textTransform: 'uppercase', letterSpacing: '0.08em', fontSize: '0.7rem' }}>
                    Additional Skills ({course.skills.length - 3})
                  </Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                    {course.skills.slice(3).map(skill => (
                      <Chip
                        key={skill}
                        label={skill}
                        size="small"
                        sx={{
                          bgcolor: 'rgba(99, 102, 241, 0.2)',
                          color: '#e0e7ff',
                          fontWeight: 600,
                          fontSize: '0.75rem',
                          borderRadius: 1.5,
                          border: '1px solid rgba(165, 180, 252, 0.3)'
                        }}
                      />
                    ))}
                  </Box>
                </Box>
              }
              arrow
              placement="top"
              slotProps={{
                tooltip: {
                  sx: {
                    bgcolor: '#0f172a',
                    color: '#ffffff',
                    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.5), 0 8px 10px -6px rgba(0, 0, 0, 0.4)',
                    border: '1px solid rgba(255, 255, 255, 0.15)',
                    borderRadius: 2.5,
                    p: 1.5,
                    maxWidth: 290
                  }
                },
                arrow: {
                  sx: { color: '#0f172a', '&::before': { border: '1px solid rgba(255, 255, 255, 0.15)' } }
                }
              }}
            >
              <Chip
                label={`+${course.skills.length - 3}`}
                size="small"
                sx={{
                  bgcolor: 'rgba(99, 102, 241, 0.08)',
                  color: '#4f46e5',
                  fontWeight: 700,
                  fontSize: { xs: '0.7rem', sm: '0.75rem' },
                  height: { xs: 24, sm: 26 },
                  border: '1px solid rgba(99, 102, 241, 0.25)',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  '&:hover': {
                    bgcolor: '#4f46e5',
                    color: '#ffffff',
                    borderColor: '#4f46e5',
                    transform: 'scale(1.05)'
                  }
                }}
              />
            </Tooltip>
          )}
        </Box>
      </CardContent>

      {/* Card Footer: Responsive layout for price and action button */}
      <Box sx={{ 
        p: { xs: 2.5, sm: 3 }, 
        pt: 0, 
        display: 'flex', 
        flexDirection: { xs: 'column', sm: 'row' },
        justifyContent: 'space-between', 
        alignItems: { xs: 'stretch', sm: 'center' }, 
        gap: { xs: 2, sm: 1.5 },
        borderTop: '1px solid rgba(0,0,0,0.06)', 
        mt: 'auto', 
        paddingTop: { xs: 2, sm: 2.5 } 
      }}>
        <Box sx={{ display: 'flex', flexDirection: { xs: 'row', sm: 'column' }, justifyContent: { xs: 'space-between', sm: 'flex-start' }, alignItems: { xs: 'center', sm: 'flex-start' } }}>
          <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1, flexWrap: 'wrap' }}>
            <Typography variant="h5" sx={{ fontWeight: 800, color: '#1e1b4b', letterSpacing: '-0.02em', fontSize: { xs: '1.25rem', sm: '1.35rem' } }}>
              {'\u20B9'}{course.discountedPrice.toLocaleString('en-IN')}
            </Typography>
            {course.actualPrice > course.discountedPrice && (
              <Typography variant="body2" sx={{ textDecoration: 'line-through', color: 'text.secondary', fontWeight: 500, fontSize: { xs: '0.8rem', sm: '0.875rem' } }}>
                {'\u20B9'}{course.actualPrice.toLocaleString('en-IN')}
              </Typography>
            )}
          </Box>
          {discountPercent > 0 && (
            <Typography variant="caption" sx={{ color: 'success.main', fontWeight: 700, fontSize: '0.75rem' }}>
              {discountPercent}% off
            </Typography>
          )}
        </Box>
        <Button 
          component={Link} 
          to={`/courses/${course.slug}`} 
          variant="contained" 
          color="primary" 
          sx={{ 
            borderRadius: 6, 
            fontWeight: 700, 
            px: { xs: 2.5, sm: 2.5, md: 3 }, 
            py: { xs: 1.1, sm: 0.9 }, 
            fontSize: { xs: '0.875rem', sm: '0.9rem' },
            width: { xs: '100%', sm: 'auto' },
            whiteSpace: 'nowrap', '& .MuiButton-endIcon': { transition: 'transform 0.2s ease-in-out' }, '&:hover .MuiButton-endIcon': { transform: 'translateX(4px)' }
          }} 
          endIcon={<ArrowRight className="h-4 w-4" />}
        >
          View Course
        </Button>
      </Box>
    </Card>
  );
};
