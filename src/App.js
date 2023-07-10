import React from "react";
import { AppBar, Typography, Paper, Grid } from "@mui/material";
import { BudgetProvider } from "./components/BudgetContext";
import BudgetForm from "./components/BudgetForm";
import BudgetList from "./components/BudgetList";

const App = () => {
  return (
    <Grid container direction="column" alignItems="center">
      <AppBar sx={{ padding: "1rem" }}>
        <Typography variant="h3">Expense Tracker</Typography>
      </AppBar>
      <Grid item xs={6} md={8} lg={12} sx={{ margin: "1rem 0" }} >
        <Paper sx={{ padding: "1rem" }}>
          <BudgetProvider>
            <BudgetForm />
            <BudgetList />
          </BudgetProvider>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default App;
