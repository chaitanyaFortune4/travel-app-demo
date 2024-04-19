'use client'
import Image from 'next/image'
import React from 'react'

export default function AttractionCard({ imageSrc, title, onClick }) {
    return (
        <>
            <div className="card" onClick={onClick}>
                <Image src={imageSrc} height={200} width={250} />
                <div className="overlay"></div>
                <p className="centered title">{title}</p>
            </div>
        </>
    )
}