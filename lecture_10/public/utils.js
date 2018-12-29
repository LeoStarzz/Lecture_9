class Utils {
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
    return fetch(`http://localhost:8080/${data}/`, { method: 'GET' }).then(res => res.json()).then(data => data);
  }

  deleteAll(data) {
    return fetch(`http://localhost:8080/${data}/`, { method: 'DELETE' });
  }

  deleteOne(type, id) {
    return fetch(`http://localhost:8080/${type}/${id}/`, { method: 'DELETE' });
  }

  updateData(type, id, body) {
    return fetch(`http://localhost:8080/${type}/${id}`, {
      method: 'PUT',
      body: JSON.stringify(body),
      headers: { 'Content-Type': 'application/json' }
    })
      .then(res => res.json()).then(data => data);
  }

  getCost(mode) {
    if (mode === 'easy') {
      return this.getRandomInRange(30000, 100000);
    }
    else if (mode === 'medium') {
      return this.getRandomInRange(15000, 60000);
    }
    else if (mode === 'hard') {
      return this.getRandomInRange(10000, 40000);

    }
  }

  getLinesOfCode(mode) {
    if (mode === 'easy') {
      return this.getRandomInRange(4000, 8000);
    }
    else if (mode === 'medium') {
      return this.getRandomInRange(6000, 12000);
    }
    else if (mode === 'hard') {
      return this.getRandomInRange(10000, 20000);
    }
  }

  getManagerSalary(experience) {
    if (experience < 0) {
      alert('Опыт должен быть больше 0 лет');
    }
    else if (experience < 2) {
      return 400;
    }
    else if (experience < 5) {
      return 600;
    }
    else {
      return 1000;
    }
  }

  getQuotient(experience) {
    if (experience < 0) {
      alert('Опыт должен быть больше 0 лет');
    }
    else if (experience < 2) {
      return 1.2;
    }
    else if (experience < 5) {
      return 1.5;
    }
    else {
      return 2.5;
    }
  }

  getDeveloperSalary(experience) {
    if (experience < 2) {
      return 300;
    }
    else if (experience < 5) {
      return 600;
    }
    else {
      return 1000;
    }
  }
  getDeveloperLines(mode, experience) {
    if (mode === 'easy') {
      if (experience < 0) {
        alert('Опыт должен быть больше 0 лет');
      }
      else if (experience < 2) {
        return this.getRandomInRange(400, 600);
      }
      else if (experience < 5) {
        return this.getRandomInRange(700, 900);
      }
      else {
        return this.getRandomInRange(1000, 1400);
      }
    }
    else if (mode === 'medium') {
      if (experience < 0) {
        alert('Опыт должен быть больше 0 лет');
      }
      else if (experience < 2) {
        return this.getRandomInRange(300, 500);
      }
      else if (experience < 5) {
        return this.getRandomInRange(600, 800);
      }
      else {
        return this.getRandomInRange(800, 1200);
      }
    }
    else if (mode === 'hard') {
      if (experience < 0) {
        alert('Опыт должен быть больше 0 лет');
      }
      else if (experience < 2) {
        return this.getRandomInRange(200, 400);
      }
      else if (experience < 5) {
        return this.getRandomInRange(500, 700);
      }
      else {
        return this.getRandomInRange(800, 1000);
      }
    }
  }
}




