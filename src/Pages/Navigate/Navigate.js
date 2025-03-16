import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "../Home/Home";
import SingleProduct from "../Productbycategory/SingleProduct";
import AllproductList from "../AllProduct/AllproductList";
import Contactus from "../ContactUs/Contactus";
import PrivacyPolicy from "../Privacy-policy/PrivacyPolicy";
import MYAccount from "../MYAcoount/MYAccount";
import BlogDetailpage from "../../Componet/Blog/BlogDetailpage";
import Brands from "../Brands/Brands";
import Offerzone from "../Offerse/Offerzone";
import Blog from "../../Componet/Blog/Blog";
import BrandbyProductList from "../Brands/BrandbyProductList";
import NewArrival from "../NewArrival/NewArrival";
import Thankyou from "../ThankYou/Thankyou";
import OrderDetail from "../MYAcoount/OrderDetail";
import Listbrands from "../Brands/Listbrands";

import { Circularrotate, ErrorPage } from "../../Error";
import { useAuthContext } from "../../Context/AuthContext";
import OrderFormjersey from "../Form/OrderFormjersey";
import { Sizechart, ThankyouBJOForm } from "../../Icons/Icons";
import VAHA from "../../Brandingpages/VAHA";
import Tapresult from "../../Componet/Paybutton/Tapresult";
import { UserProvider } from "../../Context/Usercontext";

const Paybutton = React.lazy(() =>
  import("../../Componet/Paybutton/Paybutton")
);
const CheckOut = React.lazy(() => import("../CheckOut/CheckOut"));

function Navigate() {
  const { user, getuserdata } = useAuthContext();
  return (
    <div id="navigate">
      <div>
        <Routes>
          <Route exact path="/" element={<Home />}></Route>

          <Route
            exact
            path="/myAccount"
            element={
              <React.Suspense fallback={<Circularrotate />}>
                {getuserdata?.token ? <MYAccount /> : <ErrorPage />}
              </React.Suspense>
            }
          ></Route>
          <Route
            exact
            path="/checkout"
            element={
              <React.Suspense fallback={<Circularrotate />}>
                < UserProvider>        <CheckOut /></UserProvider>
                {/* <CheckOut /> */}
              </React.Suspense>
            }
          ></Route>
          <Route
            exact
            path="/contact-us"
            element={
              <React.Suspense fallback={<Circularrotate />}>
                <Contactus />
              </React.Suspense>
            }
          ></Route>

          <Route
            exact
            path="/page/:slug"
            element={
              <React.Suspense fallback={<Circularrotate />}>
                <PrivacyPolicy />
              </React.Suspense>
            }
          ></Route>
          <Route path="*" element={<ErrorPage />} />
          <Route exact path="/:productname" element={<SingleProduct />} />
          <Route
            exact
            path="/category/:subCat"
            element={<AllproductList />}
          ></Route>
          <Route
            exact
            path="/brands"
            element={
              <React.Suspense fallback={<Circularrotate />}>
                <Listbrands product="brandList" />
              </React.Suspense>
            }
          ></Route>
          <Route
            exact
            path="/products/brand/:id"
            element={
              <React.Suspense fallback={<Circularrotate />}>
                <BrandbyProductList />
              </React.Suspense>
            }
          ></Route>
          <Route
            exact
            path="/offers"
            element={
              <React.Suspense fallback={<Circularrotate />}>
                <Offerzone />
              </React.Suspense>
            }
          ></Route>
          <Route
            exact
            path="/blogs/news"
            element={
              <React.Suspense fallback={<Circularrotate />}>
                <Blog />
              </React.Suspense>
            }
          ></Route>
          <Route
            exact
            path="/blog/:title"
            element={
              <React.Suspense fallback={<Circularrotate />}>
                <BlogDetailpage />
              </React.Suspense>
            }
          ></Route>
          <Route
            exact
            path="/payment"
            element={
              <React.Suspense fallback={<Circularrotate />}>
                {getuserdata?.token ? <Paybutton /> : <ErrorPage />}
              </React.Suspense>
            }
          ></Route>
          <Route
            exact
            path="/product/search"
            element={
              <React.Suspense fallback={<Circularrotate />}>
                <NewArrival />
              </React.Suspense>
            }
          ></Route>
          <Route
            exact
            path="/order"
            element={
              <React.Suspense fallback={<Circularrotate />}>
                {/* <Thankyou /> */}
                {getuserdata?.token || localStorage.getItem("orderId") ? (
                  <Thankyou />
                ) : (
                  <ErrorPage />
                )}
              </React.Suspense>
            }
          ></Route>
          <Route
            exact
            path="/user/orderdetails/:order_id"
            element={
              <React.Suspense fallback={<Circularrotate />}>
                {getuserdata?.token ? <OrderDetail /> : <ErrorPage />}
              </React.Suspense>
            }
          ></Route>
          <Route
            exact
            path="/BadmintonJerseyOrderForm"
            element={
              <React.Suspense fallback={<Circularrotate />}>
                <OrderFormjersey />
              </React.Suspense>
            }
          ></Route>
          <Route
            exact
            path="/ThankYou"
            element={
              <React.Suspense fallback={<Circularrotate />}>
                <ThankyouBJOForm />
              </React.Suspense>
            }
          ></Route>
          <Route
            exact
            path="/sizechart"
            element={
              <React.Suspense fallback={<Circularrotate />}>
                <Sizechart />
              </React.Suspense>
            }
          ></Route>

          <Route
            exact
            path="/pent"
            element={
              <React.Suspense fallback={<Circularrotate />}>
                <VAHA type="pent" />
              </React.Suspense>
            }
          ></Route>
          <Route
            exact
            path="/vaha"
            element={
              <React.Suspense fallback={<Circularrotate />}>
                <VAHA type="vaha" />
              </React.Suspense>
            }
          ></Route>
          <Route
            exact
            path="/wellsystem"
            element={
              <React.Suspense fallback={<Circularrotate />}>
                <VAHA type="wellsystem" />
              </React.Suspense>
            }
          ></Route>
          <Route
            exact
            path="/ems"
            element={
              <React.Suspense fallback={<Circularrotate />}>
                <VAHA type="ems" />
              </React.Suspense>
            }
          ></Route>
          {/* <Route
            exact
            path="/home"
            element={
              <React.Suspense fallback={<Circularrotate />}>
                <Newhome/>
              </React.Suspense>
            }
          ></Route>  */}

          <Route
            exact
            path="/redirect"
            element={
              <React.Suspense fallback={<Circularrotate />}>
                <Tapresult />
              </React.Suspense>
            }
          ></Route>
        </Routes>
      </div>
    </div>
  );
}

export default Navigate;
