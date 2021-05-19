/* eslint-disable no-console */
/* eslint-disable react/prop-types */
import React from 'react'
import PropTypes from 'prop-types'
import Papa from 'papaparse'
import {
  Box,
  Text,
  Icon,
  Flex,
  useToast,
  Heading,
  Checkbox,
  useDisclosure,
  IconButton
} from '@chakra-ui/react'
import { useFormik } from 'formik'
import { FiDownload, FiFileText, FiUpload } from 'react-icons/fi'

import ActionButton from 'components/ActionButton'
import Overlay from 'components/Loading/Overlay'
import FetchCard from 'components/FetchCard'
import Layout from 'container/Layout'

import useApi from 'context/api'
import useFetch from 'hooks/useFetch'
import PreviewModal from 'components/PreviewModal'
import { ArrowLeftIcon, DashboardIcon, TrashIcon } from 'theme/Icons'

import CustomTable from 'components/CustomTable'
import DropdownActions from 'components/DropdownActions'
import CustomModal from 'components/CustomModal'
import CustomInput from 'components/Forms/CustomInput'
import CustomDropzone from 'components/Forms/CustomDropzone'
import CustomButton from 'components/Forms/CustomButton'
import { fileToBase64 } from 'utils/mics'

const ScheduleTest = ({ history }) => {
  document.title = 'Schedule Test | The GCU Application Portal'
  const [isLoading, setLoading] = React.useState(false)
  const [checkedItems, setCheckedItems] = React.useState(null)
  const [message, setMessage] = React.useState(null)
  const [reload, setReload] = React.useState(0)
  const [modal, setModal] = React.useState(null)
  const [isSubmittingResult, setSubmittingResult] = React.useState(undefined)
  const [resultFile, setResultFile] = React.useState(undefined)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const toast = useToast()

  const {
    uploadScheduleTestCSV,
    getScheduleTestLists,
    clearScheduleTestLists,
    deleteScheduleTestLists,
    updateApplicant
  } = useApi()

  const triggerReload = () => setReload(prevState => prevState + 1)

  const { data, error, isLoading: fetchLoading } = useFetch(
    null,
    getScheduleTestLists,
    reload
  )

  const allChecked = checkedItems?.every(e => e?.checked === true)
  const isIndeterminate =
    checkedItems?.some(e => e.checked === true) && !allChecked

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
      Header: 'Access Code',
      accessor: 'accessCode'
    },
    {
      Header: 'Status',
      accessor: 'status',
      Cell: ({ row }) => {
        const color = { Scheduled: 'red.400', Completed: '#44AB96' }
        return (
          <Text as='span' color={color[row.original?.status]}>
            {row.original?.status}
          </Text>
        )
      }
    },
    {
      Header: '',
      accessor: 'action',
      Cell: ({ row }) => (
        <DropdownActions
          data={{
            id: row.original?._id,
            resultDoc: row.original?.resultDoc,
            applicant: row.original?.applicant
          }}
          options={actions}
        />
      )
    }
  ]

  const formik = useFormik({
    initialValues: {
      date: '',
      file: undefined
    },
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      let reader = new FileReader()
      reader.onload = async function (e) {
        try {
          const csvData = Papa.parse(reader.result)
          const _data = csvData?.data?.slice(1).map(e => ({
            code: e[4],
            accessCode: e[16],
            examDate: values.date
          }))
          setMessage('Extracting data from...')
          setSubmitting(true)
          const res = await uploadScheduleTestCSV(_data)
          toast({
            duration: 5000,
            isClosable: true,
            status: 'success',
            position: 'top-right',
            title: 'Success',
            description: res.message
          })
          resetForm({})
          onClose()
          triggerReload()
        } catch (error) {
          let eMgs
          if (error?.data?.message === 'celebrate request validation failed') {
            eMgs = 'Invalid data, please check form.'
          } else {
            eMgs =
              error?.message ||
              error?.data?.message ||
              'Unexpected network error.'
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
          setSubmitting(false)
        }
      }
      reader.readAsText(values.file)
    }
  })

  const {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    setFieldValue,
    isSubmitting,
    handleSubmit
  } = formik

  const handleBulkDelete = async () => {
    try {
      setMessage('Deleting some record...')
      setLoading(true)
      const data = selectedItems.map(e => ({ _id: e._id }))
      const res = await deleteScheduleTestLists(data)
      toast({
        duration: 5000,
        isClosable: true,
        status: 'success',
        position: 'top-right',
        title: 'Success',
        description: res.message
      })
      setCheckedItems(null)
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

  const handleClear = async () => {
    try {
      setMessage('Clearing all record...')
      setLoading(true)
      const res = await clearScheduleTestLists()
      toast({
        duration: 5000,
        isClosable: true,
        status: 'success',
        position: 'top-right',
        title: 'Success',
        description: res.message
      })
      setCheckedItems(null)
      triggerReload()
    } catch (error) {
      let eMgs
      if (error?.data?.message === 'celebrate request validation failed') {
        eMgs = 'Invalid data, please check file'
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

  const handleResultUpload = async data => {
    try {
      setMessage('Uploading applicant result..')
      setSubmittingResult(true)
      await updateApplicant(data.applicant, {
        resultDoc: await fileToBase64(resultFile),
        stage: 14
      })
      toast({
        duration: 5000,
        isClosable: true,
        status: 'success',
        position: 'top-right',
        title: 'Success',
        description: 'Result upload successfully'
      })
      setResultFile(undefined)
      onClose()
    } catch (error) {
      let eMgs
      if (error?.data?.message === 'celebrate request validation failed') {
        eMgs = 'Invalid data, please check file'
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
      setSubmittingResult(false)
    }
  }

  const actions = [
    {
      name: 'Upload Test Result',
      icon: FiFileText,
      action: data => {
        setModal({ type: 'upload-result', data })
        onOpen()
      }
    },
    {
      name: 'View Result',
      icon: FiFileText,
      action: data => {
        setModal({ type: 'view-result', data })
        onOpen()
      }
    }
  ]

  const getModelOpen = ({ type, data }) => {
    switch (type) {
      case 'upload-result':
        if (data) {
          return (
            <CustomModal
              size='xl'
              rounded='xl'
              title='Upload Test Result'
              headerStyle={{
                fontWeight: 700,
                fontSize: '28px',
                textAlign: 'center',
                fontFamily: 'heading'
              }}
              isOpen={isOpen}
              onClose={onClose}
            >
              <Flex px={5} pb={5} mt={6} flexDir='column' align='center'>
                <CustomDropzone
                  accept='application/pdf'
                  value={resultFile}
                  onChange={value => setResultFile(value)}
                />

                <CustomButton
                  color='#fff'
                  type='button'
                  label='Upload Test Result'
                  onClick={() => handleResultUpload(data)}
                  isLoading={isSubmittingResult}
                  isDisabled={isSubmittingResult}
                />
              </Flex>
            </CustomModal>
          )
        }
        return null
      case 'view-result':
        if (data) {
          return (
            <PreviewModal
              src={data.resultDoc}
              isOpen={isOpen}
              onClose={onClose}
            />
          )
        }
        return null
      case 'upload-list':
        return (
          <CustomModal
            size='xl'
            rounded='xl'
            title='Upload CSV'
            headerStyle={{
              fontWeight: 700,
              fontSize: '28px',
              textAlign: 'center',
              fontFamily: 'heading'
            }}
            isOpen={isOpen}
            onClose={onClose}
          >
            <Text textAlign='center' fontSize='sm' fontWeight='300'>
              Set the test date and upload the CSV downloaded from GL Assessment
            </Text>
            <Flex
              px={5}
              pb={5}
              mt={6}
              as='form'
              flexDir='column'
              align='center'
              onSubmit={handleSubmit}
            >
              <CustomInput
                type='datetime-local'
                isRequired
                name='date'
                label='Set test date & time'
                onBlur={handleBlur}
                onChange={handleChange}
                error={errors.date}
                touched={touched.date}
                defaultValue={values.date}
              />

              <CustomDropzone
                accept='.csv'
                value={values.file}
                onChange={value => setFieldValue('file', value)}
              />

              <CustomButton
                label='Submit CSV'
                color='#fff'
                type='submit'
                isLoading={isSubmitting}
                isDisabled={isSubmitting}
              />
            </Flex>
          </CustomModal>
        )
      default:
        return null
    }
  }

  return (
    <Layout bg='#E5E5E5' px={20} py={10}>
      {isLoading && <Overlay text={message} />}
      {modal && getModelOpen(modal)}
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
            <Heading fontSize='2xl'>Schedule Test</Heading>
            <Text fontWeight={300} fontSize='sm'>
              Schedule Test
            </Text>
          </Box>
        </Flex>
        <Flex>
          <ActionButton
            colorScheme='gcuButton'
            fontSize='sm'
            fontWeight={300}
            title='Upload Test List'
            rightIcon={<FiUpload />}
            onClick={() => {
              setModal({ type: 'upload-list' })
              onOpen()
            }}
          />
          <Box mx={2} />
          <ActionButton
            bg='#F2F2F2'
            fontSize='sm'
            fontWeight={300}
            title='Clear List'
            rightIcon={<TrashIcon />}
            onClick={handleClear}
            isDisabled={!data?.length}
          />
          <Box mx={2} />
          <ActionButton
            bg='#F2F2F2'
            fontSize='sm'
            fontWeight={300}
            title='Bulk Delete'
            rightIcon={<TrashIcon />}
            onClick={handleBulkDelete}
            isDisabled={!selectedItems?.length}
          />
        </Flex>
      </Flex>
      <Box w='100%' mt={10} bg='white' rounded='md'>
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
      <Flex mt={4} w='full' justify='flex-start'>
        <ActionButton
          colorScheme='gcuButton'
          fontSize='sm'
          fontWeight={300}
          title='Download CSV Template'
          rightIcon={<FiDownload />}
          onClick={() => (window.location.href = '/schedule-test-template.csv')}
        />
      </Flex>
    </Layout>
  )
}

ScheduleTest.propTypes = {
  history: PropTypes.any.isRequired
}

export default ScheduleTest
