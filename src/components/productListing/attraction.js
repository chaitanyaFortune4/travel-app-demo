'use client'
import React from 'react'
import AttractionCard from './attractionCard';
import { Title } from '../Items/Title';
import { useRouter } from 'next/navigation';
import attrStyle from "@/css/listing_page/attraction.module.scss";
import commonStyle from "@/css/common.module.scss"
export default function Attraction({ attraction }) {
    const router = useRouter();
    const onClickAttractionCard = (pageUrlName, seoId) => {
        localStorage.setItem("seo", seoId);
        router.push(`/attractions/${pageUrlName}?seo=${seoId}`);
    };
    return (
        <>
            <div className={attrStyle["attr-wrapper"]}>
                <div>
                    {attraction.length > 0 && <Title title={"Popular Attractions"} />}
                </div>
                <div className={attrStyle["card-wrapper"]}>
                    {attraction.slice(0, 10).map((item, index) => (
                        <AttractionCard
                            key={index}
                            title={item.title}
                            imageSrc={item.thumbnailURL}
                            onClick={() => onClickAttractionCard(item.pageUrlName, item.seoId)}
                        />
                    ))}
                </div>
            </div>
        </>
    )
}
