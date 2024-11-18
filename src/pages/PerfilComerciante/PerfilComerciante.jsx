import { Box, Grid } from "@mui/material";
import Sidebar from "../../components/Sidebar/Sidebar";
import MerchantInfo from "../../components/MerchantInfo/MerchantInfo";
import AddService from "../../components/AddService/AddService";

const PerfilComerciante = () => {
    return (
        <Box
            sx={{
                display: "flex",
                width: "100%",
                height: "100vh",
            }}
        >
            {/* Sidebar */}
            <Sidebar isVisible={true} />

            {/* Conteúdo Principal */}
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    flexGrow: 1,
                    width: "100%",
                    padding: 3,
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
