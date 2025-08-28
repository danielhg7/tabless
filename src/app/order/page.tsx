"use client";

import { useCart } from "@/context/CartContext";
import { Box, Typography, List, ListItem, ListItemText, Divider, Button, TextField, IconButton, Container } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import { useState } from "react";
import { CartItem } from "@/interfaces/CartItem";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useRouter } from 'next/navigation';
import { Dialog, DialogContent, DialogFooter, DialogTitle } from "@/components/ui/dialog";


export default function PedidoPage() {
  const [openConfirmModal, setOpenConfirmModal] = useState(false);
  const [productToDelete, setProductToDelete] = useState<string | null>(null);
  const { cart, removeFromCart, handleDecrease, handleIncrease } = useCart();
  const router = useRouter();


  const total = cart.reduce((acc, item) => acc + item.price * item.count, 0);

  const onDecrease = (item: CartItem) => {
    if(item.count > 1) {
      handleDecrease(item.id)
    } else {
      setProductToDelete(item.id);
      setOpenConfirmModal(true);
    }
  };

  const onIncrease = (id: string) => {
    handleIncrease(id)
  }

  const handleRemove = (id: string) => {
    setProductToDelete(id);
    setOpenConfirmModal(true);
  }

  const confirmRemove = () => {
    removeFromCart(String(productToDelete))
    setOpenConfirmModal(false);
    setProductToDelete(null);
  }

  const handleCheckout = () => {
    router.push('/checkout');
  };
  
  return (
    <Container maxWidth={false} sx={{ py: 4, maxWidth: "1600px" }}>
      <Dialog
        open={openConfirmModal}
        onOpenChange={() => setOpenConfirmModal(false)}
      >
        <DialogTitle>Remove product?</DialogTitle>
        <DialogContent>
          <DialogTitle>
            Are you sure?
          </DialogTitle>
        </DialogContent>
        <DialogFooter>
          <Button onClick={() => setOpenConfirmModal(false)}>Cancel</Button>
          <Button onClick={confirmRemove} color="error" variant="contained">
            Remove
          </Button>
        </DialogFooter>
      </Dialog>
      <Box p={4}>
        <Box display="flex" alignItems="center" mb={2}>
        <Button
          variant="outlined"
          color="primary"
          startIcon={<ArrowBackIcon />}
          onClick={() => router.back()}
          sx={{ mb: 2 }}
        >
          Back
        </Button>
      </Box>
        <Typography variant="h4" gutterBottom>
          Your Order
        </Typography>

        {cart.length === 0 ? (
          <Typography variant="body1">Your cart is empty.</Typography>
        ) : (
          <>
            <List>
              {cart.map((item) => (
                <ListItem key={item.id} secondaryAction={
                  <>
                    <IconButton onClick={() => onDecrease(item)} size="small">
                      <RemoveIcon />
                    </IconButton>
                    <TextField
                      value={item.count}
                      size="small"
                      variant="outlined"
                      slotProps={{ htmlInput: { min: 1, style: { textAlign: 'center', width: '4vh' }} }}
                    />
                    <IconButton onClick={() => onIncrease(item.id)} size="small">
                      <AddIcon />
                    </IconButton>
                    <Button color="error" onClick={() => handleRemove(item.id)}>
                      <DeleteIcon sx={{ color: "#2C3E50" }} />
                    </Button>
                  </>
                }>
                  <ListItemText
                    primary={`${item.name} x${item.count}`}
                    secondary={`$${item.price * item.count}`}
                  />
                </ListItem>
              ))}
            </List>
            <Divider sx={{ my: 2 }} />
            <Typography variant="h6">Total: ${total}</Typography>

            <Box mt={3}>
              <Button variant="contained" color="primary"
              sx={{
                left: '50%',
                transform: 'translateX(-50%)',
                bgcolor: '#2C3E50',
                px: 8,
                borderRadius: '10px',
                "&:hover": {
                  bgcolor: "#3b5670",
                }
              }}
              onClick={() => handleCheckout()}>
                Checkout
              </Button>
            </Box>
          </>

        )}
      </Box>
    </Container>
  );
}