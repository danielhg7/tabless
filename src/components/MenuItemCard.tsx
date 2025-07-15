import { Card, CardContent, Typography, Button, Box } from "@mui/material";
import { MenuItem } from "@/interfaces/MenuItem";
import { useCart } from "@/context/CartContext";
import Image from "next/image";

interface Props {
  item: MenuItem;
}

export const MenuItemCard = ({ item }: Props) => {
  const { addToCart } = useCart();

  return (
    <Card>
      {/* Imagen del producto */}
      <Box sx={{ position: "relative", width: "100%", height: 180 }}>
        <Image
          src={item.imageUrl}
          alt={item.name}
          fill
          style={{ objectFit: "cover", borderTopLeftRadius: 4, borderTopRightRadius: 4 }}
        />
      </Box>
      <CardContent>
        <Typography variant="h6">{item.name}</Typography>
        <Typography variant="body2" color="textSecondary">
          {item.description}
        </Typography>
        <Typography variant="subtitle1" mt={1}>
          {item.price}
        </Typography>
        <Button variant="contained" fullWidth sx={{ mt: 2 }} onClick={() => addToCart(item)}>
          Agregar
        </Button>
      </CardContent>
    </Card>
  );
};