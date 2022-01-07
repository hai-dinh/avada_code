import React, { useEffect, useState } from "react";
function App() {
  function TodoForm({ addTodo }) {
    const [value, setValue] = useState("");
    const handleSubmit = e => {
      console.log(value);
      e.preventDefault();
      if (!value) return;
      addTodo(value);
      setValue("");
    };
  
    return (
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          className="input"
          value={value}
          onChange={e => setValue(e.target.value)}
        />
      </form>
    );
  }
  
  function Todo({ todo, id, completeTodo, removeTodo, index }) {
    return (
      <div
        className="todo"
        style={{ textDecoration: todo.isCompleted ? "line-through" : "" }}
      >
        {todo.todo}
        <div>
          <button onClick={() => completeTodo(id, index, todo)}>Complete</button>
          <button onClick={() => removeTodo(id, index, todo)}>x</button>
        </div>
      </div>
    );
  }
  const [todos, setTodos] = useState([]);
  async function fetchTodos() {
    const todos = await fetch('http://localhost:5000/api/todos')
    const todo = await todos.json();
    console.log(todo.data);
    setTodos(todo.data)
  }

  useEffect(() => {
    fetchTodos()
  }, [])
  async function postData(url = '', todo) {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(todo)
    });

    return response.json();
  }
  async function completeData(url = '', id) {
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(id)
    });

    return response.json();
  }
  async function delData(url = '', id) {
    const response = await fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(id)
    });

    return response.json();
  }

  const addTodo = async (todo) => {
    const { data: respData } = await postData('http://localhost:5000/api/todos', { todo });
    setTodos([...todos, respData]);

  };
  const completeTodo = async (index, id, todo) => {
    id = todo.id

    const respData = await completeData(`http://localhost:5000/api/todo/complete/${id}`, todo); //3s
    // setTodos((prev) => {
    //   const newTodos = [...prev];
    //   newTodos[index].isCompleted = true;

    //   return newTodos
    // });
    setTodos((prev) => {
      return prev.map((item) => {
        if (id === item.id) return { ...item, isCompleted: true }
        return item;
      })
    });
  };

  const removeTodo = async (index, id, todo) => {
    id = todo.id
    const respData = await delData(`http://localhost:5000/api/todo/del/${id}`, todo);
    setTodos((prev) => {
      return prev.filter(item => item.id !== id);
    });
  };

  return (
    <div className="app">
      <div className="todo-list">   
            {todos.map((todo, id) => (
              <Todo
                key={id}
                id={id}
                todo={todo}
                style={{ textDecoration: todo.isCompleted ? "line-through" : "" }}
                completeTodo={completeTodo}
                removeTodo={removeTodo}
              />
            ))}
            <TodoForm addTodo={addTodo} />
      </div>
    </div>
  );
}
export default App;