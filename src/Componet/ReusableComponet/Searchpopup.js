import React from "react";
import Dialog from "@mui/material/Dialog";

import DialogContent from "@mui/material/DialogContent";

function Searchpopup(props) {
  const { title, children, search, setsearch } = props;
  const handleClose = () => {
    setsearch(false);
  };

  return (
    <div>
      <Dialog
        open={search}
        sx={{
          "& .MuiDialog-container": {
            alignItems: "flex-start",
          },
        }}
        onClose={handleClose}
        fullWidth
        // PaperProps={{ sx: { mt: "50px" } }}
      >
        <DialogContent sx={{ padding: "0px" }}>{children}</DialogContent>
      </Dialog>
    </div>
  );
}

export default Searchpopup;
