import React, { useReducer } from "react";
import "./App.css";
import todoList from "./components/Todo"

// reducer function that takes 2 arguments (state, action)
      // state represents the current state of the app
      // action represents the action that should be performeed to change the state

const reducer = (state, action) => {

  // The part below checks the type of action being dispatched
      // If the action type is COMPLETE, it means it will want to mark a todo item complete

  switch (action.type) {
    case "COMPLETE":

    // Below map method is being use on the state array
        //This method iterates over each item in the array and returns a new array with the modified items
      return state.map((todo) => {

        // Within the map function we are checking if the id of the current todo item matches the id of specified in the action
        if (todo.id === action.id) {

          // If the id matches its creating a new object using the spread operator ('...todo') to copy all properties of the todo item
              // Then itll toggle the complete property to its opposite value ('!todo.complete')
                  // This toggles the completion status of the todo item
          return { ...todo, complete: !todo.complete };
        } else {
          return todo;
        }
      });
    default:
      return state;
  }
};

function App() {

  // This is a useReducer hook to manage state in my component
      // We are initalizing the todos state by calling useReducer with our reducer fuction and the inital todoList array
        // todos will hold the current state of our todo list
            // dispatch is a function that we can use to send actions to our reducer, trigger state updates
  const [todos, dispatch] = useReducer(reducer, todoList);

  // This function takes a todo object as an argument
      // When called, it dispatches an action of type "COMPLETE" to the reducer, along with the todo item that needs to be marked as complete
  const handleComplete = (todo) => {
    dispatch({ type: "COMPLETE", id: todo.id });
  };

  return (
    <div className="app">

      {/* Map is being used to iterate iver the todos array
          For each todo item, its returning a JSX element */}
      {todos.map((todo) => (

        // Each todo item is wrapped in a <div> element with a unique key attribute set to the todo items id
            // This is required by react for efficient rendering
        <div className="input" key={todo.id}>

          {/* Within each <div> we have a <label> element containg an <input> checkbox
                The "checked" attribute of the checkbox is set to the "complete" property of the todo item
                  This ensures that the checkbox reflects the completion status of the todo item
                    The "onChange" event handler is triggered when the checkbox is clicked
                      It calls the "handleComplete" function, passing the current todo item as an argument */}
          <label className="checkbox">
            <input
              type="checkbox"
              checked={todo.complete}
              onChange={() => handleComplete(todo)}
            />
            
            {/* todo.title gives the title name from the array of todoList and binds it to todo */}
            {todo.title}
          </label>
        </div>
      ))}
    </div>
  );
}

export default App;
