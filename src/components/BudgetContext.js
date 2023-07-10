import React, { createContext, useState, useEffect, useMemo } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

export const BudgetContext = createContext();

export const BudgetProvider = ({ children }) => {
  const [budgets, setBudgets] = useState(() => {
    const storedBudgets = localStorage.getItem("budgets");
    return storedBudgets ? JSON.parse(storedBudgets) : [];
  });
  const [budgetName, setBudgetName] = useState("");
  const [budgetAmount, setBudgetAmount] = useState("");
  const [expenseName, setExpenseName] = useState("");
  const [expenseAmount, setExpenseAmount] = useState("");
  const [increaseAmount, setIncreaseAmount] = useState("");
  const [editExpenseIndex, setEditExpenseIndex] = useState(null);
  const [expenseCategory, setExpenseCategory] = useState("");

  const [showExpenseFormIndex, setShowExpenseFormIndex] = useState(null);
  const [openExpenseForm, setOpenExpenseForm] = useState(false);
  const [addExpenseDisabled, setAddExpenseDisabled] = useState(false);
  const [deleteBudgetDisabled, setDeleteBudgetDisabled] = useState(false);

  // BUDGET LIST
  const [isEditing, setIsEditing] = useState(false);

  // TABLE ROW
  // New state variable to track the currently edited expense index
  const [editingExpenseIndex, setEditingExpenseIndex] = useState(null);
  const [openEditDialog, setOpenEditDialog] = useState(false);

  // EDIT EXPENSE FORM
  const [expenseDate, setExpenseDate] = useState("");

  const [filterCategory, setFilterCategory] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");

  const MySwal = withReactContent(Swal);

  // STORING THE BUDGETS AND EXPENCES IN THE LOCAL STORAGE

  // Load budgets from local storage on component mount
  useEffect(() => {
    const storedBudgets = localStorage.getItem("budgets");
    if (storedBudgets) {
      setBudgets(JSON.parse(storedBudgets));
    }
  }, []);

  // Update local storage whenever budgets change
  useEffect(() => {
    localStorage.setItem("budgets", JSON.stringify(budgets));
  }, [budgets]);

  // BUDGET FORM BUDGET SUBMIT
  const handleBudgetSubmit = (event) => {
    event.preventDefault();

    if (!budgetAmount) {
      // If budgetAmount is empty, return and do not create a budget
      return;
    }

    const newBudget = {
      name: budgetName,
      initialAmount: parseFloat(budgetAmount),
      amount: parseFloat(budgetAmount),
      expenses: [],
    };
    setBudgets([...budgets, newBudget]);
    setBudgetName("");
    setBudgetAmount("");
    MySwal.fire({
      icon: "success",
      title: "Budget added successfully!",
    });
  };

  // DELETE BUDGET
  const handleDeleteBudget = (budgetIndex) => {
    setDeleteBudgetDisabled(true);

    MySwal.fire({
      icon: "question",
      title: "Delete Budget",
      text: "Are you sure you want to delete this budget?",
      showCancelButton: true,
      confirmButtonText: "Delete",
      cancelButtonText: "Cancel",
    }).then((result) => {
      setDeleteBudgetDisabled(false);

      if (result.isConfirmed) {
        const updatedBudgets = [...budgets];
        updatedBudgets.splice(budgetIndex, 1);
        setBudgets(updatedBudgets);

        MySwal.fire({
          icon: "success",
          title: "Budget deleted successfully!",
        });
      }
    });
  };

  // OPEN the expense form when add expense will clicked
  const handleToggleExpenseForm = (index) => {
    setShowExpenseFormIndex(index);
    setOpenExpenseForm(true);
  };

  // Close the expense form after successful submission
  const handleExpenseAdded = () => {
    setOpenExpenseForm(false);
  };

  // ADD EXPENCES UNDER THE SPECIFIC BUDGET
  const addExpense = (event) => {
    event.preventDefault();
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

    handleExpenseAdded();

    MySwal.fire({
      icon: "success",
      title: "Expense added successfully!",
    });
  };

  // BUDGET LIST
  const handleIncreaseAmountSubmit = (event, budgetIndex) => {
    event.preventDefault();
    const increase = parseFloat(increaseAmount);
    if (isNaN(increase) || increase <= 0) {
      MySwal.fire({
        icon: "error",
        title: "Invalid increase amount.",
      });
      return;
    }

    const updatedBudgets = [...budgets];
    updatedBudgets[budgetIndex].initialAmount += increase;
    updatedBudgets[budgetIndex].amount += increase;
    setBudgets(updatedBudgets);
    setIncreaseAmount("");
    MySwal.fire({
      icon: "success",
      title: "Amount increased successfully!",
    });
  };

  const onSubmit = (budgetIndex, expenseIndex, updatedExpense) => {
    const updatedBudgets = [...budgets];
    const expenseToUpdate = updatedBudgets[budgetIndex].expenses[expenseIndex];
    const previousAmount = expenseToUpdate.amount;
    expenseToUpdate.name = updatedExpense.name;
    expenseToUpdate.amount = updatedExpense.amount;
    const amountDifference = updatedExpense.amount - previousAmount;
    updatedBudgets[budgetIndex].amount += amountDifference;
    setBudgets(updatedBudgets);

    MySwal.fire({
      icon: "success",
      title: "Expense updated successfully!",
    });
  };

  // TABLE ROW
  const handleDeleteExpense = (budgetIndex, expenseIndex) => {
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

        // Exit edit mode if the deleted expense is being edited
        if (
          editExpenseIndex &&
          editExpenseIndex.budgetIndex === budgetIndex &&
          editExpenseIndex.expenseIndex === expenseIndex
        ) {
          setEditExpenseIndex(null);
        }

        MySwal.fire({
          icon: "success",
          title: "Expense deleted successfully!",
        });
      }
    });
  };

  const handleExpenseSubmit = async (
    budgetIndex,
    expenseIndex,
    updatedExpense
  ) => {
    const updatedBudgets = [...budgets];
    updatedBudgets[budgetIndex].expenses[expenseIndex] = updatedExpense;
    setBudgets(updatedBudgets);
  };

  // Filter expenses based on category
  const filteredExpenses = useMemo(
    () =>
      budgets.map((budget) => ({
        ...budget,
        expenses: budget.expenses.filter((expense) =>
          expense.category.toLowerCase().includes(filterCategory.toLowerCase())
        ),
      })),
    [budgets, filterCategory]
  );

  // Sort expenses based on the selected sort criteria
  const sortedExpenses = useMemo(() => {
    const sortedBudgets = filteredExpenses.map((budget) => ({
      ...budget,
      expenses: [...budget.expenses],
    }));

    if (sortBy === "name") {
      sortedBudgets.forEach((budget) => {
        budget.expenses.sort((a, b) => a.name.localeCompare(b.name));
      });
    } else if (sortBy === "amount") {
      sortedBudgets.forEach((budget) => {
        budget.expenses.sort((a, b) => a.amount - b.amount);
      });
    }

    if (sortOrder === "desc") {
      sortedBudgets.forEach((budget) => {
        budget.expenses.reverse();
      });
    }

    return sortedBudgets;
  }, [filteredExpenses, sortBy, sortOrder]);

  const budgetContextValue = {
    budgets,
    budgetName,
    setBudgetName,
    budgetAmount,
    setBudgetAmount,
    expenseName,
    setExpenseName,
    expenseAmount,
    setExpenseAmount,
    increaseAmount,
    setIncreaseAmount,
    editExpenseIndex,
    setEditExpenseIndex,
    expenseCategory,
    setExpenseCategory,
    handleBudgetSubmit,
    handleDeleteBudget,
    handleToggleExpenseForm,
    handleExpenseAdded,
    addExpense,
    handleIncreaseAmountSubmit,
    onSubmit,
    handleDeleteExpense,
    handleExpenseSubmit,
    showExpenseFormIndex,
    setShowExpenseFormIndex,
    openExpenseForm,
    setOpenExpenseForm,
    addExpenseDisabled,
    setAddExpenseDisabled,
    deleteBudgetDisabled,
    setDeleteBudgetDisabled,
    isEditing,
    setIsEditing,
    editingExpenseIndex,
    setEditingExpenseIndex,
    openEditDialog,
    setOpenEditDialog,
    expenseDate,
    setExpenseDate,
    filterCategory,
    setFilterCategory,
    sortBy,
    setSortBy,
    sortOrder,
    setSortOrder,
    filteredExpenses,
    sortedExpenses,
    setBudgets,
    MySwal,
  };

  return (
    <BudgetContext.Provider value={budgetContextValue}>
      {children}
    </BudgetContext.Provider>
  );
};
