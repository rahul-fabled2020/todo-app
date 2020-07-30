import React from "react";

function TodoListItem(props) {
  const {listObject, index, searchText} = props;
  
  if(searchText && listObject.details.toLowerCase().indexOf(searchText.toLowerCase())===-1) {
    return null;
  }

  return (
    <li
      className={"todo-list__item" + (listObject.isCompleted ? " strike" : "")}
    >
      <input
        className="todo-list__checkbox"
        type="checkbox"
        name="toDoStatus"
        onChange={props.onCheckItem}
        value={index}
        checked={listObject.isCompleted}
      />
      {listObject.details}
      {props.handleDeleteItem && <button className="todo-list__button" onClick = {(e) => {props.handleDeleteItem(e, index)}}><i className="fas fa-trash-alt"></i></button>}
    </li>
  );
}

export default TodoListItem;