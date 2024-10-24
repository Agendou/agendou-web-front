import React from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Avatar,
  Divider,
  Typography,
  Box,
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import EventNoteIcon from "@mui/icons-material/EventNote";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import whiteLogo from "../../assets/images/LightLogo.png";

const Sidebar = () => {
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 240,
        height: '100vh', // Manter altura em 100vh
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: 240,
          height: '100vh', // Manter altura em 100vh
          boxSizing: "border-box",
          backgroundColor: "#010726",
          color: "#fff",
          display: 'flex',
          flexDirection: 'column', // Adicionar flexbox para distribuição
          overflowY: 'hidden'
        },
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: "20px",
          paddingBottom: '10px', // Ajustar o espaço inferior
        }}
      >
        <Box sx={{ marginBottom: "10px" }}>
          <img src={whiteLogo} alt="Logo Agendou cor branca" style={{width: '140px'}}/>
        </Box>

        <Avatar
          alt="Humberto Silva"
          src="https://via.placeholder.com/150" // Imagem do usuário
          sx={{ width: 80, height: 80 }}
        />
        <Typography
          variant="h6"
          style={{ marginTop: "10px", marginBottom: "10px" }} // Ajustar margens
        >
          Humberto Silva
        </Typography>
      </div>
      <Divider />
      <List sx={{ flexGrow: 1 }}> {/* Permitir que a lista cresça para ocupar o espaço disponível */}
        <ListItem button>
          <ListItemIcon sx={{ color: "#fff" }}>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary="Painel Geral" />
        </ListItem>
        <ListItem button>
          <ListItemIcon sx={{ color: "#fff" }}>
            <PeopleIcon />
          </ListItemIcon>
          <ListItemText primary="Painel Funcionários" />
        </ListItem>
        <ListItem button>
          <ListItemIcon sx={{ color: "#fff" }}>
            <EventNoteIcon />
          </ListItemIcon>
          <ListItemText primary="Agendamentos" />
        </ListItem>
        <Divider sx={{ backgroundColor: "#fff", margin: "10px 0" }} />
        <ListItem button>
          <ListItemIcon sx={{ color: "#fff" }}>
            <PeopleIcon />
          </ListItemIcon>
          <ListItemText primary="Funcionários" />
        </ListItem>
        <ListItem button>
          <ListItemIcon sx={{ color: "#fff" }}>
            <EventNoteIcon />
          </ListItemIcon>
          <ListItemText primary="Agenda" />
        </ListItem>
        <Divider sx={{ backgroundColor: "#fff", margin: "10px 0" }} />
        <ListItem button>
          <ListItemIcon sx={{ color: "#fff" }}>
            <ManageAccountsIcon />
          </ListItemIcon>
          <ListItemText primary="Perfil" />
        </ListItem>
      </List>
      <div style={{ marginBottom: "20px" }}>
        <ListItem button>
          <ListItemIcon sx={{ color: "#fff" }}>
            <ExitToAppIcon />
          </ListItemIcon>
          <ListItemText primary="Sair" />
        </ListItem>
      </div>
    </Drawer>
  );
};

export default Sidebar;
