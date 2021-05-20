import React from 'react';
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
    minWidth: 650,
  },
});

const DenseTable = ({history}) => {
  const classes = useStyles();

  return (
      <div>
        <div style={{display: 'flex', justifyContent: 'center'}}>Logs</div>
        <TableContainer component={Paper}>

        <Table className={classes.table} size="small" aria-label="a dense table">
            <TableHead>
            <TableRow>
                <TableCell>News</TableCell>
                <TableCell align="right">Result</TableCell>
            </TableRow>
            </TableHead>
            <TableBody>
            {history.map((row) => (
                <TableRow key={row.name}>
                <TableCell component="th" scope="row">
                    {row.name}
                </TableCell>
                <TableCell align="right">{row.result ? "Fake" : "Real"}</TableCell>  
                </TableRow>
            ))}
            </TableBody>
        </Table>
        </TableContainer>
    </div>
  );
}

export default DenseTable;