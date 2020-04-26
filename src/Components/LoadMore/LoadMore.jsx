import React, { useContext } from "react";
import { MovieContext } from "../../Context";

const LoadMore = () => {
  const { visible, coming, loadMore } = useContext(MovieContext);
  return (
    <div>
      {/* if value visible is smaller than popular.length then add button */}
      {visible < coming.length && (
        <button onClick={loadMore} type="button" className="load-more">
          See More
        </button>
      )}
    </div>
  );
};

export default LoadMore;
