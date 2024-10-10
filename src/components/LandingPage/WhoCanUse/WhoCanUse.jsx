import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CardActionArea from "@mui/material/CardActionArea";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import BarberImg from "../../../assets/images/BarberCard.jpg";
import SaloonImg from "../../../assets/images/saloonCard.jpg";
import AestheticImg from "../../../assets/images/aestheticCard.jpg";

const WhoCanUse = () => {
  return (
    <Box
      sx={{
        height: {
          xs: "auto",
          sm: "100vh",
          md: "120vh",
          lg: "100vh",
        },
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "2rem",
        padding: "1rem",
        paddingX: {
          xs: "auto",
          sm: "6rem",
          md: "6rem",
          lg: "6rem",
          xl: "6rem",
        },
        position: "relative", // Define o container pai como relativo
      }}
    >
      <Box
        sx={{
          width: "100%",
          position: "absolute", // Define o título como absoluto
          top: "10%", // Ajusta a distância do topo
          textAlign: "center",
          color: "#010726",
          marginBottom: "50px", // Espaçamento consistente abaixo do título
        }}
      >
        <Typography
          variant="h1"
          sx={{
            fontFamily: "Poppins, sans-serif",
            fontSize: {
              xs: "2rem",
              sm: "2.5rem",
              md: "3rem",
            },
            marginBottom: "1rem",
          }}
        >
          Quem pode usar?
        </Typography>
      </Box>

      <Grid
        container
        spacing={2}
        justifyContent="center"
        width="100%"
        sx={{ paddingTop: "5rem" }}
      >
        {[
          {
            img: BarberImg,
            title: "Barbearias",
            description:
              "Simplifique os agendamentos e ofereça um atendimento personalizado, melhorando a gestão do seu tempo e a satisfação dos clientes.",
          },
          {
            img: SaloonImg,
            title: "Salões de beleza",
            description:
              "Organize os horários e facilite o agendamento, proporcionando aos clientes uma experiência prática e personalizada.",
          },
          {
            img: AestheticImg,
            title: "Clínicas de estética",
            description:
              "Organize os agendamentos da sua clínica com eficiência, oferecendo um atendimento impecável para seus clientes enquanto otimiza suas operações.",
          },
        ].map((card, index) => (
          <Grid
            item
            xs={12}
            sm={6}
            md={4}
            key={index}
            sx={{
              display: index === 2 ? { xs: "none", md: "block" } : "block",
            }}
          >
            <Card
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                padding: "1rem",
              }}
            >
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="150"
                  image={card.img}
                  alt={card.title}
                  sx={{ objectFit: "cover" }}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography
                    variant="h2"
                    sx={{
                      fontFamily: "Poppins, sans-serif",
                      fontSize: {
                        xs: "1.3rem",
                        sm: "1.5rem",
                        md: "1.8rem",
                        lg: "2rem",
                      },
                      color: "#010726",
                      marginBottom: "0.5rem",
                    }}
                  >
                    {card.title}
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{
                      fontFamily: "Poppins, sans-serif",
                      color: "#333333",
                      fontSize: { xs: "0.8rem", sm: "1rem" },
                    }}
                  >
                    {card.description}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default WhoCanUse;
