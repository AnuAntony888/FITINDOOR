import React from "react";
import Grid from "@mui/material/Grid";
import { useFilterContext } from "../../Context/Filter_context_section";
import { useLocation, useParams } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import "./Sort.css";
import { Button } from "@mui/material";

const Sort = ({ pgainatedData }) => {
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down("md"));
  const location = useLocation();
  const { child_category_id, category_id } = location.state || {};

  //console.log(child_category_id, category_id, "child_catdggvd ddhhchc");
  const sort = () => {
    return (event) => {
      sorting(event);
    };
  };
  const { filter_products, sorting, sorting_value } = useFilterContext();

  //console.log(sorting_value, "sort value123");
  return (
    <div>
      <Grid
        container
        spacing={2}
        sx={{ marginBottom: "auto", display: "flex" }}
      >
        <Grid item lg={7} md={6}></Grid>
        <Grid item lg={2} md={2} className="totalit">
          {!mobile ? (
            <>
              <Button className="clearall">
                {pgainatedData?.meta?.total ? (
                  <>{`${pgainatedData?.meta?.total} items`}</>
                ) : (
                  <>{`no items`}</>
                )}
              </Button>
            </>
          ) : (
            ""
          )}
        </Grid>
        <Grid item lg={3} md={4}>
          <FormControl
            sx={{ m: 1, minWidth: "178px", margin: "0" }}
            size="small"
          >
            <Select
              labelId="demo-select-small"
              name="sort"
              id="sort"
              inputProps={{ "aria-label": "Without label" }}
              onChange={sort(child_category_id, category_id)}
              value={sorting_value}
            >
              <MenuItem disabled
              //  selected="selected"
                value="none">
                Sort
              </MenuItem>
              <MenuItem value={"price-low"}>Price: Low to High</MenuItem>
              <MenuItem value={"price-high"}>Price: High to Low</MenuItem>
              <MenuItem value={"name-asc"}>Name (a-z)</MenuItem>
              <MenuItem value={"name-desc"}>Name (z-a)</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>
    </div>
  );
};

export default Sort;
