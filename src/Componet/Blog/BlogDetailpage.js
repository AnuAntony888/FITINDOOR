import React from "react";

import { useLocation } from "react-router-dom";
import { BlogDetails } from "../../client-api/ApiHome";
import Banner from "../../Assets/Banner.webp";
import { AllproductBanner } from "../../Pages/AllProduct/AllproductBanner";
import { Circularrotate } from "../../Error";
import { MetaComponent } from "../../Icons/Icons";
const BlogDetailpage = () => {
  const location = useLocation();

  // const { id } = location.state;
  // const { data, error, isLoading } = BlogDetails(id);

  const newURL = location.pathname;

  const splitURL = newURL.toString().split("/");
  // console.log(splitURL[2], "url");
   const { data, error, isLoading } = BlogDetails(splitURL[2]);

  React.useEffect(() => {
    window.scrollTo({ behavior: "smooth", top: 0 });
  }, []);
  return (
    <div>
           <MetaComponent
        dynamicTitle={data?.title}
        dynamicKeywords={data?.meta_tag}
        dynamicDescription={data?.meta_description}
      />
      <AllproductBanner
        image={
          data?.banner_image
            ? `https://ik.imagekit.io/thmmwwbpc/blog/images/${data?.banner_image}`
            //  `https://admin.myfamilyfitness.com/uploads/blog/images/${data?.banner_image}`
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
  );
};

export default BlogDetailpage;
