import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React, { useEffect, useState } from "react";

import { usePoPupContext } from "../../Context/PopupContext";
import DeleteIcon from "@mui/icons-material/Delete";

import Paper from "@mui/material/Paper";

import { useBadmintonJerseyOrderForm } from "../../client-api/ApiHome";
import { Toastsucess } from "../../Componet/ReusableComponet/toast/Toast";
import { MetaComponent } from "../../Icons/Icons";
import Strippaymentinjersey from "./Strippaymentinjersey";

const OrderFormjersey = () => {
  const stripePromise = loadStripe(
    // "pk_test_51MA5JESDQGBMlBBlpOOIFucjsB4s6oOaZTHIuEVfgQDapT9oqVfppRGBYBmTgZEjs94cgOcNqlQI8xL3a94u4Ewk00yshJzGgR"
    "pk_live_51KBhDAJbgv6bsCXgNRCpHWXEWspqHYXnUqybjc1lBfv1SuE9A9kA1N4F92jozXO9ydbhVBF0uGqPTnGj7a4pLqWh00HtiHYuvl"
  );
  const { setopenpopup } = usePoPupContext();
  const handleCardClick = (data) => {
    setopenpopup({ name: "BadmintonJerseyOrderForm", product: data });
  };

  // State to track the selected product size
  const [selectedSize, setSelectedSize] = useState("XS");

  const { JerseyOrderForm, isJerseyOrderFormLodaing, isJerseyOrderFormerror } =
    useBadmintonJerseyOrderForm();

  const productPrices = {
    XS: 60.0,
    S: 60,
    M: 60,
    L: 60,
    XL: 60.0,
    XXL: 60.0,
    XXXL: 60.0,
  };
const ladimg1='https://ik.imagekit.io/thmmwwbpc/MFF%20E%20Commerce/Assets/ladjersey1.jpg?updatedAt=1715237884655'
 const ladimg2='https://ik.imagekit.io/thmmwwbpc/MFF%20E%20Commerce/Assets/ladjersey2.jpg?updatedAt=1715237884318'
  const image1='https://ik.imagekit.io/thmmwwbpc/MFF%20E%20Commerce/Assets/jersey1.jpg?updatedAt=1715237884169'
 const image2='https://ik.imagekit.io/thmmwwbpc/MFF%20E%20Commerce/Assets/jersey2.jpg?updatedAt=1715237884479'
  const Data = [
    {
      image: ladimg1,
      text: "Jersey - Blue",
      price: productPrices[selectedSize],
      type: 1,
      category: "female",
    },
    {
      image: ladimg2,
      text: "Jersey - Grey",
      price: productPrices[selectedSize],
      type: 2,
      category: "female",
    },
    {
      image: image1,
      text: "Jersey - Blue",
      price: productPrices[selectedSize],
      type: 1,
      category: "male",
    },
    {
      image: image2,
      text: "Jersey - Grey",
      price: productPrices[selectedSize],
      type: 2,
      category: "male",
    },
  ];
  // console.log([selectedSize],"size");
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [tshirt, setTshirt] = useState("");
  const [jersey, setJersey] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [errors, seterrors] = useState({});
  const handlesetFirstName = (e) => {
    setFirstName(e.target.value);
  };
  const handlesetLastName = (e) => {
    setLastName(e.target.value);
  };
  const handlesetEmail = (e) => {
    const errors = {};

    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!e.target.value) {
      seterrors((prev) => ({ ...prev, email: "Email is required!" }));
    } else if (!regex.test(e.target.value)) {
      seterrors((prev) => ({
        ...prev,
        email: "This is not a valid email format!",
      }));
    } else if (regex.test(e.target.value)) {
      seterrors((prev) => ({ ...prev, email: " " }));
    }

    setEmail(e.target.value);
  };
  const handlesetPhone = (e) => {
    setPhone(e.target.value);
  };

  const handlesetTshirt = (e) => {
    setTshirt(e.target.value);
  };
  const handlesetJersey = (e) => {
    setJersey(e.target.value);
  };

  const handleLocationChange = (event) => {
    setSelectedLocation(event.target.value);
  };
  // Retrieving jerseycart data
  const jerseycartData = JSON.parse(localStorage.getItem("jerseycart")) || [];

  // Retrieving jerseycartTotal data
  const jersycartTotal = localStorage.getItem("jersycartTotal") || 0;

  const [localStorageUpdated, setLocalStorageUpdated] = useState(false);

  const handleDelete = (name, size, quantity) => {
    const index = jerseycartData.findIndex(
      (item) =>
        item.name === name && item.size === size && item.quantity === quantity
    );

    if (index !== -1) {
      const updatedCart = [...jerseycartData];
      // updatedCart.splice(index, 1);

      const deletedItem = updatedCart.splice(index, 1)[0]; // Get the deleted item

      if (updatedCart.length === 1 && updatedCart?.[0]?.quantity === 1) {
        updatedCart.forEach((item) => {
          item.price = 65;
          item.total = 65 * item.quantity;
        });
      }

      localStorage.setItem("jerseycart", JSON.stringify(updatedCart));

      const updatedTotal = updatedCart.reduce(
        (total, item) => total + parseFloat(item.total),
        0
      );
      localStorage.setItem("jersycartTotal", updatedTotal.toString());

      setLocalStorageUpdated((prev) => !prev);
    }
  };
  useEffect(() => {
    // Retrieve jerseycart data
    const jerseycartData = JSON.parse(localStorage.getItem("jerseycart")) || [];

    const jersycartTotal = localStorage.getItem("jersycartTotal") || 0;

    setLocalStorageUpdated(true);
  }, [localStorageUpdated]);
  return (
    <>
      <MetaComponent
        dynamicTitle={"Badminton Jersey Form"}
        dynamicindex={"noindex,follow"}
      />
      <div>
        <Grid
          container
          spacing={2}
          sx={{ pl: "10%", pr: "10%", pt: "5%", pb: "5%" }}
        >
          <Grid item xs={12}>
            <h3 className="shoppingcart ">Badminton Jersey Order Form</h3>
          </Grid>
          <Grid item xs={12}>
            <Grid container spacing={2} sx={{ textAlign: "left" }}>
              <Grid item xs={12} className="addressformtitle cha_p">
                Full Name :
              </Grid>
              <Grid item lg={6} xs={12} md={6} sm={12} sx={{ pb: "10px" }}>
                <TextField
                  className="Addressinputtxt"
                  label="First Name"
                  type="text"
                  value={firstname}
                  onChange={handlesetFirstName}
                />
              </Grid>
              <Grid item lg={6} xs={12} md={6} sm={12} sx={{ pb: "10px" }}>
                <TextField
                  className="Addressinputtxt"
                  label="Last Name"
                  type="text"
                  value={lastname}
                  onChange={handlesetLastName}
                />
              </Grid>
              <Grid item xs={12} className="addressformtitle cha_p">
                Name on T Shirt :
              </Grid>
              <Grid item lg={12} xs={12} md={6} sm={12} sx={{ pb: "10px" }}>
                <TextField
                  className="Addressinputtxt"
                  label="Name on T Shirt"
                  type="text"
                  value={tshirt}
                  onChange={handlesetTshirt}
                />
              </Grid>
              <Grid item xs={12} className="addressformtitle cha_p">
                Number On T Shirt :
              </Grid>
              <Grid item lg={12} xs={12} md={6} sm={12} sx={{ pb: "10px" }}>
                <TextField
                  className="Addressinputtxt"
                  label="No On T Shirt"
                  type="text"
                  value={jersey}
                  onChange={handlesetJersey}
                />
              </Grid>
              <Grid item xs={12} className="addressformtitle cha_p">
                Email Id :
              </Grid>
              <Grid item lg={12} xs={12} md={6} sm={12} sx={{ pb: "10px" }}>
                <TextField
                  className="Addressinputtxt"
                  label="Email"
                  type="email"
                  value={email}
                  onChange={handlesetEmail}
                />
                {errors ? <p className="required">{errors.email}</p> : ""}
              </Grid>
              <Grid item xs={12} className="addressformtitle cha_p">
                Contact No :
              </Grid>
              <Grid item lg={12} xs={12} md={6} sm={12} sx={{ pb: "10px" }}>
                <TextField
                  className="Addressinputtxt"
                  label="Phone"
                  type="text"
                  value={phone}
                  onChange={handlesetPhone}
                />
              </Grid>
              <Grid item xs={12} className="addressformtitle cha_p">
                Jersey Collection Locations :
              </Grid>
              <Grid item lg={12} xs={12} md={6} sm={12} sx={{ pb: "10px" }}>
                <FormControl fullWidth>
                  <InputLabel id="location-select-label">
                    Select Location
                  </InputLabel>
                  <Select
                    labelId="location-select-label"
                    id="location-select"
                    value={selectedLocation}
                    label="Select Location"
                    onChange={handleLocationChange}
                  >
                    <MenuItem
                      value="Danube - Sports World
"
                    >
                      Danube - Sports World
                    </MenuItem>
                    <MenuItem
                      value="KENT Collage 
"
                    >
                      KENT Collage
                    </MenuItem>
                    <MenuItem value="Karama - Cosmos">Karama - Cosmos</MenuItem>
                    <MenuItem value="Deira - My Family Fitness">
                      Deira - My Family Fitness
                    </MenuItem>
                  </Select>
                </FormControl>
                <br />
                <br />
              </Grid>
            </Grid>
          </Grid>
          <Grid
            item
            lg={5.9}
            md={5.9}
            sm={12}
            xs={12}
            sx={{
              border: "solid .5px lightgrey",
              borderRadius: "20px",
              margin: "auto",
            }}
          >
            <h5 className="shoppingcart">Ladies Jersey with Long Trouser</h5>
            <br />
            <Grid container spacing={2}>
              {Data.slice(0, 2).map((data, index) => (
                <Grid item lg={5.9} md={5.9} sm={12} xs={12} key={index}>
                  <Card onClick={() => handleCardClick(data)}>
                    <CardActionArea>
                      <CardMedia
                        component="img"
                        height="180"
                        image={data.image}
                        alt="green iguana"
                        sx={{ objectFit: "contain" }}
                      />
                      <CardContent>
                        <Typography gutterBottom variant="h6" component="div">
                          {data.text}
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                    <CardActions sx={{ float: "right" }}>
                      <Typography>Price :</Typography> &nbsp;&nbsp;&nbsp; AED
                      60 - AED 65
                    </CardActions>
                  </Card>
                  <br /> <br />
                </Grid>
              ))}
            </Grid>
          </Grid>
          <Grid item lg={0.2} md={0.2} sm={0} xs={0}></Grid>
          <Grid
            item
            lg={5.9}
            md={5.9}
            sm={12}
            xs={12}
            sx={{
              border: "solid .5px lightgrey",
              margin: "auto",
              borderRadius: "20px",
            }}
          >
            <h5 className="shoppingcart">Men’s Jersey with Shorts</h5>
            <br />
            <Grid
              container
              rowSpacing={1}
              columnSpacing={3}
              sx={{ alignItems: "start" }}
            >
              {Data.slice(2, 4).map((data, index) => (
                <Grid item lg={5.9} md={5.9} sm={12} xs={12} key={index + 2}>
                  <Card onClick={() => handleCardClick(data)}>
                    <CardActionArea>
                      <CardMedia
                        component="img"
                        height="180"
                        image={data.image}
                        alt="green iguana"
                        sx={{ objectFit: "contain" }}
                      />
                      <CardContent>
                        <Typography gutterBottom variant="h6" component="div">
                          {data.text}
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                    <CardActions sx={{ float: "right" }}>
                      <Typography>Price :</Typography> &nbsp;&nbsp;&nbsp; AED
                      60 - AED 65
                    </CardActions>
                  </Card>
                  <br /> <br />
                </Grid>
              ))}
            </Grid>
          </Grid>

          {jerseycartData.length === 0 ? (
            ""
          ) : (
            <>
              <Grid item xs={12}>
                <TableContainer component={Paper}>
                  <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead className="tablecells">
                      <TableRow>
                        <TableCell className="shadow-checkoutCardheading">
                          Product
                        </TableCell>
                        <TableCell className="shadow-checkoutCardheading">
                          Quantity
                        </TableCell>
                        <TableCell className="shadow-checkoutCardheading">
                          Size
                        </TableCell>
                        <TableCell
                          align="left"
                          className="shadow-checkoutCardheading"
                        >
                          Total
                        </TableCell>
                        <TableCell
                          align="left"
                          className="shadow-checkoutCardheading"
                        >
                          Action
                        </TableCell>
                      </TableRow>
                    </TableHead>

                    <TableBody>
                      {jerseycartData.map((data, index) => (
                        <TableRow
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                        >
                          <TableCell component="th" scope="row">
                            <img
                              src={data.image}
                              style={{ width: "75px", height: "75px" }}
                              className="checkout_image"
                              alt=""
                            />{" "}
                            {data.name}
                          </TableCell>
                          <TableCell component="th" scope="row">
                            {data.quantity}
                          </TableCell>
                          <TableCell align="left">{data.size}</TableCell>
                          <TableCell align="left">{data.total}</TableCell>
                          <TableCell>
                            <IconButton
                              onClick={() =>
                                handleDelete(
                                  data.name,
                                  data.size,
                                  data.quantity
                                )
                              }
                              aria-label="delete"
                            >
                              <DeleteIcon />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      ))}
                      <TableRow
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell component="th" scope="row">
                          Total
                        </TableCell>
                        <TableCell align="left"></TableCell>
                        <TableCell align="left"></TableCell>
                        <TableCell align="left">{jersycartTotal}</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              </Grid>{" "}
            </>
          )}
          <Grid item xs={12} sx={{ textAlign: "left" }}>
            <h5 className="shoppingcart">Payment Details</h5>
          </Grid>
          <Grid item xs={12}>
            <Elements stripe={stripePromise}>
              <Strippaymentinjersey
                firstname={firstname}
                setFirstName={setFirstName}
                lastname={lastname}
                setLastName={setLastName}
                jersey={jersey}
                setJersey={setJersey}
                tshirt={tshirt}
                setEmail={setEmail}
                email={email}
                setPhone={setPhone}
                phone={phone}
                setTshirt={setTshirt}
                selectedLocation={selectedLocation}
                setSelectedLocation={setSelectedLocation}
                setLocalStorageUpdated={setLocalStorageUpdated}
              />
            </Elements>
          </Grid>
        </Grid>
      </div>
    </>
  );
};

export default OrderFormjersey;
