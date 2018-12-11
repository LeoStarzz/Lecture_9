class Dom {
	constructor() {
	this.companyNameInput = document.querySelector('.company-name-input');
	this.startButton = document.querySelector('.start');
	this.stopButton = document.querySelector('.stop');
	this.easyButton = document.querySelector('.easy');
	this.mediumButton = document.querySelector('.medium');
	this.hardButton = document.querySelector('.hard');
	this.timeDiv = document.querySelector('.time');
	this.budgetDiv = document.querySelector('.budget');
	this.addProjectButton = document.querySelector('.add-project');
	this.projectNameInput = document.querySelector('.project-name-input');
	this.addManagerButton = document.querySelector('.add-manager');
	this.managerNameInput = document.querySelector('.manager-name-input');
	this.managerSurnameInput = document.querySelector('.manager-surname-input');
	this.managerExperienceInput = document.querySelector('.manager-experience-input');
	this.developerNameInput = document.querySelector('.developer-name-input');
	this.developerSurnameInput = document.querySelector('.developer-surname-input');
	this.developerExperienceInput = document.querySelector('.developer-experience-input');
	this.addDeveloperButton = document.querySelector('.add-developer');
	this.userProjects = document.querySelector('.user-projects');
	this.userManagers = document.querySelector('.user-managers');
	this.userDevelopers = document.querySelector('.user-developers');
	this.userCompanyName = document.querySelector('.user-company-name');
	this.userSettings = document.querySelector('.settings');
	this.userStatistics = document.querySelector('.statistics');
	this.error = document.querySelector('.error');
	}

	clearDOM() {
		this.timeDiv.innerHTML = '';
		this.budgetDiv.innerHTML = '';
		this.companyNameInput.value = '';
		this.projectNameInput.value = '';
		this.managerNameInput.value = '';
		this.managerSurnameInput.value = '';
		this.managerExperienceInput.value = '';
		this.developerNameInput.value = '';
		this.developerSurnameInput.value = '';
		this.developerExperienceInput.value = '';
		this.easyButton.classList.remove('button-active');
		this.mediumButton.classList.remove('button-active');
		this.hardButton.classList.remove('button-active');
    this.userSettings.className = "show";
    this.userStatistics.innerHTML = "";

		while (this.userProjects.firstChild) {
			this.userProjects.removeChild(this.userProjects.firstChild);
		}
		while (this.userManagers.firstChild) {
			this.userManagers.removeChild(this.userManagers.firstChild);
		}
		while (this.userDevelopers.firstChild) {
			this.userDevelopers.removeChild(this.userDevelopers.firstChild);
		}
	}

	createNewDeveloper(name, surname, experience, lines, state, fireButton, div) {
		fireButton.className = 'fire';
		fireButton.innerHTML = 'Fire';
		div.appendChild(document.createTextNode('Name:' + ' ' + name + ', '));
		div.appendChild(document.createTextNode('Surname:' + ' ' + surname + ', '));
		div.appendChild(document.createTextNode('Experience:' + ' ' + experience + ', '));
		div.appendChild(document.createTextNode('Lines:' + ' ' + lines + ', '));
		const p = document.createElement('p');
		p.className = "inline";
		p.appendChild(document.createTextNode('Project:' + ' ' + state));
		div.appendChild(p);
		div.appendChild(fireButton);
		this.userDevelopers.appendChild(div);
	}

	createNewManager(name, surname, experience, quotient, state, fireButton, div) {
		fireButton.className = 'fire';
		fireButton.innerHTML = 'Fire';
		div.appendChild(document.createTextNode('Name:' + ' ' + name + ', '));
		div.appendChild(document.createTextNode('Surname:' + ' ' + surname + ', '));
		div.appendChild(document.createTextNode('Experience:' + ' ' + experience + ', '));
		div.appendChild(document.createTextNode('Quotient:' + ' ' + quotient + ', '));
		const p = document.createElement('p');
		p.appendChild(document.createTextNode('Project:' + ' ' + state));
		p.className = "inline";
		div.appendChild(p);
		div.appendChild(fireButton);
		this.userManagers.appendChild(div);
	}

	createNewProject(name, cost, linesOfCode, remainsLinesOfCode) {
		const div = document.createElement('div');
		div.appendChild(document.createTextNode('Name:' + ' ' + name + ', '));
		div.appendChild(document.createTextNode('Cost:' + ' ' + cost + ', '));
		div.appendChild(document.createTextNode('Lines needed:' + ' ' + linesOfCode + ', '));
		const p = document.createElement('p');
		p.appendChild(document.createTextNode('Lines left:' + ' ' + remainsLinesOfCode));
		div.appendChild(p);
		this.userProjects.appendChild(div);
	}

	isEasySelected(time, budget) {
		this.timeDiv.innerHTML = time;
		this.budgetDiv.innerHTML = budget;
		this.easyButton.className = 'easy button-active';
		this.mediumButton.className = 'medium';
		this.hardButton.className = 'hard';
	}

	isMediumSelected(time, budget) {
		this.timeDiv.innerHTML = time;
		this.budgetDiv.innerHTML = budget;
		this.mediumButton.className = 'medium button-active';
		this.easyButton.className = 'easy';
		this.hardButton.className = 'hard';
	}

	isHardSelected(time, budget) {
		this.timeDiv.innerHTML = time;
		this.budgetDiv.innerHTML = budget;
		this.hardButton.className = 'hard button-active';
		this.easyButton.className = 'easy';
		this.mediumButton.className = 'medium';
	}
}