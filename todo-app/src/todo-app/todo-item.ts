class TodoItem extends HTMLElement {

  constructor() {
    super();
    this.setupListeners();
  }

  connectedCallback() {
    const taskAddedEvent = new CustomEvent('task-added', { bubbles: true });
    this.dispatchEvent(taskAddedEvent);
  }
  
  setupListeners() {
    this.addEventListener('change', this.onCompletedChange);
    this.addEventListener('click', this.onClick);
    this.addEventListener('dblclick', this.onDoubleClick);

    const todoTextButton = this.querySelector('button.todo-text') as HTMLButtonElement;
    todoTextButton.addEventListener('keypress', this.onButtonKeyPress);

    const todoEditForm = this.querySelector('.todo-edit-form') as HTMLFormElement;
    todoEditForm.addEventListener('submit', this.onEditFormSubmit);

    const todoEditInput = this.querySelector('input[name="todo-edit-text"]') as HTMLInputElement;
    todoEditInput.addEventListener('blur', this.onEditInputBlur)
    todoEditInput.addEventListener('keyup', this.onEditInputKeypress)

    const todoEditButton = this.querySelector('.todo-edit-button') as HTMLButtonElement;
    todoEditButton.addEventListener('click', this.enableEditMode);

    const todoRemoveButton = this.querySelector('.todo-remove-button') as HTMLButtonElement;
    todoRemoveButton.addEventListener('click', this.destroy);
  }

  onCompletedChange = (event: Event) => {
    const input = event.target as HTMLInputElement;
    const isCompleted = input.checked;
    if (isCompleted) {
      this.markAsCompleted();
    } else {
      this.markAsUncompleted();
    }
  }

  onClick = (event: Event) => {
    const target = event.target as HTMLElement;
    if (target.classList.contains('todo-text')) {
      event.preventDefault();
    }
  }

  onDoubleClick = (event: Event) => {
    const target = event.target as HTMLElement;
    if (target.classList.contains('todo-text')) {
      this.enableEditMode();
    }
  }

  onButtonKeyPress = (event: KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      console.log('log!');
    }
  }

  enableEditMode = () => {
    this.changeMode('edit');
    const editFormInput = this.querySelector('input[name="todo-edit-text"') as HTMLInputElement;
    editFormInput.value = this.getCurrentTaskText();
    editFormInput.focus();
  }

  onEditFormSubmit = (event: SubmitEvent) => {
    event.preventDefault();
    const form = event.currentTarget as HTMLFormElement;
    const input = form['todo-edit-text'];
    const updatedTaskText = input.value;
    this.updateTask(updatedTaskText);
  }

  onEditInputBlur = (event: Event) => {
    const input = event.currentTarget as HTMLInputElement;
    const updatedTaskText = input.value;
    this.updateTask(updatedTaskText);
  }

  onEditInputKeypress = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      const uneditedText = this.getCurrentTaskText();
      const input = event.currentTarget as HTMLInputElement;
      input.value = uneditedText;
      this.changeMode('view')
    }
  }

  getCurrentTaskText = () => {
    const taskTextElement = this.querySelector('.todo-text') as HTMLElement;
    return taskTextElement.innerText.trim();
  }

  setCurrentTaskText = (text: string) => {
    const taskTextElement = this.querySelector('.todo-text') as HTMLElement;
    taskTextElement.innerText = text;
  }

  changeMode(mode: string) {
    this.setAttribute('data-mode', mode);
  }

  updateTask(updatedTaskText: string) {
    if (updatedTaskText === '') {
      this.destroy();
      return;
    }

    this.setCurrentTaskText(updatedTaskText);
    this.changeMode('view');
  }

  markAsCompleted = () => {
    const styledCheckboxSlot = this.querySelector('.styled-checkbox-slot') as HTMLElement;
    styledCheckboxSlot.innerHTML = getCheckmarkTemplate();
    this.setAttribute('completed', '');

    const completedEvent = new CustomEvent('completed', { bubbles: true });
    this.dispatchEvent(completedEvent);
  }

  markAsUncompleted = () => {
    const styledCheckboxSlot = this.querySelector('.styled-checkbox-slot') as HTMLElement;
    styledCheckboxSlot.innerHTML = getEmptyCheckboxTemplate();
    this.removeAttribute('completed');

    const uncompletedEvent = new CustomEvent('uncompleted', { bubbles: true });
    this.dispatchEvent(uncompletedEvent);
  }

  destroy = () => {
    const taskRemovedEvent = new CustomEvent('task-removed', { bubbles: true });
    this.dispatchEvent(taskRemovedEvent);

    this.remove();
  }

}

customElements.define('todo-item', TodoItem);



export const getAddTodoTemplate = ({todoText, completed = false}: {
  todoText: string,
  completed?: boolean
}) => {
  const checked = completed ? 'checked' : '';

  const styledCheckbox = completed ? getCheckmarkTemplate() : getEmptyCheckboxTemplate();

  return `
    <todo-item data-mode="view" tabindex=0>
      <span class="checkbox-slot">
        <span class="styled-checkbox-slot">
          ${styledCheckbox}
        </span>
        <input type="checkbox" name="task-completed" aria-label="${todoText}" ${checked} />
      </span>
      <span class="todo-text-slot">
        <button class="todo-text">
          ${todoText}
        </button>
        <form class="todo-edit-form">
          <input name="todo-edit-text" />
        </form>
      </span>
      <span class="control-buttons-slot">
        ${getEditButtonTemplate()}
        ${getDeleteButtonTemplate()}
      </span>
    </todo-item>
  `
};

const getEmptyCheckboxTemplate = () => '<span class="empty-checkbox"></span>';

const getCheckmarkTemplate = () => {
  const templateElement = document.querySelector('#checkmark-icon') as HTMLTemplateElement;
  const svgString = templateElement.innerHTML;
  return svgString;
};

const getDeleteButtonTemplate = () => {
  const templateElement = document.querySelector('#xmark-icon') as HTMLTemplateElement;
  const svgString = templateElement.innerHTML;
  return `
    <button class="todo-remove-button" aria-label="Delete task">
      ${svgString}
    </button>
  `;
};

const getEditButtonTemplate = () => {
  const templateElement = document.querySelector('#edit-icon') as HTMLTemplateElement;
  const svgString = templateElement.innerHTML;

  return `
    <button class="todo-edit-button" aria-label="Edit task">
      ${svgString}
    </button>
  `;
};
