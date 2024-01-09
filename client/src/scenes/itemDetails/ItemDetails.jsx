// @ts-nocheck
import React from "react";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { IconButton, Box, Typography, Tabs, Tab, Button } from "@mui/material";
// import { FavoriteBorderOutlinedIcon } from "@mui/icons-material/FavoriteBorderOutlined";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { shades } from "../../theme";
import { addToCart } from "../../state";
import { useParams } from "react-router-dom";
import Item from "../../components/Item";
import Payment from "./ItemDetailsImages/Payment.png";
import Shipping from "./ItemDetailsImages/Shipping.png";
import Refund from "./ItemDetailsImages/Refund.png"

const ItemDetails = () => {
  const dispatch = useDispatch();
  const { itemId } = useParams();
  const [value, stetValue] = useState("description");
  const [count, setCount] = useState(1);
  const [item, setItem] = useState(null);
  const [items, setItems] = useState([]);

  const detailsIcons = [{text: 'Free Shipping', img: Payment}, {text: '100 days return policy', img: Shipping}, {text: "Reimbursment payment", img: Refund}]
  const handleChange = (event, newValue) => {
    stetValue(newValue);
  };

  async function getItem() {
    const item = await fetch(
      `http://localhost:1337/api/items/${itemId}?populate=image`,
      { method: "GET" }
    );
    const itemJson = await item.json();
    setItem(itemJson.data);
  }

  async function getItems() {
    const items = await fetch(
      "http://localhost:1337/api/items?populate=image",
      { method: "GET" }
    );
    const itemsJson = await items.json();
    setItems(itemsJson.data);
    console.log(items);
  }

  useEffect(() => {
    getItem();
    getItems();
  }, [itemId]);
  return (
    <Box width="80%" m="80px auto">
      <Box display="flex" flexWrap="wrap" columnGap="15px" maxWidth="80%">
        {/* Images */}
        <Box flex="1 1 40%" mb="40px">
          <img
            alt={item?.name}
            width="100%"
            height="100%"
            src={`http://localhost:1337${item?.attributes?.image?.data?.attributes?.formats?.medium?.url}`}
            style={{ objectFit: "contain" }}
          />
        </Box>
        {/* Actions */}
        <Box flex="1 1 50%" mb="40px">
          <Box display="flex" justifyContent="space-between">
            <Box>Home/Item</Box>
            <Box>Prev/Next</Box>
          </Box>
          <Box m="65px 0 25px 0">
            <Typography variant="h2">{item?.attributes?.name}</Typography>
            <Typography variant="h3">
              ${item?.attributes?.price} VAT included
            </Typography>
            <Typography sx={{ mt: "20px" }}>
              {item?.attributes?.longDescription}
            </Typography>
          </Box>
          {/* Count and button*/}
          <Box display="flex" alignItems="center" minHeight="50px">
            <Box
              display="flex"
              alignItems="center"
              border={`1.5px solid ${shades.neutral[300]}`}
              mr="20px"
              p="2px 5px"
            >
              <IconButton onClick={() => setCount(Math.max(count - 1, 1))}>
                <RemoveIcon />
              </IconButton>
              <Typography sx={{ p: "0 5px" }}>{count}</Typography>
              <IconButton onClick={() => setCount(count + 1)}>
                <AddIcon />
              </IconButton>
            </Box>
            <Button
              sx={{
                backgroundColor: "#222222",
                color: "white",
                borderRadius: 0,
                minWidth: "150px",
                padding: "10px 40px",
              }}
              onClick={() => dispatch(addToCart({ item: { ...item, count } }))}
            >
              Add to cart
            </Button>
          </Box>
          <Box>
            <Box m="20px 0 5px 0" display="flex">
              {/* <FavoriteBorderOutlinedIcon/> */}
              <Typography sx={{ ml: "5px" }}>
                <Button>Add to whishlist</Button>
              </Typography>
            </Box>
            <Typography>Categories: {item?.attributes?.category}</Typography>
          </Box>
        </Box>
        <Box display="flex" flexDirection="column">
        {detailsIcons.map((item, index) => (
        <Box m="75px 0 25px 0" >
            <Box marginRight="5px" marginTop="2px" key={index}>
              <img
                src={item.img}
                width="20px"
              />
            </Box>
            {item.text}
        </Box>
            ))}
      </Box>
      </Box>
      {/* Information */}
      <Box m="20px 0">
        <Tabs value={value} onChange={handleChange}>
          <Tab label="Description" value="description" />
          <Tab label="Reviews" value="reviews" />
        </Tabs>
      </Box>
      <Box display="flex" flexWrap="wrap" gap="15px">
        {value === "description" && (
          <div>{item?.attributes?.longDescription}</div>
        )}{" "}
        {value === "reviews" && <div>reviews</div>}
      </Box>
      {/* Related items */}
      <Box mt="50px" width="100%">
        <Typography variant="h3" fontWeight="bold">
          Related Products
        </Typography>
        <Box
          mt="20px"
          display="flex"
          flexWrap="wrap"
          columnGap="1.33%"
          justifyContent="space-between"
        >
          {items.slice(0, 4).map((item, i) => (
            <Item key={`${item.name} - ${i}`} item={item} />
          ))}
        </Box>
      </Box>
    </Box>
  );
};
export default ItemDetails;
