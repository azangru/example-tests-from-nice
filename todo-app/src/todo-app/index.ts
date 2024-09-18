import { getAddTodoTemplate, TodoItem } from './todo-item';
import { getTodoFooterTemplate } from './todo-app-footer';

class TodoApp extends HTMLElement {

  totalTasksCount = 0;
  completedTasksCount = 0;

  constructor() {
    super();

    this.initialiseElements();
    this.setupListeners();
  }

  initialiseElements() {
    this.createNewTodoInput();
    this.createTodosContainer();
    this.createTodoAppFooter();
  }

  setupListeners() {
    this.addEventListener('task-added', this.onTodoAdded);
    this.addEventListener('task-removed', this.onTodoRemoved);
    this.addEventListener('completed', this.onTodoCompleted);
    this.addEventListener('uncompleted', this.onTodoUncompleted);
    this.addEventListener('complete-all', this.onCompleteAll);
    this.addEventListener('clear-completed', this.onClearCompleted);
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

  createTodoAppFooter() {
    const templateElement = document.createElement('template');
    templateElement.innerHTML = getTodoFooterTemplate();
    this.appendChild(templateElement.content);
  }

  onTodoCreate = (event: SubmitEvent) => {
    event.preventDefault();
    const form = event.currentTarget as HTMLFormElement;
    const input = form['new-todo'] as HTMLInputElement;
    const todoText = input.value.trim();
    input.value = '';
    this.addTodo(todoText);
  };

  addTodo(todoText: string) {
    const template = document.createElement('template');
    template.innerHTML = getAddTodoTemplate({ todoText });
    const todosContainer = this.querySelector('.tasks-container') as HTMLDivElement;
    todosContainer.appendChild(template.content);
  }

  setTotalTasksCount = (count: number) => {
    this.totalTasksCount = count;
    this.updateFooter();
  }

  setCompletedTasksCount = (count: number) => {
    this.completedTasksCount = count;
    this.updateFooter();
  }

  onTodoAdded = () => {
    this.setTotalTasksCount(this.totalTasksCount + 1);
  }

  onTodoRemoved = (event: Event) => {
    const todoItem = event.target as TodoItem;
    const isTodoCompleted = todoItem.hasAttribute('completed');

    if (isTodoCompleted) {
      this.setCompletedTasksCount(this.completedTasksCount - 1);
    }
    this.setTotalTasksCount(this.totalTasksCount - 1);
  }

  onTodoCompleted = () => {
    this.setCompletedTasksCount(this.completedTasksCount + 1);
  }

  onTodoUncompleted = () => {
    this.setCompletedTasksCount(this.completedTasksCount - 1);
  }

  onCompleteAll = (event: Event) => {
    const shouldCompleteAll = (event as CustomEvent).detail.shouldCompleteAll;
    const todoItemsCheckboxes = this.querySelectorAll('todo-item input[name="task-completed"]');
    if (shouldCompleteAll) {
      todoItemsCheckboxes.forEach(checkbox => {
        (checkbox as HTMLInputElement).checked = true;
        const event = new Event('change', { bubbles: true });
        checkbox.dispatchEvent(event);
      });
    } else {
      todoItemsCheckboxes.forEach(checkbox => {
        (checkbox as HTMLInputElement).checked = false;
        const event = new Event('change', { bubbles: true });
        checkbox.dispatchEvent(event);
      });
    }
  }

  onClearCompleted = () => {
    const completedItems = this.querySelectorAll('todo-item[completed]');
    completedItems.forEach(item => (item as TodoItem).destroy());
  }

  updateFooter = () => {
    const todoAppFooter = this.querySelector('todo-app-footer') as HTMLElement;
    todoAppFooter.setAttribute('completed-tasks', `${this.completedTasksCount}`);
    todoAppFooter.setAttribute('total-tasks', `${this.totalTasksCount}`);
  }
}

customElements.define('todo-app', TodoApp);
