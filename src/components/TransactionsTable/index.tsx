import { useEffect, useState } from 'react'
import { api } from '../../services/api';
import { Container } from "./styles";

interface Transaction {
  id: number
  title: string
  amount: number
  type: string
  category: string
  createdAt: string
}

export function TransactionsTable() {
  const [transactions, setTransactions] = useState<Transaction[]>([])

  useEffect(() => {
    api.get('/transactions').then(({ data }) => setTransactions(data.transactions))
  }, [])

  return(
    <Container>
      <table>
        <thead>
          <tr>
            <th>Título</th>
            <th>Valor</th>
            <th>Categoria</th>
            <th>Data</th>
          </tr>
        </thead>

        <tbody>
          {transactions.map(({ title, amount, category, createdAt, type, id }) => (
            <tr key={id}>
              <td>{title}</td>
              <td className={type}>
                {new Intl.NumberFormat('pt-Br', {
                  style: 'currency',
                  currency: 'BRL'
                }).format(amount)}
              </td>
              <td>{category}</td>
              <td>
                {new Intl.DateTimeFormat('pt-Br').format(new Date(createdAt))}
                </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Container>
  )
}