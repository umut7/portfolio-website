const githubApiUrl = 'https://api.github.com/users/umut7/repos?sort=created&direction=desc';

async function fetchProjects() {
    const response = await fetch(githubApiUrl);
    const projects = await response.json();

    const recentProjects = projects.slice(0, 3); 
    const projectsContainer = document.getElementById('projects');
    projectsContainer.innerHTML = ''; 

    recentProjects.forEach(project => {
        const projectElement = document.createElement('div');
        projectElement.innerHTML = `
            <h3><a href="${project.html_url}" target="_blank">${project.name}</a></h3>
            <p>${project.description || 'No description available'}</p>
        `;
        projectsContainer.appendChild(projectElement);
    });
}

document.addEventListener('DOMContentLoaded', function() {
    const modeToggle = document.getElementById('mode-toggle');
    
    if (localStorage.getItem('dark-mode') === 'enabled') {
        document.body.classList.add('dark-mode');
        modeToggle.textContent = '☀️'; 
    } else {
        document.body.classList.remove('dark-mode');
        modeToggle.textContent = '🌙'; 
    }

    modeToggle.addEventListener('click', function() {
        document.body.classList.toggle('dark-mode');
        
        if (document.body.classList.contains('dark-mode')) {
            localStorage.setItem('dark-mode', 'enabled');
            this.textContent = '☀️'; 
        } else {
            localStorage.setItem('dark-mode', 'disabled');
            this.textContent = '🌙'; 
        }
    });

    window.onload = fetchProjects; 
});
