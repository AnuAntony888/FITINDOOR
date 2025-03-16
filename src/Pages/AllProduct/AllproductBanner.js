

import CardMedia from "@mui/material/CardMedia";

import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
export const AllproductBanner = (props) => {

  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down("md"));
  return (
    <Box sx={{ position: "relative" }}>
      <CardMedia
        component="img"
         image={props.image}
        alt={props.title}
        title={props.title}
        sx={{ width: "100%", height: "300px" }}
      />
      <h1 className="myAccount"
      style={{textAlign: !mobile?'left':'center',paddingLeft: !mobile?'10%':'0'}}>{props.title}</h1>
    </Box>
  );
};


