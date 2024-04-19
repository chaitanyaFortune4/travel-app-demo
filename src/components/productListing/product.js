'use client'
import Link from 'next/link';
import React from 'react'
import { convertFlag, convertToSlug, eventTrigger, timer } from '@/utils/common';
import listStyle from "../../assets/styles/listing_page/listing.module.scss";
import Image from 'next/image';
import StarRating from '../common/starRating';

export default function Product({ products }) {

    return (
        <>
            <div style={{ marginTop: "2rem" }}>
                {products?.length > 0 &&
                    products.map((product, idx) => (
                        <Link href={`/tour/${convertToSlug(product.title)}`} key={idx}>
                            <div
                                className={listStyle["list-card"]}
                                onClick={() => eventTrigger(product)}
                            >
                                <div>
                                    <Image
                                        src={product.images[0].variants[0].url}
                                        className={listStyle["card-img"]}
                                        alt="Picture of the author"
                                        width={450}
                                        height={300}
                                    />
                                </div>
                                <div style={{ width: "60%" }}>
                                    <h3 className={listStyle["card-title"]}>{product.title}</h3>
                                    <div style={{ marginBottom: "1rem" }}>
                                        <StarRating
                                            rating={product.reviews?.combinedAverageRating}
                                        />
                                        {product.reviews?.totalReviews}
                                    </div>
                                    <div style={{ fontWeight: "300" }}>
                                        {product.description.slice(0, 300)}
                                        {product.description.length > 300 && (
                                            <button
                                                style={{
                                                    background: "none",
                                                    border: "none",
                                                    marginLeft: "0.5rem",
                                                    textDecoration: "underline",
                                                }}
                                            >
                                                ...More
                                            </button>
                                        )}
                                    </div>

                                    {product.duration && (
                                        <div style={{ marginTop: "1rem" }}>
                                            {timer(product.duration)}
                                        </div>
                                    )}
                                    <div>
                                        {product.flags.map((flag, idx) => (
                                            <div key={idx}>{convertFlag(flag)}</div>
                                        ))}
                                    </div>
                                </div>
                                <div
                                    style={{
                                        //   border: "1px solid red",
                                        width: "8%",
                                        textAlign: "right",
                                    }}
                                >
                                    from
                                    <p style={{ fontWeight: "bold" }}>
                                        Rs {product.pricing.summary.fromPrice}
                                    </p>
                                    <p style={{ fontSize: "0.8rem" }}>
                                        price varies by group size
                                    </p>
                                </div>
                            </div>
                        </Link>
                    ))}
            </div>
        </>
    )
}
