import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import {
  ADD_TASK,
  TOGGLE_TASK,
  FILTER_TASK,
  SHOW_TASK,
} from './Slice/reducer/taskSlice';
import { useState } from 'react';

function App() {
  const tasks = useSelector((state) => state.task.value);
  const dispatch = useDispatch();
  const [items, setItems] = useState('');

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(ADD_TASK({ text: items }));
    setItems('');
  };

  const clickHandle = (id) => {
    dispatch(TOGGLE_TASK({ id }));
  };

  const filterTasks = () => {
    dispatch(FILTER_TASK({ toggleState: true }));
  };

  const showAllTasks = () => {
    dispatch(SHOW_TASK());
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="container mx-auto py-8">
        <form onSubmit={submitHandler} className="mb-4">
          <input
            type="text"
            name="value"
            value={items}
            onChange={(e) => setItems(e.target.value)}
            placeholder="Enter the task"
            className="border p-3 rounded w-64 focus:outline-none focus:border-blue-500"
          />
          <button
            type="submit"
            className="ml-2 bg-blue-500 text-white p-3 rounded hover:bg-blue-600 focus:outline-none"
          >
            Submit
          </button>
        </form>
        <div className="flex justify-between mb-4">
          <button
            onClick={filterTasks}
            className="bg-green-500 text-white p-3 rounded hover:bg-green-600 focus:outline-none"
          >
            Filter Completed
          </button>
          <button
            onClick={showAllTasks}
            className="bg-green-500 text-white p-3 rounded hover:bg-green-600 focus:outline-none"
          >
            Show All Tasks
          </button>
        </div>
        <div className="bg-white shadow-md rounded-lg">
          {tasks.map((task) => (
            <div
              key={task.id}
              className={`flex items-center justify-between px-6 py-4 border-b ${
                task.toggleState ? 'bg-gray-200' : ''
              }`}
            >
              <span className="text-lg">{task.text}</span>
              <input
                type="checkbox"
                checked={task.toggleState}
                onChange={() => clickHandle(task.id)}
                className="ml-4"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
