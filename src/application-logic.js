import Todo, { testTodo } from "./todo.js";
import Project, { testProject } from "./project.js";


export function appLogic() {
    let projects = [];

    function add(project) {
        projects.push(project);
    }

    function deleteProject(p) {
        let copy = [];
        projects.forEach(project => {
            if (project.title === p.title) {
                return;
            }
            copy.push(project);
        });
        projects = copy;
    }

    function getProject(pTitle) {
        project.forEach(project => {
            if (project.title === pTitle) {
                return project;
            }
        });
    }

    function getAllProjects() {
        return projects;
    }

    function createDefaultProject() {
        let project = new Project("My Project");
        return project;
    }

    return { add, deleteProject, getProject, getAllProjects, createDefaultProject };
}




export default function test() {
    testProject();
    testTodo();
}



