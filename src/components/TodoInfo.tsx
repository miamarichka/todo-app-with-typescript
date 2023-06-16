import React, { useState } from 'react';
import { Todo } from '../types/Todo';
import { ModalOverlay } from './ModalOverlay';

type Props = {
  todoInfo: Todo,
  addComplitedTodo: (todoId:string) => void,
  onTodoDelete: (id: string) => void,
  onTodoChangingStatus: (todoId: string) => void,
  onTodoChangingTitle: (todoId: string, title:string) => void,
  todoLoadingId: string[],
};

export const TodoInfo: React.FC<Props> = ({
  todoInfo,
  addComplitedTodo,
  onTodoDelete,
  onTodoChangingStatus,
  onTodoChangingTitle,
  todoLoadingId,
}) => {
  const [isTodoEditing, setIsTodoEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(todoInfo.title);

  const {
    _id,
    title,
    completed,
  } = todoInfo;

  const handleInputChange = (
    { target }: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setNewTitle(target.value);
  };

  const handleInputBlur = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    if (target.value.trim() !== title) {
      setNewTitle(target.value.trim());
    }

    if (target.value.trim() === '') {
      onTodoDelete(_id);
    }

    setIsTodoEditing(false);
    setNewTitle(target.value.trim());
  };

  const onKeyUp = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setIsTodoEditing(false);
      setNewTitle(title);
    }
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onTodoChangingTitle(_id, newTitle);
    setIsTodoEditing(false);
  };

  const isTodoLoading = _id === '0' || todoLoadingId.includes(_id);

  return (
    <div className={`todo ${completed ? 'completed' : ''}`}>
      <label className="todo__status-label">
        <input
          type="checkbox"
          className="todo__status"
          data-cy="TodoStatus"
          checked={completed}
          onChange={() => {
            onTodoChangingStatus(_id);
            addComplitedTodo(_id);
          }}
        />
      </label>
      {isTodoEditing ? (
        <form onSubmit={onSubmit}>
          <input
            type="text"
            className="todo__title-field"
            placeholder="Empty todo will be deleted"
            value={newTitle}
            onChange={handleInputChange}
            onBlur={handleInputBlur}
            onKeyUp={onKeyUp}
          />
        </form>
      ) : (
        <>
          <span
            data-cy="TodoTitle"
            className="todo__title"
            onDoubleClick={() => setIsTodoEditing(true)}
          >
            {newTitle}
          </span>
          <button
            type="button"
            className="todo__remove"
            onClick={() => onTodoDelete(_id)}
          >
            ×

          </button>
        </>
      )}
      <ModalOverlay
        isTodoLoading={isTodoLoading}
      />

    </div>
  );
};
