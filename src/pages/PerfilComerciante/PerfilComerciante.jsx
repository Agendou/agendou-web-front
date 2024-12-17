import { Box, Grid } from "@mui/material";
import ClienteHeader from "../../components/ClienteHeader/ClientHeader";
import ClientInfo from "../../components/ClientInfo/ClientInfo";
import RecentAppointments from "../../components/RecentAppointments/RecentAppointments";
import Sidebar from '../../components/Sidebar/Sidebar';
import MerchantInfo from '../../components/MerchantInfo/MerchantInfo';
import Header from "../../components/HeaderApp/HeaderApp";
import DownloadCsvModal from "../../components/Modal/DownloadCsvModal";

const PerfilComerciante = () => {
    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                width: "100%",
                height: "100vh",
                mt: 2,
            }}
        >
            <Header title="Painel de Configurações" />

            <Sidebar isVisible={true} />
            <Box
                sx={{
                    display: "flex",
                    flexGrow: 1,
                    justifyContent: "center",
                    alignItems: "center",
                            height: "50%",

                }}
            >
                <Grid
                    container
                    spacing={9}
                    sx={{
                        justifyContent: "space-around",
                        alignItems: "center",
                        width: "100%",
                    }}
                >
                    <Grid
                        item
                        xs={12}
                        md={6}
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            width: "100%",

                        }}
                    >
                        <MerchantInfo />
                    </Grid>

                    <Grid
                        item
                        xs={12}
                        md={6}
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "center",
                            width: "100%",
                            gap: 2,
                        }}
                    >
                        <DownloadCsvModal />
                        <RecentAppointments />
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
};

export default PerfilComerciante;