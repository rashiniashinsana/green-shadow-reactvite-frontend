// @ts-ignore
import React from "react"
// @ts-ignore
export function Modal(props,children) {
    return (
        <>
            <input type="text"
                   placeholder="cropCode"
                   onChange={(e) => props.setCropCode(e.target.value)}
            />
            <input type="text"
                   placeholder="cropCommonName"
                   onChange={(e) => props.setCropCommonName(e.target.value)}
            />
            <input type="text"
                   placeholder="cropScientificName"
                   onChange={(e) => props.setCropScientificName(e.target.value)}
            />
            <input type="text"
                   placeholder="cropImage"
                   onChange={(e) => props.setCropImage(e.target.value)}
            />
            <input type="text"
                   placeholder="category"
                   onChange={(e) => props.setCropScientificName(e.target.value)}
            />
            <input type="text"
                   placeholder="cropSeason"
                   onChange={(e) => props.setCropImage(e.target.value)}
            />
            <input type="text"
                   placeholder="fieldCode"
                   onChange={(e) => props.setCropImage(e.target.value)}
            />


        </>
    );
};