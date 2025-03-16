import Skeleton from "@mui/material/Skeleton";
import Grid from "@mui/material/Grid";
function CommonSkeleton(props) {
  const skeleton = Array.from({ length: props.length }, (_, indx) => indx);
  // console.log(skeleton, "skelotn");
  return skeleton.map((sk, index) => (
    <Grid
      item
      key={index}
      xs={props.xs}
      lg={props.lg}
      md={props.md}
      sm={props.sm}
      sx={{ display: "flex" }}
    >
      <Skeleton
        variant="rectangular"
        animation="wave"
        height={props.height}
        width={props.width}
        {...props}
      />
    </Grid>
  ));
}

export default CommonSkeleton;
