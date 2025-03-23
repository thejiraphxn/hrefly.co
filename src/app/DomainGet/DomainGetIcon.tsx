import React from 'react';

const DomainGetIcon = ({ domain }:any) => {
    const faviconUrl = `https://www.google.com/s2/favicons?sz=64&domain=${domain}`;
    
    return <img src={faviconUrl} className='rounded-full border' alt={`${domain} icon`} width="50" height="50" />;
};


export default DomainGetIcon