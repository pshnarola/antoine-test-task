import { FormControl, FormLabel } from '@chakra-ui/form-control'
import { Input } from '@chakra-ui/input'
import { Box } from '@chakra-ui/layout'
import React from 'react'

const Search = ({ handleChangeSearch }) => {
    return (
        <Box maxWidth={276} mb={4} width={"100%"} is>
            <FormControl id="search">
                <FormLabel color="#fff">Search</FormLabel>
                <Input placeholder="Type any keyword" size="md" id="search" bgColor="#003238" color="#989898" onChange={(e) => handleChangeSearch(e.target.value)} />
            </FormControl>
        </Box>
    )
}

export default Search
