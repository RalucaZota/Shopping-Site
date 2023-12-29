import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { IconButton, Box, Typography, useTheme, Button } from '@mui/material';
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { shades } from '../theme';
import { addToCart } from '../state';
import { useNavigate } from 'react-router-dom';

const Item = ({item, width}) =>{ 
const navigate = useNavigate();
const dispatch =  useDispatch();

const [count, setCount] = useState(1);
const [isHovered, setIsHovered] = useState(false);

}

export default Item;

