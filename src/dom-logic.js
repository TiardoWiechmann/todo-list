import Project from "./project.js";
import { appLogic } from "./application-logic.js";
import Todo from "./todo.js";
import deleteImage from "./images/delete.svg";
import editImage from "./images/file-edit.svg";


export default function displayContent() {
    let currentProject;
    let currentTodo;
    
    const createProjectBtn = document.querySelector(".create-project-btn");
    const projectDialogExit = document.querySelector(".project-dialog button");
    const projectDialog = document.querySelector(".project-dialog")
    const propertyNames = Todo.getPropertyNames();
    const addTodoBtn = document.querySelector(".add-todo");
    const todoDialog = document.querySelector(".new-todo");
    const todoDialogCloseBtn = document.querySelector(".new-todo button");
    const projectsSidebarContainer = document.querySelector(".projects-sidebar-container");
    const todosContainer = document.querySelector(".todos");
    const project = document.querySelector(".project");
    const heading = document.querySelector(".project h2");
    const projectNameInput = document.getElementById("project-name");
    const title = document.getElementById("title");
    const projectEditDelContainer = document.querySelector(".edit-delete-project");
    const app = appLogic(); 

    displayDefaultProject();
    bindProjectBtns();
    bindTodoBtns();
    bindProjectEditDelBtns();
    

    function displayDefaultProject() {
        const defaultProject = app.createDefaultProject();
        createProject(defaultProject);
        currentProject = defaultProject;
    }


    // New project gets created when createProjectButton is clicked
    function bindProjectBtns() {
        createProjectBtn.addEventListener("click", () => {
            projectDialog.showModal();
        });

        projectDialogExit.addEventListener("click", () => {
            const projectName = projectNameInput.value;
            if(projectDialogExit.textContent === "Change Name"){
                currentProject.name = projectName;
                app.updateProjects(currentProject);
                displayAllProjectsInSidebar();
                displayProjectSite()
            }
            else if(!projectName){
                alert("Your project has to have a name.")
            }
            else{
                const project = new Project(projectName);
                createProject(project);
            }
            projectDialog.close();
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
        projectsSidebarContainer.textContent = ""; 
        projects.forEach(project => {
            const projectBtn = document.createElement("button");
            projectBtn.dataset.name = project.name;
            projectBtn.textContent = project.name;
            projectsSidebarContainer.appendChild(projectBtn);
        })
        openProjectFromSidebar();
    }


    function displayProjectSite() {
        heading.textContent = currentProject.name;
        let editBtn = document.querySelector(".edit-project-name");
        let delBtn = document.querySelector("del-project");
        if (!editBtn){
            editBtn = createImageBtn(editImage, "edit-project-name");
            delBtn = createImageBtn(deleteImage, "del-project");
            projectEditDelContainer.appendChild(editBtn);
            projectEditDelContainer.appendChild(delBtn);
        }
        displayAllTodos();
    }


    function openProjectFromSidebar(){
        const projectBtns = document.querySelectorAll(".projects-sidebar-container button");
        projectBtns.forEach((btn) => {
            btn.addEventListener("click", () => {
                currentProject = app.getProjectByName(btn.textContent);
                displayProjectSite();
            });
        });
    }


    function bindTodoBtns(){
        addTodoBtn.addEventListener("click", () => {
            todoDialog.showModal();
        });

        todoDialogCloseBtn.addEventListener("click", () => {
            if(!todoHasTitle()){
                todoDialog.close();
                alert("You have to enter a title to create a todo.");
            }
            else if (todoDialogCloseBtn.textContent === "Add Todo"){
                submitNewTodo();
            }
            else {
                submitUpdatedTodo();
            }
            resetDialogValues();
        });
    }

    
    // If update=true -> create updated todo, else create new todo
    function createTodo(update=false, todo=null) { 
        let properties = {};
        for (let prop of propertyNames) {
            const input = document.getElementById(prop);
            if (prop === "description"){
                properties[prop] = input.value;
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


    function updateTodo(todo) {
        currentTodo = todo;
        todoDialogCloseBtn.textContent = "Edit Todo";
        for (let prop of propertyNames) {
            const input = document.getElementById(prop);
            if (prop === "description"){
                input.value = currentTodo[prop];
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


    function todoHasTitle(){
        if(!title.value){
            return false;
        }
        return true;
    }


    function resetDialogValues(){
        for (let prop of propertyNames) {
            const input = document.getElementById(prop);
            switch (prop){
                case "title":
                    input.value = "";
                    break;
                case "description":
                    input.value = "";
                    break;
                case "dueDate":
                    input.value = "";
                    break;
                case "priority":
                    input.value = "high";
                    break;
            }
        }
    }


    function submitNewTodo(){
        createTodo();
        displayProjectSite();
        todoDialog.close();
    }


    function submitUpdatedTodo() {
        createTodo(true, currentTodo);
        displayProjectSite();
        todoDialog.close();
        todoDialogCloseBtn.textContent = "Add Todo";
    }


    function displayAllTodos() {
        const todos = currentProject.todos;
        todosContainer.textContent = "";
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
                    const className = "todo-title";
                    const TodoHeading = displayTodoHeading(todo, className)
                    todoDiv.appendChild(TodoHeading)
                }
            }
            switch(todo.priority) {
                case ("high"):
                    todoDiv.style.backgroundColor = "rgb(248, 88, 88)";
                    break;
                case ("medium"):
                    todoDiv.style.backgroundColor = "rgb(250, 250, 94)";
                    break;
                case ("low"):
                    todoDiv.style.backgroundColor = "rgb(101, 231, 101)";
                    break;
            }
            todosContainer.appendChild(todoDiv);
            bindTodoEditDelBtns(todo);
        });
    }
    

    function displayTodoHeading(todo, className) {
        const container = document.createElement("div");
        container.className = "todo-heading";
        const heading = document.createElement("div");
        heading.textContent = todo.title;
        heading.className = className;
        const btns = createTodoBtns(todo);
        container.appendChild(heading);
        container.appendChild(btns);
        return container;
    }


    function createTodoBtns(todo) {
        const btnsDiv = document.createElement("div");
        btnsDiv.className = "todo-btns";
        const editBtn = createImageBtn(editImage, "edit-todo", todo);
        const delBtn = createImageBtn(deleteImage, "del-todo", todo);
        btnsDiv.appendChild(editBtn);
        btnsDiv.appendChild(delBtn);
        return btnsDiv;
    }


    function createImageBtn(src, btnDescription, todo=0) {
        const btn = document.createElement("Button");
        btn.className = btnDescription;
        if(todo !== 0){
            btn.dataset.todo_id = todo.id;
        }
        const image = document.createElement("img");
        image.src = src;
        image.width = "20";
        image.height = "20";
        btn.appendChild(image);
        return btn;
    }


    function bindTodoEditDelBtns(todo){
        const btns = document.querySelectorAll(".todo-btns button");
        btns.forEach((btn) => {
            btn.addEventListener("click", () => {
                if (btn.className === "edit-todo"){
                    updateTodo(todo);
                }
                else if (btn.className === "del-todo"){
                    currentProject.removeTodo(btn.dataset.todo_id);
                    app.updateProjects(currentProject);
                    displayProjectSite(currentProject);
                }
            });
        });
    }

    
    function bindProjectEditDelBtns(){
        const btns = document.querySelectorAll(".edit-delete-project button");
        btns.forEach((btn) => {
            btn.addEventListener("click", () => {
                const firstProject = document.querySelector(".projects-sidebar-container :first-child");
                if (btn.className === "edit-project-name"){
                    projectDialog.showModal();
                    projectDialogExit.textContent = "Change Name";
                }
                else if (btn.className === "del-project"){
                    if(currentProject.name === firstProject.textContent){
                        alert("You can't delete the first project.");
                    }
                    else{
                        app.deleteProject(currentProject);
                        displayDefaultProject();
                        projectNameInput.value = "";
                    }
                }
            });
        });
    }


    function makeTitle(word){
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    }
}