import React, { useContext, useState, useEffect } from "react";
import { Box, Button, TextField, Stack } from "@mui/material";
import { BudgetContext } from "./BudgetContext";
import CloseIcon from "@mui/icons-material/Close";
import CheckIcon from "@mui/icons-material/Check";
import DeleteIcon from "@mui/icons-material/Delete";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const EditExpenseForm = ({
  budgetIndex,
  expenseIndex,
  onSubmit,
  expense,
  onCancel,
}) => {
  const { budgets, setBudgets, editExpenseIndex, setEditExpenseIndex } =
    useContext(BudgetContext);
  // const budget = budgets[budgetIndex];
  const MySwal = withReactContent(Swal);

  const [expenseName, setExpenseName] = useState("");
  const [expenseAmount, setExpenseAmount] = useState("");
  const [expenseCategory, setExpenseCategory] = useState("");
  const [expenseDate, setExpenseDate] = useState("");

  useEffect(() => {
    setExpenseName(expense.name);
    setExpenseAmount(expense.amount.toString());
    setExpenseCategory(expense.category);
    setExpenseDate(expense.date);
  }, [expense]);

  const handleDeleteExpense = () => {
    MySwal.fire({
      icon: "question",
      title: "Delete Expense",
      text: "Are you sure you want to delete this expense?",
      showCancelButton: true,
      confirmButtonText: "Delete",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        const updatedBudgets = [...budgets];
        const deletedExpense = updatedBudgets[budgetIndex].expenses.splice(
          expenseIndex,
          1
        )[0];
        updatedBudgets[budgetIndex].amount += deletedExpense.amount;
        setBudgets(updatedBudgets);

        if (
          editExpenseIndex &&
          editExpenseIndex.budgetIndex === budgetIndex &&
          editExpenseIndex.expenseIndex === expenseIndex
        ) {
          setEditExpenseIndex(null);
        }

        Swal.fire({
          icon: "success",
          title: "Expense deleted successfully!",
        });
      }
    });
    onCancel();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedExpense = {
      name: expenseName,
      amount: parseFloat(expenseAmount),
      category: expenseCategory,
      date: expenseDate,
    };
    await onSubmit(budgetIndex, expenseIndex, updatedExpense);

    setEditExpenseIndex(null);
    onCancel();
  };

  const handleCancelEdit = () => {
    onCancel();
  };

  // const handleUpdateExpense = (e) => {
  //   e.preventDefault();
  //   if (
  //     expenseCategory.trim() === "" ||
  //     expenseName.trim() === "" ||
  //     expenseAmount.trim() === "" ||
  //     expenseDate.trim() === ""
  //   ) {
  //     MySwal.fire({
  //       icon: "error",
  //       title: "Invalid expense information",
  //       text: "Please enter a name, amount, category, and date for the expense.",
  //     });
  //     return;
  //   }

  //   const updatedExpense = {
  //     ...expense,
  //     name: expenseName,
  //     amount: parseFloat(expenseAmount),
  //     category: expenseCategory,
  //     date: expenseDate,
  //   };
  //   onSubmit(budgetIndex, expenseIndex, updatedExpense);
  // };

  return (
    <Box sx={{ mt: "2rem" }}>
      <form onSubmit={handleSubmit}>
        <Stack display="flex" flexDirection="column" gap={2}>
          <TextField
            fullWidth
            type="text"
            value={expenseCategory}
            onChange={(e) => setExpenseCategory(e.target.value)}
            label="Expense Category"
          />
          <TextField
            fullWidth
            type="text"
            value={expenseName}
            onChange={(e) => setExpenseName(e.target.value)}
            label="Expense Name"
          />
          <TextField
            fullWidth
            type="number"
            value={expenseAmount}
            onChange={(e) => setExpenseAmount(e.target.value)}
            label="Expense Amount"
          />
          <TextField
            fullWidth
            type="text"
            value={expenseDate}
            onChange={(e) => setExpenseDate(e.target.value)}
            label="Expense Date"
          />
          <Stack direction="row" spacing={1}>
            <Button type="submit" variant="contained" color="success" fullWidth>
              <CheckIcon />
            </Button>
            <Button
              onClick={handleCancelEdit}
              variant="contained"
              color="warning"
              fullWidth>
              <CloseIcon />
            </Button>
            <Button
              onClick={handleDeleteExpense}
              variant="contained"
              color="error"
              fullWidth>
              <DeleteIcon />
            </Button>
          </Stack>
        </Stack>
      </form>
    </Box>
  );
};

export default EditExpenseForm;
