import React from 'react'
import { Badge, Box, Text } from '@chakra-ui/layout';
import { Image } from '@chakra-ui/image';
import ExpertInfo from './ExpertInfo';
import NoImg from '../assets/no-img.jpg'

const ContentCardItem = ({ content }) => {

    const { image, categories, experts } = content
    let newcategories = categories.map(item => item.name)
    let newExperts = experts.map(item => item.firstName + " " + item.lastName)
    let newTitles = experts.map(item => item.title)
    let newCompies = experts.map(item => item.company)
    return (
        <>
            <Box borderRadius="lg" overflow="hidden" bgColor="#fff" mb={4} border={0} maxWidth={276}>
                <Image src={image.uri} alt={'content-img'} fallbackSrc={NoImg} />

                <Box px="4" py="3">
                    <Box display="flex" alignItems="baseline">
                        <Text fontSize="12px" fontWeight="bold" color="#FF8615" lineHeight="15px">{newcategories.join(', ')}</Text>
                    </Box>

                    <Box
                        my="2"
                        fontWeight="bold"
                        lineHeight="22px"
                        fontSize="18px"
                        isTruncated={false}
                    >
                        {content.name}
                    </Box>
                    {experts.map(item =>
                        <ExpertInfo expert={item} />
                    )}

                </Box>
            </Box>
        </>
    )
}


export default ContentCardItem