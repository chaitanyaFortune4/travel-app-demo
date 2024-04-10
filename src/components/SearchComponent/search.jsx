"use client";
import {} from "@/apiController/travelApis";
import React, { useEffect, useState } from "react";
import Products from "../ProductsComponent/products";
import { getDestinationById } from "@/services/apiServices";

const Search = ({ data }) => {
  const [destinations, setDestinations] = useState(data);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredList, setFilteredList] = useState([]);
  const [products, setProducts] = useState([]);

  const fetchDestionationById = async (
    selectedDestinationName,
    selectedDestinationId
  ) => {
    console.log("ID", selectedDestinationId);
    const selectedDestinationObj = {
      filtering: {
        destination: selectedDestinationId,
      },
      currency: "INR",
    };

    const result = await getDestinationById(selectedDestinationObj);

    if (result.status === 200) {
      setSearchTerm(selectedDestinationName);
      setFilteredList([]);
      setProducts(result.data.products);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "searchTerm") {
      setSearchTerm(value);
    }
    if (value.length > 2) {
      const filteredList = destinations.filter((destinations) =>
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
                {filteredList.length > 0 &&
                  filteredList.map((destination, idx) => (
                    <div
                      key={idx}
                      style={{
                        backgroundColor: "grey",
                        cursor: "pointer",
                        padding: "0.2rem",
                      }}
                      onClick={() =>
                        // setSelectedDestination(destination.destinationId)
                        fetchDestionationById(
                          destination.destinationName,
                          destination.destinationId
                        )
                      }
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
      <Products products={products} />
    </>
  );
};

export default Search;
