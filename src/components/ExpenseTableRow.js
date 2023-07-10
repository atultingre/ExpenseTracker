import React, { useContext } from "react";
import { BudgetContext } from "./BudgetContext";
import EditExpenseForm from "./EditExpenseForm";
import {
  TableRow,
  TableCell,
  Button,
  Box,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  Stack,
} from "@mui/material";
import CreateIcon from "@mui/icons-material/Create";
// import DeleteIcon from "@mui/icons-material/Delete";

const ExpenseTableRow = ({ budgetIndex, expenseIndex, index }) => {
  const {
    budgets,
    handleIncreaseAmountSubmit,
    increaseAmount,
    setIncreaseAmount,
    setEditingExpenseIndex,
    openEditDialog,
    setOpenEditDialog,
    handleExpenseSubmit,
  } = useContext(BudgetContext);
  const budget = budgets[budgetIndex];
  const expense = budget.expenses[expenseIndex];
  const remainingAmount = budget.amount - expense.amount;
  const canIncreaseAmount = remainingAmount === 0;

  const handleOpenEditDialog = () => {
    setEditingExpenseIndex(expenseIndex);
    setOpenEditDialog(true);
  };

  const handleCloseEditDialog = () => {
    setEditingExpenseIndex(null);
    setOpenEditDialog(false);
  };

  return (
    <>
      <TableRow key={expenseIndex}>
        <TableCell>{expense.date}</TableCell>
        <TableCell>{expense.category}</TableCell>
        <TableCell>{expense.name}</TableCell>
        <TableCell>{expense.amount} ₹</TableCell>
        <TableCell>
          {canIncreaseAmount ? (
            <Box
              component="form"
              onSubmit={(event) => handleIncreaseAmountSubmit(event, index)}>
              <TextField
                type="number"
                value={increaseAmount}
                onChange={(event) => setIncreaseAmount(event.target.value)}
                label="Increase Amount"
              />
              <Button type="submit" variant="contained">
                Increase Amount
              </Button>
            </Box>
          ) : (
            <Stack direction="row" spacing={1}>
              <Button
                onClick={handleOpenEditDialog}
                variant="contained"
                color="secondary">
                <CreateIcon />
              </Button>
              {/* <Button
                onClick={() => handleDeleteExpense(budgetIndex, expenseIndex)}
                color="error"
                variant="contained"
              >
                <DeleteIcon />
              </Button> */}
            </Stack>
          )}
        </TableCell>
      </TableRow>

      <Dialog
        open={openEditDialog}
        onClose={handleCloseEditDialog}
        fullWidth
        maxWidth="sm">
        <DialogTitle sx={{ textAlign: "center" }}>Edit Expense</DialogTitle>
        <DialogContent>
          <EditExpenseForm
            budgetIndex={budgetIndex}
            expenseIndex={expenseIndex}
            onSubmit={handleExpenseSubmit}
            expense={expense}
            onCancel={handleCloseEditDialog}
          />
        </DialogContent>
        {/* <DialogActions>
          <Button onClick={handleCloseEditDialog} variant="contained">
            Cancel
          </Button>
        </DialogActions> */}
      </Dialog>
    </>
  );
};

export default ExpenseTableRow;
