import React, { useContext } from "react";
import BudgetCard from "./BudgetCard";
import ExpenseTableRow from "./ExpenseTableRow";
import { BudgetContext } from "./BudgetContext";
import {
  Box,
  Typography,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
} from "@mui/material";

const BudgetList = () => {
  const { sortedExpenses } = useContext(BudgetContext);

  return (
    <>
      <Box mt={2}>
        <BudgetCard sortedExpenses={sortedExpenses} />
      </Box>
      <Typography variant="h4" component="h4" sx={{ mt: 2 }}>
        Expenses
      </Typography>
      <Box mt={2} overflowX="auto">
        <TableContainer minWidth={650}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Date</TableCell>
                <TableCell>Category</TableCell>
                <TableCell>Expense</TableCell>
                <TableCell>Amount</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sortedExpenses.map((budget, index) =>
                budget.expenses.map((expense, expenseIndex) => (
                  <ExpenseTableRow
                    key={expenseIndex}
                    budgetIndex={index}
                    expenseIndex={expenseIndex}
                    index={index}
                  />
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </>
  );
};

export default BudgetList;
// {/* <TableCell>Category</TableCell> */}
