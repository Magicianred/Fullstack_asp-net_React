import React from 'react'
import "./LicencePlate.css"

export default function LicencePlate({info}) {
    return (
        <>
        <div id="plate">
            <div id="number">
            {info.licencePlate}
            <p>Made by {info.brand}</p>
            </div>
        </div>
            
        </>
    )
}
