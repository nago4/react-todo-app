export interface Todo {
  id: string;
  name: string;
  isDone: boolean;
  priority: number;
  deadline: Date | null;
  isOverdue?: boolean; // 追加
  isDueSoon?: boolean; // 追加
}
