// src/TodoItem.tsx
import React from "react";
import { Todo } from "./types"; // Todo タイプのインポート
import dayjs from "dayjs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFile,
  faClock,
  faFaceGrinWide,
  faEdit, // 編集アイコンのインポート
} from "@fortawesome/free-solid-svg-icons";
import { twMerge } from "tailwind-merge";

type TodoItemProps = {
  todo: Todo;
  updateIsDone: (id: string, value: boolean) => void;
  remove: (id: string) => void;
  startEditing: (todo: Todo) => void; // 編集用の関数の引数としてタスクを受け取る
};

const num2star = (n: number): string => "★".repeat(4 - n);

const TodoItem: React.FC<TodoItemProps> = ({
  todo,
  updateIsDone,
  remove,
  startEditing,
}) => {
  return (
    <div
      className={twMerge(
        "rounded-lg border border-gray-200 bg-white px-4 py-3 shadow hover:shadow-lg transition-shadow duration-200",
        todo.isDone && "bg-blue-50 opacity-75"
      )}
    >
      <div className="flex items-center">
        <input
          type="checkbox"
          checked={todo.isDone}
          onChange={(e) => updateIsDone(todo.id, e.target.checked)}
          className="mr-2 cursor-pointer"
        />

        {todo.isDone && (
          <div className="mb-1 rounded bg-blue-500 px-2 py-0.5 text-center text-xs text-white">
            <FontAwesomeIcon icon={faFaceGrinWide} className="mr-1" />
            完了済み
            <FontAwesomeIcon icon={faFaceGrinWide} className="ml-1" />
          </div>
        )}
      </div>

      <div className="flex items-baseline text-slate-700 mt-1">
        <FontAwesomeIcon icon={faFile} flip="horizontal" className="mr-1" />
        <div
          className={twMerge(
            "text-lg font-semibold",
            todo.isDone && "line-through decoration-2"
          )}
        >
          {todo.name}
        </div>
        <span className="ml-2 text-sm text-gray-600">優先度</span>
        <span className="ml-1 text-orange-500">{num2star(todo.priority)}</span>
      </div>

      {todo.deadline && (
        <div className="ml-6 flex items-center text-sm text-slate-500 mt-1">
          <FontAwesomeIcon icon={faClock} flip="horizontal" className="mr-1" />
          <div className={twMerge(todo.isDone && "line-through opacity-70")}>
            期限: {dayjs(todo.deadline).format("YYYY年M月D日 H時m分")}
          </div>
        </div>
      )}

      <div className="flex justify-end mt-2 space-x-2">
        <button
          onClick={() => startEditing(todo)} // 編集ボタンをクリックした時の処理
          className="rounded-md bg-orange-600 px-3 py-1 text-sm font-bold text-white hover:bg-orange-700 transition-colors duration-200"
        >
          <FontAwesomeIcon icon={faEdit} className="mr-1" />
          編集
        </button>
        <button
          onClick={() => remove(todo.id)}
          className="rounded-md bg-red-600 px-3 py-1 text-sm font-bold text-white hover:bg-red-700 transition-colors duration-200"
        >
          削除
        </button>
      </div>
    </div>
  );
};

export default TodoItem;
