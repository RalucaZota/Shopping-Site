// @ts-nocheck
import { useState } from "react";
import { useDispatch } from "react-redux";
import { IconButton, Box, Typography, useTheme, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { shades} from "../theme";
import { addToCart } from "../state";
import { useNavigate } from "react-router-dom";
import React from "react";

const Item = ({ item, width }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [count, setCount] = useState(1);
  const [isHovered, setIsHovered] = useState(false);
  const { palette: {neutral}, } = useTheme();
  const { category, price, name, image } = item.attributes;
  const {
    data: {
      attributes: {
        formats: {
          medium: { url },
        },
      },
    },
  } = image;

  const zoomedStyle = {
    transform: isHovered ? 'scale(1.2)' : 'scale(1)',
    transition: 'transform 0.5s ease'
  };
  return (
    <Box width={width}>
      <Box
        overflow='hidden'
        position="relative"
        onMouseOver={() => setIsHovered(true)}
        onMouseOut={() => setIsHovered(false)}
        
      >
        <img
          alt={item.name}
          width="300px"
          height="400px"
          src={`http://localhost:1337${url}`}
          onClick={() => navigate(`/item/${item.id}`)}
          style={zoomedStyle}
        />
        <Box
          display={isHovered ? "block" : "none"}
          position="absolute"
          bottom="10%"
          left="0"
          width="100%"
          padding="0 5%"
        >
          <Box display="flex" justifyContent="space-between">
            {/* Amount */}
            <Box
              display="flex"
              alignItems="center"
              backgroundColor={shades.neutral[100]}
              borderRadius="3px"
            >
              <IconButton onClick={() => setCount(Math.max(count - 1, 1))}>
                <RemoveIcon />
              </IconButton>
              <Typography color={shades.primary[300]}>{count}</Typography>
              <IconButton onClick={() => setCount(count + 1)}>
                <AddIcon />
              </IconButton>
            </Box>
          </Box>
        </Box>
      </Box>
      <Box mt="3px"  display="flex" flexDirection="column" alignItems="center">
        <Typography variant="subtitle2" color={neutral.dark}>
          {category
            .replace(/([A-Z])/g, " $1")
            .replace(/^./, (str) => str.toUpperCase())}
        </Typography>
        <Typography fontWeight="bolder" fontSize="16px">{name}</Typography>
        <Typography fontWeight="bold">${price}</Typography>
          {/* Button */}
          <Button
              onClick={() => {
                dispatch(addToCart({ item: { ...item, count } }));
              }}
              sx={{ backgroundColor: shades[300], color: "black", fontWeight:"700" }} 
            >
              Add to cart
            </Button>
      </Box>
    </Box>
  );
};

export default Item;
