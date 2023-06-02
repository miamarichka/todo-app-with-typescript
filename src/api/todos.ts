import { Todo } from '../types/Todo';
import { client } from '../utils/fetchClient';

export const getTodos = () => {
  return client.get<Todo[]>();
};

export const postTodos = (data: Pick<
Todo,  'title' | 'completed'>) => {
  return client.post<Todo>(data);
};

export const deleteTodos = (todoId:number) => {
  return client.delete(`/todos/${todoId}`);
};

export const patchTodoStatus = (
  todoId: number, data: Pick<Todo, 'completed'>,
) => {
  return client.put<Todo>(`/todos/${todoId}`, data);
};

export const patchTodoTitle = (
  todoId: number, data: Pick<Todo, 'title'>,
) => {
  return client.put<Todo>(`/todos/${todoId}`, data);
};
