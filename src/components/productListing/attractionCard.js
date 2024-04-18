'use client'
import React from 'react'

export default function AttractionCard({ imageSrc, title, onClick }) {
    return (
        <>
            <div className="card" onClick={onClick}>
                <img src={`${imageSrc}`} style={{ width: "100%", height: "100%" }} />
                <div className="overlay"></div>
                <p className="centered title">{title}</p>
            </div>
        </>
    )
}
