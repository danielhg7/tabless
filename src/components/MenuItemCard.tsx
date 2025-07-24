import { Card, Typography, Button, Box, CardMedia } from "@mui/material";
import { MenuItem } from "@/interfaces/MenuItem";
import { useCart } from "@/context/CartContext";

interface Props {
  item: MenuItem;
}

export const MenuItemCard = ({ item }: Props) => {
  const { addToCart } = useCart();

  return (
    <Card sx={{
      display: "flex",
      alignItems: "center",
      backgroundColor: "#F4D03F",
      borderRadius: "12px",
      border: "2px solid #2C3E50",
      padding: 1.5,
      boxShadow: "none",
      width: "100%",
      minWidth: 376,
      margin: "0 auto",
      cursor: "pointer"
    }} onClick={() => {
      console.log("Item clickeado");
    }}>
      {item.imageUrl && <CardMedia
        component="img"
        sx={{ width: "8vw", height: "8vw", objectFit: "cover", borderRadius: "8px" }}
        image={item.imageUrl}
        alt={item.name}
      />}
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
        <Typography variant="caption" color="text.primary" sx={{
          display: "-webkit-box",
          WebkitLineClamp: 3,
          WebkitBoxOrient: "vertical",
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}>
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
          <Typography variant="subtitle1" fontWeight="bold">${item.price.toLocaleString()}</Typography>
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#000",
              color: "#fff",
              fontWeight: "bold",
              textTransform: "none",
              bgColor: '#2C3E50',
              '&:hover': {
                bgcolor: "#3b5670"
              },
              p: 1
            }}
            onClick={(e) => { e.stopPropagation(); addToCart(item);}}
          >
            Agregar
          </Button>
        </Box>
      </Box>
    </Card>
  );
};