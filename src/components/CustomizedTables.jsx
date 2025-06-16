import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { TablePagination } from '@mui/material';
import { useState } from 'react';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

// function createData(name, calories, fat, carbs, protein) {
//   return { name, calories, fat, carbs, protein };
// }
function createData(text, label) {
  console.log({ text, label })
  return { text, label };
}

const headers = [
  'Text',
  'Label'
]

export default function CustomizedTables(props) {
  // kontrol utk pagination
  const [page, setPage] = useState(0);
  const rowsPerPage = 10;

  const rows = props.data || [
    createData('Saya ingin cepet-cepet #kaburajadulu', 1),
    createData('ya keles tngl di konoha, #kaburajadulu adl jln yg plg bener!!!', 1),
  ]

  // logika perubahan halaman
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // setting jumlah halaman yang di-paginate
  const paginatedRows = rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);


  return (
    <TableContainer component={Paper} sx={{ maxWidth: '1000px', overflowX: 'auto' }}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            {/* <StyledTableCell>Text</StyledTableCell>
            <StyledTableCell align="right">Label</StyledTableCell> */}
            {headers.map((item, index) => (
              <StyledTableCell align={index > 0 ? "right" : "none"} key={index}>{item}</StyledTableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {paginatedRows.map((row) => (
            <StyledTableRow key={row.id}>
              <StyledTableCell component="th" scope="row">
                {row[headers[0].toLowerCase()]}
              </StyledTableCell>
              {headers.map((item, index) => (
                index > 0 ? <StyledTableCell align="right" key={index}>{row[item.toLowerCase()]}</StyledTableCell> : null
              ))}
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[10]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
      />

    </TableContainer>
  );
}