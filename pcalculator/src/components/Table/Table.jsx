import React from "react";

import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
  table: {
    width: "18vw !important",
    margin: "0 auto",
    border: "1px solid black"
    
  },
  tContainer: {
    background: "white",
    marginTop: "50px"
  },
  rowHeader: {
    border: "1px solid black",
    background: "#4C1A57"
  },
  tCell: {
    border: "1px solid black",
  }
});

function createData(period, pv, pmt, interest, fv, protein) {
  return { period, pv, pmt, interest, fv, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 40000),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

const headers = ["Period","PV", "PMT", "Interest","FV"];

export default function BasicTable() {
  const classes = useStyles();

  return (
    <TableContainer component={Paper} className={classes.tContainer}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow className={classes.rowHeader}>
            {headers.map(item => {
              return (
                <TableCell  key={item} style={{color: "white", fontWeight: "bold"}}>{item}</TableCell>
              )
            })}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.name}>
              {headers.map((item, idx) => {
                return (
                  <TableCell  className={classes.tCell}>{row[item.toLowerCase()]}</TableCell>
                )
              })}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
