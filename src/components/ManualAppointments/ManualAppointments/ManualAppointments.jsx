import React, { useState } from "react";
import dayjs from "dayjs";
import {
  CardContent,
  Typography,
  TextField,
  Button,
  Grid,
  Card,
  Box,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Calendar from "../CalendarCard/CalendarCard";
import TodayAppointments from "../TodayAppointments/TodayAppointments";
import { DateTimePicker } from "@mui/x-date-pickers";

export default function ManualAppointments() {
  const [value, setValue] = useState(dayjs());
  const [formData, setFormData] = useState({
    Profissional: "",
    servico: "",
    data: null,
    hora: null,
    infoAdicional: "",
  });

  const [isFocused, setIsFocused] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSubmit = () => {
    console.log("Dados do agendamento:", formData);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Grid
        container
        spacing={2}
        style={{ padding: "10px" }}
        justifyContent="center"
        alignItems="flex-start"
      >
        {/* Coluna para o formulário de cadastro */}
        <Grid item xs={12} md={6}>
          <Card
            sx={{
              backgroundColor: "#010726",
              color: "#FFF",
              height: "auto",
              width: "95%",
              padding: "25px",
            }}
          >
            <CardContent>
              <Typography variant="h5" gutterBottom>
                Cadastro de Agendamento Manual
              </Typography>

              <Box sx={{ display: "flex", gap: "1rem", marginTop: 2 }}>
                <DateTimePicker
                  label="Data do agendamento"
                  value={formData.data}
                  onChange={(date) => handleInputChange("data", date)}
                  inputFormat="dd/MM/yyyy"
                  renderInput={(params) => <TextField {...params} />}
                  sx={{
                    "& .MuiInputBase-input": {
                      color: "white",
                    },
                    "& .MuiInputLabel-root": {
                      color: "white",
                    },
                    "& .MuiSvgIcon-root": {
                      color: "white",
                    },
                    "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline":
                      {
                        borderColor: "white",
                      },
                    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                      {
                        borderColor: "white",
                      },
                  }}
                />
              </Box>

              {/* Campo Profissional */}
              <FormControl fullWidth margin="normal">
                <InputLabel
                  style={{ color: "white" }}
                  sx={{
                    display: formData.profissional ? "none" : "block",
                  }}
                  shrink={false}
                >
                  Profissional
                </InputLabel>
                <Select
                  value={formData.profissional}
                  onChange={(e) =>
                    handleInputChange("profissional", e.target.value)
                  }
                  label="Profissional"
                  sx={{
                    color: "white",
                    backgroundColor: "transparent",
                    borderColor: "white",
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: "white",
                    },
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                      borderColor: "white",
                    },
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                      borderColor: "white",
                    },
                    "& .MuiSvgIcon-root": {
                      color: "white",
                    },
                  }}
                  MenuProps={{
                    PaperProps: {
                      style: {
                        backgroundColor: "#010720",
                        color: "white",
                      },
                    },
                    MenuListProps: {
                      sx: {
                        "& .MuiMenuItem-root": {
                          color: "white",
                        },
                        "& .MuiMenuItem-root:hover": {
                          backgroundColor: "rgba(255, 255, 255, 0.1)",
                        },
                      },
                    },
                  }}
                >
                  <MenuItem value="luzes">Humberto</MenuItem>
                  <MenuItem value="degrade">Henrique</MenuItem>
                  <MenuItem value="corte">Pedro</MenuItem>
                </Select>
              </FormControl>

              {/* Campo Serviço */}
              <FormControl fullWidth margin="normal">
                <InputLabel
                  style={{ color: "white" }}
                  sx={{
                    display: formData.servico ? "none" : "block",
                  }}
                  shrink={false}
                >
                  Serviço
                </InputLabel>
                <Select
                  value={formData.servico}
                  onChange={(e) => handleInputChange("servico", e.target.value)}
                  label="Serviço"
                  sx={{
                    color: "white",
                    backgroundColor: "transparent",
                    borderColor: "white",
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: "white",
                    },
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                      borderColor: "white",
                    },
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                      borderColor: "white",
                    },
                    "& .MuiSvgIcon-root": {
                      color: "white",
                    },
                  }}
                  MenuProps={{
                    PaperProps: {
                      style: {
                        backgroundColor: "#010720",
                        color: "white",
                      },
                    },
                    MenuListProps: {
                      sx: {
                        "& .MuiMenuItem-root": {
                          color: "white",
                        },
                        "& .MuiMenuItem-root:hover": {
                          backgroundColor: "rgba(255, 255, 255, 0.1)",
                        },
                      },
                    },
                  }}
                >
                  <MenuItem value="luzes">Luzes</MenuItem>
                  <MenuItem value="degrade">Degradê</MenuItem>
                  <MenuItem value="corte">Social</MenuItem>
                </Select>
              </FormControl>

              {/* Campo Informações Adicionais */}
              <TextField
                label={!isFocused ? "Informações Adicionais" : ""}
                value={formData.infoAdicional}
                onChange={(e) =>
                  handleInputChange("infoAdicional", e.target.value)
                }
                onFocus={() => setIsFocused(true)}
                onBlur={() => {
                  if (formData.infoAdicional === "") {
                    setIsFocused(false);
                  }
                }}
                multiline
                rows={4}
                fullWidth
                margin="normal"
                InputProps={{
                  style: {
                    color: "white",
                    backgroundColor: "#010726",
                  },
                }}
                InputLabelProps={{
                  style: { color: "white" },
                }}
                sx={{
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "white",
                  },
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "white",
                  },
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: "white",
                  },
                }}
              />

              <Grid
                container
                spacing={2}
                justifyContent="flex-end"
                sx={{ marginTop: 2 }}
              >
                <Grid item>
                  <Button variant="outlined" onClick={() => setFormData({})}>
                    Cancelar
                  </Button>
                </Grid>
                <Grid item>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleSubmit}
                  >
                    Agendar
                  </Button>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <TodayAppointments />
        </Grid>
      </Grid>
    </LocalizationProvider>
  );
}
