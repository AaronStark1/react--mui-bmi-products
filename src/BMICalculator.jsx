import React, { useState } from 'react'
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { Button, FilledInput, FormControl, FormHelperText, InputAdornment, Paper, Typography } from '@mui/material';
import GridDistortion from './GridDistortion';

const calculateBMI = (weight, height) => {
    height = height / 100
    const bmi = weight / (height * height)
    return Math.round(bmi * 10) / 10
}
const getBMIStatus = (bmi) => {
    if (bmi < 18.5)
        return { status: 'Underweight', color: '#2196f3' }
    if (bmi >= 18.5 && bmi <= 24.9)
        return { status: 'Normal weight', color: '#4caf50' }
    if (bmi >= 25 && bmi <= 29.9)
        return { status: 'Overweight', color: '#ff9800' }
    return { status: 'Obesity', color: '#f44336' }
}
const BMICalculator = () => {
    const [weight, setWeight] = useState('')
    const [height, setHeight] = useState('')
    const [bmiResult, setBmiResult] = useState(null)

    const handleCalculate = () => {
        const parsedWeight = parseFloat(weight)
        const parsedHeight = parseFloat(height)
        if (isNaN(parsedHeight) || isNaN(parsedWeight)) {
            alert('Please enter valid,positive number for height and weight')
            setBmiResult(null)
            return
        }
        const result = calculateBMI(parsedWeight, parsedHeight)
        setBmiResult(result)
    }
    const handleReset = () => {
        setHeight('')
        setWeight('')
        setBmiResult(null)
    }
    const { status, color } = getBMIStatus(bmiResult)
    return (
        <>
            <Box sx={{ position: 'relative', minHeight: '100vh', width: '100%',overflow: 'hidden' }}>
                <Box
                    // This fixed box covers the entire viewport and acts as the background
                    sx={{
                        position: 'fixed',
                        inset:0,
                        width: '100vw',
                        height: '100vh',
                        zIndex: 0,
                    }}
                >
                    <GridDistortion
                        imageSrc="https://images.unsplash.com/photo-1620121692029-d088224ddc74?q=80&w=3432&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        grid={10}
                        mouse={0.1}
                        strength={0.15}
                        relaxation={0.9}
                        className="custom-class"
                    />
                </Box>
                <Container
                    maxWidth="sm"
                    sx={{
                        position: 'relative',
                        zIndex: 1,
                        mi: '100vh',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        px: 2,
                        py: 10
                    }}
                >
                    <Paper
                        elevation={6}
                        sx={{
                            p: 4,
                            width: '100%',
                            borderRadius: 2,
                            textAlign: 'center',
                                    backgroundColor: 'rgba(245,245,245,0.9)', // light opacity to blend with bg
        backdropFilter: 'blur(6px)',// Light background for the card
                        }}
                    >
                        <Typography variant="h4" component="h1" gutterBottom sx={{ color: '#1976d2', fontWeight: 700 }}>
                            Calculate Your BMI
                        </Typography>

                        <Box component="form" noValidate autoComplete="off" sx={{ display: 'flex', flexDirection: 'column', gap: 3, mt: 3 }}>


                            <FormControl fullWidth variant="filled">
                                <FilledInput
                                    id="filled-adornment-weight"
                                    type="number"
                                    value={weight}
                                    onChange={(e) => setWeight(e.target.value)}
                                    endAdornment={<InputAdornment position="end">kg</InputAdornment>}
                                    aria-describedby="filled-weight-helper-text"
                                    inputProps={{
                                        'aria-label': 'weight',
                                        min: "1" // Enforce positive input
                                    }}
                                />
                                <FormHelperText id="filled-weight-helper-text" sx={{ textAlign: 'left' }}>Weight (kilograms)</FormHelperText>
                            </FormControl>


                            <FormControl fullWidth variant="filled">
                                <FilledInput
                                    id="filled-adornment-height"
                                    type="number"
                                    value={height}
                                    onChange={(e) => setHeight(e.target.value)}
                                    endAdornment={<InputAdornment position="end">cm</InputAdornment>}
                                    aria-describedby="filled-height-helper-text"
                                    inputProps={{
                                        'aria-label': 'height',
                                        min: "1" // Enforce positive input
                                    }}
                                />
                                <FormHelperText id="filled-height-helper-text" sx={{ textAlign: 'left' }}>Height (centimeters)</FormHelperText>
                            </FormControl>

                            <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
                                <Button
                                    variant="contained"
                                    onClick={handleCalculate}
                                    sx={{
                                        mt: 2,
                                        py: 1.5,
                                        fontSize: '1.1rem',
                                        backgroundColor: '#2196f3',
                                        '&:hover': {
                                            backgroundColor: '#1565c0',
                                        }
                                    }}
                                >
                                    Calculate BMI
                                </Button>                        <Button
                                    variant="contained"
                                    onClick={handleReset}
                                    sx={{
                                        mt: 2,
                                        py: 1.5,
                                        fontSize: '1.1rem',
                                        backgroundColor: '#e22f2fff',

                                        '&:hover': {
                                            backgroundColor: '#8f0c0cff',
                                        }
                                    }}
                                >
                                    Reset
                                </Button>
                            </Box>
                        </Box>


                        {bmiResult !== null && (
                            <Box sx={{ mt: 4, p: 2, borderTop: '2px solid #ccc', border: `3px solid ${color}`, boxShadow: `0 4px 12px ${color}40` }}>
                                <Typography variant="h5" component="p">
                                    Your BMI is: <span className="font-bold text-2xl" style={{ color: color }}>{bmiResult}</span>
                                </Typography>
                                <Typography variant="h6" component="p" sx={{ mt: 1 }}>
                                    Status: <span className={`font-semibold ${color}`}>{status}</span>
                                </Typography>
                            </Box>
                        )}

                    </Paper>
                </Container>
            </Box>
        </>
    )
}

export default BMICalculator