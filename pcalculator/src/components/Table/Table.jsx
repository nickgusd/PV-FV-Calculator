import React from "react";

import {
  useRecoilValue,
} from "recoil";

import {
  interestState,
  paymentState,
  periodsState,
  calculateState,
  presentValueState,
} from "../../store";

import { 
  numberWithCommas,
  convertToDecimal,
  pvTable,
  fvTable
} from "../../helpers";

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

const createData = (period, pv, pmt, interest, fv, protein) => {
  return { period, pv, pmt, interest, fv, protein };
};

const rows = [];
const headers = ["Period","PV", "PMT", "Interest","FV"];

export default function BasicTable() {
  const classes = useStyles();

  const beginningBalance = useRecoilValue(calculateState);
  const presentVal = useRecoilValue(presentValueState);
  const periods = useRecoilValue(periodsState);
  const interest = useRecoilValue(interestState);
  const payment = useRecoilValue(paymentState);

  const tableDataObj = pvTable(periods, parseFloat(beginningBalance.split(",").join("")), parseFloat(payment), convertToDecimal(interest));
  // const tableDataObj = fvTable(periods, parseFloat(presentVal.split(",").join("")), parseFloat(payment), convertToDecimal(interest));
  // console.log(tableDataObj);

  for (const [key] of Object.entries(tableDataObj)) {
    tableDataObj[key].forEach((item, idx) => {
      rows.push(
        createData(tableDataObj["Period"][idx],
        "$" + tableDataObj["PV"][idx], 
        "$" + tableDataObj["PMT"][idx], 
        "$" + tableDataObj["Interest"][idx], 
        "$" + tableDataObj["FV"][idx]));
    })
  }

  let data = rows.slice(0, periods);
 
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
          {data.map((row) => (
            <TableRow key={row.name}>
              {headers.map((item, idx) => {
                return (
                  <TableCell  className={classes.tCell}>{numberWithCommas(row[item.toLowerCase()])}</TableCell>
                )
              })}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
