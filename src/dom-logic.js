import Project from "./project.js";
import { appLogic } from "./application-logic.js";
import Todo from "./todo.js";
import deleteImage from "./images/delete.svg";
import editImage from "./images/file-edit.svg";


export default function displayContent() {
    let currentProject;
    let currentTodo;
    const todoDialog = document.querySelector(".new-todo");
    const todoDialogCloseBtn = document.querySelector(".new-todo button");
    const app = appLogic(); 
    displayDefaultProject();
    newProject();
    addTask();

    // At the beginning exists a default project
    function displayDefaultProject() {
        const defaultProject = app.createDefaultProject();
        createProject(defaultProject);
        currentProject = defaultProject;
    }


    // New project gets created when create-project button is clicked
    function newProject() {
        const createProjectBtn = document.querySelector(".create-project-btn");
        const dialogExit = document.querySelector(".new-project button");
        const dialog = document.querySelector(".new-project")

        createProjectBtn.addEventListener("click", () => {
            dialog.showModal();
        });

        dialogExit.addEventListener("click", () => {
            const projectName = document.getElementById("pname").value;
            const project = new Project(projectName);
            createProject(project);
            dialog.close();
        });
    }


    function createProject(project){
        app.add(project);
        displayAllProjectsInSidebar();
        currentProject = project;
        displayProjectSite();
    }


    function displayAllProjectsInSidebar() {
        const projects = app.getAllProjects();
        const projectsContainer = document.querySelector(".projects-container");
        projectsContainer.textContent = ""; 

        projects.forEach(project => {
            const projectBtn = document.createElement("button");
            projectBtn.dataset.name = project.name;
            projectBtn.textContent = project.name;
            projectsContainer.appendChild(projectBtn);
        })

        openProject();
    }


    function displayProjectSite() {
        const div = document.querySelector(".project");
        const heading = document.querySelector(".project h2");
        heading.textContent = currentProject.name;
        displayAllTasks();
    }


    // When project is clicked the project should be displayed
    function openProject(){
        const projectBtns = document.querySelectorAll(".projects-container button");
        projectBtns.forEach((btn) => {
            btn.addEventListener("click", () => {
                currentProject = app.getProjectByName(btn.textContent);
                console.log(currentProject);
                console.log(btn.textContent)
                displayProjectSite();
            });
        });
    }


    function createTask(update=false, todo=null) { 
        const propertyNames = Todo.getPropertyNames();

        let properties = {};
        for (let prop of propertyNames) {
            const input = document.getElementById(prop);

            if (prop === "description"){
                properties[prop] = input.textContent;
            }
            else if (prop === "priority") {
                properties[prop] = input.selectedOptions[0].value;
            }
            else {
                properties[prop] = input.value;
            }
        }
                 
        let newTodo = new Todo(properties.title, properties.description, properties.dueDate , properties.priority);
        if (update === true){
            currentProject.updateTodo(todo.id, newTodo);
        }
        else {
            currentProject.addTodo(newTodo);
        }
    }


    // Add task to current project
    function addTask() {
        const addTaskBtn = document.querySelector(".add-todo");
        addTaskBtn.addEventListener("click", () => {
            todoDialog.showModal();
        });
    }


    function updateTask(todo) {
        currentTodo = todo;
        todoDialogCloseBtn.textContent = "Edit Todo";
        const propertyNames = Todo.getPropertyNames();

        // Current Todo is default
        for (let prop of propertyNames) {
            const input = document.getElementById(prop);

            if (prop === "description"){
                input.textContent = currentTodo[prop];
            }
            else if (prop === "priority") {
                input.selectedOptions[0].value = currentTodo[prop];
            }
            else {
                input.value = currentTodo[prop];
            }
        }

        todoDialog.showModal();
    }


    todoDialogCloseBtn.addEventListener("click", () => {
        if (todoDialogCloseBtn.textContent === "Add Todo"){
            submitNewTask();
        }
        else {
            submitUpdatedTask();
        }
    });


    function submitNewTask(){
        createTask();
        displayProjectSite();
        todoDialog.close();
    }

    function submitUpdatedTask() {
        createTask(true, currentTodo);
        displayProjectSite();
        todoDialog.close();
        todoDialogCloseBtn.textContent = "Add Todo";
    }


    function displayAllTasks() {
        const todos = currentProject.todos;
        const todosContainer = document.querySelector(".todos");
        todosContainer.textContent = "";
        const propertyNames = Todo.getPropertyNames()

        todos.forEach(todo => {
            const todoDiv = document.createElement("div");
            todoDiv.className = "todo";
            
            for(let prop of propertyNames) {
                if(prop !== "title"){
                    const propText = document.createElement("div");
                    propText.textContent = makeTitle(prop) + ":    " + todo[prop];
                    todoDiv.appendChild(propText);
                }
                else {
                    const title = todo[prop];
                    const className = "todo-title";
                    const taskHeading = displayTaskHeading(todo, className)
                    todoDiv.appendChild(taskHeading)
                }
            }
            todosContainer.appendChild(todoDiv);
            bindTaskBtns(todo);
        });
    }
    

    function displayTaskHeading(todo, className) {
        const container = document.createElement("div");
        container.className = "todo-heading";
        const heading = document.createElement("div");
        heading.textContent = todo.title;
        heading.className = className;
        const btns = generateTaskBtns(todo);
        container.appendChild(heading);
        container.appendChild(btns);
        return container;
    }


    function generateTaskBtns(todo) {
        const btnsDiv = document.createElement("div");
        btnsDiv.className = "todo-btns";
        const editBtn = createImageBtn(editImage, "edit-todo", todo);
        const delBtn = createImageBtn(deleteImage, "del-todo", todo);
        btnsDiv.appendChild(editBtn);
        btnsDiv.appendChild(delBtn);
        return btnsDiv;
    }


    function createImageBtn(src, btnDescription, todo) {
        const btn = document.createElement("Button");
        btn.className = btnDescription;
        btn.dataset.todo_id = todo.id;
        const image = document.createElement("img");
        image.src = src;
        image.width = "20";
        image.height = "20";
        btn.appendChild(image);
        
        return btn;
    }


    function bindTaskBtns(todo){
        const btns = document.querySelectorAll(".todo-btns button");
        btns.forEach((btn) => {
            btn.addEventListener("click", () => {
                if (btn.className === "edit-todo"){
                    updateTask(todo);
                }
                else if (btn.className === "del-todo"){
                    currentProject.removeTodo(btn.dataset.todo_id);
                    app.updateProjects(currentProject);
                    displayProjectSite(currentProject);
                }
            });
        });
    }


    function makeTitle(word){
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    }

}