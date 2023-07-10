import React, { useContext } from "react";
import { Box, Button, Stack, TextField } from "@mui/material";
import { BudgetContext } from "./BudgetContext";

const ExpenseForm = () => {
  const {
    setExpenseName,
    expenseName,
    expenseAmount,
    setExpenseAmount,
    expenseCategory,
    setExpenseCategory,
    MySwal,
    budgets,
    setBudgets,
    handleExpenseAdded
  } = useContext(BudgetContext);

 

  const handleAddExpense = (event) => {
    event.preventDefault();
    addExpense();
  };

  const addExpense = () => {
    if (expenseName.trim() === "" || expenseAmount.trim() === "") {
      MySwal.fire({
        icon: "error",
        title: "Invalid expense information",
        text: "Please enter a name and amount for the expense.",
      });
      return;
    }

    const newExpense = {
      name: expenseName,
      amount: parseFloat(expenseAmount),
      category: expenseCategory,
      date: new Date().toLocaleString(),
    };

    const updatedBudgets = [...budgets];
    const selectedBudgetIndex = 0;
    updatedBudgets[selectedBudgetIndex].expenses.push(newExpense);
    updatedBudgets[selectedBudgetIndex].amount -= newExpense.amount;
    setBudgets(updatedBudgets);

    setExpenseName("");
    setExpenseAmount("");
    setExpenseCategory("");

handleExpenseAdded()

    MySwal.fire({
      icon: "success",
      title: "Expense added successfully!",
    });
  };

  return (
    <Stack sx={{ padding: "1rem" }} gap={1}>
      <form
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
        onSubmit={handleAddExpense}
      >
        <TextField
          type="text"
          value={expenseCategory}
          onChange={(event) => setExpenseCategory(event.target.value)}
          label="Category"
          fullWidth
          variant="outlined"
          sx={{ mb: 1 }}
        />
        <Box display="flex" gap={1}>
          <TextField
            type="text"
            value={expenseName}
            onChange={(event) => setExpenseName(event.target.value)}
            label="Name"
            fullWidth
            variant="outlined"
            sx={{ mb: 1 }}
          />
          <TextField
            type="number"
            value={expenseAmount}
            onChange={(event) => setExpenseAmount(event.target.value)}
            label="Amount"
            fullWidth
            variant="outlined"
            sx={{ mb: 1 }}
          />
        </Box>
        <Button
          type="submit"
          variant="contained"
          color="success"
          fullWidth
        >
          Add Expense
        </Button>
      </form>
    </Stack>
  );
};

export default ExpenseForm;
