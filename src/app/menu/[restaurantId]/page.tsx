"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Typography, Grid, CircularProgress, Container, Button } from "@mui/material";
import { MenuItemCard } from "@/components/MenuItemCard";
import { MenuItem } from "@/interfaces/MenuItem";
import { useRouter } from 'next/navigation';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useCart } from "@/context/CartContext";
import { CategoryDocument } from "@/models/Category";
import { Restaurant } from "@/interfaces/Restaurant";
import { Subcategory } from "@/interfaces/Subcategory";
import { Tabs, Tab, Box } from '@mui/material';
import { styled } from '@mui/material/styles';

const CustomTab = styled(Tab)(({ theme }) => ({
  borderRadius: 5,
  marginRight: 10,
  textTransform: 'none',
  border: `1px solid ${theme.palette.divider}`,
  minWidth: 'auto',
  padding: '6px 16px',
  '&.Mui-selected': {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
  },
}));

export default function MenuPage() {
  const { restaurantId } = useParams();
  const [restaurant, setRestaurant] = useState<Restaurant|null>(null);
  const [categories, setCategories] = useState<CategoryDocument[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<CategoryDocument|null>(null);
  const [subcategories, setSubcategories] = useState<Subcategory[]>([]);
  const [menu, setMenu] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedTab, setSelectedTab] = useState(0);

  const router = useRouter();
  const { cart } = useCart();
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);


  useEffect(() => {
    async function fetchMenu() {
      try {
        const res = await fetch(`/api/restaurants/menu?slug=${restaurantId}`);
        const data = await res.json();
        if (res.ok) {
          setRestaurant(data.restaurant)
          if(data.categories) {
            setCategories(data.categories);
            setSelectedCategory(data.categories[0])
            setSubcategories(data.categories[0].subcategories)
          } 
        } else {
          console.error(data.error);
          setMenu([]);
          setCategories([]);
          setRestaurant(null);
        }
      } catch (error) {
        console.error("Error fetching menu", error);
        setMenu([]);
      } finally {
        setLoading(false);
      }
    }

    fetchMenu();
  }, [restaurantId]);

  if (loading) {
    return (
      <Container sx={{ textAlign: "center", mt: 10 }}>
        <CircularProgress />
      </Container>
    );
  }

  if ((!categories || categories.length === 0) && (!menu || menu.length === 0)) {
    return (
      <Container sx={{ mt: 5 }}>
        <Typography variant="h4">Menú no disponible 😢</Typography>
      </Container>
    );
  }

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue);
  };

  return (
    <>
        <Container maxWidth={false} sx={{ py: 4, maxWidth: "1600px" }}>
          <Typography variant="h4" gutterBottom>
            {restaurant?.name}
          </Typography>
          <Grid container spacing={2}>
            <Box sx={{ borderColor: 'divider' }}>
              <Tabs
                value={selectedTab}
                variant="scrollable"
                onChange={handleTabChange}
                scrollButtons="auto"
              >
                {subcategories.map((subcategory) => (
                  subcategory?.items?.length > 0 && (
                    <Tab key={subcategory.id} label={subcategory.name} />
                  )
                ))}
              </Tabs>
            </Box>
          </Grid>

          {/* Items */}
          <Grid container spacing={2}>
            {subcategories.map((subcategory) => (
              <Box sx={{ xs: 12, sm: 6, md: 4, my: 2 }} key={subcategory.id}>
                
                {subcategory?.items?.length > 0 && 
                
                <Typography variant="h5" sx={{ mb: 2, fontWeight: "bold" }}>
                  {subcategory.name}
                </Typography>}

                <Grid container spacing={2}>
                  {subcategory?.items?.map((item) => (
                    <Grid size={{ xs: 12,sm: 6, md: 3 }} key={item.id}>
                      <MenuItemCard item={item} />
                    </Grid>
                  ))}
                </Grid>
                
              </Box>
            ))}
          </Grid>




          {totalItems > 0 && (
            <Button
              variant="contained"
              color="primary"
              onClick={() => router.push('/order')}
              sx={{
                position: 'fixed',
                bottom: 20,
                left: '50%',
                transform: 'translateX(-50%)',
                zIndex: 1300,
                borderRadius: '10px',
                boxShadow: 3,
                px: 3,
                py: 1,
                bgcolor: '#2C3E50',
                "&:hover": {
                  bgcolor: "#3b5670",
                }
              }}
            >
                <ShoppingCartIcon />
                Ver carrito ({totalItems})
            </Button>
          )}
        </Container>
    </>
  );
}