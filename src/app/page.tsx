"use client";

import { Button, Stack, TextField } from "@mui/material";
import { useEffect, useState } from "react";

export default function Home() {
  const [amount, setAmount] = useState(0);
  const [description, setDescription] = useState("");
  const [transactions, setTransactions] = useState<
    { amount: number; description: string }[]
  >([]);

  const handleAddTransaction = async () => {
    const response = await fetch("/api", {
      method: "POST",
      body: JSON.stringify({ amount, description }),
    });

    const data = (await response.json()) as { success: boolean };
    if (data.success) {
      void fetchTransactions();
      setAmount(0);
      setDescription("");
    }
  };

  const fetchTransactions = async () => {
    const response = await fetch("/api");
    const data = (await response.json()) as {
      transactions: { amount: number; description: string }[];
    };
    setTransactions(data.transactions);
  };

  useEffect(() => {
    void fetchTransactions();
  }, []);

  return (
    <Stack sx={{ p: "40px", gap: "20px", maxWidth: "600px", mx: "auto" }}>
      <h1>Add Transaction</h1>
      <TextField
        label="Amount"
        value={amount}
        type="number"
        onChange={(e) => setAmount(Number(e.target.value))}
      />
      <TextField
        label="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <Button variant="contained" onClick={handleAddTransaction}>
        Add
      </Button>
      {transactions.map((transaction) => (
        <div key={transaction.description}>
          <h3>{transaction.description}</h3>
          <p>{transaction.amount}</p>
        </div>
      ))}
    </Stack>
  );
}
