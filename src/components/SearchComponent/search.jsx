"use client";

import React, { useEffect, useState } from "react";
import Products from "../ProductsComponent/products";
import { getDestinationById } from "@/services/apiServices";
import AttractionsSection from "../AttractionComponent/AttractionsSection";
import { useRouter } from "next/navigation";
import { convertToSlug } from "@/utils/common";

const Search = ({ data }) => {
  const [destinations, setDestinations] = useState(data);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredList, setFilteredList] = useState([]);
  const router = useRouter();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "searchTerm") {
      setSearchTerm(value);
    }
    if (value.length > 2) {
      const filteredList = destinations?.filter((destinations) =>
        destinations.destinationName
          ?.toLowerCase()
          .includes(value.toLowerCase())
      );
      setFilteredList(filteredList);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  useEffect(() => {
    localStorage.setItem("mobile", "9886979895");
  }, []);

  const onClickDestination = (e, destination) => {
    localStorage.setItem("destinationId", destination.destinationId);
    router.push(`/listing/${convertToSlug(destination.destinationName)}`);

    // fetchDestionationById(
    //   destination.destinationName,
    //   destination.destinationId
    // );
  };
  return (
    <>
      <div
        style={{
          // border: "1px solid red",
          padding: "1rem",
        }}
      >
        <form onSubmit={handleSubmit}>
          <div
            style={{
              //   border: "1px solid yellow",
              padding: "1rem",
              display: "flex",
              justifyContent: "center",
              columnGap: "2rem",
            }}
          >
            <div>Where to?</div>
            <div>
              <input
                autoComplete="off"
                style={{ padding: "0.2rem" }}
                name="searchTerm"
                value={searchTerm}
                onChange={(e) => handleInputChange(e)}
              />
              <div style={{ marginTop: "0.3rem" }}>
                {filteredList?.length > 0 &&
                  filteredList.map((destination, idx) => (
                    <div
                      key={idx}
                      style={{
                        backgroundColor: "grey",
                        cursor: "pointer",
                        padding: "0.2rem",
                      }}
                      onClick={(e) => onClickDestination(e, destination)}
                    >
                      {destination.destinationName}
                    </div>
                  ))}
              </div>
            </div>
            {/* <div>
              <button
                style={{ padding: "0.1rem", width: "80px" }}
                type="submit"
              >
                Search
              </button>
            </div> */}
          </div>
        </form>
      </div>
    </>
  );
};

export default Search;
