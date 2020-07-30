import React from "react";

import "./css/App.css";
import Tabs from "./components/Tabs";
import TodoList from "./components/TodoList";
import TodoForm from "./components/TodoForm";
import "./css/fontawesome-free-5.13.0-web/css/all.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todoList: [],
      searchText: "",
    };
  }

  componentDidMount() {
    try {
      const json = window.localStorage.getItem("todoList");
      const todoList = JSON.parse(json);

      if (todoList) {
        this.setState(() => ({ todoList }));
      }
    } catch (e) {
      //Do nothing
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const json = JSON.stringify(this.state.todoList);
    window.localStorage.setItem("todoList", json);
  }

  updateSearchText = (e) => {
    const searchText = e.target.value.trim();
    this.setState(() => ({ searchText: searchText }));
  };

  search(text, myArray) {
    for (let i = 0; i < myArray.length; i++) {
      if (myArray[i].details === text) {
        return myArray[i];
      }
    }
  }

  handleAddItem = (text) => {
    if (!text) {
      return "Please enter something to add.";
    } else if (this.search(text, this.state.todoList)) {
      return "The task already exists.";
    }

    this.setState((prevState) => ({
      todoList: [...prevState.todoList, { details: text, isCompleted: false }],
    }));
  };

  onCheckItem = (e) => {
    const checkBox = e.target;
    const index = parseInt(checkBox.value);
    const newValue = this.state.todoList[index];
    newValue.isCompleted = checkBox.checked;

    this.setState((prevState) => ({
      todoList: [
        ...prevState.todoList.slice(undefined, index),
        newValue,
        ...prevState.todoList.slice(index + 1),
      ],
    }));
  };

  handleDeleteItem = (e, index) => {
    e.preventDefault();

    if (!window.confirm("Are you sure to delete?")) return;

    this.setState((prevState) => ({
      todoList: [
        ...prevState.todoList.slice(undefined, index),
        ...prevState.todoList.slice(index + 1),
      ],
    }));
  };

  handleDeleteAll = (e) => {
    if (!window.confirm("Are you sure to delete?")) return;

    this.setState((prevState) => ({
      todoList: prevState.todoList.filter(
        (listObject) => !listObject.isCompleted
      ),
    }));
  };

  render() {
    const labels = { all: "All", active: "Active", completed: "Completed" };

    return (
      <div className="app">
        <h1 className="app__heading">#todo App</h1>
        <div className="app__search-wrapper">
          <input
            className="app__search"
            type="text"
            name="search"
            onInput={this.updateSearchText}
            placeholder = "Search"
          />
        </div>
        <Tabs>
          <div label={labels.all}>
            <TodoForm handleAddItem={this.handleAddItem} />
            <TodoList
              todoList={this.state.todoList}
              onCheckItem={this.onCheckItem}
              visibility={labels.all}
              labels={labels}
              searchText={this.state.searchText}
            />
          </div>
          <div label={labels.active}>
            <TodoForm handleAddItem={this.handleAddItem} />
            <TodoList
              todoList={this.state.todoList}
              onCheckItem={this.onCheckItem}
              visibility={labels.active}
              labels={labels}
              searchText={this.state.searchText}
            />
          </div>
          <div label={labels.completed}>
            <TodoList
              todoList={this.state.todoList}
              onCheckItem={this.onCheckItem}
              visibility={labels.completed}
              labels={labels}
              handleDeleteItem={this.handleDeleteItem}
              searchText={this.state.searchText}
            />
            <div className="app__btn-wrapper">
              <button onClick={this.handleDeleteAll} className="app__button">
                Delete All
              </button>
            </div>
          </div>
        </Tabs>
      </div>
    );
  }
}

export default App;
