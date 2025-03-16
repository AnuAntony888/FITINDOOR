
import React from "react";

import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';


import "./AddToCart.css";

import "react-toastify/dist/ReactToastify.css";
import { useSelector, useDispatch } from "react-redux";
import { addToCart } from "../../redux/cartUiSlice";
import Button from "@mui/material/Button";
import { Toastsucess } from "../ReusableComponet/toast/Toast";
import { useAuthContext } from "../../Context/AuthContext";
import { useAbandonCarts } from "../../client-api/ApiProducts";
import ReactGA4 from "react-ga4";

const Viewproductcarticon = (props) => {
  const { modalofaddtocart, setopenpopup, singleProductdata } = props;
  const addToCartData = modalofaddtocart
    ? [modalofaddtocart]
    : singleProductdata;
  const dispatch = useDispatch();
  const { cart_items, product_item } = useSelector((state) => state.cartUi);
  // console.log(addToCartData[0],"addToCartData[0].product?.product_id");

  const { user, getuserdata } = useAuthContext();
  const { abandonCarts, isabandonCartsLodaing, isabandonCartserror } =
    useAbandonCarts(getuserdata);
  let imageUrl;

  if (
    addToCartData &&
    addToCartData[0] &&
    addToCartData[0].product &&
    addToCartData[0].product.images
  ) {
    const filteredImages = addToCartData[0].product.images.filter(
      (image) => image.in_home === 1
    );
    if (filteredImages.length > 0) {
      imageUrl = filteredImages[0].url;
    }
  }

  const handleabandonCarts = async () => {
    const formData = new FormData();

    const item = cart_items.find(
      (item) =>
        item?.product?.product_id === addToCartData[0].product?.product_id
    );
    // console.log(product_item, "product_item");
    formData.append("cart[0][product][qty]", product_item);
    formData.append("cart[0][product][name]", addToCartData[0].product?.name);
    formData.append("cart[0][product][slug]", addToCartData[0].product?.slug);
    formData.append("cart[0][product][image]", imageUrl);
    formData.append(
      "cart[0][product][price]",
      addToCartData[0].product?.unit_price
    );

    formData.append(
      "cart[0][product][discount_price]",
      addToCartData[0].product?.discount_price
    );
    formData.append(
      "cart[0][product][productid]",
      addToCartData[0].product?.product_id
    );
    formData.append("user_id", getuserdata?.user_id);
    // console.log(formData, "formdata");

    await abandonCarts(formData);
  };
  // console.log(addToCartData, "addToCartData[0]");
  const handleAddToCart = (addToCartData) => {
    const item = cart_items.find(
      (item) =>
        item?.product?.product_id === addToCartData[0].product?.product_id
    );
   
    if (
      item &&
      item?.cartCount + product_item >
        addToCartData?.[0].product?.quantity_label
    ) {
      Toastsucess("Item quantity exceeds available stock!", false, "dark");
      return;
    }
    dispatch(addToCart(addToCartData));
    handleabandonCarts();
    // Track the "add_to_cart" event
    ReactGA4.event("add_to_cart", {
      items: [
        {
          id: addToCartData[0].product?.product_id,
          name: addToCartData[0].product?.name,
          slug: addToCartData[0].product?.slug,
          quantity: product_item,
          price: addToCartData[0].product?.unit_price,
          discount: addToCartData[0].product?.discount_price,
          item_brand: addToCartData[0].product?.brand_name,
          item_category: addToCartData[0].product?.category,
          item_category2: addToCartData[0].product?.childCat,
          sku_id: addToCartData[0].product?.sku,
          short_description: addToCartData[0].product?.short_description,
          quantity_label: addToCartData[0].product?.quantity_label,
        },
      ],
    });

    Toastsucess("Added to the cart!", "sucess", "dark");

    setopenpopup(false);
  };

  return (
    <div>
      <AddShoppingCartIcon sx={{color:'whitesmoke',}}
       onClick={() => handleAddToCart(addToCartData)}/>
  
    
    </div>
  );
};

export default Viewproductcarticon;
