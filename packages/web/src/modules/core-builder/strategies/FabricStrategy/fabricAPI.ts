import axios from 'axios';
import { useQuery } from 'react-query';

type State = 'all' | 'open' | 'done'

type Todo = {
  id: number
  state: State
}
type Todos = ReadonlyArray<Todo>

const fetchTodos = async (state: State): Promise<Todos> => {
  const response = await axios.get(`todos/${state}`)
  return response.data
}

export const useTodosQuery = (state: State) =>
  useQuery(['todos', state], () => fetchTodos(state))