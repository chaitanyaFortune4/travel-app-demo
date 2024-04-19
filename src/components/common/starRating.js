'use client'
import React from 'react'

export default function StarRating({ rating }) {
    const roundedRating = Math.round(rating * 2) / 2;

    const filledStars = Math.floor(roundedRating);
    const hasHalfStar = roundedRating % 1 !== 0;
    const maxStars = 5;
    const unfilledStars = maxStars - filledStars - (hasHalfStar ? 1 : 0);

    const stars = [];

    for (let i = 0; i < filledStars; i++) {
        stars.push(
            <i key={i} style={{ color: "#f5c542" }} className="fa-solid fa-star"></i>
        );
    }

    if (hasHalfStar) {
        stars.push(
            <i
                key="half"
                style={{ color: "#f5c542" }}
                className="fa-solid fa-star-half-stroke"
            ></i>
        );
    }

    for (let i = 0; i < unfilledStars; i++) {
        stars.push(
            <i
                key={i + filledStars + (hasHalfStar ? 1 : 0)}
                className="fa-regular fa-star"
            ></i>
        );
    }
    return <div>{stars}</div>

}
