import React from "react";
import styles from "./Solution.module.css";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CardActionArea from "@mui/material/CardActionArea";

import BarberImg from "../../../assets/images/BarberCard.jpg";
import SaloonImg from "../../../assets/images/saloonCard.jpg"
import aestheticImg from "../../../assets/images/aestheticCard.jpg"

const WhoCanUse = () => {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.titleBox}>
          <h1>Quem pode usar?</h1>
        </div>
        <div className={styles.cards}>
          <Card className={styles.card} sx={{ maxWidth: 325 }}>
            <CardActionArea>
              <CardMedia
                component="img"
                height="150"
                image={BarberImg}
                alt="Barbeiro cortando cabelo"
              />
              <CardContent>
                <div className={styles.cardText}>
                    <h2>
                      Barbearias
                    </h2>
                    <p>
                      Simplifique os agendamentos e ofereça um atendimento
                      personalizado, melhorando a gestão do seu tempo e a satisfação
                      dos clientes.
                    </p>
                </div>
              </CardContent>
            </CardActionArea>
          </Card>
          <Card className={styles.card}  sx={{ maxWidth: 325 }}>
            <CardActionArea>
              <CardMedia
                component="img"
                height="150"
                image={SaloonImg}
                alt="green iguana"
              />
              <CardContent>
                <div className={styles.cardText}>
                    <h2>
                      Salões de beleza
                    </h2>
                    <p>
                      Organize os horários e facilite o agendamento, proporcionando
                      aos clientes uma experiência prática e personalizada.
                    </p>
                </div>
              </CardContent>
            </CardActionArea>
          </Card>
          <Card className={styles.card}  sx={{ maxWidth: 325}}>
            <CardActionArea>
              <CardMedia
                component="img"
                height="150"
                image={aestheticImg}
                alt="green iguana"
              />
              <CardContent>
                <div className={styles.cardText}>
                    <h2>
                      Clinicas de estética
                    </h2>
                    <p>
                      Organize os agendamentos da sua clínica com eficiência,
                      oferecendo um atendimento impecável para seus clientes
                      enquanto otimiza suas operações.
                    </p>
                </div>
              </CardContent>
            </CardActionArea>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default WhoCanUse;
