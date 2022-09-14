import React from "react";

const Search = ({ searchText }) => {
  const { query } = searchText;
  return (
    <>
      <div className="h-screen">
       <p>

       Search:
        <span className="text-base font-bold ml-3">{query.length !== 0 ? query : "No categories or video searched!!"}</span>

       </p>
      </div>
    </>
  );
};

export default Search;
