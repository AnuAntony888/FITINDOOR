import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import "./Order.css";
import { useOrderDetails } from "../../client-api/Apiuserdetails";
import { useAuthContext } from "../../Context/AuthContext";
import moment from "moment";
import { Link, useNavigate } from "react-router-dom";

export default function Order() {
  const { user, getuserdata } = useAuthContext();
  const { orderlist, ordererror, orderisLoading } =
    useOrderDetails(getuserdata);

  return (
    <div className="dashbord">
      <h3 className="flashsaletxt1">Orders</h3>
      <br />
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="caption table">
          <TableHead>
            <TableRow>
              <TableCell className="shadow-checkoutCardheading">Order</TableCell>
              <TableCell className="shadow-checkoutCardheading">Date</TableCell>
              <TableCell className="shadow-checkoutCardheading">Status</TableCell>
              <TableCell className="shadow-checkoutCardheading">Total</TableCell>
              <TableCell className="shadow-checkoutCardheading">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orderlist &&
              orderlist?.map((post, index) => {
                return (
                  <TableRow key={index}>
                    <TableCell component="th" scope="row">
                      {post.order_tracking_id}
                    </TableCell>
                    <TableCell>
                      {moment(post.created_at).format("MMM Do YY")}
                    </TableCell>
                    <TableCell>{post.order_status}</TableCell>
                    <TableCell>{post.total_amount}</TableCell>
                    <TableCell>
                      <Link
                        to={`/user/orderdetails/${post.order_id}`}
                        state={{
                          order_id: post.order_id,
                        }}
                        className="brands_hd"
                      >
                        <button className="viewbtnorder">View</button>
                      </Link>
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
