class TodoAppFooter extends HTMLElement {

  static observedAttributes = ['completed-tasks', 'total-tasks'];

  completedTasksCount: number = 0;
  totalTasksCount: number = 0;

  constructor() {
    super();

    this.setupListeners();
    this.updateTaskCounts();
    this.updateElements();
  }

  attributeChangedCallback() {
    this.updateTaskCounts();
    this.updateElements();
  }

  updateTaskCounts = () => {
    const completedTasksCount = parseInt(this.getAttribute('completed-tasks') as string);
    const totalTasksCount = parseInt(this.getAttribute('total-tasks') as string);

    this.completedTasksCount = completedTasksCount;
    this.totalTasksCount = totalTasksCount;
  }

  updateElements = () => {
    this.setComponentVisibility();
    this.setCounter();
    this.updateCompleteAllCheckbox();
    this.updateClearCompleted();
  }

  // hide the component if total tasks count is 0
  setComponentVisibility = () => {
    if (this.totalTasksCount) {
      this.classList.remove('hidden');
    } else {
      this.classList.add('hidden');
    }
  };

  // update the text of the counter
  setCounter = () => {
    const { completedTasksCount, totalTasksCount } = this;
    const counterElement = this.querySelector('.tasks-counter') as HTMLElement;
    const remainingTasksCount = totalTasksCount - completedTasksCount;
    const formattedItems = remainingTasksCount === 1 ? 'item' : 'items'; // the proper approach to pluralisation would use Intl.PluralRules; but it is overkill here
    const label = `${remainingTasksCount} ${formattedItems} left`;
    counterElement.innerText = label;
  }

  // tick the "Complete all" checkbox if all tasks are completed; untick if not
  updateCompleteAllCheckbox = () => {
    const { completedTasksCount, totalTasksCount } = this;
    const completeAllCheckbox = this.querySelector('input[name="complete-all-tasks"]') as HTMLInputElement;

    if (completedTasksCount === totalTasksCount) {
      completeAllCheckbox.checked = true;
    } else if (completeAllCheckbox.checked) {
      completeAllCheckbox.checked = false;
    }
  }

  // hide the "Clear completed" button if there are no completed tasks; show it if there are
  updateClearCompleted = () => {
    const { completedTasksCount } = this;
    const clearCompletedButton = this.querySelector('.clear-completed') as HTMLButtonElement;

    if (!completedTasksCount) {
      clearCompletedButton.classList.add('hidden');
    } else {
      clearCompletedButton.classList.remove('hidden');
    }
  }

  setupListeners() {
    const completeAllCheckbox = this.querySelector('input[name="complete-all-tasks"]') as HTMLInputElement;
    const clearCompletedButton = this.querySelector('.clear-completed') as HTMLButtonElement;

    completeAllCheckbox.addEventListener('change', this.onCompleteAllChange);
    clearCompletedButton.addEventListener('click', this.onClearCompleted);
  }

  onCompleteAllChange = () => {

  }

  onClearCompleted = () => {

  }

}

customElements.define('todo-app-footer', TodoAppFooter);

export const getTodoFooterTemplate = () => `
  <todo-app-footer completed-tasks="0" total-tasks="0">
    <span class="tasks-counter"></span>
    <label class="complete-all">
      Complete all

      <input name="complete-all-tasks" type="checkbox" />
    </label>
    <button class="clear-completed">
      Clear completed
    </button>
  </todo-app-footer>
`;
