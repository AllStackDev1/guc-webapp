import React from 'react'
import PropTypes from 'prop-types'
import {
  Box,
  Text,
  Flex,
  Grid,
  Icon,
  Button,
  Divider,
  ListItem,
  GridItem,
  Accordion,
  OrderedList,
  AccordionItem,
  AccordionIcon,
  AccordionPanel,
  AccordionButton,
  Checkbox
} from '@chakra-ui/react'

import { getformattedDate } from 'utils/mics'
import { FaFile } from 'react-icons/fa'

const CustomAccordion = ({ details, handlePreview }) => {
  return (
    <Accordion defaultIndex={[0]} allowMultiple>
      {details.map(e => (
        <AccordionItem key={e.id} border={0} px={0}>
          <h2>
            <AccordionButton
              px={0}
              _hover={{ bg: 'inherit' }}
              _focus={{ outline: 'none' }}
            >
              <Flex w='full' align='center' justify='space-between'>
                <Text
                  color='gcu.100'
                  fontWeight={600}
                  fontSize='sm'
                  textAlign='left'
                  mr={4}
                >
                  {e.title}
                </Text>
                <Divider
                  flex='1'
                  borderColor='gray.400'
                  orientation='horizontal'
                />
                <AccordionIcon ml={2} />
              </Flex>
            </AccordionButton>
          </h2>
          <AccordionPanel px={0} pb={4}>
            {e.layout === 'list' && (
              <OrderedList spacing={5}>
                {e.data.map(_e => (
                  <ListItem key={_e.id}>
                    <Text fontSize='xs'>{_e.title}</Text>
                    <Flex align='center' justify='space-between'>
                      {_e.checkboxes ? (
                        <Flex
                          w={{ lg: '100%' }}
                          flexWrap={{ lg: 'wrap' }}
                          justify='space-between'
                        >
                          {_e.checkboxes.map(ee => (
                            <Checkbox
                              key={ee}
                              name={ee}
                              isDisabled
                              defaultChecked={_e.value[ee]}
                              colorScheme='gcuButton'
                              textTransform='capitalize'
                            >
                              <Text fontSize={{ base: 'xs', lg: 'sm' }}>
                                {ee}
                              </Text>
                            </Checkbox>
                          ))}
                        </Flex>
                      ) : (
                        <>
                          <Text flex={2} fontSize='sm'>
                            Ans: {_e.value}
                          </Text>
                          {_e.immuneFile && (
                            <Flex
                              flex={2}
                              mt={2}
                              align='center'
                              justify='flex-start'
                            >
                              <Icon as={FaFile} boxSize={8} />
                              <Box ml={2} />
                              <Button
                                p={0}
                                bg='unset'
                                type='button'
                                color='gcu.100'
                                _hover={{ bg: 'unset' }}
                                fontSize={{ base: 'xs', lg: 'sm' }}
                                onClick={_ => handlePreview(_e.immuneFile)}
                              >
                                View immunisation
                              </Button>
                            </Flex>
                          )}
                        </>
                      )}
                    </Flex>
                  </ListItem>
                ))}
              </OrderedList>
            )}
            {e.layout === 'grid' && (
              <Grid templateColumns='repeat(2, 1fr)' gap={{ base: 3, lg: 6 }}>
                {e?.data?.map(_e => (
                  <GridItem key={_e.id}>
                    <Text fontSize='xs'>{_e.title}</Text>
                    {!_e.file ? (
                      <Text fontSize='sm'>
                        {_e.isDate ? getformattedDate(_e.value) : _e.value}
                      </Text>
                    ) : (
                      <Flex mt={2} align='center'>
                        <Icon as={FaFile} boxSize={8} />
                        <Box ml={2} />
                        <Button
                          p={0}
                          bg='unset'
                          type='button'
                          color='gcu.100'
                          _hover={{ bg: 'unset' }}
                          fontSize={{ base: 'xs', lg: 'sm' }}
                          onClick={_ => {
                            return handlePreview(_e.value)
                          }}
                        >
                          View
                        </Button>
                      </Flex>
                    )}
                  </GridItem>
                ))}
              </Grid>
            )}
            {e.layout === 'grid-gray-bg' && (
              <>
                {e?.data?.map(_e => (
                  <Grid
                    p={6}
                    mt={5}
                    key={_e._id}
                    bg='#FBFBFB'
                    rounded='md'
                    border='1px solid #F2F2F2'
                    mb={{ base: 5 }}
                    gap={{ base: 3, lg: 6 }}
                    templateColumns={`repeat(${
                      e?.keys.length > 3 ? 2 : 3
                    }, 1fr)`}
                  >
                    {e?.keys?.map(k => (
                      <GridItem key={k.id}>
                        <Text fontSize='xs'>{k.title}</Text>
                        <Text fontSize='sm'>
                          {k.isDate ? getformattedDate(_e[k.id]) : _e[k.id]}
                        </Text>
                      </GridItem>
                    ))}
                  </Grid>
                ))}
              </>
            )}
          </AccordionPanel>
        </AccordionItem>
      ))}
    </Accordion>
  )
}

CustomAccordion.propTypes = {
  details: PropTypes.array.isRequired,
  handlePreview: PropTypes.func
}

export default CustomAccordion
