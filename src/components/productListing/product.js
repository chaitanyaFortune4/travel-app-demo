'use client'
import Link from 'next/link';
import React from 'react'
import { convertFlag, convertToSlug, eventTrigger, timer } from '@/utils/common';
import listStyle from "@/css/listing_page/listing.module.scss";
import Image from 'next/image';
import StarRating from '../common/starRating';

export default function Product({ products }) {

    return (
        <>
            <div className='container'>
                {products?.length > 0 &&
                    products.map((product, idx) => (
                        <Link href={`/tour/${convertToSlug(product.title)}`} key={idx}>
                            <div
                                className={listStyle["list-card"]}
                                onClick={() => eventTrigger(product)}
                            >
                                <div className={listStyle["img-wrapper"]}>
                                    <Image
                                        src={product.images[0].variants[0].url}
                                        className={listStyle["card-img"]}
                                        alt="Picture of the author"
                                        width={300}
                                        height={250}
                                    />
                                </div>
                                <div className={listStyle["right-col"]}>
                                <div>
                                    <h3 className={listStyle["card-title"]}>{product.title}</h3>
                                    <div className={listStyle["rating-wrapper"]}>
                                        <StarRating
                                            rating={product.reviews?.combinedAverageRating}
                                        />
                                        {product.reviews?.totalReviews}
                                    </div>
                                    <div className={listStyle["caed-desc"]} style={{ fontWeight: "300" }}>
                                        {product.description.slice(0, 200)}
                                        {product.description.length > 200 && (
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
                                        <div className={listStyle["timer-txt"]}>
                                            {timer(product.duration)}
                                        </div>
                                    )}
                                    <div className={listStyle["offer-detail"]}>
                                        {product.flags.map((flag, idx) => (
                                            <div key={idx}>{convertFlag(flag)}</div>
                                        ))}
                                    </div>
                                </div>
                                <div
                                    style={{
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
                            </div>
                        </Link>
                    ))}
            </div>
        </>
    )
}
