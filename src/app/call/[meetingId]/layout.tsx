import React from 'react'

type Props = {
    children: React.ReactNode
}

function layout({ children }: Props) {
    return (
        <div className='h-screen bg-black'>
            {children}
        </div>
    )
}

export default layout