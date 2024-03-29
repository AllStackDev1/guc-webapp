import React from 'react'
import PropTypes from 'prop-types'
import { Box, Flex, Icon, Link, Text } from '@chakra-ui/react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu } from '@headlessui/react'
import { FiChevronDown, FiChevronUp } from 'react-icons/fi'

const MotionBox = motion(Box)

const DropdownActions = ({ data, options }) => {
  return (
    <Menu as={Box} ml={2} userSelect='none' pos='relative'>
      {({ open }) => (
        <div>
          <Menu.Button
            h={10}
            as={Flex}
            rounded='md'
            bg='#F2F2F2'
            w='6.25rem'
            align='center'
            cursor='pointer'
            justify='center'
            _focus={{ outline: 'none' }}
          >
            <Text fontWeight={500} letterSpacing='0.0115em' fontSize='xs'>
              Actions
            </Text>
            <Icon ml={2} as={open ? FiChevronUp : FiChevronDown} boxSize={3} />
          </Menu.Button>
          <AnimatePresence>
            {open && (
              <Menu.Items
                static
                w={56}
                mt={3}
                bg='white'
                rounded='sm'
                pos='absolute'
                as={MotionBox}
                borderWidth={1}
                color='gray.600'
                right={5}
                zIndex={1}
                borderColor='gray.100'
                shadow='lg'
                _focus={{ outline: 'none' }}
                exit={{ opacity: 0, y: 50 }}
                initial={{ opacity: 0, y: -50 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.3 }
                }}
              >
                <AnimatePresence>
                  {options.map((item, i) => (
                    <Menu.Item
                      key={item.name}
                      as={MotionBox}
                      custom={i}
                      variants={{
                        hidden: i => ({
                          y: -50 * i,
                          opacity: 0
                        }),
                        visible: i => ({
                          y: 0,
                          opacity: 1,
                          transition: {
                            delay: i * 0.025
                          }
                        }),
                        removed: {
                          y: 30 * i
                        }
                      }}
                      initial='hidden'
                      animate='visible'
                      exit='removed'
                    >
                      <Link
                        py={2}
                        px={6}
                        d='block'
                        _hover={{
                          textDecor: 'none',
                          color: 'white',
                          bg: 'gcu.100'
                        }}
                        href={item.link || '#'}
                        onClick={e => {
                          if (item.action) {
                            e.preventDefault()
                            item.action(data)
                          }
                        }}
                      >
                        {item.icon && (
                          <Icon as={item.icon} boxSize={4} mr={2} />
                        )}{' '}
                        {item.name}
                      </Link>
                    </Menu.Item>
                  ))}
                </AnimatePresence>
              </Menu.Items>
            )}
          </AnimatePresence>
        </div>
      )}
    </Menu>
  )
}

DropdownActions.propTypes = {
  data: PropTypes.any.isRequired,
  options: PropTypes.any.isRequired
}

export default DropdownActions
