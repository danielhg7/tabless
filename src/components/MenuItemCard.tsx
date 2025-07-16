import { Card, CardContent, Typography, Button, Box, CardActions } from "@mui/material";
import { MenuItem } from "@/interfaces/MenuItem";
import { useCart } from "@/context/CartContext";
import Image from "next/image";

interface Props {
  item: MenuItem;
}

export const MenuItemCard = ({ item }: Props) => {
  const { addToCart } = useCart();

  return (
    <Card sx={{
      display: "flex",
      alignItems: "center",
      backgroundColor: "#FCDC3F", // Amarillo
      borderRadius: "12px",
      border: "1px solid #00000033",
      padding: 1.5,
      boxShadow: "none",
      maxWidth: 720,
      margin: "0 auto",
    }}>
      {/* Imagen del producto */}

      <Box
        sx={{
          position: "relative",
          width: 100,
          height: 100,
          borderRadius: "8px",
          overflow: "hidden",
          flexShrink: 0,
        }}
      >
        <Image
          src={item.imageUrl}
          alt={item.name}
          fill
          style={{ objectFit: "cover" }}
        />
      </Box>
      <Box sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          pl: 2,
          flexGrow: 1,
          height: "100%",
        }}>
        <Typography variant="subtitle1" fontWeight="bold">
          {item.name}
        </Typography>
        <Typography variant="body2" color="text.primary">
          {item.description}
        </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mt: 1,
          }}
        >
          <Typography fontWeight="bold">${item.price.toLocaleString()}</Typography>
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#000",
              color: "#fff",
              fontWeight: "bold",
              textTransform: "none",
              "&:hover": {
                backgroundColor: "#333",
              }
            }}
            onClick={() => addToCart(item)}
          >
            Agregar al carrito
          </Button>
        </Box>
      </Box>
    </Card>
  );
};