import React, { useState } from 'react';
import classNames from 'classnames';
import { Todo } from '../types/Todo';

type Props = {
  onAddTodo: (todo: Pick<Todo, 'title' | 'completed'>) => void,
  inputDisable: boolean,
  isToggleAllActive: boolean,
  handleToggleClick: () => void,
};

export const Header: React.FC<Props> = ({
  onAddTodo, inputDisable, isToggleAllActive, handleToggleClick,
}) => {
  const [newTodoValue, setNewTodoValue] = useState('');

  const createNewTodo = () => {
    const newTodo = {
      title: newTodoValue,
      completed: false,
    };

    onAddTodo(newTodo);
    setNewTodoValue('');
  };

  const handleFormSubmit = (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createNewTodo();
  };

  return (
    <header className="todoapp__header">
      <button
        type="button"
        className={classNames(
          'todoapp__toggle-all', { active: isToggleAllActive },
        )}
        onClick={() => handleToggleClick()}
      />

      <form onSubmit={handleFormSubmit}>
        <input
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          value={newTodoValue}
          onChange={(e) => setNewTodoValue(e.target.value)}
          disabled={!inputDisable}
        />
      </form>
    </header>
  );
};
