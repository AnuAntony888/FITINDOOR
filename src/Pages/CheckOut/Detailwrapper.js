import React, { useState } from "react";
import Grid from "@mui/material/Grid";

import Paper from "@mui/material/Paper";
import { useAuthContext } from "../../Context/AuthContext";
import { useProfile } from "../../client-api/Apiuserdetails";
import AddIcon from "@mui/icons-material/Add";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

import { usePoPupContext } from "../../Context/PopupContext";

const Detailwrapper = (props) => {
  const { user, getuserdata } = useAuthContext();
  const { data, error, isLoading } = useProfile(getuserdata);
  const [type, settype] = useState("");
  const childToParent = () => {
    if (props.shippingAddress) {
      settype(1);
    } else {
      settype(2);
    }
  };
  const { setopenpopup } = usePoPupContext();

  const handleClickOpen = () => {
    // childToParent();
    const popUpValue = props.phone
      ? "phone"
      : props.profile
      ? "personalDetails"
      : { type: props.shippingAddress ? 2 : 1 };
    setopenpopup(popUpValue);
  };

  const changecontent = (curElem) => {
    setopenpopup(curElem);
  };

  // console.log(data, "profile");

  return (
    <>
      <Grid item lg={12} md={12} sm={12} xs={12}>
        <TableContainer component={Paper}>
          <Table aria-label="customized table">
            <TableHead className="tablecells">
              <TableRow>
                <TableCell>
                  <span className="shadow-checkoutCardheading">
                    {props.head}
                  </span>
                </TableCell>
                <TableCell></TableCell>
                <TableCell align="right">
                  <AddIcon onClick={handleClickOpen}></AddIcon>Edit
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                {props.phone && (
                  <TableCell>
                    <p>{data?.profile?.phone}</p>
                  </TableCell>
                )}
                {props.profile && (
                  <TableCell>
                    <p>
                      {data?.profile?.first_name} {data?.profile?.last_name}
                    </p>
                    <p>{data?.profile?.gender ? data?.profile?.gender : ""}</p>
                    <p>{data?.profile?.dob ? data?.profile?.dob : ""}</p>
                  </TableCell>
                )}

                {props.shippingAddress && data?.address?.[0] ? (
                  <TableCell key={data.address?.[0].address.id}>
                    <p>{data.address?.[0].address2}</p>
                    <p>{data.address?.[0].city2}</p>
                    <p>{data.address?.[0].pincode2}</p>
                    <p>{data.address?.[0].phone2}</p>
                    <p>{data.address?.[0].country}</p>
                  </TableCell>
                ) : null}

                {props.billingAddress && data?.address?.[0] ? (
                  <TableCell key={data.address?.[0].address.id}>
                    <p>{data.address?.[0].address}</p>
                    <p>{data.address?.[0].city}</p>

                    <p>{data.address?.[0].pincode}</p>
                    <p>{data.address?.[0].phone}</p>
                    <p>{data.address?.[0].country}</p>
                  </TableCell>
                ) : null}
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </>
  );
};

export default Detailwrapper;
