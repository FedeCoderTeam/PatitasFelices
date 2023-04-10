import React from 'react';

export const metadata = {
    title: 'About'
}

export default function AboutLayout({children}: {children: React.ReactNode}) {
    return(<>
        {children}
    </>)
}