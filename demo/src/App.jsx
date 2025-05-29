import React from 'react';
import { Container, Typography, Box } from '@mui/material';
import FormBuilderApp from '../../src/components/FormBuilderApp.jsx';

function App() {
  return (
    <Container maxWidth="xl">
      <Box sx={{ my: 4 }}>
        <Typography variant="h2" component="h1" gutterBottom>
          JSON Form Builder Demo
        </Typography>
        <Typography variant="h6" component="h2" gutterBottom sx={{ mb: 4 }}>
          Drag and drop form builder based on RJSF
        </Typography>
        <FormBuilderApp />
      </Box>
    </Container>
  );
}

export default App;
