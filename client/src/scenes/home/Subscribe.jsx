// @ts-nocheck
import {Box, InputBase, Divider, Typography, IconButton} from "@mui/material";
// import { MarkEmailReadOutlinedIcon } from "@mui/icons-material/MarkEmailReadOutlinedIcon";
import { useState } from "react";
const Subscribe = () => {
    const [email, setEmail] = useState("");

    return (
        <Box width="80%" margin="80px auto" textAlign="center">
            <IconButton>
                {/* <MarkEmailReadOutlinedIcon fontSize="large"/> */}
            </IconButton>
            <Typography variant="h3">Subscribe to our newsletter</Typography>
            <Typography>and receiver $5 coupon for your fist order whe you checkout</Typography>
            <Box p="2px 4px" m="15px auto" display="flex" alignItems="center" width="75%" backgroundColor="#F2F2F2" borderRadius="5px">
                <InputBase sx={{ml: 1, flex: 1}} placeholder="Enter email" onChange={(e) => setEmail(e.target.value)} value={email}/>
                <Divider sx={{height: 28, m: 0.5}} orientation="vertical"/>
                <Typography sx={{p: "10px", ":hover" : {cursor: "pointer"}}}>Subscribe</Typography>
            </Box>
        </Box>
    )

}
export default Subscribe;