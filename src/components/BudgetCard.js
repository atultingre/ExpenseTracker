import React, { useContext } from "react";
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { BudgetContext } from "./BudgetContext";
import { Delete } from "@mui/icons-material";
import ExpenseForm from "./ExpenseForm";

const BudgetCard = ({ sortedExpenses }) => {
  const {
    handleDeleteBudget,
    handleToggleExpenseForm,
    addExpenseDisabled,
    openExpenseForm,
    deleteBudgetDisabled,
    setOpenExpenseForm,
  } = useContext(BudgetContext);

  return (
    <Box
      display="flex"
      flexWrap="wrap"
      gap={2}
      sx={{ padding: "1rem" }}
      textAlign="center">
      {sortedExpenses.map((budget, index) => (
        <Card key={index} sx={{ minWidth: 389, textAlign: "center" }}>
          <CardContent>
            <Typography variant="h3" component="h3">
              {budget.name}
            </Typography>
            <Typography>
              Budget: ₹{budget.initialAmount}
              {" - "}
              Remaining: ₹{budget.amount}
            </Typography>
            <Box display="flex" gap={1}>
              <Button
                sx={{ gap: "5px", margin: "5px" }}
                onClick={() => handleToggleExpenseForm(index)}
                variant="contained"
                fullWidth
                color="success"
                disabled={addExpenseDisabled}>
                <AddIcon />
              </Button>
              <Button
                sx={{ margin: "5px" }}
                onClick={() => handleDeleteBudget(index)}
                variant="contained"
                fullWidth
                color="error"
                disabled={deleteBudgetDisabled}>
                <Delete />
              </Button>
            </Box>
          </CardContent>
        </Card>
      ))}
      <Dialog open={openExpenseForm} onClose={() => setOpenExpenseForm(false)}>
        <DialogTitle sx={{ textAlign: "center" }}>Add Expense</DialogTitle>
        <DialogContent>
          <ExpenseForm />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenExpenseForm(false)} variant="contained">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default BudgetCard;
