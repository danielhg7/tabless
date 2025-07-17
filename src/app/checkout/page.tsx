"use client";

import { Box, Button, Container, TextField, Typography } from '@mui/material';

export default function CheckoutPage() {
  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Checkout
      </Typography>

      <Box component="form" noValidate autoComplete="off" sx={{ mt: 2 }}>
        <TextField fullWidth label="Full Name" margin="normal" required />
        <TextField fullWidth label="Email Adress" margin="normal" required />
        <TextField fullWidth label="Card Number" margin="normal" required />
        <TextField fullWidth label="Expiration Date (MM/AA)" margin="normal" required />
        <TextField fullWidth label="Security Code (CVV)" margin="normal" required />
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
              onClick={(e) => {
                e.preventDefault();
                alert('Pago procesado');
              }}>
                Place order
              </Button>
            </Box>
      </Box>
    </Container>
  );
}
