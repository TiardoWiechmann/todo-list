import Project from "./project.js";
import { appLogic } from "./application-logic.js";
import Todo from "./todo.js";


export default function displayContent() {
    let currentProject;
    const app = appLogic(); 
    displayDefaultProject();
    newProject();
    addTask();

    function displayDefaultProject() {
        const defaultProject = app.createDefaultProject();
        createProject(defaultProject);
        currentProject = defaultProject;
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
        const todosContainer = document.querySelector(".todos");
        todosContainer.textContent = "";
        const propertyNames = Todo.getPropertyNames()

        todos.forEach(todo => {
            const todoDiv = document.createElement("div");
            
            for(let prop of propertyNames) {
                const propText = document.createElement("div");
                propText.textContent = makeTitle(prop) + ":    " + todo[prop];
                todoDiv.appendChild(propText);
            }
            
            console.log(todoDiv);
            todosContainer.appendChild(todoDiv);
        })
    }

    
    function displayAllProjectsInSidebar() {
        const projects = app.getAllProjects();
        console.log(projects);
        const projectsDiv = document.querySelector(".projects-container");
        projectsDiv.textContent = ""; 

        projects.forEach(project => {
            const projectBtn = document.createElement("button");
            projectBtn.dataset.name = project.name;
            projectBtn.textContent = project.name;
            projectsDiv.appendChild(projectBtn);
        })
        console.log("openProject");
        openProject();
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
        // console.log(currentProject);
    }


    function makeTitle(word){
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    }

}