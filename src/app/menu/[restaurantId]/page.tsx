"use client";

import { useEffect, useRef, useState } from "react";
import { useParams } from "next/navigation";
import { Typography, Grid, CircularProgress, Container, Button } from "@mui/material";
import { ItemCard } from "@/components/MenuItemCard";
import { Item } from "@/interfaces/Item";
// import { useRouter } from 'next/navigation';
// import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useCart } from "@/context/CartContext";
import { CategoryDocument } from "@/models/Category";
import { Subcategory } from "@/interfaces/Subcategory";
import { Tabs, Tab, Box } from '@mui/material';
import React from "react";
import { useRestaurant } from "@/context/RestaurantContext";
import { ShoppingCartIcon } from "lucide-react";

export default function MenuPage() {
  const { restaurantId } = useParams();
  const {setRestaurant} = useRestaurant();
  const [categories, setCategories] = useState<CategoryDocument[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<CategoryDocument|null>(null);
  const [subcategories, setSubcategories] = useState<Subcategory[]>([]);
  const [menu, setMenu] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedTab, setSelectedTab] = useState(0);

  // const router = useRouter();
  const { cart } = useCart();
  const sectionRefs = useRef<Record<string, React.RefObject<HTMLDivElement | null>>>({});

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
  }, [restaurantId, setRestaurant]);

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

  const handleTabClick = (subcategoryName: string) => {
    const ref = sectionRefs.current[subcategoryName];
    if (ref?.current) {
      ref.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

/*   const handleCategoryChange = (event: SelectChangeEvent<string>) => {
    const selectedId = event.target.value;
    const category = categories.find((c) => c.id === selectedId);
    if (category) {
      setSelectedCategory(category);
    }
  } */

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue)
  };

  return (
    <>
        <Container sx={{ py: 6, px: 3, width: '100%', maxWidth: '430px' }}>
          {/*<Select
            value={selectedCategory}
            onChange={handleCategoryChange}
            size="small"
            sx={{ minWidth: 150, ml: 2 }}
            renderValue={(selected) => selected?.name || ''}
          >
            {categories.map((category) => (
              <MenuItem key={category.id} value={category.id}>
                {category.name}
              </MenuItem>
            ))}
          </Select>*/}
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
                    <Tab key={subcategory.id} label={subcategory.name} onClick={() => handleTabClick(subcategory.name)}/>
                  )
                ))}
              </Tabs>
            </Box>
          </Grid>

          {/* Items */}
          <Grid container spacing={2}>
            {subcategories.map((subcategory) => {
              if (!subcategory.items || subcategory?.items?.length === 0) return null;

              if (!sectionRefs.current[subcategory.name]) {
                sectionRefs.current[subcategory.name] = React.createRef<HTMLDivElement>();
              }
              
              return (
                <Box sx={{ xs: 12, sm: 6, md: 4, my: 2 }} key={subcategory.id} ref={sectionRefs.current[subcategory.name]}>
                  
                  {selectedCategory && subcategory?.items?.length > 0 && 
                  
                  <Typography variant="h5" sx={{ mb: 2, fontWeight: "500" }}>
                    {subcategory.name}
                  </Typography>}

                  <Grid container spacing={2}>
                    {subcategory?.items?.map((item) => (
                      <Grid size={{ xs: 12,sm: 6, md: 3 }} key={item._id}>
                        <ItemCard item={item} />
                      </Grid>
                    ))}
                  </Grid>
                  
                </Box>
              )})}
          </Grid>




          {totalItems > 0 && (
            <Button
              onClick={() => console.log("Cart is ready")}
              sx={{
                position: 'fixed',
                bottom: 20,
                left: '50%',
                transform: 'translateY(-52px) translateX(-80px)',
                borderRadius: '10px',
                boxShadow: 3,
                bgcolor: '#000000',
                "&:hover": {
                  bgcolor: "#3b5670",
                },
                px: 2,
                color: 'white'
              }}
            >
                <ShoppingCartIcon className='shoppingCartIcon' />
                Ver pedido ({totalItems})
            </Button>
          )}
        </Container>
    </>
  );
}