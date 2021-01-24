import React from "react";
// import SelectSearch from "react-select-search";
// import Select from "react-dropdown-select";

const Search = () => {
  const options = [
    { name: "Swedish", value: "sv" },
    { name: "English", value: "en" },
  ];
  return (
    // <SelectSearch options={options} search placeholder="Select your country" />
    <div class="ui huge icon input focus">
      <input
        style={{ width: "100vh", borderRadius: "25px" }}
        type="text"
        placeholder="Search..."
      />
      <i class="search icon"></i>
    </div>
  );
};

export default Search;
