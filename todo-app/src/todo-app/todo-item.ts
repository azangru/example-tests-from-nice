class TodoItem extends HTMLElement {

  constructor() {
    super();
    this.setupListeners();
  }

  connectedCallback() {

  }

  
  setupListeners() {
    this.addEventListener('change', this.onCompletedChange);
    this.addEventListener('click', this.onClick);
    this.addEventListener('dblclick', this.onDoubleClick);

    const todoTextButton = this.querySelector('button.todo-text') as HTMLButtonElement;
    todoTextButton.addEventListener('keypress', this.onButtonKeyPress);
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
      console.log('double click!');
    }
  }

  onButtonKeyPress = (event: KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      console.log('log!');
    }
  }

  markAsCompleted = () => {
    const styledCheckboxSlot = this.querySelector('.styled-checkbox-slot') as HTMLElement;
    styledCheckboxSlot.innerHTML = getCheckmarkTemplate();
  }

  markAsUncompleted = () => {
    const styledCheckboxSlot = this.querySelector('.styled-checkbox-slot') as HTMLElement;
    styledCheckboxSlot.innerHTML = getEmptyCheckboxTemplate();
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
    <todo-item>
      <span class="checkbox-slot">
        <span class="styled-checkbox-slot">
          ${styledCheckbox}
        </span>
        <input type="checkbox" name="task-completed" aria-label="${todoText}" ${checked} />
      </span>
      <button class="todo-text">
        ${todoText}
      </button>
    </todo-item>
  `
};

const getEmptyCheckboxTemplate = () => '<span class="empty-checkbox"></span>';

const getCheckmarkTemplate = () => {
  const templateElement = document.querySelector('#checkmark-icon') as HTMLTemplateElement;
  const svgString = templateElement.innerHTML;
  return svgString;
}
