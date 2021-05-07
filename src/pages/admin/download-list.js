/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react'
import PropTypes from 'prop-types'
import {
  Box,
  Text,
  Icon,
  Flex,
  Heading,
  Checkbox,
  useToast,
  useDisclosure,
  IconButton
} from '@chakra-ui/react'
import { FiTrash2, FiFileText } from 'react-icons/fi'

import Layout from 'container/Layout'
import { ArrowLeftIcon, DashboardIcon, TrashIcon } from 'theme/Icons'
import ActionButton from 'components/ActionButton'
import CustomTable from 'components/CustomTable'
import DropdownActions from 'components/DropdownActions'

import useApi from 'context/api'
import useFetch from 'hooks/useFetch'
import FetchCard from 'components/FetchCard'
import UserDetailModal from 'components/UserDetailModal'
import Overlay from 'components/Loading/Overlay'
import PreviewModal from 'components/PreviewModal'

import { getformattedDate } from 'utils/mics'

const DownloadList = ({ history }) => {
  document.title = 'Dashboard | The GCU Application Portal'
  const [selectItem, setSelectItem] = React.useState(null)
  const [isLoading, setLoading] = React.useState(false)
  const [checkedItems, setCheckedItems] = React.useState(null)
  const [file, setFile] = React.useState(undefined)
  const [reload, setReload] = React.useState(0)

  const btnRef = React.useRef()

  const { isOpen, onOpen, onClose } = useDisclosure()
  const {
    getDownloadLists,
    deleteDownloadLists,
    clearDownloadLists,
    deleteDownloadList
  } = useApi()

  const toast = useToast()

  const triggerReload = () => setReload(prevState => prevState + 1)

  const { data, error, isLoading: fetchLoading } = useFetch(
    null,
    getDownloadLists,
    reload
  )

  const allChecked = checkedItems?.every(e => e?.checked === true)
  const isIndeterminate =
    checkedItems?.some(e => e.checked === true) && !allChecked

  const handlePreview = file => {
    setFile(file)
    setSelectItem(null)
    onOpen()
  }

  const handleClear = async () => {
    try {
      setLoading(true)
      const res = await clearDownloadLists()
      window.sessionStorage.removeItem('download-lists')
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
      const res = await deleteDownloadLists(data)
      window.sessionStorage.removeItem('download-lists')
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

  const handleDelete = async id => {
    try {
      setLoading(true)
      const res = await deleteDownloadList(id)
      window.sessionStorage.removeItem('download-lists')
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

  const actions = [
    {
      name: 'View Application',
      icon: FiFileText,
      action: e => {
        setSelectItem(e.applicant)
        onOpen()
      }
    },
    { name: 'Delete', icon: FiTrash2, action: e => handleDelete(e.id) }
  ]

  const selectedItems = checkedItems?.filter(e => e.checked === true)

  React.useEffect(() => {
    if (data?.length) {
      const checked = data.map(e => ({
        _id: e._id,
        checked: false
      }))
      setCheckedItems(checked)
    }
  }, [data])

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
      Header: 'Date Registered',
      accessor: 'createdAt',
      Cell: ({ row }) => getformattedDate(row.original?.createdAt)
    },
    {
      Header: '',
      accessor: 'action',
      Cell: ({ row }) => (
        <DropdownActions
          data={{ id: row.original?._id, applicant: row.original?.applicant }}
          options={actions}
        />
      )
    }
  ]

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
        />
      )}
      {file && (
        <PreviewModal
          src={file}
          isOpen={isOpen}
          onClose={() => {
            setFile(undefined)
            onClose()
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
            <Heading fontSize='2xl'>CSV Download List</Heading>
            <Text fontWeight={300} fontSize='sm'>
              CSV download list
            </Text>
          </Box>
        </Flex>
        <Flex>
          <ActionButton
            bg='#F2F2F2'
            fontSize='sm'
            fontWeight={300}
            title='Clear List'
            rightIcon={<TrashIcon />}
            isDisabled={!data?.length}
            onClick={handleClear}
          />
          <Box mx={2} />
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
            isDisabled={!selectedItems?.length}
            title='Export as CSV'
          />
        </Flex>
      </Flex>
      <Box w='100%' mt={10} bg='white' rounded='md'>
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
            <CustomTable variant='simple' _columns={_columns} _data={data} />
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

DownloadList.propTypes = {
  history: PropTypes.any.isRequired
}

export default DownloadList
