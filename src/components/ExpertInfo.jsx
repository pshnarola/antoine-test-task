import { Box, Text } from '@chakra-ui/layout'
import React from 'react'

const ExpertInfo = ({ expert }) => {
    return (
        <>
            <Box mt={2}>
                <Text fontSize="14px" color="#333333" fontWeight="semibold" lineHeight="17px">{expert.firstName + " " + expert.lastName}</Text>
                <Text fontSize="14px" color="#333333" fontWeight="semibold" lineHeight="17px" isTruncated>{expert.title}</Text>
                <Text fontSize="14px" color="#FF8615" fontWeight="semibold" lineHeight="17px">{expert.company}</Text>
            </Box>
        </>
    )
}

export default ExpertInfo