/* eslint-disable no-unused-vars */
import React from 'react'
import { Avatar, Badge, Box, Flex, Icon, Link, Text } from '@chakra-ui/react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu } from '@headlessui/react'
import { FiChevronDown, FiChevronUp, FiUser } from 'react-icons/fi'
import { HiOutlineLogout } from 'react-icons/hi'
import { BsBell } from 'react-icons/bs'
import { Link as ReachRouter } from 'react-router-dom'

import Logo1 from 'assets/images/logo@1x.svg'
import Logo2 from 'assets/images/logo@2x.svg'

import useAuth from 'context/auth'

const menuLinks = [
  { name: 'Profile', icon: FiUser, link: '/profile' },
  { name: 'Logout', icon: HiOutlineLogout, link: '/logout' }
]

const MotionBox = motion(Box)

const Navbar = () => {
  const [count, setCount] = React.useState(0)
  const { isAuthenticated } = useAuth()
  const { user } = isAuthenticated()

  const countLen = ('' + count).length

  return (
    <Flex
      top={0}
      w='100%'
      as='header'
      pos='fixed'
      zIndex={100}
      color='white'
      align='center'
      bgColor='#1E1F20'
      gridArea='header'
      justify='space-between'
      px={{ base: 4, md: 36 }}
      h={{ base: 14, md: 20 }}
      overflowX={{ base: 'hidden', md: 'visible' }}
    >
      <Link as={ReachRouter} to='/dashboard' _hover={{ textDecor: 'none' }}>
        <Box
          bgImage={{
            base: `url('${Logo1}')`,
            lg: `url('${Logo2}')`
          }}
          bgSize='cover'
          bgPos='center'
          bgRepeat='no-repeat'
          w={{ base: '3.125rem', lg: '2.625rem' }}
          h={{ base: '3.063rem', lg: '2.5rem' }}
        />
      </Link>

      <Flex align='center'>
        <Flex align='center' mr={{ base: 4, md: 10 }}>
          <Box
            as='button'
            role='button'
            pos='relative'
            aria-label='Notification'
          >
            <Badge
              py={0}
              d='flex'
              fontSize='xs'
              pos='absolute'
              rounded='full'
              variant='solid'
              colorScheme='red'
              alignItems='center'
              justifyContent='center'
              px={countLen > 1 ? 1 : 0}
              top={countLen > 1 ? -1 : 0}
              minW={countLen > 1 ? 5 : 3}
              minH={countLen > 1 ? 5 : 3}
              left={countLen > 1 ? 2 : 2}
            >
              {count ? count : ''}
            </Badge>
            <Icon as={BsBell} boxSize={5} />
          </Box>
        </Flex>

        <Menu as={Box} ml={2} userSelect='none'>
          {({ open }) => (
            <>
              <Menu.Button
                as={Box}
                _focus={{ outline: 'none' }}
                cursor='pointer'
              >
                <Flex align='center'>
                  <Avatar size='md' src={user?.avatar} name={user?.firstName} />
                  <Text ml={2}>Hi {user?.firstName}</Text>
                  <Box>
                    <Icon
                      ml={2}
                      as={open ? FiChevronUp : FiChevronDown}
                      boxSize={6}
                    />
                  </Box>
                </Flex>
              </Menu.Button>
              <AnimatePresence>
                {open && (
                  <Menu.Items
                    static
                    as={MotionBox}
                    initial={{ opacity: 0, y: -50 }}
                    animate={{
                      opacity: 1,
                      y: 0,
                      transition: { duration: 0.3 }
                    }}
                    exit={{ opacity: 0, y: 50 }}
                    pos={{ base: 'fixed', md: 'absolute' }}
                    w={56}
                    mt={3}
                    bg='white'
                    rounded='sm'
                    borderWidth={1}
                    color='gray.600'
                    right={{ base: 5, md: 20 }}
                    _focus={{ outline: 'none' }}
                    borderColor='gray.100'
                  >
                    <AnimatePresence>
                      {menuLinks.map((item, i) => (
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
                          {({ active }) => (
                            <Link
                              py={2}
                              px={6}
                              _hover={{
                                textDecor: 'none'
                              }}
                              bg={active && 'cf.400'}
                              color={active && 'white'}
                              d='block'
                              href={item.link}
                            >
                              <Icon as={item.icon} boxSize={4} mr={2} />{' '}
                              {item.name}
                            </Link>
                          )}
                        </Menu.Item>
                      ))}
                    </AnimatePresence>
                  </Menu.Items>
                )}
              </AnimatePresence>
            </>
          )}
        </Menu>
      </Flex>
    </Flex>
  )
}

export default Navbar
