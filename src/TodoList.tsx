import React, { useState } from "react";

//型定義
interface item {
  id: number;
  text: string;
  done: boolean;
}

//関数コンポーネント作成
export const TodoList: React.FC = () => {
  //useState<データの型>(今の状態)
  //todosには今まで入力したtodo文が配列で入ってる
  const [todos, updateTodos] = useState<item[]>([]);

  //input fieldで入力した値
  const [input, updateInput] = useState<string>("");

  //todo文をクリックしたときにdoneの状態を反転させる
  const handleToggle = (id: number) => {
    updateTodos(
      todos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, done: !todo.done };
        }
        return todo;
      })
    );
  };

  const handleClick = () => {
    const newTodo: item = {
      id: Date.now(),
      text: input,
      done: false,
    };
    //新しいtodoの全ての要素(id,text,done)をtodosの配列に入れる
    updateTodos([...todos, newTodo]);
  };

  return (
    <body>
      <div className="container">
        <h1>To do List</h1>
        <ul>
          {todos.map(
            (
              todo //map関数でtodos配列内のtextを全て表示
            ) => (
              <li
                key={todo.id} //どのtodoなのか識別
                onClick={() => handleToggle(todo.id)} //クリックすると棒線引くかどうか変わる
                style={{
                  //棒線引くかどうか
                  textDecoration: todo.done ? "line-through" : "none",
                }}
              >
                {todo.text}
              </li>
            )
          )}
        </ul>

        <input
          type="text"
          placeholder="Add your task"
          onChange={(e) => updateInput(e.currentTarget.value)}
        />

        <button onClick={handleClick}>Add</button>
      </div>
    </body>
  );
};
