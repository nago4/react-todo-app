import React from "react";
import dayjs from "dayjs";

interface Todo {
  id: string;
  name: string;
  isDone: boolean;
  deadline?: Date | null; // Date型のまま使用
  priority: number;
}

interface TodoListProps {
  todos: Todo[];
  updateIsDone: (id: string, isDone: boolean) => void;
  remove: (id: string) => void;
  isDeadlineApproaching: (deadline?: Date | null) => boolean;
}

const TodoList: React.FC<TodoListProps> = ({
  todos,
  updateIsDone,
  remove,
  isDeadlineApproaching,
}) => {
  return (
    <ul>
      {todos.map((todo) => (
        <li key={todo.id} className="flex justify-between items-center mb-2">
          <div className="flex items-center">
            <input
              type="checkbox"
              checked={todo.isDone}
              onChange={(e) => updateIsDone(todo.id, e.target.checked)}
              className="mr-2"
            />
            <span>{todo.name}</span>
            {/* 優先度を星で表示 */}
            <span className="ml-2">
              {Array.from({ length: todo.priority }, (_, index) => (
                <span key={index} role="img" aria-label="star">
                  ⭐
                </span>
              ))}
            </span>
          </div>
          <div className="flex items-center">
            <span
              style={{
                color: isDeadlineApproaching(todo.deadline) ? "red" : "black",
              }}
            >
              {todo.deadline
                ? dayjs(todo.deadline).format("YYYY-MM-DD")
                : "締め切りなし"}
            </span>
            <button
              onClick={() => remove(todo.id)}
              className="ml-2 rounded bg-red-500 px-2 py-1 text-white"
            >
              削除
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default TodoList;
