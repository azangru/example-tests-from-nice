NICE UI Developers - To-Do List Interface
===================

As part of the interview process, we require all candidates to submit a test. This test is about writing a custom To-Do List interface to allow users to add and remove to-dos as well as mark them as done.

The interface does not need to persist the list between browser sessions or peers.

# Design

![Simple Todo App Prototype Design Sample](https://raw.githubusercontent.com/nhsevidence/InterviewTests/master/Frontend/todo.jpg "Design Prototype")

# Functionality

## No todos

When there are no todos, then a way to add a task should be the only component present.

## New todo

New todos are entered in the input field at the top of the app. Pressing Enter creates the todo and appends it to the todo list. Make sure to trim white space from the entry.

## Item

A todo item has three possible interactions:

* Clicking the checkbox marks the todo as complete
* Double-clicking the text activates editing mode
* Hovering over the todo shows the remove button

## Editing

Editing an Existing todo should be achieved with a single input field. The edit should be saved on both blur and enter. If it's empty the todo should be removed. If escape is pressed during the edit, the edit state should be left and any changes discarded.

## Optional Functionality

### Counter

Displays the number of active todos in a pluralized form. Also make sure to pluralize the item word correctly: 0 items, 1 item, 2 items. Example: 2 items left

## Mark all as complete

A "Mark all as Complete" checkbox should be provided to toggle all the to-dos to the same state as itself. When all the todos are checked the "Mark all as complete" checkbox should also get checked.

### Clear completed button

Displays the number of completed todos, and when clicked, removes them. Should be hidden when there are no completed todos.

## Instructions

* Implement a solution with any frontend frameworks of your choice.
* _prove_ that it meets the acceptance criteria.
* The supplied solution must be usable in both touch enabled and mouse driven environments (we do not require Functioning interfaces for IE6 and lower)
* Submit your solution via a [Code playground of your choice](http://www.sitepoint.com/7-code-playgrounds) or via email as a zip file (please add '.test' to the extension of the file so that it can get past email server filters, for example: 'todo.zip.test')

## Evaluation Criteria

In our accessment of your submission we wil be looking at;

* how well the interface adapts to it's environment when used in multiple random browser environments of our choice
* your use of common frameworks and/or patterns
* your interpretation of the design mockup provided, completion of the required Functionality and any addittional usability issues/conflicts you have addressed
