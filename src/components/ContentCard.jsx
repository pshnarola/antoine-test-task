import React from 'react'
import ContentCardItem from './ContentCardItem'



const ContentCard = ({ contents = [] }) => {
    return (
        <>
            {contents.map((content, index) => <ContentCardItem key={index} content={content} />)}
        </>
    )
}

export default ContentCard