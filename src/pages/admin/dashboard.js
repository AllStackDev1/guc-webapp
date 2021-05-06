/* eslint-disable react/prop-types */
import React from 'react'
import { Box, Text, Icon, Flex, Heading, Checkbox } from '@chakra-ui/react'

import Layout from 'container/Layout'
import { DashboardIcon, TrashIcon } from 'theme/Icons'
import ActionButton from 'components/ActionButton'
import CustomTable from 'components/CustomTable'
import DropdownActions from 'components/DropdownActions'

import { FiTrash2, FiUser, FiUpload, FiNavigation } from 'react-icons/fi'

const Dashboard = () => {
  document.title = 'Dashboard | The GCU Application Portal'

  // const [selectedRows, setselectedRows] = React.useState([])
  const [checkedItems, setCheckedItems] = React.useState([false, false])

  const allChecked = checkedItems.every(Boolean)
  const isIndeterminate = checkedItems.some(Boolean) && !allChecked

  const actions = [
    { name: 'View Applicant', icon: FiUser, action: () => {} },
    { name: 'Upload Test Result', icon: FiUpload, action: () => {} },
    { name: 'View Test Result', icon: FiNavigation, action: () => {} },
    { name: 'Delete', icon: FiTrash2, action: () => {} }
  ]

  const _columns = [
    {
      Header: () => (
        <Checkbox
          colorScheme='gcuButton'
          isChecked={allChecked}
          isIndeterminate={isIndeterminate}
          onChange={e => setCheckedItems([e.target.checked, e.target.checked])}
        />
      ),
      accessor: '_id',
      Cell: ({ row }) => (
        <Flex w='100%' justify='center'>
          <Checkbox
            colorScheme='gcuButton'
            id={row.original?._id}
            onChange={e => setCheckedItems([checkedItems[0], e.target.checked])}
          />
        </Flex>
      )
    },
    {
      Header: 'Full Name',
      id: 'fullName',
      accessor: row => row.firstName + ' ' + row.lastName
    },
    {
      Header: 'Email address',
      accessor: 'email'
    },
    {
      Header: 'Phone Number',
      accessor: 'phoneNumber'
    },
    {
      Header: 'Application Code',
      accessor: 'code'
    },
    {
      Header: 'Date Registered',
      accessor: 'createdAt'
    },
    {
      Header: '',
      accessor: 'action',
      Cell: ({ row }) => (
        <DropdownActions id={row.original?._id} options={actions} />
      )
    }
  ]

  const _data = [
    {
      _id: 1,
      firstName: 'World',
      lastName: 'World',
      email: 'World',
      phoneNumber: 'World',
      code: 'World',
      createdAt: 'World'
    }
  ]

  return (
    <Layout bg='#E5E5E5' px={20} py={10}>
      <Flex w='100%' justify='space-between'>
        <Flex>
          <Icon as={DashboardIcon} boxSize={49} />
          <Box ml={4}>
            <Heading fontSize='2xl'>Application List</Heading>
            <Text fontWeight={300} fontSize='sm'>
              List of all applicants
            </Text>
          </Box>
        </Flex>
        <Flex>
          <ActionButton
            bg='#F2F2F2'
            fontWeight={300}
            fontSize='sm'
            title='Bulk Delete'
            rightIcon={<TrashIcon />}
          />
          <Box mx={2} />
          <ActionButton
            bg='#F2F2F2'
            fontWeight={300}
            fontSize='sm'
            title='Add to CSV Download List'
          />
          <Box mx={2} />
          <ActionButton
            bg='#F2F2F2'
            fontWeight={300}
            fontSize='sm'
            title='View Download List'
          />
        </Flex>
      </Flex>
      <Box w='100%' mt={10} bg='white' rounded='md'>
        <CustomTable variant='simple' _columns={_columns} _data={_data} />
      </Box>
    </Layout>
  )
}

export default Dashboard
