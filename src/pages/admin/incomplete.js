/* eslint-disable react/prop-types */
import React, { useState, useRef } from 'react'
import PropTypes from 'prop-types'
import {
  Box,
  Tag,
  Text,
  Icon,
  Flex,
  Switch,
  Heading,
  useToast,
  Checkbox,
  IconButton,
  useDisclosure
} from '@chakra-ui/react'

import Layout from 'container/Layout'
import DropdownActions from 'components/DropdownActions'
import { ArrowLeftIcon, DashboardIcon, TrashIcon } from 'theme/Icons'
import ActionButton from 'components/ActionButton'
import CustomTable from 'components/CustomTable'
import FetchCard from 'components/FetchCard'
import Overlay from 'components/Loading/Overlay'
import PreviewModal from 'components/PreviewModal'
import Search from 'components/CustomTable/Search'

import { FiTrash2, FiFileText } from 'react-icons/fi'
import UserDetailModal from 'components/UserDetailModal'

import useApi from 'context/api'
import useFetch from 'hooks/useFetch'

import { getformattedDate } from 'utils/mics'

const Dashboard = ({ history }) => {
  document.title = 'Dashboard | The GCU Application Portal'
  const [selectItem, setSelectItem] = useState(null)
  const [checkedItems, setCheckedItems] = useState(null)
  const [filterKey, setFilterKey] = useState('')
  const [isLoading, setLoading] = useState(false)
  const [reload, setReload] = useState(0)
  const [file, setFile] = useState(undefined)
  const [initialTableData, setInitialTableData] = useState([])
  const [tableData, setTableData] = useState([])

  const btnRef = useRef()

  const { isOpen, onOpen, onClose } = useDisclosure()
  const {
    updateApplicant,
    getApplicants,
    deleteApplicant,
    deleteApplicants
  } = useApi()

  const toast = useToast()

  const triggerReload = () => setReload(prevState => prevState + 1)

  const { data, error, isLoading: fetchLoading } = useFetch(
    null,
    getApplicants,
    reload,
    { completed: false }
  )

  const allChecked = checkedItems?.every(e => e?.checked === true)
  const isIndeterminate =
    checkedItems?.some(e => e.checked === true) && !allChecked

  const handleDelete = async id => {
    try {
      setLoading(true)
      const res = await deleteApplicant(id)
      window.sessionStorage.removeItem('applicants')
      toast({
        duration: 5000,
        isClosable: true,
        status: 'success',
        position: 'top-right',
        title: 'Success',
        description: res.message
      })
      triggerReload()
    } catch (error) {
      let eMgs
      if (error?.data?.message === 'celebrate request validation failed') {
        eMgs = 'Invalid data, please check form.'
      } else {
        eMgs =
          error?.message || error?.data?.message || 'Unexpected network error.'
      }
      toast({
        duration: 9000,
        status: 'error',
        isClosable: true,
        position: 'top-right',
        title: 'Error',
        description: eMgs
      })
    } finally {
      setLoading(false)
    }
  }

  const handleBulkDelete = async () => {
    try {
      setLoading(true)
      const data = selectedItems.map(e => ({ _id: e._id }))
      const res = await deleteApplicants(data)
      window.sessionStorage.removeItem('applicants')
      toast({
        duration: 5000,
        isClosable: true,
        status: 'success',
        position: 'top-right',
        title: 'Success',
        description: res.message
      })
      triggerReload()
    } catch (error) {
      let eMgs
      if (error?.data?.message === 'celebrate request validation failed') {
        eMgs = 'Invalid data, please check form.'
      } else {
        eMgs =
          error?.message || error?.data?.message || 'Unexpected network error.'
      }
      toast({
        duration: 9000,
        status: 'error',
        isClosable: true,
        position: 'top-right',
        title: 'Error',
        description: eMgs
      })
    } finally {
      setLoading(false)
    }
  }

  const handleStatusUpdate = async e => {
    try {
      setLoading(true)
      const res = await updateApplicant(e.target.id, {
        stage: e.target.checked ? 6 : 5,
        status: e.target.checked ? 'PAID' : 'PENDING'
      })
      window.sessionStorage.removeItem('applicants')
      toast({
        duration: 5000,
        isClosable: true,
        status: 'success',
        position: 'top-right',
        title: 'Success',
        description: res.message
      })
      triggerReload()
    } catch (error) {
      let eMgs
      if (error?.data?.message === 'celebrate request validation failed') {
        eMgs = 'Invalid data, please check form.'
      } else {
        eMgs =
          error?.message || error?.data?.message || 'Unexpected network error.'
      }
      toast({
        duration: 9000,
        status: 'error',
        isClosable: true,
        position: 'top-right',
        title: 'Error',
        description: eMgs
      })
    } finally {
      setLoading(false)
    }
  }

  const handlePreview = file => {
    setFile(file)
    onOpen()
  }

  const handleSearch = event => {
    let value = event.target.value ? event.target.value : ''
    value = value.trim().toLowerCase()
    let filtered = []
    if (value) {
      filtered = initialTableData.filter(item => {
        const columnData = item[filterKey]?.toLowerCase()
        return !!columnData?.match(new RegExp(value, 'i'))
      })
    } else {
      filtered = JSON.parse(JSON.stringify(initialTableData))
    }
    setTableData(filtered)
  }

  const actions = [
    {
      name: 'View Application',
      icon: FiFileText,
      action: e => {
        setSelectItem(e.id)
        onOpen()
      }
    },
    {
      name: 'Delete',
      icon: FiTrash2,
      action: e => handleDelete(e.id)
    }
  ]

  const selectedItems = checkedItems?.filter(e => e.checked === true)

  const _columns = [
    {
      Header: ({ data }) => (
        <Flex w='100%' justify='center'>
          <Checkbox
            colorScheme='gcuButton'
            isChecked={allChecked}
            isIndeterminate={isIndeterminate}
            onChange={event => {
              const checked = data.map(e => ({
                _id: e._id,
                checked: event.target.checked
              }))
              setCheckedItems(checked)
            }}
          />
        </Flex>
      ),
      accessor: '_id',
      Cell: ({ row }) => (
        <Flex w='100%' justify='center'>
          <Checkbox
            colorScheme='gcuButton'
            isChecked={
              checkedItems?.find(e => e._id === row.original._id)?.checked ||
              false
            }
            id={row.original._id}
            onChange={event => {
              let newCheckItems = []
              if (checkedItems) {
                newCheckItems = checkedItems.filter(
                  e => e._id !== row.original._id
                )
              }
              setCheckedItems([
                ...newCheckItems,
                { _id: row.original._id, checked: event.target.checked }
              ])
            }}
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
      Header: 'Status',
      accessor: 'status',
      Cell: ({ row }) => {
        const state = row.original?.status === 'PAID'
        return (
          <Flex flexDir='column' align='center' justify='center'>
            <Tag
              bgColor={state ? 'green.300' : ''}
              color={state ? 'white' : 'gray.300'}
            >
              {row.original?.status}
            </Tag>
            <Box h={1} />
            <Switch
              size='sm'
              colorScheme='gcuButton'
              id={row.original._id}
              onChange={handleStatusUpdate}
              isChecked={state}
            />
          </Flex>
        )
      }
    },
    {
      Header: 'Date Registered',
      accessor: 'createdAt',
      Cell: ({ row }) => getformattedDate(row.original?.createdAt)
    },
    {
      Header: '',
      accessor: 'action',
      Cell: ({ row }) => (
        <DropdownActions data={{ id: row.original?._id }} options={actions} />
      )
    }
  ]

  const filterOpts = [
    { name: 'Application Code', value: 'code' },
    { name: 'Phone Number', value: 'phoneNumber' },
    { name: 'Email', value: 'email' },
    { name: 'First Name', value: 'firstName' },
    { name: 'Last Name', value: 'lastName' }
  ]

  React.useEffect(() => {
    if (data?.length) {
      const checked = data.map(e => ({
        _id: e._id,
        checked: false
      }))
      setCheckedItems(checked)
      setInitialTableData(data || [])
      setTableData(data || [])
    }
  }, [data])

  return (
    <Layout bg='#E5E5E5' px={20} py={10}>
      {isLoading && <Overlay text='Adding to download list' />}
      {selectItem && (
        <UserDetailModal
          id={selectItem}
          isOpen={isOpen}
          onClose={onClose}
          finalFocusRef={btnRef}
          handlePreview={handlePreview}
          setSelectItem={setSelectItem}
          handleAddToList={() => {}}
        />
      )}
      {file && (
        <PreviewModal
          src={file}
          isOpen={isOpen}
          onClose={() => {
            setFile(undefined)
          }}
        />
      )}
      <Flex w='100%' justify='space-between'>
        <Flex align='center'>
          <IconButton
            as={ArrowLeftIcon}
            boxSize={8}
            bg='unset'
            _hover={{
              bg: 'unset'
            }}
            _focus={{
              bg: 'unset'
            }}
            cursor='pointer'
            onClick={() => history.push('/admin/dashboard')}
          />
          <Box mr={14} />
          <Icon as={DashboardIcon} boxSize={49} />
          <Box ml={4}>
            <Heading fontSize='2xl'>Incomplete Applications.</Heading>
            <Text fontWeight={300} fontSize='sm'>
              List of incomplete applications
            </Text>
          </Box>
        </Flex>
        <Flex>
          <ActionButton
            bg='#F2F2F2'
            fontSize='sm'
            fontWeight={300}
            title='Bulk Delete'
            rightIcon={<TrashIcon />}
            isDisabled={!selectedItems?.length}
            onClick={handleBulkDelete}
          />
          <Box mx={2} />
          <ActionButton
            bg='#F2F2F2'
            fontSize='sm'
            fontWeight={300}
            title='View Download List'
            onClick={() => history.push('/admin/download-lists')}
          />
        </Flex>
      </Flex>
      <Search
        {...{
          mb: 3,
          mt: 10,
          filterKey,
          options: filterOpts,
          handleSearch,
          handleSelect: e => setFilterKey(e.target.value)
        }}
      />
      <Box w='100%' bg='white' rounded='md'>
        {fetchLoading || error ? (
          <FetchCard
            h='60vh'
            align='center'
            justify='center'
            direction='column'
            error={error}
            loading={fetchLoading}
            reload={triggerReload}
            text='Loading'
          />
        ) : (
          <>
            <CustomTable
              variant='simple'
              _columns={_columns}
              _data={tableData}
            />
            {!!selectedItems?.length && (
              <Flex w='full' justify='center' py={4}>
                <Box px={6} py={4} bg='gcu.100' rounded='full'>
                  <Text color='white' fontWeight={600} fontSize='md'>
                    {selectedItems.length} Applicant selected
                  </Text>
                </Box>
              </Flex>
            )}
          </>
        )}
      </Box>
    </Layout>
  )
}

Dashboard.propTypes = {
  history: PropTypes.any.isRequired
}

export default Dashboard
