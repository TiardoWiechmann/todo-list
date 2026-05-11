import Project from "./project.js";
import { appLogic } from "./application-logic.js";
import Todo from "./todo.js";
import deleteImage from "./images/delete.svg";
import editImage from "./images/file-edit.svg";


export default function displayContent() {
    let currentProject;
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

    // Add task to current project
    function addTask() {
        const addTaskBtn = document.querySelector(".add-task");
        const dialog = document.querySelector(".new-task")

        addTaskBtn.addEventListener("click", () => {
            dialog.showModal();
        });

        const dialogCloseBtn = document.querySelector(".new-task button");
        dialogCloseBtn.addEventListener("click", () => {
            createTask();
            displayProjectSite();
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
        displayTasks();
    }


    // When project is clicked the project should be displayed
    function openProject(){
        const projectBtns = document.querySelectorAll(".projects-container button");
        projectBtns.forEach((btn) => {
            btn.addEventListener("click", () => {
                currentProject = getProjectByName(btn.textContent);
                console.log(currentProject);
                console.log(btn.textContent)
                displayProjectSite();
            });
        });
    }


    function getProjectByName(projectName) {
        const projects = app.getAllProjects();
        for (let project of projects) {
            if (project.name === projectName){
                return project;
            }
        }
    }


    function displayTasks() {
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


    function createTask() { 
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
                 
        let todo = new Todo(properties.title, properties.description, properties.dueDate , properties.priority);
        currentProject.addTodo(todo);
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

                }
                else if (btn.className === "del-todo"){
                    currentProject.removeTodo(btn.dataset.todo_id);
                    app.updateProjects(currentProject);
                    displayProjectSite(currentProject);
                }
                console.log(btn.className);
            });
        });
    }


    function makeTitle(word){
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    }

}