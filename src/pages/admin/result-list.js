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
  useToast,
  useDisclosure,
  IconButton
} from '@chakra-ui/react'
import { FiEye } from 'react-icons/fi'

import Layout from 'container/Layout'
import { ArrowLeftIcon, DashboardIcon } from 'theme/Icons'
import ActionButton from 'components/ActionButton'
import CustomTable from 'components/CustomTable'
import Search from 'components/CustomTable/Search'

import useApi from 'context/api'
import useFetch from 'hooks/useFetch'
import FetchCard from 'components/FetchCard'
import UserDetailModal from 'components/UserDetailModal'
import PreviewModal from 'components/PreviewModal'

import { getformattedDate } from 'utils/mics'

const ResultList = ({ history }) => {
  document.title = 'Result List | The GCU Application Portal'
  const [selectItem, setSelectItem] = React.useState(null)
  const [checkedItems, setCheckedItems] = React.useState(null)
  const [filterKey, setFilterKey] = React.useState('')
  const [file, setFile] = React.useState(undefined)
  const [reload, setReload] = React.useState(0)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const btnRef = React.useRef()
  const { getApplicantsWithResult } = useApi()
  const [initialTableData, setInitialTableData] = React.useState([])
  const [tableData, setTableData] = React.useState([])

  const toast = useToast()

  const triggerReload = () => setReload(prevState => prevState + 1)

  const { data, error, isLoading: fetchLoading } = useFetch(
    null,
    getApplicantsWithResult,
    reload
    // { completed: true, stage: 14 }
  )

  const handlePreview = file => {
    setFile(file)
    setSelectItem(null)
    onOpen()
  }

  const selectedItems = checkedItems?.filter(e => e.checked === true)

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

  const _columns = [
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
        <ActionButton
          bg='#F2F2F2'
          fontSize='xs'
          //   width='80px'
          fontWeight={300}
          title='View Result'
          rightIcon={<FiEye />}
          onClick={() => handlePreview(row.original.resultDoc)}
        />
      )
    }
  ]

  return (
    <Layout bg='#E5E5E5' px={20} py={10}>
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
      {selectItem && (
        <UserDetailModal
          id={selectItem}
          isOpen={isOpen}
          onClose={onClose}
          finalFocusRef={btnRef}
          setSelectItem={setSelectItem}
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
            <Heading fontSize='2xl'>Result List</Heading>
            <Text fontWeight={300} fontSize='sm'>
              Result list
            </Text>
          </Box>
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
            h='20vh'
            align='center'
            justify='center'
            direction='column'
            error={error}
            loading={fetchLoading}
            reload={triggerReload}
            text='Loading'
          />
        ) : (
          <div>
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
          </div>
        )}
      </Box>
    </Layout>
  )
}

ResultList.propTypes = {
  history: PropTypes.any.isRequired
}

export default ResultList
