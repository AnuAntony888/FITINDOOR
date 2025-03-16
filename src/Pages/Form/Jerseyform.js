import {
  Box,
  Button,
  CardMedia,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  NativeSelect,
  Select,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { Toastsucess } from "../../Componet/ReusableComponet/toast/Toast";
import { Link } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
const Jerseyform = ({ product, setopenpopup }) => {
  // Define product prices based on different sizes
  const [selectedSize, setSelectedSize] = useState("XS");

  console.log(product, "data");
  const productPrices = {
    XS: 65.0,
    S: 65,
    M: 65.0,
    L: 65,
    XL: 65.0,
    XXL: 65.0,
    XXXL: 65.0,
  };

  const [quantity, setQuantity] = useState(1);

  const handleIncrease = () => {
    setQuantity(quantity + 1);
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const existingJerseyCartItems =
    JSON.parse(localStorage.getItem("jerseycart")) || [];
  console.log(existingJerseyCartItems.length, "existingjersycart");

  const handleAddToCart = () => {
    const { text: productName, image, type, category } = product.product;
    const productSize = selectedSize;
    const productPrice =
      existingJerseyCartItems.length > 0 || quantity > 1 ? 60 : 65;
    const totalProductPrice =
      existingJerseyCartItems.length > 0 || quantity > 1
        ? 60 * quantity
        : 65 * quantity;
    // Update prices of existing items in the cart to 60
    if (existingJerseyCartItems.length > 0 || quantity > 1) {
      existingJerseyCartItems.forEach((item) => {
        item.price = 60;
        item.total = 60 * item.quantity;
      });
    }

    const jerseyCartItem = {
      name: productName,
      size: productSize,
      price: productPrice,
      type: type,
      category,
      quantity,
      image,
      total: totalProductPrice, // Add total price property
    };

    const existingItemIndex = existingJerseyCartItems.findIndex(
      (item) =>
        item.name === productName &&
        item.size === productSize &&
        item.category === category
    );

    if (existingItemIndex !== -1) {
      existingJerseyCartItems[existingItemIndex].quantity += quantity;
      // existingJerseyCartItems[existingItemIndex].price += productPrice;
      existingJerseyCartItems[existingItemIndex].total += totalProductPrice; // Update total price
    } else {
      existingJerseyCartItems.push(jerseyCartItem);
    }

    const jersycartTotal = existingJerseyCartItems.reduce(
      (acc, item) => acc + item.total,
      0
    );

    localStorage.setItem("jerseycart", JSON.stringify(existingJerseyCartItems));
    localStorage.setItem("jersycartTotal", jersycartTotal); // Store total in local storage

    Toastsucess("Added to the cart!", "sucess", "dark");

    setopenpopup(false);
    // console.log(`Added ${quantity} ${selectedSize} ${productName} to cart.`);
  };

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("jerseycart")) || [];
    // Additional logic for handling storedCart if needed
  }, []);

  return (
    <div>
      {/* {product?.product?.map((data,index)=>( */}
      <Grid container spacing={2} className="addressform" sx={{ pt: "10px" }}>
        <Grid xs={12} lg={6} md={6} sm={12}>
          <CardMedia
            component="img"
            height="280"
            image={product?.product?.image}
            alt="green iguana"
            sx={{ objectFit: "contain" }}
          />
        </Grid>
        <Grid xs={12} lg={6} md={6} sm={12} margin={"auto"}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={12} sm={12} lg={12}>
              <Typography gutterBottom variant="h6" component="div">
                {product?.product?.text}
              </Typography>
            </Grid>
            <Grid item xs={3} md={3} sm={6} lg={3}>
              <p className="Heading_main2  ">Size : </p>
            </Grid>
            <Grid item xs={6} md={5} sm={6} lg={5}>
              <FormControl
                sx={{ m: 1, minWidth: "120px", margin: "0" }}
                size="small"
              >
                <Select
                  labelId="demo-select-small"
                  name="sort"
                  id="sort"
                  inputProps={{ "aria-label": "Without label" }}
                  value={selectedSize}
                  onChange={(e) => setSelectedSize(e.target.value)}
                >
                  {Object.keys(productPrices).map((size) => (
                    <MenuItem key={size} value={size}>
                      {size}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={4} sm={12} lg={4}>
              <Link
                to="/sizechart"
                target="_blank"
                className="link_style_Footer"
              >
                Size chart
              </Link>
            </Grid>
            <Grid item xs={12} md={12} sm={12} lg={12}>
              <p id="onselling_txt">
                <span className="modal_price_Aed">
                  AED{" "}
                  {existingJerseyCartItems.length > 0 || quantity > 1 ? 60 : 65}
                  {/* AED {productPrices[selectedSize]} */}
                </span>
              </p>
            </Grid>
            <Grid item xs={12} md={6} sm={6} lg={6}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  border: "solid .2px black",
                  borderRadius: "5px",
                }}
              >
                <IconButton
                  sx={{
                    "&:hover": {
                      borderRadius: "0",
                      backgroundColor: "black",
                      "& .remove-icon": {
                        color: "white",
                      },
                      borderRadius: "0",
                    },
                  }}
                  onClick={() => handleDecrease()}
                >
                  <RemoveIcon
                    className="remove-icon"
                    sx={{ color: "black", fontSize: "1.5rem" }}
                  />
                </IconButton>

                <Typography variant="body1" style={{ margin: "0 8px" }}>
                  {quantity}
                </Typography>

                <IconButton
                  sx={{
                    "&:hover": {
                      backgroundColor: "black",
                      "& .add-icon": {
                        color: "white",
                      },
                      borderRadius: "0",
                    },
                  }}
                  onClick={() => handleIncrease()}
                >
                  <AddIcon
                    className="add-icon"
                    sx={{ color: "black", fontSize: "1.5rem" }}
                  />
                </IconButton>
              </Box>
            </Grid>
            <Grid item xs={12} md={6} sm={6} lg={6}>
              <Button
                variant="contained"
                className="popViewbtn"
                size="large"
                id="addtocart"
                onClick={handleAddToCart}
              >
                Add to Cart
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default Jerseyform;
