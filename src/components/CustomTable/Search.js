import React from 'react'
import PropTypes from 'prop-types'
import {
  Box,
  Icon,
  Flex,
  Input,
  Select,
  InputGroup,
  InputLeftElement
} from '@chakra-ui/react'
import { FiSearch } from 'react-icons/fi'

const Search = ({
  filterKey,
  options,
  handleInputSearch,
  handleSelectSearch,
  ...rest
}) => {
  return (
    <Flex {...rest} w={{ lg: '30%' }} align='center'>
      <Select
        mr={2}
        w={{ md: 60 }}
        bgColor='white'
        color='cf.400'
        value={filterKey}
        _focus={{ borderColor: 'cf.400' }}
        onChange={handleSelectSearch}
      >
        {options.map(o => (
          <Box
            as='option'
            key={o.name}
            value={o.selector}
            _focus={{ bg: 'gcu.100' }}
          >
            {o.name}
          </Box>
        ))}
      </Select>
      <InputGroup bgColor='white' rounded='md'>
        <InputLeftElement>
          <Icon as={FiSearch} color='gcu.100' boxSize={6} />
        </InputLeftElement>
        <Input
          name='searchBox'
          color='gcu.100'
          type='search'
          placeholder='Search'
          onChange={handleInputSearch}
        />
      </InputGroup>
    </Flex>
  )
}

Search.propTypes = {
  options: PropTypes.any.isRequired,
  filterKey: PropTypes.any.isRequired,
  handleInputSearch: PropTypes.any.isRequired,
  handleSelectSearch: PropTypes.any.isRequired
}

export default Search
