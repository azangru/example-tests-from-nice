import { test, expect, type Page } from '@playwright/test';

test.describe('Todo app', () => {

  test('Initial state', async ({ page }) => {
    await page.goto('/');

    // - There is an input field
    // - There are no todo items
    // - The footer is invisible
    const newTaskInputField = page.getByPlaceholder('New todo...');
    const todoItems = page.locator('todo-item');
    const todoItemsCount = await todoItems.count();
    const todoAppFooter = page.locator('todo-app-footer');

    await expect(newTaskInputField).toBeInViewport();
    expect(todoItemsCount).toBe(0);
    await expect(todoAppFooter).not.toBeVisible();
  });

  test('Create a to-do task', async ({ page }) => {
    await page.goto('/');
    const myFirstTaskText = 'My first task';

    const newTaskInputField = page.getByPlaceholder('New todo...');
    await newTaskInputField.fill('My first task');
    await newTaskInputField.press('Enter');

    const todoItems = page.locator('todo-item');
    const todoItemsCount = await todoItems.count();

    expect(todoItemsCount).toBe(1);

    const singleTodoItem = todoItems.first();
    await expect(singleTodoItem).toContainText(myFirstTaskText);
  });

  test('Create several tasks', async ({ page }) => {
    await page.goto('/');

    await createThreeTasks(page);

    const todoItems = page.locator('todo-item');
    const todoItemsCount = await todoItems.count();

    expect(todoItemsCount).toBe(3);
  });

  test('Complete a task', async ({ page }) => {
    await page.goto('/');

    await createThreeTasks(page);

    const itemsCounter = page.locator('.tasks-counter');
    await(expect(itemsCounter)).toHaveText('3 items left');

    await page
      .locator('todo-item')
      .filter({ hasText: 'My second task' })
      .locator('input[name="task-completed"]')
      .check();

    await(expect(itemsCounter)).toHaveText('2 items left');

    await page
      .locator('todo-item')
      .filter({ hasText: 'My first task' })
      .locator('input[name="task-completed"]')
      .check();

    // correct pluralisation of item/items
    await(expect(itemsCounter)).toHaveText('1 item left');
  });

  test('Edit a task', async ({ page }) => {
    await page.goto('/');

    await createThreeTasks(page);

    expect(await page.getByText('My second task').count()).toBe(1);

    const secondTodoItem = page
      .locator('todo-item')
      .filter({ hasText: 'My second task' });

    const editButton = secondTodoItem.getByText('My second task');
    const editField = secondTodoItem.locator('input[name="todo-edit-text"]');

    await expect(editField).not.toBeVisible();

    await editButton.dblclick();

    await expect(editField).toBeVisible();
    await expect(editField).toBeFocused();
    await expect(editButton).not.toBeVisible();

    await editField.fill('Updated task');
    await editField.press('Enter');

    expect(await page.getByText('My second task').count()).toBe(0);
    expect(await page.getByText('Updated task').count()).toBe(1);
  });

  test('Delete a task', async ({ page }) => {
    await page.goto('/');

    await createThreeTasks(page);

    const itemsCounter = page.locator('.tasks-counter');
    await(expect(itemsCounter)).toHaveText('3 items left');

    const secondTodoItem = page
      .locator('todo-item')
      .filter({ hasText: 'My second task' });

    const deleteButton = secondTodoItem.getByLabel('Delete task');

    await expect(deleteButton).not.toBeVisible();

    await secondTodoItem.hover();

    await expect(deleteButton).toBeVisible();

    await deleteButton.click();
    
    const todoItemsCount = await page.locator('todo-item').count();
    expect(todoItemsCount).toBe(2);

    await(expect(itemsCounter)).toHaveText('2 items left');
  });

  test('Complete all tasks', async ({ page }) => {
    await page.goto('/');

    await createThreeTasks(page);
    const completedTasks = page.locator('todo-item[completed]');
    expect(await completedTasks.count()).toBe(0);

    const completeAllCheckbox = page.getByLabel('Complete all');
    await completeAllCheckbox.check();

    expect(await completedTasks.count()).toBe(3);

    // unticking the checkbox makes all tasks uncompleted
    await completeAllCheckbox.uncheck();
    expect(await completedTasks.count()).toBe(0);

    // completing all of the tasks should automatically tick the "Complete all" checkbox
    for (const checkbox of await page.locator('todo-item input[name="task-completed"]').all()) {
      await checkbox.check();
    }
    await expect(completeAllCheckbox).toBeChecked();
  });

  test('Clear completed', async ({ page }) => {
    await page.goto('/');

    await createThreeTasks(page);
    await page
      .locator('todo-item')
      .filter({ hasText: 'My first task' })
      .locator('input[name="task-completed"]')
      .check();
    await page
      .locator('todo-item')
      .filter({ hasText: 'My second task' })
      .locator('input[name="task-completed"]')
      .check();

    const clearCompletedTasksButton = page.getByText('Clear completed');
    await clearCompletedTasksButton.click();

    const todoItemsCount = await page.locator('todo-item').count();
    // two out of three tasks should be removed
    expect(todoItemsCount).toBe(1);
  });

});

const createThreeTasks = async (page: Page) => {
  const newTaskInputField = page.getByPlaceholder('New todo...');

  await newTaskInputField.fill('My first task');
  await newTaskInputField.press('Enter');

  await newTaskInputField.fill('My second task');
  await newTaskInputField.press('Enter');

  await newTaskInputField.fill('My third task');
  await newTaskInputField.press('Enter');
};
