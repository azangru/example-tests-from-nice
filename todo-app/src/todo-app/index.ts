import { getAddTodoTemplate } from './todo-item';

class TodoApp extends HTMLElement {

  constructor() {
    super();

    this.initialiseElements();
  }

  initialiseElements() {
    this.createNewTodoInput();
    this.createTodosContainer();
  }

  createNewTodoInput() {
    const form = document.createElement('form');
    form.innerHTML = `
      <input name="new-todo" placeholder="New todo..." />
    `;
    form.addEventListener('submit', this.onTodoCreate);
    this.appendChild(form);
  }

  createTodosContainer() {
    const todosContainer = document.createElement('div');
    todosContainer.classList.add('tasks-container');
    this.appendChild(todosContainer);
  }

  onTodoCreate = (event: SubmitEvent) => {
    event.preventDefault();
    const form = event.currentTarget as HTMLFormElement;
    const input = form['new-todo'] as HTMLInputElement;
    const todoText = input.value.trim();
    input.value = '';
    this.addTodo(todoText);
    console.log('new todo', todoText);
  };

  addTodo(todoText: string) {
    const template = document.createElement('template');
    template.innerHTML = getAddTodoTemplate({ todoText });
    const todosContainer = this.querySelector('.tasks-container') as HTMLDivElement;
    todosContainer.appendChild(template.content);
  }
}

customElements.define('todo-app', TodoApp);
