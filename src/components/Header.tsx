"use client";

import { AppBar, Box, Toolbar, Typography, IconButton, Badge } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
// import Image from "next/image";

export const Header = () => {
  const { cart } = useCart();
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <AppBar position="sticky" sx={{ bgcolor: '#2C3E50' }}>
      <Toolbar>
        {/* Logo y nombre de la app */}
        <Link href="/" passHref>
          <Box sx={{ display: "flex", alignItems: "center", textDecoration: "none", color: "white" }}>
            {/* <Image
              src="/logo.svg" // Cambia esto según el nombre y ruta de tu logo
              alt="Tabless Logo"
              width={32}
              height={32}
              style={{ marginRight: 8 }}
              priority
            />*/}
            <Typography variant="h6" component="div">
              Tabless
            </Typography>
          </Box>
        </Link>

        <Box sx={{ flexGrow: 1 }} />

        <Link href="/order" passHref>
          <IconButton
            sx={{
              bgcolor: "#2C3E50",
              color: "white",
              "&:hover": {
                bgcolor: "#3b5670"
              },
            }}
          >
            <Badge badgeContent={totalItems} 
                    color="error" 
                    invisible={totalItems === 0}>
              <ShoppingCartIcon />
            </Badge>
          </IconButton>
        </Link>
      </Toolbar>
    </AppBar>
  );
}
