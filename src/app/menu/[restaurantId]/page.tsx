"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Typography, Grid, CircularProgress, Container, Button } from "@mui/material";
import { MenuItemCard } from "@/components/MenuItemCard";
import { MenuItem } from "@/interfaces/MenuItem";
import { useRouter } from 'next/navigation';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useCart } from "@/context/CartContext";

export default function MenuPage() {
  const { restaurantId } = useParams();
  const [menu, setMenu] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { cart } = useCart();
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);


  useEffect(() => {
    async function fetchMenu() {
      try {
        const res = await fetch(`/api/restaurants/menu?slug=${restaurantId}`);
        const data = await res.json();
        if (res.ok) {
          setMenu(data.menu);
        } else {
          console.error(data.error);
          setMenu([]);
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

  if (!menu || menu.length === 0) {
    return (
      <Container sx={{ mt: 5 }}>
        <Typography variant="h4">Menú no disponible 😢</Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth={false} sx={{ py: 4, maxWidth: "1600px" }}>
      <Typography variant="h4" gutterBottom>
        Menú de {restaurantId?.toString().replace("-", " ")}
      </Typography>

      <>
        <Grid container spacing={2}>
          {menu.map((item) => (
            <Grid size={{ xs: 12,sm: 6, md: 3 }} key={item.id}>
              <MenuItemCard item={item} />
            </Grid>
          ))}
        </Grid>

{/*         <Link href="/order" passHref>
          <Fab
            color="primary"
            aria-label="ver pedido"
            sx={{
              position: "fixed",
              bottom: 24,
              right: 24,
              zIndex: 1000,
            }}
          >
            <Badge badgeContent={totalItems} 
                    color="error" 
                    invisible={totalItems === 0}>
              <ShoppingCartIcon />
            </Badge>
          </Fab>
        </Link> */}
      </>
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
  );
}