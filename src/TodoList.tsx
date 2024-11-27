import React from "react";
import dayjs from "dayjs";
import { Todo } from "./types";
import TodoItem from "./TodoItem";

interface TodoListProps {
  todos: Todo[];
  updateIsDone: (id: string, isDone: boolean) => void;
  remove: (id: string) => void;
  isDeadlineApproaching: (deadline?: Date | null) => boolean;
  startEditing: (todo: Todo) => void; // 追加
}

const TodoList: React.FC<TodoListProps> = ({
  todos,
  updateIsDone,
  remove,
  startEditing, // 追加
}) => {
  return (
    <ul>
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          updateIsDone={updateIsDone}
          remove={remove}
          startEditing={startEditing} // 追加
        />
      ))}
    </ul>
  );
};

export default TodoList;
