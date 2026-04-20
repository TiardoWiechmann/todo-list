import Todo from "./todo.js"


export default class Project {
    #name;
    #todos;

    constructor(name, todos) {
        this.#name = name;
        this.#todos = todos;
    }

    // Todo: Add errorhandling
    get name() {
        return this.#name;
    }

    set name(name) {
        this.#name = name;
    }

    get todos() {
        return this.#todos;
    }

    addTodo(todo) {
        this.#todos.push(todo);
    }

    removeTodo(todo) {
        let copy = [];
        this.#todos.forEach(item => {
            if (item.title === todo.title) {
                return;
            }
            copy.push(item);
        });
        this.#todos = copy;
    }
}


export function testProject() {
    let todo1 = new Todo("Workout", "I do sport", "122423", "high");
    let todo2 = new Todo("Homework", "Math", "11234", "medium");


    console.log();
    console.log("Test Project: ");
    console.log();

    let project = new Project("First", [todo1]);
    console.log("todos=[todo1]?");
    console.log([...project.todos]);
    console.log();

    project.addTodo(todo2);
    console.log("todos=[todo1, todo2]?");
    console.log([...project.todos]);
    console.log();

    project.removeTodo(todo2);
    console.log("todos=[todo1]?");
    console.log([...project.todos]);
    console.log();
}