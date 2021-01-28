import React from "react";
import { useHistory } from "react-router-dom";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyles = makeStyles({
  table: {
    width: "100%",
  },
});

export default function ScoreCard({ selectedSection }) {
  const classes = useStyles();
  let history = useHistory();
  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Question</StyledTableCell>
            <StyledTableCell align="right">Marks</StyledTableCell>
            <StyledTableCell align="right">Time Taken</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {selectedSection &&
            selectedSection.map((sec) => (
              <StyledTableRow
                key={sec._id}
                onClick={() =>
                  history.push(`/subscription/${sec.exam._id}/question`)
                }
              >
                <StyledTableCell component="th">
                  {sec.exam.name}
                </StyledTableCell>
                <StyledTableCell align="right">{sec.score}</StyledTableCell>
                <StyledTableCell align="right">
                  {sec.timeTaken[0].minutes}
                </StyledTableCell>
              </StyledTableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
