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

    function getProjectById(id) {
        projects.forEach(project => {
            if (project.id === id) {
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

    function updateProjects(updatedProject) {
        projects.forEach(project => {
            if (project.id === updatedProject.id) {
                project = updatedProject;
            }
        });
    }

    return { add, deleteProject, getProjectById, getAllProjects, createDefaultProject, updateProjects };
}


export default function test() {
    testProject();
    testTodo();
}



