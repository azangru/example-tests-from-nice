# Description
This is a simple todo app done in plain javascript without addition of any libraries.

The full description of the task can be found [here](./docs//TodoList.md).

In several minor aspects, I have deviated from the brief. Specifically:
- Pressing the 'delete' button removes the corresponding todo item instead of crossing it out (to avoid the behaviours not described in the brief, e.g. whether a crossed-out item should be editable)
- On touch devices, where the hover state is not available, and the double click is not idiomatic:
  - I added the 'edit' button to edit the text of a task
  - Both the 'edit' and 'delete' buttons become visible when user focuses on a todo item (e.g. by tapping on it)

## Testing

To run Playwright tests

- make sure relevant npm packages are install (run `npm install` if needed)
- make sure the browsers that playwright uses are installed (run `npx playwright install`)
