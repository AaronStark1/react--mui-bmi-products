import React from 'react';
import { Box, Button, Typography, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Iridescence from './Iridescence';
// adjust import if your Iridescence is custom

const LandingPage = () => {
    const navigate = useNavigate();

    return (
        <Box sx={{ position: 'relative', minHeight: '100vh', overflow: 'hidden' }}>
            <Box
                sx={{
                    position: 'fixed',
                    inset: 0,
                    zIndex: 0,
                }}
            >

                <Iridescence color={[1, 1, 1]} mouseReact={false} amplitude={0.1} speed={1.0} />

            </Box>


            <Container
                maxWidth="sm"
                sx={{
                    position: 'relative',
                    zIndex: 1,
                    minHeight: '100vh',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <Box
                    sx={{
                        textAlign: 'center',
                        bgcolor: 'rgba(255, 255, 255, 0.85)',
                        p: 6,
                        borderRadius: 4,
                        boxShadow: 5,
                        backdropFilter: 'blur(8px)',
                    }}
                >
                    <Typography variant="h4" fontWeight="bold" gutterBottom color="primary">
                        Welcome to My App
                    </Typography>
                    <Typography variant="body1" sx={{ mb: 4 }}>
                        Choose a feature to get started
                    </Typography>

                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                        <Button
                            variant="contained"
                            color="primary"
                            size="large"
                            onClick={() => navigate('/bmi')}
                        >
                            BMI Calculator
                        </Button>

                        <Button
                            variant="outlined"
                            color="primary"
                            size="large"
                            onClick={() => navigate('/products')}
                        >
                            View Products
                        </Button>
                    </Box>
                </Box>
            </Container>
        </Box>
    );
};

export default LandingPage;
