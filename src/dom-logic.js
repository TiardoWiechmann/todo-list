import Project from "./project.js";
import { appLogic } from "./application-logic.js";
import Todo from "./todo.js";


export default function displayContent() {
    let currentProject;
    const app = appLogic(); 
    displayDefaultProject();
    openProject();
    newProject();
    addTask();

    function displayDefaultProject() {
        const defaultProject = app.createDefaultProject();
        createProject(defaultProject);
        currentProject = defaultProject;
    }

    // When project is clicked the project should be displayed
    function openProject(){
        const projectBtns = document.querySelectorAll("projects-container button");
        projectBtns.forEach((btn) => {
            btn.addEventListener("click", () => {
                displayProjectSite(btn.textContent);
            });
        });
    }


    // New project gets created when create-project button is clicked
    function newProject() {
        const createProjectBtn = document.querySelector(".create-project-btn");
        const dialogBtn = document.querySelector(".new-project button");
        const dialog = document.querySelector(".new-project")
        createProjectBtn.addEventListener("click", () => {
            // Create new Project by opening dialog with name input
            dialog.showModal();
        });

        dialogBtn.addEventListener("click", () => {
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


    function displayProjectSite() {
        const div = document.querySelector(".project");
        const heading = document.querySelector(".project h2");
        heading.textContent = currentProject.name;
        displayTasks();
    }


    function displayTasks() {
        const todos = currentProject.todos;
        const todosDiv = document.querySelector(".todos");

        todos.forEach(todo => {
            const todoDiv = document.createElement("div");

            const title = document.createElement("div");
            title.textContent = todo.title;
            const description = document.createElement("div");
            description.textContent = todo.description;
            const dueDate = document.createElement("div");
            dueDate.textContent = todo.dueDate;
            const priority = document.createElement("div");
            priority.textContent = todo.priority;
            
            const content = [title, description, dueDate, priority];
            content.forEach(item => {
                todoDiv.appendChild(item);
            })
            console.log(todoDiv);
            todosDiv.appendChild(todoDiv);
        })
    }

    
    function displayAllProjectsInSidebar() {
        const projects = app.getAllProjects();
        const projectsDiv = document.querySelector(".projects-container");
        projectsDiv.textContent = ""; 

        projects.forEach(project => {
            const projectBtn = document.createElement("button");
            projectBtn.dataset.name = project.name;
            projectBtn.textContent = project.name;
            projectsDiv.appendChild(projectBtn);
        })
    }

    function addTask() {
        // Add todo to current project
        const addTaskBtn = document.querySelector(".add-task");
        const dialog = document.querySelector(".new-task")
        addTaskBtn.addEventListener("click", () => {
            // Open Dialog to add a task
            // Dialog includes every input of todo
            dialog.showModal();
        });
        const dialogBtn = document.querySelector(".new-task button");
        dialogBtn.addEventListener("click", () => {
            createTask();
            displayProjectSite(currentProject);
            dialog.close();
        });
    }

    function createTask() { 
        const propertyNames = Todo.getProperties();

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
        // console.log(currentProject);
    }

}