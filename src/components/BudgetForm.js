import React, { useContext } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Stack,
  TextField,
} from "@mui/material";
import { BudgetContext } from "./BudgetContext";

const BudgetForm = () => {
  const {
    budgetName,
    setBudgetName,
    budgetAmount,
    setBudgetAmount,
    handleBudgetSubmit
  } = useContext(BudgetContext);

  return (
    <Box mt="4rem">
      <Card mt={4} m={2}>
        <CardContent>
          <form onSubmit={handleBudgetSubmit}>
            <Stack display="grid" gap={1}>
              <TextField
                fullWidth
                type="text"
                value={budgetName}
                onChange={(event) => setBudgetName(event.target.value)}
                label="Budget Name"
                variant="outlined"
              />
              <TextField
                fullWidth
                type="number"
                value={budgetAmount}
                onChange={(event) => setBudgetAmount(event.target.value)}
                label="Budget Amount"
                variant="outlined"
              />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              mt="1rem"
              fullWidth
            >
              Create Budget
            </Button>
            </Stack>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
};

export default BudgetForm;
