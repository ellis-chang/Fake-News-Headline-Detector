import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper} from '@material-ui/core';

const useStyles = makeStyles({
  // table: {
  //   minWidth: 650,
  // },
});

const DenseTable = ({history}) => {
  const classes = useStyles();

  return (
      <div>
        <div style={{display: 'flex', justifyContent: 'center'}}>Past Predictions</div>
        <TableContainer component={Paper}>

        <Table className={classes.table} size="small" aria-label="a dense table">
            <TableHead>
            <TableRow>
                <TableCell>News</TableCell>
                <TableCell align="right">Result</TableCell>
            </TableRow>
            </TableHead>
            <TableBody>
            {history.map((row,i) => (
                <TableRow key={i}>
                <TableCell component="th" scope="row">
                    {row.name}
                </TableCell>
                <TableCell align="right">{row.result ? "Real" : "Fake"}</TableCell>  
                </TableRow>
            ))}
            </TableBody>
        </Table>
        </TableContainer>
    </div>
  );
}

export default DenseTable;