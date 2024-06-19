import { useState } from "react";

export default function App() {
  //inicializando nuestro array de ToDo y nuestro input
  //gusrda la lista de ToDo's
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState(""); // para guarda el inputValue
  function addTodo() {
    // todos.push(text);

    //crreando un arreglo con los elemntod anteriores y el nuevo elemento que quiero agregar ..
    //utilizaneo el spread operatior (...NameArray)
    setTodos([...todos, text]);
  }

  //
  function OnSubmit(event) {
    event.preventDefault(); //evitarecargar la pagina
    addTodo();
    setText(""); //limpiamos nuestro input
  }

  function removeToDo(indexToRemove) {
    //splice no serviria aqui ya que muta nuestro array
    // todos.splice(indexToRemove, 1);
    //simpre se debe pasar un nuevo array o enviar una copia
    // setTodos([...todos]);

    //filter..
    const newTodos = todos.filter((todo, idx) => idx !== indexToRemove);
    setTodos(newTodos);
  }

  return (
    <main className="w-full min-h-screen flex flex-col">
      <form
        className="flex flex-row gap-2 justify-center p-5"
        onSubmit={OnSubmit}
      >
        {/* input descontrlado: react no lo puede controlar o no recupera su valor */}
        <input
          type="text"
          placeholder="Ingresa una tarea"
          className="p-2 rounded text-black w-full max-w-screen-sm"
          value={text} //casamos la variaable con el vaslor del text para controlarlo
          onChange={(event) => setText(event.target.value)}
          required
        />
        <button
          className="bg-white text-black px-3 rounded hover:bg-blue-600 hover:text-white"
          // onClick={addTodo} se quita porque se agrego el onsubmit del form
        >
          + Agregar
        </button>
      </form>
      <div className="max-w-screen-sm mx-auto w-full p-4 flex flex-col gap-1">
        {todos.length === 0 && (
          <p className="text-white/50">No tienes tareas pendientes 🤷‍♀️</p>
        )}
        {todos.length > 0 &&
          todos.map((todo, idx) => {
            return (
              <div
                key={`todo-${idx}`}
                className="bg-white/10 rounded p-4 flex flex-row justify-between"
              >
                <span className="select-none">{todo}</span>
                {/* //se pasa una funcion flecha para evitar que se ejecute la principal al renderizar 
                y asi pasamos el index.. */}
                <span
                  className="text-red-500 hover:bg-red-900 hover:text-white p-1 px-2 rounded cursor-pointer"
                  onClick={() => removeToDo(idx)}
                >
                  X
                </span>
              </div>
            );
          })}
      </div>
    </main>
  );
}
