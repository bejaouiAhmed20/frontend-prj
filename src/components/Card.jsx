import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { useNavigate } from 'react-router-dom';

export default function RecipeReviewCard({ name, image, description,id }) {
  const navigate = useNavigate();
  const handleSeeMore = () => {
    navigate('/destination_details/'+id );
  };

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardHeader title={name} subheader="test" />
      <CardMedia
        component="img"
        height="194"
        image={`http://localhost:5000/${image}`}
        alt={name}
      />
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="body2" color="text.secondary" flexGrow={1}>
            {description}
          </Typography>
          <Button 
            variant="contained" 
            color="primary" 
            onClick={handleSeeMore} 
            sx={{ ml: 2 }} 
          >
            See more
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}
