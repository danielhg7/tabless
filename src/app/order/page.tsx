"use client";

import { useCart } from "@/context/CartContext";
import { Box, Typography, List, ListItem, ListItemText, Divider, Button } from "@mui/material";

export default function PedidoPage() {
  const { cart, removeFromCart, clearCart } = useCart();

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <Box p={4}>
      <Typography variant="h4" gutterBottom>
        Tu Pedido
      </Typography>

      {cart.length === 0 ? (
        <Typography variant="body1">Tu carrito está vacío.</Typography>
      ) : (
        <>
          <List>
            {cart.map((item) => (
              <ListItem key={item.id} secondaryAction={
                <Button color="error" onClick={() => removeFromCart(item.id)}>
                  Quitar
                </Button>
              }>
                <ListItemText
                  primary={`${item.name} x${item.quantity}`}
                  secondary={`$${item.price * item.quantity}`}
                />
              </ListItem>
            ))}
          </List>
          <Divider sx={{ my: 2 }} />
          <Typography variant="h6">Total: ${total}</Typography>

          <Box mt={3}>
            <Button variant="contained" color="primary" fullWidth>
              Ir a pagar
            </Button>
            <Button onClick={clearCart} fullWidth sx={{ mt: 1 }}>
              Vaciar carrito
            </Button>
          </Box>
        </>
      )}
    </Box>
  );
}