import React from 'react';
import { Todo } from '../types/Todo';
import { TodoInfo } from './TodoInfo';
import { TempTodo } from './TempTodo';

type Props = {
  todos: Todo[],
  addComplitedTodo: (todoId:string) => void,
  onTodoDelete: (id: string) => void,
  onTodoChangingStatus: (todoId: string) => void,
  onTodoChangingTitle: (todoId: string, title:string) => void,
  todoLoadingId: string[],
  tempTodo: Todo | null,
};

export const Main: React.FC<Props> = ({
  todos,
  addComplitedTodo,
  onTodoDelete,
  onTodoChangingStatus,
  onTodoChangingTitle,
  todoLoadingId,
  tempTodo,
}) => {
  return (
    <section className="todoapp__main">
      {todos.map(todo => {
        return (
          <TodoInfo
            todoInfo={todo}
            key={todo._id}
            addComplitedTodo={addComplitedTodo}
            onTodoDelete={onTodoDelete}
            onTodoChangingStatus={onTodoChangingStatus}
            onTodoChangingTitle={onTodoChangingTitle}
            todoLoadingId={todoLoadingId}
          />
        );
      })}
      {tempTodo !== null && (
        <TempTodo title={tempTodo.title} />
      )}
    </section>
  );
};
