import React from "react";
import Grid from "@mui/material/Grid";

import "./Footer.css";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";

import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import logo from "../../Assets/logo.svg";
import { GetSubcategories } from "../../client-api/APIcategory";

import { Link } from "react-router-dom";

import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useAuthContext } from "../../Context/AuthContext";
import StraightIcon from "@mui/icons-material/Straight";
import { useFilterContext } from "../../Context/Filter_context_section";
import { GetFooterlink, imagemain } from "../../client-api/ApiHome";

import { InstagramIcon, SocialIcon, TwitterIcon } from "../../Icons/Icons";
import { Home_bg_Footer } from "../../client-api/ApiHomeBanner";
const FooterContent = () => {
  // const [cat, setcat] = useState([]);
  // const [child, setchild] = useState([]);

  const { datasubcategory } = GetSubcategories();

  const { data } = GetFooterlink();

  // function categoriy(subhead) {
  //   return setcat(subhead);
  // }

  // const childecategory = (childname) => {
  //   setchild(childname);
  // };

  React.useEffect(() => {
    window.scrollTo({ behavior: "smooth", top: 0 });
  }, []);

  const { clearFilters } = useFilterContext();
  const { user, getuserdata } = useAuthContext();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("md"));
  const { data: footerbg} = Home_bg_Footer();

  return (
    <div
      className="footer_div"
      style={{
        backgroundImage: `url(${imagemain}/${footerbg?.[0]?.image})`,
        // backgroundPosition:!matches?'bottom':'right'
        backgroundPositionX: !matches ? "bottom" : "right",
        backgroundPositionY: "bottom",
      }}
    >
      <div className="foooterCons">
        <Grid container spacing={2} className="footerContainer">
          <Grid item xs={12} lg={2.8} md={5.5} sm={8}>
            <img src={logo} className="family_footer_logo" alt="logofooter" />
            <br />
            {Data.map((data, index) => (
              <p className="footerlisttext" id="Family" key={index}>
                {data.content}
              </p>
            ))}
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <div>
                  <div id="DigiCertClickID_9-I-6Txu" style={{height: '0px'}}></div>
                  <a href="https://secure.sitelock.com/public/verify/myfamilyfitness.com">
                    <img
                      className="img-responsive"
                      alt="SiteLock"
                      title="SiteLock"
                      src="//shield.sitelock.com/shield/myfamilyfitness.com"
                    />
                  </a>
                </div>
              </Grid>
              <Grid item xs={6} sx={{ margin: "auto" }}>
                <a href="https://discovery.ariba.com/profile/AN11078096687">
                  <img
                    alt="View Family Active Sports Equipment Trading LLC profile on SAP Business Network Discovery"
                    border="0"
                    src="https://service.ariba.com/an/p/Ariba/badge_180x55.jpg"
                    width="85%"
                  />
                </a>
              </Grid>
            </Grid>
          </Grid>
          <Grid item lg={1.5} md={2.5} sm={4} xs={4}>
            <List>
              <ListItem sx={{ pl: 0 }}>
                <h5 className="footheader">Social</h5>
              </ListItem>

           
              {Scocialmedia.map((data,index) => (
                <ListItem className="listitems" key={index}>
                  <ListItemIcon className="footlistliwidth">
                    {data.SocialIcon}
                  </ListItemIcon>
                  <a
                    href={data.link}
                    className="footList"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <ListItemText className="list_text">
                      <span className="footerlisttext">{data.socaltxt}</span>
                    </ListItemText>
                  </a>
                </ListItem>
              ))}
            </List>
          </Grid>
          <Grid item xs={8} lg={2.2} md={4} sm={4.5}>
            <List>
              <ListItem sx={{ pl: 0 }}>
                <h5 className="footheader">Contact</h5>
              </ListItem>

              {Address.map((data, index) => (
                <ListItem className="listitems" key={index}>
                  <ListItemText className="list_text">
                    <span className="footerlisttext" id={data.id}>
                      {data.addresstxt}
                    </span>
                  </ListItemText>
                </ListItem>
              ))}
            </List>
          </Grid>

          <Grid item xs={4} lg={2} md={2.5} sm={3}>
            <List>
              <ListItem sx={{ pl: 0 }}>
                <h5 className="footheader">Categories</h5>
              </ListItem>
              {datasubcategory &&
                datasubcategory.map((post) => {
            
                  return (
                    <ListItem className="listitems" key={post.id}>
                      <Link
                        to={`/category/${post.slug}`}
                        state={{
                          category_id: post.id,
                          banner_image: post.banner_image,
                        }}
                        className="link_style_Footer"
                        onClick={clearFilters}
                      >
                        <span className="footerlisttext">{post.name}</span>
                      </Link>
                    </ListItem>
                  );
                })}
            </List>
          </Grid>
          <Grid item xs={8} lg={2} md={3} sm={3.5}>
            <List>
              <ListItem sx={{ pl: 0 }}>
                <h5 className="footheader">About</h5>
              </ListItem>

              {data &&
                data.map((curElem) => {
                  return (
                    <ListItem className="listitems" key={curElem.id}>
                      <ListItemText className="list_text">
                        <Link
                          to={`/page/${curElem.slug}`}
                          state={{
                            slug: curElem.slug,
                          }}
                          className="link_style_Footer"
                        >
                          {" "}
                          <span className="footerlisttext">
                            {curElem.title}
                          </span>
                        </Link>
                      </ListItemText>
                    </ListItem>
                  );
                })}
            </List>
          </Grid>
          <Grid item xs={6} lg={1.5} md={2.5}>
            <List>
              <ListItem sx={{ pl: 0 }}>
                <h5 className="footheader">Useful links</h5>
              </ListItem>
              {user || getuserdata ? (
                <ListItem className="listitems">
                  <Link to="/myAccount" className="link_style_Footer">
                    <span className="footerlisttext">My Account</span>
                  </Link>
                </ListItem>
              ) : (
                ""
              )}

              <ListItem className="listitems">
                <Link to="/contact-us" className="link_style_Footer">
                  <span className="footerlisttext">Contact Us</span>
                </Link>
              </ListItem>
            </List>
          </Grid>
        </Grid>
      </div>
      <hr />

      {!matches ? (
        <div className="last__footer">
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Grid
                container
                spacing={2}
                sx={{
                  display: "flex",
                  justifyContent: "space-evenly",
                  marginTop: "16px",
                  textAlign: "left",
                }}
              >
                <p className="footerlisttext">
                  Copyright © 2024{" "}
                  <span id="footer_myfamily_bold">My Family Fitness</span> all
                  rights reserved. Powered by
                  <a
                    href="https://www.vedaham.xyz/"
                    target="_blank"
                    className="link_style_Footer"
                    rel="noreferrer"
                  >
                  {" "}  VBS
                  </a>{" "}
                </p>
              </Grid>
            </Grid>
            <Grid item xs={4}>
              <Grid
                container
                spacing={2}
                sx={{
                  display: "flex",
                  justifyContent: "space-evenly",
                  marginTop: "16px",
                  textAlign: "left",
                }}
              >
                {PayIcon.map((data, index) => (
                  <img
                    src={data.src}
                    alt={data.alt}
                    height={data.height}
                    width={data.width}
                    key={index}
                  />
                ))}
              </Grid>
            </Grid>

            <Grid item xs={2}>
              <Grid
                container
                spacing={2}
                sx={{
                  display: "flex",
                  justifyContent: "space-evenly",
                  marginTop: "16px",
                  textAlign: "left",
                }}
              >
                <div
                  className="scrolltop"
                  onClick={() =>
                    window.scrollTo({ top: 0, behavior: "smooth" })
                  }
                >
                  Scroll to top <StraightIcon />
                </div>
              </Grid>
            </Grid>
          </Grid>
        </div>
      ) : (
        <div className="last__footer">
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Grid
                container
                spacing={2}
                sx={{
                  display: "flex",
                  justifyContent: "space-evenly",
                  marginTop: "16px",
                  textAlign: "center",
                }}
              >
                <p className="footerlisttext">
                  Copyright © 2024{" "}
                  <span id="footer_myfamily_bold">My Family Fitness</span> all
                  rights reserved. Powered by {" "}
                  <a
                    href="https://www.vedaham.xyz/"
                    target="_blank"
                    className="link_style_Footer"
                    rel="noreferrer"
                  >
                    VBS
                  </a>{" "}
                </p>

                <div
                  className="scrolltop"
                  onClick={() =>
                    window.scrollTo({ top: 0, behavior: "smooth" })
                  }
                >
                  Scroll to top <StraightIcon />
                </div>
              </Grid>
            </Grid>
          </Grid>
        </div>
      )}
      <hr className="hrwidth" />
    </div>
  );
};

