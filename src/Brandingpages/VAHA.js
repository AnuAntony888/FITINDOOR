import React, { useState } from "react";
import {
  Box,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  TextareaAutosize,
} from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

import { MetaComponent, TypographyText } from "../Icons/Icons";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import { Toastsucess } from "../Componet/ReusableComponet/toast/Toast";
import { useVahaForm } from "../client-api/ApiHome";
const VAHA = ({ type }) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));

  const { vahaforms } = useVahaForm();

  const [collectname, setCollectName] = useState("");
  const [emirates, setEmirates] = useState("");
  const [mobileno, setMobileNo] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [purpose_of_use, setpurposeofuse] = useState("");
  const [errors, seterrors] = useState({});
  const handlesetCollectName = (e) => {
    setCollectName(e.target.value);
  };
  const handlesetEmirates = (e) => {
    setEmirates(e.target.value);
  };
  const handlesetMobileNo = (e) => {
    setMobileNo(e.target.value);
  };
  const handlesetEmail = (e) => {
    const errors = {};

    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!e.target.value) {
      console.log("Email is required!");
      seterrors((prev) => ({ ...prev, email: "Email is required!" }));
    } else if (!regex.test(e.target.value)) {
      console.log("This is not a valid email format!");
      seterrors((prev) => ({
        ...prev,
        email: "This is not a valid email format!",
      }));
    } else {
      seterrors((prev) => ({ ...prev, email: "" }));
    }

    setEmail(e.target.value);
  };

  const handlesetsetMessage = (e) => {
    setMessage(e.target.value);
  };
  const handlepurposeofuse = (e) => {
    setpurposeofuse(e.target.value);
  };

  const handleApi = async () => {
    try {
      const formData = new FormData();
      if (!collectname || !email || !message || !emirates || !mobileno || !purpose_of_use) {
        Toastsucess("Please fill your Details");

        return;
      }
      // Assuming these variables are defined somewhere in your code
      formData.append("collectionname", collectname);
      formData.append("emirates", emirates);
      formData.append("mobileno", mobileno);
      formData.append("emailid", email);
      formData.append("purpose_of_use", purpose_of_use);
      formData.append("message", message);
      formData.append("type", type);
      await vahaforms(formData);

      Toastsucess("Thanks for contacting us!!", "sucess", "light");
    } catch (error) {
      Toastsucess(error.message);
    }
    setCollectName("");
    setEmail("");
    setEmirates("");
    setMobileNo("");
    setMessage("");
    setpurposeofuse("");
  };

  let txt1,
    sectxt2,
    se4txt1,
    se4txt2,
    se41txt1,
    se41txt2,
    se41txt3,
    se5txt,
    se5txt1,
    txt2,
    head,
    Data,
    Datas,
    formheading,
    contactform;
  // console.log(type, "type");
  switch (type) {
    case "pent":
      head = "PENT.";
      formheading = " Get In Touch With Us For PENT ";
      contactform = [
        {
          label: "Name",
          txt: "Name",
          value: collectname,
          onChange: handlesetCollectName,
        },
        {location:"Select Location",
          txt: "Emirates",
          value: emirates,
          onChange: handlesetEmirates,
          datas: [
            { emivalue: "AbuDhabi", eminame: "Abu Dhabi" },
            { emivalue: "Dubai", eminame: "Dubai" },
            { emivalue: "Ajman", eminame: "Ajman" },
            { emivalue: "UmmAlQuwain", eminame: "Umm Al Quwain" },
            { emivalue: "RasAlKhaimah ", eminame: "Ras Al Khaimah " },
            { emivalue: "Fujairah ", eminame: "Fujairah " },
            { emivalue: " Sharjah ", eminame: " Sharjah " },
            // Add more data objects here if needed
          ],
        },
        {
          txt: " Mobile No",
          label: "Mobile No",
          value: mobileno,
          onChange: handlesetMobileNo,
        },
        {
          txt: " Email Id",
          label: "Email Id",
          value: email,
          onChange: handlesetEmail,
        },
        {location:"Purpose OF Use",
          txt: "I AM",
          value: purpose_of_use,
          onChange: handlepurposeofuse,
          datas: [
            {
              emivalue: "Looking for Personal Use",
              eminame: "Looking for Personal Use ",
            },
            {
              emivalue: "Interior Desiging Company/Interior Designer ",
              eminame: "Interior Desiging Company/ Interior Designer ",
            },
            {
              emivalue: "Construction/Contracting Company/Purchasing Manager ",
              eminame: "Construction/Contracting Company/Purchasing Manager ",
            },
            { emivalue: "Others", eminame: "Others" },
          ],
        },
        {
          txt: " Message",
          label: "Message",
          value: message,
          onChange: handlesetsetMessage,
        },
      ];
      txt1 = <>THE MOST EXQUISITE FITNESS EQUIPMENT YOU'VE EVER SEEN</>;
      txt2 = (
        <>
          Are you a devoted fitness lover and a design addict? Well, look no
          further than PENT., the equipment brand that ticks all the boxes. We
          have a goal of providing customized equipment that suits the
          consumer's athletic and aesthetic needs.
        </>
      );
      sectxt2 = (
        <>
          EXPERIENCE THE PENT. DIFFERENCE - WHERE LUXURY MEETS FITNESS. JOIN US
          ON THIS EXCITING JOURNEY TOWARDS A HEALTHIER, MORE LUXURIOUS YOU.
        </>
      );

      Data = [
        {
          imageUrl:
            "https://ik.imagekit.io/thmmwwbpc/MFF%20E%20Commerce/pent/HOME%20GYM?updatedAt=1713513998985",
          name: "HOME GYM",
        },
        {
          imageUrl:
            " https://ik.imagekit.io/thmmwwbpc/MFF%20E%20Commerce/pent/IN-ROOMFITNESS?updatedAt=1713514177430",
          name: "IN-ROOM FITNESS",
        },
        {
          imageUrl:
            "https://ik.imagekit.io/thmmwwbpc/MFF%20E%20Commerce/pent/HOTELGYM?updatedAt=1713514236440",
          name: "HOTEL GYM",
        },
        {
          imageUrl:
            "https://ik.imagekit.io/thmmwwbpc/MFF%20E%20Commerce/pent/YACHTGYM?updatedAt=1713514283937",
          name: "YACHT GYM ",
        },
      ];

      se4txt1 = (
        <>
          UNPARALLELED
          <br />
          AESTHETICS
        </>
      );
      se4txt2 =
        "Our fitness equipment isn't just about function; it's a statement of luxury and taste.";
      se41txt1 = "THE BEST HANDMADE BESPOKE GYM EQUIPMENT";
      se41txt2 = "TAILORED TO YOUR NEEDS";
      se41txt3 =
        "Our luxury fitness equipment is designed for those who demand a workout experience like no other. Whether you're seeking handcrafted dumbbells, exquisite exercise benches, or other fitness accessories, our collection offers a range of options to meet your needs.";
      se5txt = "BEST SELLERS";
      se5txt1 =
        "PENT. Luxury Gym Equipment - Check out best selling products. Whether you are a private individual seeking an elegant and space-efficient workout solution or a professional trainer aiming to provide clients with the best tools, our exercise bench, dumbbells, kettlebells, weighted balls, barbells, wall bars, push up bars, gym balls, fitness mats, skipping ropes is a versatile choice that adds both style and functionality to your fitness regimen. Elevate your fitness experience with PENT. and discover a new level of sophistication and performance.";

      Datas = [
        {
          imageUrl:
            "https://ik.imagekit.io/thmmwwbpc/MFF%20E%20Commerce/pent/ANA%E2%84%A2COMBOSetWithGymEquipment?updatedAt=1713514404409",
          name: "ANA™ COMBO Set With Gym Equipment",
        },
        {
          imageUrl:
            "https://ik.imagekit.io/thmmwwbpc/MFF%20E%20Commerce/pent/BANKA%E2%84%A2AdvanceGymWeightBench?updatedAt=1713514468024",
          name: "BANKA™ Advance Gym Weight Bench",
        },
        {
          imageUrl:
            "https://ik.imagekit.io/thmmwwbpc/MFF%20E%20Commerce/pent/LOVA%E2%84%A2SET-KettlebellsWithHorizontalRack?updatedAt=1713514507026",
          name: "LOVA™ SET - Kettlebells With Horizontal Rack",
        },
        {
          imageUrl:
            "https://ik.imagekit.io/thmmwwbpc/MFF%20E%20Commerce/pent/SCALA%E2%84%A2ADVANCEPLUS-FitnessWallBar?updatedAt=1713514433418",
          name: "SCALA™ ADVANCE PLUS - Fitness Wall Bar",
        },
        {
          imageUrl:
            "https://ik.imagekit.io/thmmwwbpc/MFF%20E%20Commerce/pent/LESNA%E2%84%A2SET-BARBELLSSET?updatedAt=1713514553167",
          name: "LESNA™ SET - BARBELLS SET",
        },
        {
          imageUrl:
            "https://ik.imagekit.io/thmmwwbpc/MFF%20E%20Commerce/pent/SOPHIA%E2%84%A2SetWithGymEquipment?updatedAt=1713514705507",
          name: "SOPHIA ™ Set With Gym Equipment",
        },
        {
          imageUrl:
            "https://ik.imagekit.io/thmmwwbpc/MFF%20E%20Commerce/pent/RAXA%E2%84%A2SETHandcraftedLeatherPunchingBag&Gloves?updatedAt=1713514756348",
          name: "RAXA™ SET Handcrafted Leather Punching Bag & Gloves",
        },
        {
          imageUrl:
            "https://ik.imagekit.io/thmmwwbpc/MFF%20E%20Commerce/pent/COLMIA%E2%84%A2SET-DumbbellsWithHorizontalRack?updatedAt=1713514813769",
          name: "COLMIA™ SET - Dumbbells With Horizontal Rack",
        },
      ];
      break;
    case "vaha":
      head = "Vaha";

      break;
    case "wellsystem":
      head = "wellsystem";

      break;
    case "ems":
      head = "ems";

      break;
    default:
      txt2 = "sss";
      txt1 = "default";
  }

  const backgroundImageUrl =
    "https://ik.imagekit.io/thmmwwbpc/MFF%20E%20Commerce/pent/pent_dumbbells_pair_with_wooden_stand.webp?updatedAt=1713512798491";
  // console.log(head, "head");
  return (
    <div>
      <MetaComponent
        dynamicTitle="PENT. Luxury Fitness Equipment - My Family Fitness"
        dynamicKeywords="Luxury fitness equipment
      Villa fitness solutions
      Home gym essentials
      Interior designer fitness gear
      High-end workout equipment
      Premium home fitness appliances
      Stylish fitness solutions
      Exclusive gym equipment for homes
      Designer fitness accessories
      Upscale home gym gear"
        dynamicDescription="Elevate your home fitness experience with PENT Luxury Fitness Equipment designed for villas and home gyms. Discover premium quality gear crafted for discerning interior designers. Transform your space into a sanctuary of wellness and style"
      />
      <Grid container spacing={0} sx={{ height: "calc(100vh - 65px)" }}>
        <Grid
          xs={12}
          md={12}
          lg={12}
          sm={12}
          className="large-header"
          sx={{ height: "100%", display: "grid", placeItems: "center" }}
        >
          <Box
            sx={{
              pl: "5%",
              pr: "5%",
              zIndex: "1",
            }}
          >
            <TypographyText
              Typography={head}
              className="mybrands "
              fontSize={isSmallScreen ? "1.5rem" : "2rem"}
              fontWeight="bolder"
              fontFamily="CamptonBook"
            />
            <TypographyText
              Typography={txt1}
              className="mybrands "
              fontSize={isSmallScreen ? "1.5rem" : "2rem"}
              fontWeight="bolder"
              fontFamily="CamptonBook"
            />
            <br />
            <TypographyText
              Typography={txt2}
              className="mybrands "
              color="white"
              fontFamily="CamptonLight"
            />
            <br />
          </Box>
          <video
            autoPlay
            loop
            muted
            playsInline
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              zIndex: "-1",
              position: "absolute",
              inset: 0,
            }}
          >
            <source
              src="https://ik.imagekit.io/thmmwwbpc/MFF%20E%20Commerce/pent/PENT.%20The%20Most%20Exquisite%20Fitness%20Equipment%20You've%20Ever%20Seen.mp4?updatedAt=1713511358868"
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </video>
        </Grid>
      </Grid>
      {/***********************section 2 **************************8*/}
      <Grid
        container
        spacing={2}
        sx={{
          pl: "5%",
          pr: "5%",
          pt: "2%",
          pb: "3%",
        }}
      >
        <Grid item xs={12}>
          <br />
          <TypographyText
            Typography={sectxt2}
            fontWeight="bolder"
            textAlign={"centre"}
            fontFamily="CamptonBook"
          />

          <br />
          <br />
        </Grid>
        {Data &&
          Data?.map((data, index) => (
            <Grid item xs={12} lg={3} md={6} sm={12} key={index}>
              <div style={{ position: "relative" }}>
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    backgroundColor: "rgba(0, 0, 0, 0.5)",
                  }}
                ></div>
                <CardMedia
                  component="img"
                  image={data?.imageUrl}
                  height={280}
                  sx={{
                    margin: "auto",
                    objectFit: "cover",
                  }}
                  alt="img"
                  className="imag_card"
                />
                <p
                  className="mybrands "
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: isSmallScreen ? "50%" : "42%",
                    transform: isSmallScreen
                      ? "translate(-50%, -50%)"
                      : "translate(-40%, -50%)",
                    fontFamily: "CamptonBook",

                    fontWeight: "bolder",
                    fontSize: "1.2rem",
                  }}
                >
                  {data.name}
                </p>
              </div>
            </Grid>
          ))}
      </Grid>
      {/*******section3***** */}

      <Grid
        container
        spacing={4}
        sx={{ pl: "5%", pr: "5%", pt: "2%", pb: "5%" }}
      >
        <Grid item xs={12}>
          <TypographyText
            Typography={formheading}
            textAlign={"centre"}
            fontSize={!isSmallScreen ? "1.9rem" : "1.5rem"}
            fontWeight="bolder"
            fontFamily="CamptonBook"
          />
        </Grid>

        <Grid item xs={12} lg={6} md={6} sm={12}>
          <Grid container spacing={1}>
            {contactform?.map((data, index) => (
              <Grid
                item
                lg={index === 5 || index === 4?12: 6}
                xs={12}
                md={index === 5 || index === 4?12: 6}
                sm={12}
                key={index}
                sx={{ pb: "10px" }}
              >
                <>
                  <TypographyText
                    Typography={data.txt}
                    color="black"
                    fontFamily="CamptonBook"
                    textAlign={"left"}
                    paddingBottom="10px"
                  />
                  {(index === 1 || index === 4) ?(
                    <FormControl fullWidth>
                      <InputLabel id="location-select-label">
                        {/* Select Location */}
                        {data.location}
                      </InputLabel>
                      <Select
                        labelId="location-select-label"
                        id="location-select"
                        label="Select Location"
                        value={data.value}
                        onChange={data.onChange}
                      >
                        {data.datas.map((datas, index) => (
                          <MenuItem key={index} value={datas.emivalue}>
                            {datas.eminame}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  ) : index === 5 ? (
                    <TextareaAutosize
                      className="Addressinputtxt"
                      aria-label={data.label}
                      minRows={3} // Minimum number of rows to display
                      maxRows={20} // Maximum number of rows to display
                      placeholder={data.label}
                      value={data.value}
                      onChange={data.onChange}
                    />
                  ) : (
                    <TextField
                      className="Addressinputtxt"
                      label={data.label}
                      type="text"
                      value={data.value}
                      onChange={data.onChange}
                    />
                  )}

                  {index === 3 && errors.email && (
                    <p className="required">{errors.email}</p>
                  )}
                </>
              </Grid>
            ))}
            <Grid item xs={12}>
              <Button
                sx={{
                  bgcolor: "black",
                  color: "white",
                  textTransform: "capitalize",
                  border: "solid 1px black",
                  fontFamily: "CamptonBook",
                  fontWeight: "bolder",
                  width: "250px",
                  mt: "3px",
                  mb: "3px",
                  "&:hover": {
                    bgcolor: "black", // Replace 'sameColor' with the color you want for hover
                    color: "white",
                    // Add any additional styles for hover state
                  },
                }}
                onClick={handleApi}
              >
                Submit
              </Button>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} lg={6} md={6} sm={12} sx={{ margin: "auto" }}>
          <CardMedia
            component="img"
            image={
              "https://ik.imagekit.io/thmmwwbpc/MFF%20E%20Commerce/pent/HOTELGYM?updatedAt=1713514236440"
            }
            sx={{
              margin: "auto",
              // height: "230px",

              objectFit: "contain",
              borderRadius: "15px",
            }}
            alt="img"
            className="imag_card"
          />
        </Grid>
      </Grid>

      {/*section 4 */}

      <Grid
        container
        spacing={5}
        sx={{ pl: "5%", pr: "5%", pt: "5%", pb: "5%" }}
      >
        <Grid
          md={6}
          lg={6}
          sm={12}
          xs={12}
          item
          className="large-header"
          sx={{
            minHeight: "500px",
            paddingTop: "0px!important",
            marginTop: "40px",

            // !isSmallScreen ? "90vh" : "100vh"
          }}
        >
          <Box
            sx={{
              position: "absolute",
              width: !isSmallScreen ? "45%" : "90%",
              zIndex: "1",
              p: "4%",
              transform: !isSmallScreen
                ? " translateY(40%)"
                : " translateY(70%)",
            }}
          >
            <TypographyText
              Typography={se4txt1}
              className="mybrands "
              fontWeight="bolder"
              fontFamily="CamptonBook"
              fontSize={isSmallScreen ? "1.5rem" : "2rem"}
            />

            <br />
            <TypographyText
              Typography={se4txt2}
              className="mybrands "
              color="white"
              fontFamily="CamptonLight"
              fontSize="1.05rem"
            />
          </Box>
          <video
            autoPlay
            loop
            muted
            playsInline
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              zIndex: "-1",
            }}
          >
            <source
              src="https://ik.imagekit.io/thmmwwbpc/MFF%20E%20Commerce/pent/PENT.%20The%20Most%20Exquisite%20Fitness%20Equipment%20You've%20Ever%20Seen.mp4?updatedAt=1713511358868"
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </video>
        </Grid>
        <Grid
          item
          md={6}
          lg={6}
          sm={12}
          xs={12}
          sx={{ margin: "auto", paddingBottom: "20px" }}
        >
          <TypographyText
            Typography={se41txt1}
            fontWeight="bolder"
            fontFamily="CamptonBook"
            fontSize=".95rem"
          />
          <TypographyText
            Typography={se41txt2}
            fontWeight="bolder"
            fontFamily="CamptonBook"
            fontSize={isSmallScreen ? "1.5rem" : "2rem"}
          />

          <TypographyText
            Typography={se41txt3}
            fontFamily="CamptonBook"
            fontSize=".8rem"
          />
        </Grid>
      </Grid>

      {/**************section5**************** */}
      <Grid
        container
        spacing={2}
        sx={{
          // backgroundImage: `url(${backgroundImageUrl})`,
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${backgroundImageUrl})`,
          objectFit: "cover",
          backgroundSize: "cover",
          backgroundPosition: "center",

          pl: "5%",
          pr: "5%",
          pt: "8%",
          pb: "8%",
        }}
      >
        <Grid
          item
          lg={12}
          xs={12}
          md={12}
          sm={12}
          sx={{
            margin: "auto",
            justifyContent: "center",
          }}
        >
          <Box sx={{ margin: "auto", pl: "3%", pr: "3%" }}>
            <TypographyText
              Typography={se5txt}
              className="mybrands "
              fontSize={"2rem"}
              fontWeight="bolder"
              fontFamily="CamptonBook"
            />
            <br />
            <TypographyText
              Typography={se5txt1}
              className="mybrands "
              color="white"
              fontSize={".9rem"}
              fontFamily="CamptonLight"
              textAlign={!isSmallScreen ? "left" : "centre"}
            />
          </Box>
        </Grid>
      </Grid>

      <Grid
        container
        spacing={3}
        sx={{ pl: "5%", pr: "5%", pt: "3%", pb: "5%" }}
      >
        {Datas?.map((data, index) => (
          <Grid item xs={12} lg={3} md={3} sm={6} key={index}>
            <CardMedia
              component="img"
              image={data?.imageUrl}
              sx={{
                margin: "auto",
                // height: "230px",

                objectFit: "contain",
                borderRadius: "15px",
              }}
              alt="img"
              className="imag_card"
            />
            <p class="slick_header_txt" id="shop_name">
              {data.name}
            </p>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default VAHA;
