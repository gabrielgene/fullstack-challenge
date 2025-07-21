import { type NextRequest } from "next/server";

const transactions: { amount: number; description: string }[] = [];

export async function POST(request: NextRequest) {
  const body = (await request.json()) as {
    amount: number;
    description: string;
  };

  const newTransactions = addTransaction(body, transactions);

  return Response.json({ success: true, transactions: newTransactions });
}

export async function GET(request: NextRequest) {
  return Response.json({ transactions });
}

export function addTransaction(
  transaction: { amount: number; description: string },
  store: { amount: number; description: string }[],
) {
  store.push(transaction);
  return store;
}
