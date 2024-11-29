import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

const AddServiceForm = () => {
  const [services, setServices] = useState([]);
  const [serviceName, setServiceName] = useState("");
  const [serviceDuration, setServiceDuration] = useState("");
  const [serviceDescription, setServiceDescription] = useState("");

  const handleAddService = () => {
    if (serviceName && serviceDuration && serviceDescription) {
      setServices([
        ...services,
        {
          name: serviceName,
          duration: serviceDuration,
          description: serviceDescription,
        },
      ]);
      // Limpa os campos
      setServiceName("");
      setServiceDuration("");
      setServiceDescription("");
    } else {
      alert("Preencha todos os campos!");
    }
  };

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        margin: "auto",
        p: 4,
        backgroundColor: "#010726",
        borderRadius: "16px",
        color: "#fff",
      }}
    >
      <Typography variant="h5" gutterBottom sx={{ fontWeight: "bold" }}>
        Adicionar Serviços
      </Typography>

      <Box
        component="form"
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          mt: 3,
        }}
      >
        {/* Nome do Serviço */}
        <TextField
          label="Nome do Serviço"
          variant="outlined"
          fullWidth
          InputLabelProps={{ style: { color: "#ccc" } }}
          sx={{
            borderRadius: 2,
            input: { color: "#fff" },
            "& .MuiOutlinedInput-root": {
              borderColor: "#FFF",
              "& fieldset": {
                borderColor: "#FFF", 
              },
              "&:hover fieldset": {
                borderColor: "#CCC", 
              },
              "&.Mui-focused fieldset": {
                borderColor: "#0066CC", 
              },
            },
          }}
          value={serviceName}
          onChange={(e) => setServiceName(e.target.value)}
        />

        {/* Duração do Serviço */}
        <TextField
          label="Duração (em minutos)"
          type="number"
          variant="outlined"
          fullWidth
          InputLabelProps={{ style: { color: "#ccc" } }}
          sx={{
            borderRadius: 2,
            input: { color: "#fff" },
            "& .MuiOutlinedInput-root": {
              borderColor: "#FFF",
              "& fieldset": {
                borderColor: "#FFF", 
              },
              "&:hover fieldset": {
                borderColor: "#CCC", 
              },
              "&.Mui-focused fieldset": {
                borderColor: "#0066CC", 
              },
            },
          }}
          value={serviceDuration}
          onChange={(e) => setServiceDuration(e.target.value)}
        />

        {/* Descrição */}
        <TextField
          label="Descrição"
          variant="outlined"
          multiline
          rows={9}
          fullWidth
          InputLabelProps={{ style: { color: "#ccc" } }}
          sx={{
            borderRadius: 2,
            input: { color: "#fff" },
            textarea: { color: "#fff" },
            input: { color: "#fff" },
            "& .MuiOutlinedInput-root": {
              borderColor: "#FFF",
              "& fieldset": {
                borderColor: "#FFF", 
              },
              "&:hover fieldset": {
                borderColor: "#CCC", 
              },
              "&.Mui-focused fieldset": {
                borderColor: "#0066CC", 
              },
            },
          }}
          value={serviceDescription}
          onChange={(e) => setServiceDescription(e.target.value)}
        />

        <Button
          variant="contained"
          sx={{
            backgroundColor: "#0066CC",
            width: "40%",
            alignSelf: "flex-end",
            mt: 2,
            "&:hover": {
              backgroundColor: "#005BB5",
            },
          }}
          onClick={handleAddService}
        >
          Adicionar Serviço
        </Button>
      </Box>

      {/* Lista de Serviços */}
      {services.length > 0 && (
        <TableContainer
          component={Paper}
          sx={{ backgroundColor: "#1A202E", mt: 4, borderRadius: "16px" }}
        >
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ color: "#fff" }}>Serviço</TableCell>
                <TableCell sx={{ color: "#fff" }}>Duração (min)</TableCell>
                <TableCell sx={{ color: "#fff" }}>Descrição</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {services.map((service, index) => (
                <TableRow key={index}>
                  <TableCell sx={{ color: "#fff" }}>{service.name}</TableCell>
                  <TableCell sx={{ color: "#fff" }}>
                    {service.duration}
                  </TableCell>
                  <TableCell sx={{ color: "#fff" }}>
                    {service.description}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
};

export default AddServiceForm;
