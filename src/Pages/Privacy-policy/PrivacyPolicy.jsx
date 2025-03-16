import React, { useRef, useEffect } from "react";
import "./Privacy-policy.css";

import { useLocation, useParams } from "react-router-dom";
import { GetPrivacypolicy } from "../../client-api/ApiHome";
import { AllproductBanner } from "../AllProduct/AllproductBanner";
import Banner from "../../Assets/Banner.webp";
import { Circularrotate } from "../../Error";
import { MetaComponent } from "../../Icons/Icons";
const PrivacyPolicy = () => {
  const location = useLocation();
  // const { slug } = location.state || {};
  const newURL = location.pathname;

  const splitURL = newURL.toString().split("/");
  console.log(splitURL[2], "url");
  const { data, isLoading } = GetPrivacypolicy(splitURL[2]);
  // console.log(data?.meta_title,data?.meta_tag ,data?.meta_description,"privacy policy");
  React.useEffect(() => {
    document.getElementById("about_id").scrollIntoView({ behavior: "smooth" });
  }, [splitURL[2]]);

  return (
    <>
      <MetaComponent
        dynamicTitle={data?.meta_title}
        dynamicKeywords={data?.meta_tag}
        dynamicDescription={data?.meta_description}
      />
      <div id="about_id">
        <AllproductBanner
          image={
            data?.image
              ? `https://admin.myfamilyfitness.com/uploads/category/images/${data?.image}`
              : Banner
          }
          title={data?.title}
        />
        {isLoading ? (
          <Circularrotate />
        ) : (
          <div className="blogdetails_padding">
            <p
              dangerouslySetInnerHTML={{
                __html: data?.description,
              }}
            />
          </div>
        )}
      </div>
    </>
  );
};

export default PrivacyPolicy;
