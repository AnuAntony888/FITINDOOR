import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useFilterContext } from "../../Context/Filter_context_section";
const FilterComponent = (props) => {
  const { clearFilters, filtered_value, checkboxFilters } = useFilterContext();
  const { curElem, updateFilterValue } = props;
  //console.log(curElem, "curele");
  const convertToSlug = (Text) => {
    return Text.toLowerCase()
      .replace(/[^\w ]+/g, "")
      .replace(/ +/g, "-");
  };
  const Text = curElem.name;
  const [visibleItems, setVisibleItems] = useState(5); // Initially display 5 items
    // Handler to show more items when Load More is clicked
    const handleLoadMore = () => {
      setVisibleItems((prev) => prev + 5); // Show 5 more items each time
    };
    // console.log(curElem,updateFilterValue,"props")
  return (
    <>
      {updateFilterValue ? (
        <li key={curElem?.id} className="label">
          <label className="list_gap">
            <input
              type="checkbox"
              name={props?.name}
              value={curElem?.id}
              checked={props.checked}
              className={props.className}
              onChange={updateFilterValue}
            />
            <span className="categoryfil"> {curElem.name}</span>
          </label>
        </li>
      ) : (
        <li key={curElem?.id} className="label">
          <Link
            to={`/category/${curElem.slug}`}
            state={{
              child_category_id: curElem.id,
              banner_image: curElem.banner_image,
            }}
            onClick={clearFilters}
          >
            <label className="list_gap">
              <span className="categoryfil" id="filter_cursor">
                {" "}
                {curElem.name}
              </span>
            </label>
          </Link>
        </li>
      )}
       {/* {props.items.length > visibleItems && (
        <button onClick={handleLoadMore} className="load-more-btn">
          Load More
        </button>
      )} */}
    </>
  );
};

export default FilterComponent;
