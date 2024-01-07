// @ts-nocheck

import React, {useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Box, Typography, Tab, Tabs, useMediaQuery, Button} from '@mui/material';
import Item from "../../components/Item";
import { setItems } from '../../state';

const ShoppingList = () => {
    const dispatch = useDispatch();
    const [value, setValue] =  useState('all');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    const items =  useSelector((state) => state.cart.items);
    const totalPageCount = Math.ceil(items.length / itemsPerPage);
    const isNonMobile = useMediaQuery("(min-width:600px)");
    const handleChange = (event, newValue) => {
        setValue(newValue);
        setCurrentPage(1);
    };

    async function getItems() {
        const items = await fetch("http://localhost:1337/api/items?populate=image", {method: "GET"});
        const itemsJson =  await items.json();
        dispatch(setItems(itemsJson.data));
        console.log(items)
    }
    const getCurrentPageItems = () => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        switch (value) {
          case 'all':
            return items.slice(startIndex, endIndex);
          case 'newArrivals':
            return newArrivalsItems.slice(startIndex, endIndex);
          case 'bestSellers':
            return bestSellersItems.slice(startIndex, endIndex);
          case 'topRated':
            return topRatedItems.slice(startIndex, endIndex);
          default:
            return [];
        }
      };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPageCount));
  };

    useEffect(() => {
        getItems()
    }, []) 

    const topRatedItems =  items.filter((item) => item.attributes.category === "topRated");
    const newArrivalsItems =  items.filter((item) => item.attributes.category === "newArrivals");
    const bestSellersItems =  items.filter((item) => item.attributes.category === "bestSellers");

    return (
        <Box width="80%" margin="40px auto" id="scrolledSection">
            <Typography variant='h2' textAlign="center" fontFamily="Roboto">
                Our Featured <b>Products</b>
            </Typography>
            <Tabs textColor='primary'
            indicatorColor='primary'
            value={value}
            onChange={handleChange}
            centered
            TabIndicatorProps={{ sx: {display: isNonMobile ? "block" : "none"}}} sx={{m: "25px", "& .MuiTabs-flexContainer": {
                flexWrap: "wrap"
            }}}>
                <Tab label="ALL" value="all"/>
                <Tab label="NEW ARRIVALS" value="newArrivals"/>
                <Tab label="BEST SELLLERS" value="bestSellers"/>
                <Tab label="TOP RATED" value="topRated"/>
            </Tabs>
            <Box margin="0 auto" display="grid" gridTemplateColumns="repeat(auto-fill, 300px)" justifyContent="space-around" rowGap="20px" columnGap="1.33%"> 
            {value === "all" && getCurrentPageItems().map((item) => (
                <Item item={item} key={`${item.name}-${item.id}`}></Item>
            ))}
            {value === "newArrivals" && newArrivalsItems.map((item) => (
                <Item item={item} key={`${item.name}-${item.id}`}></Item>
            ))}
            {value === "bestSellers" && bestSellersItems.map((item) => (
                <Item item={item} key={`${item.name}-${item.id}`}></Item>
            ))}
            {value === "topRated" && topRatedItems.map((item) => (
                <Item item={item} key={`${item.name}-${item.id}`}></Item>
            ))}
            </Box>
            <Box display="flex" justifyContent="center" marginTop="20px">
        <Button variant="contained" color="primary" onClick={handlePrevPage} disabled={currentPage === 1}>
          Prev
        </Button>
        <Typography variant="body1" marginX="10px" display="flex" alignItems="center">
          Page {currentPage} of {totalPageCount}
        </Typography>
        <Button variant="contained" color="primary" onClick={handleNextPage} disabled={currentPage === totalPageCount}>
          Next
        </Button>
      </Box>
        </Box>
    )

}
export default ShoppingList;