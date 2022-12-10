/* eslint-disable react/prop-types */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
import React, { useEffect } from 'react';

import { useRecoilValue, useRecoilState } from 'recoil';

import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import {
  numberWithCommas,
  convertToDecimal,
  pvTable,
  fvTable,
  pmtTable,
  rateTable,
  periodsTable,
  toNumber
} from '../../helpers';

import {
  interestState,
  paymentState,
  periodsState,
  calculateState,
  presentValueState,
  tableDataState,
  futureValueState,
  ratesState,
  exchangeOptionsState
} from '../../store';

const useStyles = makeStyles({
  table: {
    width: '260px !important',
    margin: '0 auto',
    border: '1px solid black'
  },
  tContainer: {
    background: 'white',
    marginTop: '50px',
    paddingBottom: '50px'
  },
  rowHeader: {
    border: '1px solid black',
    background: '#4C1A57'
  },
  tCell: {
    border: '1px solid black'
  }
});

const createData = (period, pv, pmt, interest, fv, protein) => ({
  period,
  pv,
  pmt,
  interest,
  fv,
  protein
});

const rows = [];
const headers = ['Period', 'PV', 'PMT', 'Interest', 'FV'];

export default function BasicTable({ option }) {
  const classes = useStyles();

  const [tableData, setTableData] = useRecoilState(tableDataState);

  const beginningBalance = useRecoilValue(calculateState);
  const presentVal = useRecoilValue(presentValueState);
  const periods = useRecoilValue(periodsState) || Math.ceil(beginningBalance);
  const interest = useRecoilValue(interestState);
  const payment = useRecoilValue(paymentState);
  const calculated = useRecoilValue(calculateState);
  const futureVal = useRecoilValue(futureValueState);
  const rates = useRecoilValue(ratesState);
  const options = useRecoilValue(exchangeOptionsState);

  let tableDataObj;

  switch (option) {
    case 'PV':
      tableDataObj = pvTable(
        periods,
        parseFloat(beginningBalance.split(',').join('')),
        parseFloat(payment),
        convertToDecimal(interest)
      );
      break;
    case 'FV':
      tableDataObj = fvTable(
        periods,
        parseFloat(presentVal.split(',').join('')),
        parseFloat(payment),
        convertToDecimal(interest)
      );
      break;
    case 'PMT':
      tableDataObj = pmtTable(
        periods,
        parseFloat(presentVal.split(',').join('')),
        parseFloat(beginningBalance.split(',').join('')),
        convertToDecimal(interest)
      );
      break;
    case 'Rate':
      tableDataObj = rateTable(
        periods,
        parseFloat(presentVal.split(',').join('')),
        parseFloat(payment),
        convertToDecimal(calculated)
      );
      break;
    case 'Periods':
      tableDataObj = periodsTable(
        beginningBalance,
        parseFloat(presentVal.split(',').join('')),
        parseFloat(payment),
        convertToDecimal(interest),
        futureVal
      );
      break;
    default:
      tableDataObj = pvTable(
        periods,
        parseFloat(beginningBalance.split(',').join('')),
        parseFloat(payment),
        convertToDecimal(interest)
      );
  }

  tableDataObj.Period.forEach((item, idx) => {
    rows.push(
      createData(
        tableDataObj.Period[idx],
        `$${tableDataObj.PV[idx]}`,
        `$${tableDataObj.PMT[idx]}`,
        `$${tableDataObj.Interest[idx]}`,
        `$${tableDataObj.FV[idx]}`
      )
    );
  });

  const data = rows.slice(rows.length - periods, rows.length);

  useEffect(() => {
    setTableData(data);
  }, []);

  const exchange = rates[options.indexOf('USD')];

  if (option === 'Rate' && calculated === 1) {
    return null;
  }

  if (calculated.toString() === 'N.aN' || calculated.toString() === 'NaN') {
    return null;
  }

  if (tableData.length > 0) {
    return (
      <TableContainer className={classes.tContainer}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow className={classes.rowHeader}>
              {headers.map((item) => (
                <TableCell key={item} style={{ color: 'white', fontWeight: 'bold' }}>
                  {item}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {tableData.map((row) => (
              <TableRow key={row.name}>
                {headers.map((item, idx) => {
                  if (item === 'Period') {
                    return (
                      <TableCell className={classes.tCell}>{row[item.toLowerCase()]}</TableCell>
                    );
                  }
                  return (
                    <TableCell className={classes.tCell} key={idx}>
                      {numberWithCommas((toNumber(row[item.toLowerCase()]) / exchange).toFixed(2))}
                    </TableCell>
                  );
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }
  return null;
}
