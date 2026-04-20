export default class Todo {
    #title; 
    #description;
    #dueDate;
    #priority;

    constructor(title, description, dueDate, priority) {
        this.#title = title;
        this.#description = description;
        this.#dueDate = dueDate;
        this.#priority = priority;
    }


    // Todo: Add errorhandling
    get title() {
        return this.#title;
    }

    set title(title) {
        this.#title = title;
    }

    get description() {
        return this.#description;
    }

    set description(description) {
        this.#description = description;
    }

    get dueDate() {
        return this.#dueDate;
    }

    set dueDate(dueDate) {
        this.#dueDate = dueDate; 
    }

    get priority() {
        return this.#priority;
    }

    set priority(priority) {
        this.#priority = priority;
    }
}

export function testTodo() {
    let todo1 = new Todo("Workout", "I do sport", "122423", "high");
    
    console.log();
    console.log("Test Todo: ");
    console.log();

    console.log("todo1:");
    console.log(todo1);
    console.log();

    todo1.title = "Title";
    console.log("Title");
    console.log(todo1.title);
    console.log();

    todo1.description = "Description";
    console.log("Description");
    console.log(todo1.description);
    console.log();

    todo1.dueDate = "Due Date";
    console.log("Due Date");
    console.log(todo1.dueDate);
    console.log()

    todo1.priority = "Priority";
    console.log("Priority");
    console.log(todo1.priority);
    console.log();
}