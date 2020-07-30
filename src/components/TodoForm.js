import React from "react";

export default class TodoForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: undefined,
    }
  }

  onSubmit = (e) => {
    e.preventDefault();

    const textElement = e.target.elements["toDoText"];

    const text = textElement.value.trim();
    const error = this.props.handleAddItem(text);

    this.setState(()=>({error}));
    textElement.value='';
  }

  render() {
    return (
        <form onSubmit={this.onSubmit} className="todo-form">
          {this.state.error && <div className="todo-form__error">{this.state.error}</div>}
          <input type="text" name="toDoText" className="todo-form__input" />
          <button className="todo-form__button">Add</button>
        </form>
    );
  }
}
