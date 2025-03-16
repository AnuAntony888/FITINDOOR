import React, { useState } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import "./Accordian.css";

import { useProductreView } from "../../client-api/LoginRegister";
import { TextField } from "@mui/material";
import { Toastsucess } from "../ReusableComponet/toast/Toast";

import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

const FAQ = (props) => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const label = { inputProps: { "aria-label": "Checkbox demo" } };
  const { active } = props;
  const [checked, setChecked] = React.useState(false);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [errors, seterrors] = useState({});
  const handleName = (e) => {
    setName(e.target.value);
  };
  const handleMessage = (e) => {
    setMessage(e.target.value);
  };
  const handleEmail = (e) => {
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
      seterrors((prev) => ({ ...prev, email: "" }));
    }
    setEmail(e.target.value);
  };

  const { productreview, isLoading, error } = useProductreView();

  const handleApi = async () => {
    try {
      console.log(errors, "errors");
      if (!checked && !email && !message && !name) {
        Toastsucess("Please Entre your Product Review !");
        return;
      }
      await productreview({
        email: email,
        message: message,
        name: name,
        rate: rating,
      });
      Toastsucess("Thankyou For your review!", "sucess", "light");
    } catch (error) {
      Toastsucess("Please Enter Your Review!");
    }

    setEmail("");
    setMessage("");
    setName("");
    setHover("");
    setChecked(false);
  };
  // console.log(rating, "star rating");

  const AccordianData = [
    {
      panel: "panel1",
      id: "panel1bh-header",
      ariacontrols: "panel1bh-content",
      title: "Product Details",
      content: <p dangerouslySetInnerHTML={{ __html: active.description }}></p>,
    },
    {
      panel: "panel2",
      id: "panel2bh-header",
      ariacontrols: "panel2bh-content",
      title: "Specification",
      content: <p dangerouslySetInnerHTML={{ __html: active.specification }} />,
    },
  ];
  const [expanded, setExpanded] = useState(AccordianData[0].panel);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  const formFields = [
    {
      label: "Your Name *",
      placeholder: "Enter Your Name",
      value: name,
      onChange: handleName,
      type: "text",
      gridProps: { lg: 6, md: 6, sm: 12, xs: 12 },
    },
    {
      label: "Your Email *",
      placeholder: "Enter Your Email",
      value: email,
      onChange: handleEmail,
      type: "text",
      gridProps: { lg: 6, md: 6, sm: 12, xs: 12 },
      error: errors.email,
    },
    {
      label: "Message *",
      placeholder: "",
      value: message,
      onChange: handleMessage,
      type: "text",
      gridProps: { lg: 12, md: 12, sm: 12, xs: 12 },
    },
  ];
  return (
    <>
      {AccordianData.map((data, index) => (
        <Accordion
          key={index}
          expanded={expanded === data.panel}
          onChange={handleChange(data.panel)}
          sx={{ boxShadow: "none", p: 0, mt: 0 }}
        >
          <AccordionSummary
            expandIcon={
              !expanded || expanded !== data.panel ? (
                <AddIcon />
              ) : (
                <RemoveIcon />
              )
            }
            aria-controls={data.ariacontrols}
            id={data.id}
            sx={{ p: 0, mt: 0, minHeight: "40px" }}
          >
            <Typography
              sx={{ width: "50%", flexShrink: 0, p: 0 }}
              className="actxt"
            >
              {data.title}
            </Typography>
          </AccordionSummary>
          <AccordionDetails sx={{ p: 0 }}>{data.content}</AccordionDetails>
        </Accordion>
      ))}
      <Accordion
        expanded={expanded === "panel3"}
        onChange={handleChange("panel3")}
        sx={{ boxShadow: "none" }}
      >
        <AccordionSummary
          expandIcon={
            !expanded || expanded !== "panel3" ? <AddIcon /> : <RemoveIcon />
          }
          aria-controls="panel3bh-content"
          id="panel3bh-header"
          sx={{ p: 0 }}
        >
          <Typography sx={{ width: "70%", flexShrink: 0 }} className="actxt">
            Customer Reviews
          </Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ p: 0 }}>
          <div className="star-rating">
            {[...Array(5)].map((star, index) => {
              index += 1;
              return (
                <button
                  type="button"
                  key={index}
                  className={index <= (hover || rating) ? "on" : "off"}
                  onClick={() => setRating(index)}
                  onMouseEnter={() => setHover(index)}
                  onMouseLeave={() => setHover(rating)}
                >
                  <span className="star">&#9733;</span>
                </button>
              );
            })}

            <Box sx={{ flexGrow: 1 }}>
              <Grid container spacing={2}>
                {formFields.map((field, index) => (
                  <Grid key={index} item {...field.gridProps}>
                    <p className="contact_formtitle">{field.label}</p>
                    {index === 2 ? (
                      <textarea
                        className="Addressinputtxt"
                        value={field.value}
                        onChange={field.onChange}
                      />
                    ) : (
                      <TextField
                        className="Addressinputtxt"
                        type={field.type}
                        placeholder={field.placeholder}
                        value={field.value}
                        onChange={field.onChange}
                      />
                    )}
                    {field.error && <p className="required">{field.error}</p>}
                  </Grid>
                ))}
                <Grid item lg={12} md={12} sm={12} xs={12}>
                  <p>
                    {" "}
                    <Checkbox
                      {...label}
                      onChange={() => {
                        setChecked(!checked);
                      }}
                    />{" "}
                    Save my name, email, and website in this browser for the
                    next time I comment.
                  </p>
                </Grid>

                <Grid item lg={12} md={12} sm={12} xs={12}>
                  <Button
                    variant="contained"
                    className="contact_address_btn"
                    size="large"
                    type="submit"
                    onClick={handleApi}
                  >
                    Send Message
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </div>
        </AccordionDetails>
      </Accordion>
    </>
  );
};

export default FAQ;
