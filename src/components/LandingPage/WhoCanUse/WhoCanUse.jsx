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
          xs: 'auto', // Muda para auto para se ajustar ao conteúdo
          sm: '100vh',
          md: '100vh',
          lg: '100vh'
        },
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '2rem',
        padding: '1rem' // Adiciona padding para evitar que o conteúdo fique muito perto da borda
      }}
    >
      <Box sx={{ width: '100%', textAlign: 'center', color: '#010726' }}>
        <Typography
          variant="h1"
          sx={{
            fontSize: {
              xs: '2rem',  // Ajuste para uma leitura melhor em telas pequenas
              sm: '2.5rem',
              md: '3rem',
            },
            marginBottom: '1rem' // Adiciona espaço abaixo do título
          }}
        >
          Quem pode usar?
        </Typography>
      </Box>
      <Grid container spacing={2} justifyContent="center" width="100%">
        {[
          {
            img: BarberImg,
            title: "Barbearias",
            description: "Simplifique os agendamentos e ofereça um atendimento personalizado, melhorando a gestão do seu tempo e a satisfação dos clientes."
          },
          {
            img: SaloonImg,
            title: "Salões de beleza",
            description: "Organize os horários e facilite o agendamento, proporcionando aos clientes uma experiência prática e personalizada."
          },
          {
            img: AestheticImg,
            title: "Clínicas de estética",
            description: "Organize os agendamentos da sua clínica com eficiência, oferecendo um atendimento impecável para seus clientes enquanto otimiza suas operações."
          }
        ].map((card, index) => (
          <Grid item xs={12} sm={6} md={4} key={index} sx={{ display: (index === 2) ? { xs: 'none', md: 'block' } : 'block' }}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', padding: '1rem' }}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="150"
                  image={card.img}
                  alt={card.title}
                  sx={{ objectFit: 'cover' }} // Adiciona ajuste de imagem
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="h2" sx={{
                    fontSize: {
                      xs: '1.3rem',  // Ajuste para uma leitura melhor em telas pequenas
                      sm: '1.5rem',
                      md: '1.8rem',
                      lg: '2rem',
                    },
                    color: '#010726',
                    marginBottom: '0.5rem',
                    }}>
                    {card.title}
                  </Typography>
                  <Typography variant="body1" sx={{ color: '#333333', fontSize: { xs: '0.8rem', sm: '1rem' } }}>
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
