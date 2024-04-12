'use client'
import ProductDetails from '@/components/ProductsComponent/productDetails'
import { fetchData } from '@/services/thirdPartyApiService'
import { apiList } from '@/utils/constants'
import React, { useEffect, useState } from 'react'

export default function Index() {
    const [productData, setProductData] = useState()
    useEffect(() => {
        let productCode = localStorage.getItem('productId')
        getDataById(productCode)
    }, [])
    const getDataById = async (id) => {
        let response = await fetchData(apiList.getDestinationDetailsByProductId + `?query=${id}`)
        setProductData(response)
    }
    return (
        <>
            <ProductDetails data={productData} />
        </>
    )
}
