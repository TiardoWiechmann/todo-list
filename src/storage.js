export function storageAvailable(type) {
    let storage;
    try {
      storage = window[type];
      const x = "__storage_test__";
      storage.setItem(x, x);
      storage.removeItem(x);
      return true;
    } catch (e) {
      return (
        e instanceof DOMException &&
        e.name === "QuotaExceededError" &&
        // acknowledge QuotaExceededError only if there's something already stored
        storage &&
        storage.length !== 0
      );
    }
  }


export function saveProject(projects){
    if (projects !== undefined){
        localStorage.setItem("projects", JSON.stringify(projects));
        console.log("Test");
        console.log(projects);
    }
}


export function loadSavedData(){
    const project = JSON.parse(localStorage.getItem("project"));
    console.log(project.name);
}


function replacer(key,value){
    if (typeof value === "function") {
        return undefined;
    }
    else{
        return value;
    }
}