// @ts-nocheck
import {useTheme} from "@mui/material";
import { Box, Typography } from "@mui/material";
import { shades } from "../../theme";

const Footer = () => {
    const { palette: { neutral }, } = useTheme();

    return (
        <Box mt="70px" p="40px 0" backgroundColor={neutral.light}>
        <Box width="80%" margin="auto" display="flex" justifyContent="space-between" flexWrap="wrap" rowGap="30px" columnGap="clamp(20px, 30px, 40px)" >
            <Box width="clamp(20%, 30%, 40%)">
                <Typography variant="h4"  fontWeight="bold"  mb="30px" color={shades.secondary[500]}>Jubiliant Style</Typography>
                <div>Lorem ipsum dolor sit amet consectetur, adipisicing elit. </div>
            </Box>
            <Box>
                <Typography variant="h4" fontWeight="bold" mb="30px">About us</Typography>
                <Typography mb="20px">Careers</Typography>
                <Typography mb="20px">Our Stores</Typography>
                <Typography mb="20px">Terms & Conditions</Typography>
                <Typography mb="20px">Privacy Policy</Typography>
            </Box>
            <Box>
            <Typography variant="h4" fontWeight="bold" mb="20px">Customer Care</Typography>
                <Typography mb="20px">Help Center</Typography>
                <Typography mb="20px">Track Your Order</Typography>
                <Typography mb="20px">Corporate & Bulk Purchasing</Typography>
                <Typography mb="20px">Returns & Refunds</Typography>
            </Box>
            <Box width="clamp(20%, 25%, 35%)">
            <Typography variant="h4" fontWeight="bold" mb="20px">Contact us</Typography>
                <Typography mb="20px">Nicolae Iorga Blv, Iasi, 700235</Typography>
                <Typography mb="20px">Email: 12@gmail.com</Typography>
                <Typography mb="20px">(333)555-6666</Typography>
            </Box>
        </Box>
        </Box>
    )
}


export default Footer