import React from 'react'
import PropTypes from 'prop-types'
import { Table, Thead, Tbody, Tr, Th, Td } from '@chakra-ui/react'
import { useTable } from 'react-table'

const CustomTable = ({ _columns = [], _data = [], variant = '' }) => {
  const data = React.useMemo(() => _data, [_data])
  const columns = React.useMemo(() => _columns, [_columns])

  const tableInstance = useTable({ columns, data })

  const {
    rows,
    prepareRow,
    headerGroups,
    getTableProps,
    getTableBodyProps
  } = tableInstance

  const getkey = i => i + 1

  return (
    <Table variant={variant} {...getTableProps()}>
      <Thead>
        {headerGroups.map((headerGroup, index) => (
          <Tr key={getkey(index)} {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column, index) => (
              <Th
                py={5}
                fontSize='xs'
                fontFamily='body'
                fontWeight={300}
                key={getkey(index)}
                textTransform='capitalize'
                {...column.getHeaderProps()}
              >
                {column.render('Header')}
              </Th>
            ))}
          </Tr>
        ))}
      </Thead>
      <Tbody {...getTableBodyProps()}>
        {rows.map((row, index) => {
          prepareRow(row)
          return (
            <Tr key={getkey(index)} {...row.getRowProps()}>
              {row.cells.map((cell, index) => {
                return (
                  <Td
                    fontSize='sm'
                    key={getkey(index)}
                    {...cell.getCellProps()}
                  >
                    {cell.render('Cell')}
                  </Td>
                )
              })}
            </Tr>
          )
        })}
      </Tbody>
    </Table>
  )
}

CustomTable.propTypes = {
  _data: PropTypes.array,
  _columns: PropTypes.array,
  variant: PropTypes.string
}

export default CustomTable
