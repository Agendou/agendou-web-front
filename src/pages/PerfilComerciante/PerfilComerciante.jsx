import { Box, Grid } from "@mui/material";
import Sidebar from "../../components/Sidebar/Sidebar";
import MerchantInfo from "../../components/MerchantInfo/MerchantInfo";
import AddService from "../../components/AddService/AddService";
import HeaderApp from '../../components/HeaderApp/HeaderApp';

const PerfilComerciante = () => {
    return (
        <Box
        sx={{
            display: "flex",
            width: "100%",
            height: "100vh",
            backgroundColor: "#f8f4f8"
        }}
        >
            {/* Sidebar */}
            <Sidebar isVisible={true} />

        <HeaderApp title="Perfil" />
            {/* Conteúdo Principal */}
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    flexGrow: 1,
                    width: "100%",
                    padding: 3,
                    marginTop: 7,
                    display: "flex",
                }}
            >
                <Grid
                    container
                    sx={{
                        maxWidth: "100%",
                        margin: "0 auto",
                    }}
                >
                    <Grid
                        item
                        xs={12}
                        md={7}
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        <MerchantInfo />
                    </Grid>

                    {/* Adicionar Serviço */}
                    <Grid
                        item
                        xs={12}
                        md={5}
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            gap: 1, 
                            padding: 2,
                        }}
                    >
                        <AddService />
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
};

export default PerfilComerciante;
