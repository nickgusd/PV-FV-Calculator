import React from "react";

import {
  useRecoilState,
  useRecoilValue,
} from "recoil";

import {
  // optionState,
  // isCalculatedState,
  futureValueState,
  presentValueState,
  interestState,
  paymentState,
  periodsState,
  calculateState,
} from "../../store";

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

const convertToDecimal = (x) => {
  if (x < 1) {
    return x;
  } else {
    return x / 100;
  }
};


const tableData = (periods, bb, pmt, interest  ) => {
  let count = 1;
  let pvArr = [];
  let interestArr = [];
  let fvArr = [];
  let pmtArr = [];
  let periodArr = [];

  while (count <= periods) {

  let periodInterest = bb * interest;
  let eb = bb - (pmt - periodInterest);
  
    if (count === 1) {
      pvArr.push(bb.toFixed(2));
      fvArr.push(eb.toFixed(2));
      interestArr.push(periodInterest.toFixed(2));
    } else {
      bb = eb;
      eb = bb - (pmt - periodInterest);
      periodInterest = bb * interest;
      fvArr.push(eb.toFixed(2));
      pvArr.push(bb.toFixed(2));
      interestArr.push(periodInterest.toFixed(2));
    }
    pmtArr.push(pmt.toFixed(2))
    periodArr.push(count);
    
    count++

  }

  return (
    {
      Period: periodArr,
      PV: pvArr,
      PMT: pmtArr,
      Interest: interestArr,
      FV: fvArr
    }
  );
}

//use while loop or for loop to iterate for the number of periods
//initial values will be the different states
//need to calculate new PV/FV balance based on PV - interest
//calculate interest amounts for each period PV * rate
//ending FV should equal calculate/ beginning PV should equal Calculate
//populate table


const rows = [
  // createData('Frozen yoghurt', 159, 6.0, 24, 40000),
  // createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  // createData('Eclair', 262, 16.0, 24, 6.0),
  // createData('Cupcake', 305, 3.7, 67, 4.3),
  // createData('Gingerbread', 356, 16.0, 49, 3.9),
];

 

console.log(rows)
const headers = ["Period","PV", "PMT", "Interest","FV"];

export default function BasicTable() {
  const classes = useStyles();

  const beginningBalance = useRecoilValue(calculateState);
  const periods = useRecoilValue(periodsState);
  const interest = useRecoilValue(interestState);

  const tableDataObj = tableData(periods, parseInt(beginningBalance.split(",").join("")), 2000, convertToDecimal(interest));
  console.log(tableDataObj);

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
