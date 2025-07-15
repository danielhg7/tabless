"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Typography, Grid, CircularProgress, Container } from "@mui/material";
import { MenuItemCard } from "@/components/MenuItemCard";
import { MenuItem } from "@/interfaces/MenuItem";

export default function MenuPage() {
  const { restaurantId } = useParams();
  const [menu, setMenu] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);


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
    <Container sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Menú de {restaurantId?.toString().replace("-", " ")}
      </Typography>

      <>
        <Grid container spacing={2}>
          {menu.map((item) => (
            <Grid size={{ xs: 12,sm: 6, md: 4 }} key={item.id}>
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
    </Container>
  );
}