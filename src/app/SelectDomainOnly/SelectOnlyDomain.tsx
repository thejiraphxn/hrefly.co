
import React from 'react'

const SelectOnlyDomain = (url:any) => {
    try {
        return new URL(url).hostname;
    } catch (error) {
    return ""; // Invalid URL handling
    }
}

export default SelectOnlyDomain