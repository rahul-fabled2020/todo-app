import React from "react";
import TodoListItem from "./TodoListItem";

export default function TodoList(props) {
  return (
    <ul className="todo-list">
      {props.todoList.map((listObject, index) =>
        filterList(props, listObject, index)
      )}
    </ul>
  );
}

function filterList(props, listObject, index) {
  const listComponent = (
    <TodoListItem
      key={index}
      listObject={listObject}
      index={index}
      onCheckItem={props.onCheckItem}
      handleDeleteItem = {props.handleDeleteItem}
    />
  );
  switch (props.visibility) {
    case props.labels.active:
      return !listObject.isCompleted && listComponent;
    case props.labels.completed:
      return listObject.isCompleted && listComponent;
    default:
      return listComponent;
  }
}
