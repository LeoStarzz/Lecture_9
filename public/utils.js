class Utils {
  constructor() {}
  getRandomInRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  isProjectExists(projectName, projects, freeProjects) {
    return projects.find((item) => item.name === projectName) || freeProjects.find((item) => item.name === projectName);
  }

  isManagerExists(managerName, managerSurname, managers) {
    return managers.find((item) => item.name === managerName && item.surname === managerSurname);
  }

  isDeveloperExists(developerName, developerSurname, developers) {
    return developers.find((item) => item.name === developerName && item.surname === developerSurname);
  }

  getData(data) {
    return fetch(`http://localhost:8080/${data}/`, { method: "GET" }).then(res => res.json()).then(data => data);
  }

  deleteAll(data) {
    return fetch(`http://localhost:8080/${data}/`, { method: "DELETE" });
  }

  deleteOne(type, id) {
    return fetch(`http://localhost:8080/${type}/${id}/`, { method: "DELETE" });
  }
}




