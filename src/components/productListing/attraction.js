'use client'
import React from 'react'
import AttractionCard from './attractionCard';
import { Title } from '../Items/Title';
import { useRouter } from 'next/navigation';

export default function Attraction({ attraction }) {
    const router = useRouter();
    const onClickAttractionCard = (pageUrlName, seoId) => {
        localStorage.setItem("seo", seoId);
        router.push(`/attractions/${pageUrlName}?seo=${seoId}`);
    };
    return (
        <>
            <div style={{ margin: "5rem" }}>
                <div style={{ display: "flex", justifyContent: "center" }}>
                    {attraction?.length > 0 && <Title title={"Popular Attractions"} />}
                </div>
                <div
                    style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}
                >
                    {attraction?.slice(0, 10).map((item, index) => (
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
