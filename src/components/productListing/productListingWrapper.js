'use client'
import React from 'react'
import Product from './product'
import Attraction from './attraction'
import commonStyle from "@/css/common.module.scss"

export default function ProductListingWrapper({ data }) {
    return (
        <>
            <div className={commonStyle["container"]}>
                <h2 className={commonStyle["medium-title"]}>Listing Page</h2>
                <Product products={data.product} />
                <Attraction attraction={data.attraction} />
            </div>
        </>
    )
}
