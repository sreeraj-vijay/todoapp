import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  // Initialize state with data from local storage or an empty array
  const [toDos, setToDos] = useState(() => {
    const storedToDos = localStorage.getItem('toDos');
    return storedToDos ? JSON.parse(storedToDos) : [];
  });

  const [toDo, setToDo] = useState('');

  // Update local storage whenever the toDos state changes
  useEffect(() => {
    localStorage.setItem('toDos', JSON.stringify(toDos));
  }, [toDos]);

  return (
    <div className="app">
      <div className="mainHeading">
        <h1>ToDo List</h1>
      </div>
      <div className="subHeading">
        <br />
        <h2>Consistency is the foundation of virtue </h2>
      </div>
      <div className="input">
        <input
          value={toDo}
          onChange={(e) => setToDo(e.target.value)}
          type="text"
          placeholder="🖊️ Add item..."
        />
        <i
          onClick={() =>
            setToDos([
              
              { id: Date.now(), text: toDo, status: false },...toDos,
            ])
          }
          className="fas fa-plus"
        ></i>
      </div>
      <div className="todos">
        {toDos.map((obj) => {
          return (
            <div className="todo" key={obj.id}>
              <div className="left">
                <input
                  onChange={(e) => {
                    setToDos((prevToDos) =>
                      prevToDos.map((todo) =>
                        todo.id === obj.id
                          ? {  ...todo,status: e.target.checked }
                          : todo
                      )
                    );
                  }}
                  value={obj.status}
                  type="checkbox"
                  name=""
                  id=""
                />
                <p>{obj.text}</p>
              </div>
              <div className="right">
                <i
                  className="fas fa-times"
                  onClick={() => {
                    setToDos((prevToDos) =>
                      prevToDos.filter((todo) => todo.id !== obj.id)
                    );
                  }}
                ></i>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
