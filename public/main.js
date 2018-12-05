(async function () {
  let isOn = false;
  let tick = 0;
  let mode = undefined;
  let budget = 0;
  let time = 0;
  let intervalID;
  let totalSalary = 0;
  let totalLines = 0;
  let isModeSelected = false;

  let DOM = new Dom();
  let utils = new Utils();
  let projects = [];
  let managers = [];
  let developers = [];
  let freeDevelopers = [];
  let freeManagers = [];
  let freeProjects = [];

  DOM.startButton.addEventListener('click', async () => {
    if (!isModeSelected) {
      error('Choose mode!');
    } else {
      isOn = true;
      projects = await utils.getData('projects');
      managers = await utils.getData('managers');
      developers = await utils.getData('developers');
      const companyName = DOM.companyNameInput.value;
      const id = await fetch(`http://localhost:8080/companies/?name=${companyName}`, { method: "POST" }).then(res => res.json()).then(data => data);
      const company = await fetch(`http://localhost:8080/companies/${id}`, { method: "GET" }).then(res => res.json()).then(data => data);
      DOM.userCompanyName.innerHTML = company.name;
      DOM.userSettings.className = "hide";
      intervalID = window.setInterval(mainFunc, tick);

      async function mainFunc() {
        time = time + 1;
        totalLines = 0;

        for (let project of projects) {
          // Если проект завершен
          if (project.remainsLinesOfCode <= 0) {
            budget = budget + project.cost;
            project.manager.state = 'Free';
            freeManagers.push(project.manager);
            DOM.userManagers.children[projects.indexOf(project)].children[0].innerHTML = 'Project: Free';
            // Все разработчики, связанные с выполненным проектом помещаются в freeDevelopers
            for (let developer of project.manager.developers) {
              developer.state = 'Free';
              freeDevelopers.push(developer);
            }
            // Обновление DOM для всех разработчиков, связанных с выполненным проектом
            for (let developer of DOM.userDevelopers.children) {
              if (developer.children[0].innerHTML === `Project: ${project.name}`) {
                developer.children[0].innerHTML = 'Project: Free';
              }
            }
            // Удаление проекта в projects и DOM
            DOM.userProjects.removeChild(DOM.userProjects.children[projects.indexOf(project)]);
            await fetch(`http://localhost:8080/projects/${project.id}`, { method: "DELETE" });
            projects = await utils.getData('projects');
          } else {
            // Если проект не завершён
            if (project.manager !== null) {
              // Если есть менеждер считаем строки кода
              for (let developer of project.manager.developers) {
                totalLines = totalLines + developer.lines;
              }

              totalLines = totalLines * project.manager.quotient;
            }
            // Обновляем оставшееся количество строк у проекта
            if (project.remainsLinesOfCode - totalLines < 0) {
              project.remainsLinesOfCode = 0;
            } else {
              project.remainsLinesOfCode = Math.round(project.remainsLinesOfCode - totalLines);
            }
            DOM.userProjects.children[projects.indexOf(project)].children[0].innerHTML = `Lines left: ${project.remainsLinesOfCode}`;
            totalLines = 0;
          }
        }

        DOM.timeDiv.innerHTML = time;
        DOM.budgetDiv.innerHTML = budget;
        DOM.userStatistics.innerHTML = `You have ${managers.length} managers
				                                and ${developers.length} developers`;

        budget = budget - getTotalSalary();

        if (budget <= 0) {
          stop();
          alert("You lose :(");
        }
      }
    }
  });

  DOM.stopButton.addEventListener('click', () => {
    stop();
  });

  DOM.easyButton.addEventListener('click', () => {
    isModeSelected = true;
    mode = 'easy';
    budget = 1000000;
    tick = 3000;
    DOM.isEasySelected(time, budget);
  });

  DOM.mediumButton.addEventListener('click', () => {
    isModeSelected = true;
    mode = 'medium';
    budget = 500000;
    tick = 2000;
    DOM.isMediumSelected(time, budget);
  });

  DOM.hardButton.addEventListener('click', () => {
    isModeSelected = true;
    mode = 'hard';
    budget = 250000;
    tick = 1000;
    DOM.isHardSelected(time, budget);
  });

  // Добавление нового проекта
  DOM.addProjectButton.addEventListener('click', async () => {
    if (isOn) {
      const projectName = DOM.projectNameInput.value;
      if (utils.isProjectExists(projectName, projects, freeProjects)) {
        error('Project with this name already exists!');
      } else {
        const id = await fetch(`http://localhost:8080/projects/?name=${projectName}&mode=${mode}`, { method: "POST" }).then(res => res.json()).then(data => data);
        const project = await fetch(`http://localhost:8080/projects/${id}`, { method: "GET" }).then(res => res.json()).then(data => data);
        DOM.createNewProject(project.name, project.cost, project.linesOfCode, project.remainsLinesOfCode);
        freeProjects.push(project);
        let manager = null;

        if (freeManagers.length !== 0) {
          // Берём первого свободного менеджера на проект
          manager = freeManagers[0];
          manager.state = freeProjects[0].name;
          freeProjects[0].manager = manager;
          projects.push(freeProjects[0]);

          // Берём макс. 5 свободных разработчиков на проект
          for (let developer of freeDevelopers) {
            if (manager.developers < 5) {
              manager.developers.push(developer);
            }
          }

          // Обновляем DOM для разработчиков, взятых на проект
          let count = 0;
          for (let developer of DOM.userDevelopers.children) {
            if (count < 5) {
              if (developer.children[0].innerHTML === 'Project: Free') {
                developer.children[0].innerHTML = `Project: ${freeProjects[0].name}`;
                count++;
              }
            }
          }

          freeManagers.pop();

          // Обновляем DOM для менеждера, взятого на проект
          for (let manager of DOM.userManagers.children) {
            if (manager.children[0].innerHTML === 'Project: Free') {
              manager.children[0].innerHTML = `Project: ${freeProjects[0].name}`;
              break;
            }
          }
          freeProjects.shift();
        }
      }
    } else {
      error('You need to choose mode and start the game first!');
    }
  });

  // Добавление нового менеджера
  DOM.addManagerButton.addEventListener('click', async () => {
    if (isOn) {
      const managerName = DOM.managerNameInput.value;
      const managerSurname = DOM.managerSurnameInput.value;
      if (utils.isManagerExists(managerName, managerSurname, managers)) {
        error("Manager with this name and surname already exists!");
      } else {
        const managerExperience = DOM.managerExperienceInput.value;
        const fireButton = document.createElement('div');
        const div = document.createElement('div');
        const id = await fetch(`http://localhost:8080/managers/?name=${managerName}&surname=${managerSurname}&experience=${managerExperience}`,
          { method: "POST" }).then(res => res.json()).then(data => data);
        const manager = await fetch(`http://localhost:8080/managers/${id}`, { method: "GET" }).then(res => res.json()).then(data => data);
        if (freeProjects.length === 0) {
          // Если нет свободных проектов
          manager.state = 'Free';
          managers.push(manager);
          freeManagers.push(manager);
        } else
        // Если есть свободный проект
        {
          manager.state = freeProjects[0].name;
          managers.push(manager);
          freeProjects[0].manager = manager;
          projects.push(freeProjects[0]);

          // Берём макс. 5 свободных разработчиков на проект
          for (let developer of freeDevelopers) {
            if (manager.developers < 5) {
              manager.developers.push(developer);
            }
          }

          // Обновляем DOM для разработчиков, взятых на проект
          let count = 0;
          for (let developer of DOM.userDevelopers.children) {
            if (count < 5) {
              if (developer.children[0].innerHTML === 'Project: Free') {
                developer.children[0].innerHTML = `Project: ${freeProjects[0].name}`;
                count++;
              }
            }
          }
        }
        freeProjects.shift();

        DOM.createNewManager(manager.name, manager.surname, manager.experience, manager.quotient, manager.state, fireButton, div);

        // Увольнение менеджера
        fireButton.addEventListener('click', async () => {
          if (manager.state === 'Free') {
            // Если свободный
            await fetch(`http://localhost:8080/managers/${manager.id}`, { method: "DELETE" });
            managers = await utils.getData('managers');
            freeManagers.splice(managers.indexOf(manager), 1);
            DOM.userManagers.removeChild(div);
          } else
          // Если занятый на проекте
          {
            await fetch(`http://localhost:8080/managers/${manager.id}`, { method: "DELETE" });
            managers = await utils.getData('managers');
            // Освобождаем разработчиков, работающих на этом проекте
            for (let developer of manager.developers) {
              developer.state = 'Free';
              freeDevelopers.push(developer);
            }

            for (let project of projects) {
              // Находим проект, связанный с этим менеджером
              if (project.manager !== null) {
                if (project.manager.name === manager.name && project.manager.surname === manager.surname) {
                  freeProjects.push(project);
                  project.manager = null;
                  // Обновляем DOM для разработчиков, работающих на проекте
                  for (let developer of DOM.userDevelopers.children) {
                    if (developer.children[0].innerHTML === `Project: ${project.name}`) {
                      developer.children[0].innerHTML = 'Project: Free';
                    }
                  }
                }
              }
            }
            DOM.userManagers.removeChild(div);
          }
        });
      }
    } else {
      error('You need to choose mode and start the game first!');
    }
  });

  // Добавление нового разработчика
  DOM.addDeveloperButton.addEventListener('click', async () => {
    if (isOn) {
      if (developers.length >= managers.length * 5) {
        error("You don't have enough managers!");
      } else {
        const developerName = DOM.developerNameInput.value;
        const developerSurname = DOM.developerSurnameInput.value;
        if (utils.isDeveloperExists(developerName, developerSurname, developers)) {
          error("Developer with this name and surname already exists!");
        } else {
          const developerExperience = DOM.developerExperienceInput.value;
          const id = await fetch(`http://localhost:8080/developers/?name=${developerName}&surname=${developerSurname}&experience=${developerExperience}&mode=${mode}`,
            { method: "POST" }).then(res => res.json()).then(data => data);
          const developer = await fetch(`http://localhost:8080/developers/${id}`, { method: "GET" }).then(res => res.json()).then(data => data);
          let hired = false;
          const fireButton = document.createElement('div');
          const div = document.createElement('div');

          // Если есть проект с менеджером и менее 5 разработчиков, то добавляем разработчика на проект
          for (let project of projects) {
            if (project.manager !== null) {
              if (project.manager.developers.length < 5) {
                developers.push(developer);
                project.manager.developers.push(developer);
                developer.state = project.name;
                hired = true;
                break;
              }
            }
          }

          // Если подходящего проекта не нашлось
          if (hired === false) {
            developers.push(developer);
            freeDevelopers.push(developer);
            developer.state = 'Free';
          }

          DOM.createNewDeveloper(developer.name, developer.surname, developer.experience, developer.lines, developer.state, fireButton, div);

          // Увольнение разработчика
          fireButton.addEventListener('click', async () => {
            if (developer.state === 'Free') {
              // Если свободный

              freeDevelopers.splice(developers.indexOf(developer), 1);
              await fetch(`http://localhost:8080/developers/${developer.id}`, { method: "DELETE" });
              developers = await utils.getData('developers');
              DOM.userDevelopers.removeChild(div);
            } else
            // Если занятый на проекте
            {
              // Ищем на каком проекте работает и удаляем
              for (let project of projects) {
                if (project.manager.developers.indexOf(developer) !== -1) {
                  project.manager.developers.splice(project.manager.developers.indexOf(developer), 1);
                }
              }
              await fetch(`http://localhost:8080/developers/${developer.id}`, { method: "DELETE" });
              developers = await utils.getData('developers');
              DOM.userDevelopers.removeChild(div);
            }
          });
        }
      }
    } else {
      error('You need to choose mode and start the game first!');
    }
  });

  async function stop() {
    clearInterval(intervalID);
    DOM.clearDOM();
    time = 0;
    budget = 0;
    freeDevelopers = [];
    freeManagers = [];
    freeProjects = [];
    await utils.deleteData('companies');
    await utils.deleteData('projects');
    await utils.deleteData('managers');
    await utils.deleteData('developers');
    isOn = false;
  }

  function getTotalSalary() {
    totalSalary = 0;
    for (let developer of developers) {
      totalSalary = totalSalary + developer.salary;
    }
    for (let manager of managers) {
      totalSalary = totalSalary + manager.salary;
    }
    return totalSalary;
  }

  function error(text) {
    DOM.error.innerHTML = `Error: ${text}`;
    setTimeout(() => {
      DOM.error.innerHTML = '';
    }, 2000);
  }
})();