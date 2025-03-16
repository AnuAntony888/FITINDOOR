import React from "react";
import { useState } from "react";
import { Drawer } from "@mui/material";

import Button from "@mui/material/Button";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

import Responsivefilter from "../../FilterSection/Responsivefilter";
import { FilterIcon } from "../../../Icons/Icons";
const Drawers = ({ filterData, fetchfilterCatLoading, pgainatedData }) => {
  const [openDrawer, setopenDrawer] = useState(false);
  const theme = useTheme();
  const largeScreen = useMediaQuery(theme.breakpoints.up("sm"));
  return (
    <div>
      <Drawer
        open={openDrawer}
        onClose={() => setopenDrawer(false)}
        PaperProps={
          largeScreen
            ? {
                sx: {
                  width: 300,
                },
              }
            : {
                sx: {
                  width: 250,
                },
              }
        }
      >
        <Responsivefilter
          openDrawer={openDrawer}
          setopenDrawer={setopenDrawer}
          filterData={filterData}
          fetchfilterCatLoading={fetchfilterCatLoading}
          pgainatedData={pgainatedData}
        />
      </Drawer>

      <Button
        variant="outlined"
        className="button_filter"
        onClick={() => setopenDrawer(!openDrawer)}
      >
        {FilterIcon}
        <span class="ps-2.5">Filters</span>
      </Button>
    </div>
  );
};

export default Drawers;
