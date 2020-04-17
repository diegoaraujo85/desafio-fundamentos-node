import Transaction from '../models/Transaction';

interface CreateTransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const income = this.transactions
      .filter(transaction => transaction.type === 'income')
      .reduce((sum, transaction) => sum + transaction.value, 0);
    const outcome = this.transactions
      .filter(transaction => transaction.type === 'outcome')
      .reduce((sum, transaction) => sum + transaction.value, 0);
    const total = income - outcome;
    const balance = {
      income,
      outcome,
      total,
    };

    return balance;
  }

  public isValidBalance(outcome: number): boolean {
    const balance = this.getBalance();
    return balance.total >= outcome;
  }

  public create({ title, value, type }: CreateTransactionDTO): Transaction {
    const transaction = new Transaction({ title, value, type });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
