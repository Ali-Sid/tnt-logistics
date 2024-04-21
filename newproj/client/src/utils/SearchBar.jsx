import { SearchIcon } from '@chakra-ui/icons'
import { InputGroup, Input, InputRightElement, border } from '@chakra-ui/react'
import React from 'react'

function SearchBar() {
    return (
        <div>
            {/* <InputGroup sx={{ border: "1px solid #a8a7a7", borderRadius: "25px", padding: "5px" }}>
                    <Input
                        placeholder="Search..."
                        type="text"
                    // Add any other props you need, such as onChange for handling search input
                    />
                    <InputRightElement>
                        <SearchIcon />
                    </InputRightElement>
            </InputGroup> */}
            <InputGroup sx={{border: "1px solid #a8a7a7", borderRadius: "2px", padding: "4px",}}>
                <Input
                    type="text"
                    placeholder="Search..."
                    onChange={(e) => onSearch(e.target.value)}
                />
                <InputRightElement
                    pointerEvents="none"
                    marginTop="7px"
                    paddingRight="4px"
                    children={<SearchIcon color="red.600" />}
                />
            </InputGroup>
        </div>
    )
}

export default SearchBar