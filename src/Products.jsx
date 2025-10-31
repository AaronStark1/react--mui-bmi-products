import React, { useEffect, useState } from 'react';
import {
    Grid,
    Card,
    CardContent,
    CardMedia,
    Typography,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    Box,
    CircularProgress,
} from '@mui/material';

const Products = () => {
    const [products, setProducts] = useState([]);
    const [filtered, setFiltered] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await fetch('https://fakestoreapi.com/products');
                const data = await res.json();
                setProducts(data);
                setFiltered(data);

                const uniqueCategories = ['all', ...new Set(data.map(p => p.category))];
                setCategories(uniqueCategories);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching products:', error);
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    const handleFilterChange = (e) => {
        const category = e.target.value;
        setSelectedCategory(category);

        if (category === 'all') {
            setFiltered(products);
        } else {
            setFiltered(products.filter(p => p.category === category));
        }
    };

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Box p={4}>
            <FormControl sx={{ minWidth: 200, mb: 4 }}>
                <InputLabel>Filter by Category</InputLabel>
                <Select value={selectedCategory} onChange={handleFilterChange} label="Filter by Category">
                    {categories.map(cat => (
                        <MenuItem key={cat} value={cat}>
                            {cat.charAt(0).toUpperCase() + cat.slice(1)}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>

            <Grid container spacing={3}>
                {filtered.map(product => (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
                        <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', boxShadow: 3 }}>
                            <CardMedia
                                component="img"
                                image={product.image}
                                alt={product.title}
                                sx={{ height: 200, objectFit: 'contain', p: 2 }}
                            />
                            <CardContent>
                                <Typography variant="h6" gutterBottom noWrap>
                                    {product.title}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Category: {product.category}
                                </Typography>
                                <Typography variant="subtitle1" color="primary" sx={{ mt: 1 }}>
                                    ${product.price.toFixed(2)}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default Products;
