const { addTransaction } = require("../src/app/api/route");

test("adds 1 + 2 to equal 3", () => {
  expect(1 + 2).toBe(3);
});

test("adds a transaction to the store", () => {
  const store = [];
  const transaction = { amount: 10, description: "test" };
  const newTransactions = addTransaction(transaction, store);
  expect(newTransactions).toEqual([transaction]);
});
