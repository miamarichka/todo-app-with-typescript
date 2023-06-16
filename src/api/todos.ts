import { Todo } from '../types/Todo';
import { client } from '../utils/fetchClient';

export const getTodos = () => {
  // return client.get<Todo[]>();
  return client.get<Todo[]>()
   .then((response: { data: Todo[][][] }) => {
    const todos: Todo[] = response.data.flat(2);
    return todos;
    // Here, `todos` will be the array of todo items
    // You can perform operations on `todos` as needed
  })
  .catch((error: Error) => {
    throw new Error(error.message)
  });
};

export const postTodos = (data: Pick<
Todo,  'title' | 'completed'>) => {
  return client.post<Todo>(data);
};

export const deleteTodos = (todoId:string) => {
  return client.delete(`/todos/${todoId}`);
};

export const patchTodoStatus = (
  todoId: string, data: Pick<Todo, 'completed'>,
) => {
  return client.patch<Todo>(`/todos/${todoId}/completed`, data);
};

export const patchTodoTitle = (
  todoId: string, data: Pick<Todo, 'title'>,
) => {
  return client.put<Todo>(`/todos/${todoId}`, data);
};
