import { useState, useEffect, useRef } from "react";
import { Todo } from "./types";
import { initTodos } from "./initTodos";
import TodoList from "./TodoList";
import { v4 as uuid } from "uuid";
import dayjs from "dayjs";
import { twMerge } from "tailwind-merge";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";

const App = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodoName, setNewTodoName] = useState("");
  const [newTodoPriority, setNewTodoPriority] = useState(3);
  const [newTodoDeadline, setNewTodoDeadline] = useState<Date | null>(null);
  const [newTodoNameError, setNewTodoNameError] = useState("");
  const [sortByDeadline, setSortByDeadline] = useState(false);
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);
  const editFormRef = useRef<HTMLDivElement>(null);
  const addFormRef = useRef<HTMLDivElement>(null);

  const [images, setImages] = useState<string[]>([]);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const [initialized, setInitialized] = useState(false);
  const localStorageKey = "TodoApp";

  useEffect(() => {
    const todoJsonStr = localStorage.getItem(localStorageKey);
    if (todoJsonStr && todoJsonStr !== "[]") {
      const storedTodos: Todo[] = JSON.parse(todoJsonStr);
      const convertedTodos = storedTodos.map((todo) => ({
        ...todo,
        deadline: todo.deadline ? new Date(todo.deadline) : null,
      }));
      setTodos(convertedTodos);
    } else {
      setTodos([]);
    }
    setInitialized(true);
  }, []);

  useEffect(() => {
    if (initialized) {
      localStorage.setItem(localStorageKey, JSON.stringify(todos));
    }
  }, [todos, initialized]);

  // 定期的にタスクの期限をチェックする
  useEffect(() => {
    const interval = setInterval(() => {
      setTodos((prevTodos) =>
        prevTodos.map((todo) => {
          const now = dayjs();
          const deadline = dayjs(todo.deadline);
          if (deadline.isBefore(now)) {
            return { ...todo, isOverdue: true };
          } else {
            return { ...todo, isOverdue: false };
          }
        })
      );
    }, 60000); // 1分ごとにチェック

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (editingTodo && editFormRef.current) {
      editFormRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [editingTodo]);

  const isValidTodoName = (name: string): string => {
    if (name.length < 2 || name.length > 32) {
      return "2文字以上、32文字以内で入力してください";
    } else {
      return "";
    }
  };

  const updateNewTodoName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTodoNameError(isValidTodoName(e.target.value));
    setNewTodoName(e.target.value);
  };

  const updateNewTodoPriority = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTodoPriority(Number(e.target.value));
  };

  const updateDeadline = (e: React.ChangeEvent<HTMLInputElement>) => {
    const dt = e.target.value;
    setNewTodoDeadline(dt === "" ? null : new Date(dt));
  };

  const addNewTodo = () => {
    const err = isValidTodoName(newTodoName);
    if (err !== "") {
      setNewTodoNameError(err);
      return;
    }
    const newTodo: Todo = {
      id: uuid(),
      name: newTodoName,
      isDone: false,
      priority: newTodoPriority,
      deadline: newTodoDeadline,
      isOverdue: false,
    };
    const updatedTodos = [...todos, newTodo];
    setTodos(updatedTodos);
    setNewTodoName("");
    setNewTodoPriority(3);
    setNewTodoDeadline(null);
  };

  const updateIsDone = (id: string, value: boolean) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, isDone: value };
      } else {
        return todo;
      }
    });
    setTodos(updatedTodos);
  };

  const removeCompletedTodos = () => {
    const updatedTodos = todos.filter((todo) => !todo.isDone);
    setTodos(updatedTodos);
  };

  const remove = (id: string) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  };

  const updateTodo = (updatedTodo: Todo) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === updatedTodo.id) {
        return updatedTodo;
      } else {
        return todo;
      }
    });
    setTodos(updatedTodos);
  };

  const startEditing = (todo: Todo) => {
    setEditingTodo(todo);
    setNewTodoName(todo.name);
    setNewTodoPriority(todo.priority);
    setNewTodoDeadline(todo.deadline);
    scrollToAddForm();
  };

  const saveEditingTodo = () => {
    if (editingTodo) {
      const updatedTodo = {
        ...editingTodo,
        name: newTodoName,
        priority: newTodoPriority,
        deadline: newTodoDeadline,
      };
      updateTodo(updatedTodo);
      setEditingTodo(null);
      setNewTodoName("");
      setNewTodoPriority(3);
      setNewTodoDeadline(null);
    }
  };

  const cancelEditing = () => {
    setEditingTodo(null);
    setNewTodoName("");
    setNewTodoPriority(3);
    setNewTodoDeadline(null);
  };

  const handleSortToggle = () => {
    setSortByDeadline(!sortByDeadline);
  };

  const scrollToAddForm = () => {
    if (addFormRef.current) {
      addFormRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  // 未完了のタスクの数をカウントする関数
  const getRemainingTodosCount = () => {
    return todos.filter((todo) => !todo.isDone).length;
  };

  const sortedTodos = sortByDeadline ? sortTodosByDeadline([...todos]) : todos;

  return (
    <div className="mx-4 mt-10 max-w-2xl md:mx-auto">
      <h1 className="mb-4 text-2xl font-bold">TodoApp</h1>

      <p className="mb-4 text-lg">残りのタスク: {getRemainingTodosCount()}</p>

      <div className="flex space-x-2">
        <button
          type="button"
          onClick={handleSortToggle}
          className="mt-5 rounded-md bg-blue-500 px-3 py-1 font-bold text-white hover:bg-blue-600"
        >
          {sortByDeadline ? "締め切りでソート解除" : "締め切りでソート"}
        </button>
        <button
          type="button"
          onClick={scrollToAddForm}
          className="mt-5 rounded-md bg-green-500 px-3 py-1 font-bold text-white hover:bg-green-600"
        >
          タスク追加フォームへ
        </button>
      </div>

      <TodoList
        todos={sortedTodos}
        updateIsDone={updateIsDone}
        remove={remove}
        isDeadlineApproaching={isDeadlineApproaching}
        startEditing={startEditing}
      />

      <button
        type="button"
        onClick={removeCompletedTodos}
        className="mt-5 rounded-md bg-red-500 px-3 py-1 font-bold text-white hover:bg-red-600"
      >
        完了済みのタスクを削除
      </button>

      <div ref={addFormRef} className="mt-5 space-y-2 rounded-md border p-3">
        <h2 className="text-lg font-bold">
          {editingTodo ? "タスクの編集" : "新しいタスクの追加"}
        </h2>
        <div>
          <div className="flex items-center space-x-2">
            <label className="font-bold" htmlFor="newTodoName">
              名前
            </label>
            <input
              id="newTodoName"
              type="text"
              value={newTodoName}
              onChange={updateNewTodoName}
              className={twMerge(
                "grow rounded-md border p-2",
                newTodoNameError && "border-red-500 outline-red-500"
              )}
              placeholder="2文字以上、32文字以内で入力してください"
            />
          </div>
          {newTodoNameError && (
            <div className="ml-10 flex items-center space-x-1 text-sm font-bold text-red-500 ">
              <FontAwesomeIcon
                icon={faTriangleExclamation}
                className="mr-0.5"
              />
              <div>{newTodoNameError}</div>
            </div>
          )}
        </div>

        <div className="flex gap-5">
          <div className="font-bold">優先度</div>
          {[1, 2, 3].map((value) => (
            <label key={value} className="flex items-center space-x-1">
              <input
                id={`priority-${value}`}
                name="priorityGroup"
                type="radio"
                value={value}
                checked={newTodoPriority === value}
                onChange={updateNewTodoPriority}
              />
              <span>{value}</span>
            </label>
          ))}
        </div>

        <div className="flex items-center gap-x-2">
          <label htmlFor="deadline" className="font-bold">
            期限
          </label>
          <input
            type="datetime-local"
            id="deadline"
            value={
              newTodoDeadline
                ? dayjs(newTodoDeadline).format("YYYY-MM-DDTHH:mm:ss")
                : ""
            }
            onChange={updateDeadline}
            className="rounded-md border border-gray-400 px-2 py-0.5"
          />
        </div>

        {editingTodo ? (
          <div className="flex gap-2">
            <button
              type="button"
              onClick={saveEditingTodo}
              className="rounded-md bg-green-500 px-3 py-1 font-bold text-white hover:bg-green-600"
            >
              保存
            </button>
            <button
              type="button"
              onClick={cancelEditing}
              className="rounded-md bg-gray-500 px-3 py-1 font-bold text-white hover:bg-gray-600"
            >
              キャンセル
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={addNewTodo}
            className={twMerge(
              "rounded-md bg-indigo-500 px-3 py-1 font-bold text-white hover:bg-indigo-600",
              newTodoNameError && "cursor-not-allowed opacity-50"
            )}
          >
            追加
          </button>
        )}
      </div>
    </div>
  );
};

const sortTodosByDeadline = (todos: Todo[]) => {
  return todos.sort((a, b) => {
    const deadlineA = a.deadline ? new Date(a.deadline).getTime() : Infinity;
    const deadlineB = b.deadline ? new Date(b.deadline).getTime() : Infinity;
    return deadlineA - deadlineB;
  });
};

const isDeadlineApproaching = (deadline?: Date | null) => {
  if (!deadline) return false;
  const oneWeekFromNow = new Date();
  oneWeekFromNow.setDate(oneWeekFromNow.getDate() + 7);
  return deadline <= oneWeekFromNow;
};

export default App;
