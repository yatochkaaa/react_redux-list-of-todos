import React from 'react';
import { useSelector } from 'react-redux';

import Start from './components/Start';
import { Finish } from './components/Finish';
import { isLoading, getMessage } from './store';
import { requestTodos } from './api/api';
import { Todo } from './types/types';

import './App.scss';

const App: React.FC = () => {
  const loading = useSelector(isLoading);
  const message = useSelector(getMessage) || 'Ready!';

  const [todos, setTodos] = React.useState<Todo[]>([]);

  const getTodos = async () => {
    const todosFromServer = await requestTodos();

    setTodos(todosFromServer);
  };

  React.useEffect(() => {
    getTodos();
  }, []);

  const succesfulMessage = 'Loaded successfully!';

  return (
    <div className="App">
      <h1>Redux list of todos</h1>
      <h2>{loading ? 'Loading...' : message}</h2>

      <Start title="Start loading" />
      <Finish title="Succeed loading" message={succesfulMessage} />
      <Finish
        title="Fail loading"
        message="An error occurred when loading data."
      />
      {message === succesfulMessage && !loading && (
        <ul>
          {todos.map(todo => {
            return <li key={todo.id}>{todo.title}</li>;
          })}
        </ul>
      )}
    </div>
  );
};

export default App;
