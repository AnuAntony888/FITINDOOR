import React from "react";
import { useState, useEffect } from "react";
import { Drawer } from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import logo from "../../Assets/logo.svg";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { GetSubcategories } from "../../client-api/APIcategory";
import { Link } from "react-router-dom";
import { IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import "./MobileHeader.css";
import CloseIcon from "@mui/icons-material/Close";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import ReactGA4 from "react-ga4";
import TableRow from "@mui/material/TableRow";
import { useQueryClient } from "react-query";
import Button from "@mui/material/Button";
const Practise = () => {
  const [cat, setcat] = useState([]);
  const [child, setchild] = useState([]);

  // console.log(cat, "category,dddd");
  const { datasubcategory } = GetSubcategories();
  // console.log(datasubcategory, "datat gggggg");
  function categoriy(subhead) {
    return setcat(subhead);
  }

  const childecategory = (childname) => {
    setchild(childname);
  };

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (category) => {
    return (event) => {
      setAnchorEl(event.currentTarget);
      setcat(category);
    };
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  function refreshPage() {
    window.location.href = "/";
  }
  const [openDrawer, setopenDrawer] = useState(false);
  const [openDrawerSub, setopenDrawerSub] = useState(false);
  const [openDrawerChild, setopenDrawerChild] = useState(false);

  const [popupcontent, setpopupcontent] = useState([]);
  const changecontent = (post) => {
    setpopupcontent(post);

    setopenDrawerSub(true);
  };

  const [childcategory, setchildcategory] = useState([]);
  const childcategorycontent = (curElem) => {
    setchildcategory(curElem);

    setopenDrawerChild(true);
  };

  const handleClosedrawer = () => {
    setopenDrawer(false);
    setopenDrawerChild(false);
    setopenDrawerSub(false);
  };

  const theme = useTheme();

  const isMatch = useMediaQuery(theme.breakpoints.down("lg"));

  return (
    <>
      {isMatch ? (
        <IconButton
          onClick={() => setopenDrawer(!openDrawer)}
          type="button"
          aria-label="Menu Page"
        >
          <MenuIcon sx={{ color: "black" }} />
        </IconButton>
      ) : (
        <div>
          <div
            style={{
              backgroundColor: "black",
              color: "white",
              borderRadius: "5px",
              paddingTop: "6px",
              paddingBottom: "6px",
              maxWidth: "110px",
              textAlign: "centre",
            }}
            onClick={() => setopenDrawer(!openDrawer)}
            aria-label="Menu Page"
          >
            <MenuIcon
              sx={{
                color: "white",
                // float:'left'
              }}
              className="menuicon"
            />
            All
          </div>
        </div>
      )}

      <Drawer
        open={openDrawer}
        onClose={() => setopenDrawer(false)}
        PaperProps={{
          sx: { width: "270px" },
        }}
      >
        <div className="drawer_bot_widthdrawer_bot_width">
          {" "}
          <img src={logo} onClick={refreshPage} className="familylogo_mobile" />
          <span>
            <CloseIcon
              onClick={() => setopenDrawer(false)}
              sx={{ float: "right", marginTop: "20px", marginRight: "10px" }}
            ></CloseIcon>
          </span>
        </div>

        <Table
          sx={{
            "& .MuiTableRow-root:hover": {
              backgroundColor: "lightgrey",
            },
          }}
        >
          <TableBody>
            {datasubcategory &&
              datasubcategory.map((post, index) => (
                <TableRow key={index}>
                  <TableCell
                    component="th"
                    scope="row"
                    sx={{ padding: "10px", cursor: "pointer" }}
                  >
                    <p
                      onClick={() => changecontent(post)}
                      className="Heading_main2"
                    >
                      {" "}
                      {post.name}{" "}
                      <span>
                        <ArrowForwardIosIcon
                          sx={{
                            float: "right",
                            fontSize: "1rem",
                            color: "grey",
                            marginTop: "5px",
                          }}
                          onClick={() => changecontent(post)}
                        />
                      </span>{" "}
                    </p>
                  </TableCell>
                </TableRow>
              ))}
            {navItems.map((post, index) => (
              <TableRow key={index}>
                <TableCell
                  component="th"
                  scope="row"
                  sx={{ padding: "10px", cursor: "pointer" }}
                  onClick={() => setopenDrawer(false)}
                >
                  {" "}
                  {post}{" "}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Drawer>

      <Drawer
        open={openDrawerSub}
        onClose={() => setopenDrawerSub(false)}
        PaperProps={{
          sx: { width: "270px" },
        }}
      >
        <ArrowBackIcon
          onClick={() => setopenDrawerSub(false)}
          sx={{ marginTop: "10px" }}
        ></ArrowBackIcon>

        <Table
          sx={{
            "& .MuiTableRow-root:hover": {
              backgroundColor: "lightgrey",
            },
          }}
        >
          <TableBody>
            {popupcontent?.sub_categories?.map((curElem, indexa) => {
              return (
                <TableRow key={indexa}>
                  <TableCell
                    component="th"
                    scope="row"
                    sx={{ padding: "10px", cursor: "pointer" }}
                  >
                    <p
                      className="Heading_main2"
                      onClick={() => childcategorycontent(curElem)}
                    >
                      {" "}
                      {curElem.name}{" "}
                      <span>
                        {" "}
                        <ArrowForwardIosIcon
                          sx={{
                            float: "right",
                            fontSize: "1rem",
                            color: "grey",
                            marginTop: "5px",
                          }}
                          onClick={() => childcategorycontent(curElem)}
                        />
                      </span>
                    </p>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Drawer>
      <Drawer
        open={openDrawerChild}
        onClose={() => setopenDrawerChild(false)}
        PaperProps={{
          sx: { width: "270px" },
        }}
      >
        <ArrowBackIcon
          sx={{ marginTop: "10px" }}
          onClick={() => setopenDrawerChild(false)}
        ></ArrowBackIcon>

        <Table
          sx={{
            "& .MuiTableRow-root:hover": {
              backgroundColor: "lightgrey",
            },
          }}
          size="medium"
        >
          <TableBody>
            {childcategory?.child_categories?.map((posts, inde) => {
              return (
                <TableRow>
                  <TableCell
                    component="th"
                    scope="row"
                    sx={{ padding: "10px", cursor: "pointer" }}
                  >
                    <Link
                      to={`/category/${posts.slug}`}
                      state={{
                        child_category_id: posts.id,
                        banner_image: posts.banner_image,
                      }}
                      className="brands_hd"
                      onClick={handleClosedrawer}
                    >
                      <p className="Heading_main2"> {posts.name}</p>
                    </Link>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Drawer>
    </>
  );
};

export default Practise;

export const navItems = [
  <Link to="/brands" className="brands_hd">
    <p className="Heading_main2">Brands</p>
  </Link>,
  <Link
    to="/offers"
    className="brands_hd"
    onClick={() => {
      ReactGA4.event("view_promotion", {
        category: "Promotion",
        action: "Click",
        label: "Offer Zone", // You can customize the label as needed
      });
    }}
  >
    <p className="Heading_main2">Offer Zone</p>
  </Link>,
  <Link to="/blogs/news" className="brands_hd">
    <p className="Heading_main2">Blogs</p>
  </Link>,
];
