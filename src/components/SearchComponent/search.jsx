"use client";

import React, { useEffect, useState } from "react";
import Products from "../ProductsComponent/products";
import { getAllDestinations, getDestinationById } from "@/services/apiServices";
import { useRouter } from "next/navigation";
import { convertToSlug } from "@/utils/common";
import style from "../../assets/styles/landing_page/landingpage.module.scss";
import Loader from "../SpinnerComponent/Spinner";

const Search = () => {
  const [destinations, setDestinations] = useState();
  const [load, setLoad] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredList, setFilteredList] = useState([]);
  const [products, setProducts] = useState([]);
  const [isFocused, setIsFocused] = useState(false);
  const router = useRouter();

  const fetchDestData = async () => {
    setLoad(true);
    const destData = await getAllDestinations();
    setDestinations(destData.data.data);
    setLoad(false);
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

  const onFocusInput = () => {
    setIsFocused(true);
  };

  const onBlurInput = () => {
    setIsFocused(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  useEffect(() => {
    fetchDestData();
    localStorage.setItem("mobile", "9886979895");
  }, []);

  const onClickDestination = (e, destination) => {
    localStorage.setItem("searchedDestination", destination.destinationName);
    router.push(`/${destination.destinationName}/${destination.destinationId}`);
  };

  return (
    <>
      {load ? (
        <div
          style={{
            height: "100vh",
            width: "100vw",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Loader />
        </div>
      ) : (
        <div className={style["banner-wrapper"]}>
          <div className={style["detail-wrap"]}>
            <h1 className={style["banner-title"]}>Do more with Travel</h1>
            <p className={style["sub-title"]}>
              One site, 300,000+ travel experiences you'll remember.
            </p>
            <div className={style["searchinp-wrap"]}>
              <label className={style["search-label"]}>
                <p>Where to?</p>
                <input
                  className={style["search-inp"]}
                  autoComplete="off"
                  name="searchTerm"
                  placeholder="Search for a place"
                  value={searchTerm}
                  onFocus={onFocusInput}
                  onBlur={onBlurInput}
                  onChange={(e) => handleInputChange(e)}
                />
              </label>
              <div
                className={
                  style["datalist-wrap"] +
                  " " +
                  (isFocused == true ? style["active"] : "")
                }
              >
                {filteredList?.length > 0 &&
                  filteredList.slice(0, 5).map((destination, idx) => (
                    <div
                      key={idx}
                      className={style["data-list"]}
                      onClick={(e) => onClickDestination(e, destination)}
                    >
                      {destination.destinationName}
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Search;
