import { Avatar, Box, Card, CardContent, CardHeader, Grid } from "@mui/material";
import React from "react";
import Slider from "react-slick";
import { Testmonial } from "../../../client-api/APInewdesign";

const Clients = () => {
  const { data = [] } = Testmonial();
  console.log(data, "data");

  const settings = {
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    speed: 1500,
    autoplaySpeed: 5000,
    cssEase: "linear",
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2, slidesToScroll: 2 } },
      { breakpoint: 600, settings: { slidesToShow: 1, slidesToScroll: 1 } },
    ],
  };

  return (
    <Box sx={{ flexGrow: 1, padding: "2%" }}>
      <Grid container spacing={4} alignItems="center">
        <Grid item xs={12} md={3}>
          <p className="new_banner2" style={{ paddingTop: "20px" }}>TESTIMONIALS</p>
          <h2 className="Home_new_content_1" style={{ textAlign: "left" }}>
            What clients are saying!
          </h2>
        </Grid>

        <Grid item xs={12} md={9}>
          <Slider {...settings}>
            {data.map((curElem, index) => (
              <div key={curElem.id || index}>
                <Card sx={{ padding: 2, margin: "5px" }}>
                  <CardContent>
                    <p className="Homeon_selling_txt">{curElem.name}</p>
                    <div style={{ color: '#995E65', display: 'flex', justifyContent: 'left' }}>
              ★★★★★
            </div>


                    <p className="new_banner_text">{curElem.description}</p>
                  </CardContent>
                  <CardHeader
                    avatar={
                      <Avatar
                        src={curElem?.images ? `https://ik.imagekit.io/thmmwwbpc/product/images/${curElem.images}` : "/default-avatar.png"}
                        alt={curElem.name || "Client Avatar"}
                        sx={{ width: 60, height: 60 }}
                      />
                    }
                    title={curElem.name}
                  />
                </Card>
              </div>
            ))}
          </Slider>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Clients;
