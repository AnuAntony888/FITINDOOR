import { Box, Card, CardContent, CardMedia, Grid } from "@mui/material";
import React from "react";

import { Link } from "react-router-dom";

const SopbyCategory = ({ data }) => {


  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={3} sx={{ padding: "2%" }}>
          <Grid item lg={12} md={12} xs={12} sx={{ textAlign: "left" }}>
            <h2 className="Home_new_content_1"> Shop by Category</h2>
          </Grid>
          {data?.filter((data) => data?.show_incat === 1)
            .map((data, index) => (

              <Grid item lg={2} md={3} xs={3} sx={{ textAlign: "left" }}>
                    <Link to={`/category/${data.slug}`}   state={{
      sub_category_id: data.id,
      banner_image: data.banner_image,
      name: data.name,
                }}
                className="brands_hd">
            <Card sx={{ padding: "8px" }}>
                <img
               
                  src={`https://ik.imagekit.io/thmmwwbpc/category/images/${data.image}`}
                width="100%"
                alt=""
              />
              <CardContent>
              <p className="flbrandtxt1" id="price" style={{ display: "flex", justifyContent: "space-between" }}>
  {data.name
  }

</p>

              </CardContent>
                  </Card>
                  </Link>
                </Grid>
         
            ))}
        </Grid>
      </Box>
    </div>
  );
};

export default SopbyCategory;
const Data=[{image:'https://demo.anarieldesign.com/fuel/wp-content/uploads/sites/42/2023/11/category-1-768x768.jpg',
  text: "Treadmill"
},
{image:'https://demo.anarieldesign.com/fuel/wp-content/uploads/sites/42/2023/11/category-1-768x768.jpg',
    text: "Treadmill"
  },
  {image:'https://demo.anarieldesign.com/fuel/wp-content/uploads/sites/42/2023/11/category-1-768x768.jpg',
    text: "Treadmill"
  },
  {image:'https://demo.anarieldesign.com/fuel/wp-content/uploads/sites/42/2023/11/category-1-768x768.jpg',
    text: "Treadmill"
  },
  {image:'https://demo.anarieldesign.com/fuel/wp-content/uploads/sites/42/2023/11/category-1-768x768.jpg',
    text: "Treadmill"
  },
  {image:'https://demo.anarieldesign.com/fuel/wp-content/uploads/sites/42/2023/11/category-1-768x768.jpg',
    text: "Treadmill"
  }
]