export default FooterContent;
const Data = [
  {
    content: " Family Active Sports Equipment Trading LLC",
  },
  {
    content: "B62 Building, Office No 215,",
  },
  {
    content: "Riggat Al Buteen, Deira,",
  },
  {
    content: "Dubai, United Arab Emirates.",
  },
];
const Scocialmedia = [
  {
    SocialIcon: SocialIcon,
    link: "https://www.facebook.com/MyFamFitness/",
    socaltxt: "Facebook",
  },
  {
    SocialIcon: TwitterIcon,
    link: "https://twitter.com/myfamfitness/",
    socaltxt: "Twitter",
  },
  {
    SocialIcon: InstagramIcon,
    link: "https://www.instagram.com/myfamilyfitness/?utm_medium=copy_link",
    socaltxt: "Instagram",
  },
];

const Address = [
  { id: "footer_myfamily_bold", addresstxt: " Customer Support:" },
  { addresstxt: "  support@myfamilyfitness.com" },
  { addresstxt: "   +971 56 4127900 / 800-326459 (Toll Free)" },
  { id: "footer_myfamily_bold", addresstxt: " Sales/Service Enquiry:" },
  { addresstxt: "    sales@myfamilyfitness.com" },
  { addresstxt: " +971 4 548 1159 / 800-326459 (Toll Free)" },
];

const PayIcon = [
  {
    src: "https://ik.imagekit.io/thmmwwbpc/MFF%20E%20Commerce/footer/mastercard.webp?updatedAt=1715237432241",
    alt: "Master Card",
    height: "20",
    width: "34",
  },
  {
    src: "https://ik.imagekit.io/thmmwwbpc/MFF%20E%20Commerce/footer/visacard.webp?updatedAt=1715237432475",
    alt: "Visa",
    height: "20",
    width: "50",
  },
  {
    src: "https://ik.imagekit.io/thmmwwbpc/MFF%20E%20Commerce/footer/thamara.png?updatedAt=1715237432311",
    alt: "Paypal",
    height: "20",
    width: "76",
  },
];
