document.addEventListener('DOMContentLoaded', function () {
    const modeToggle = document.getElementById('mode-toggle');

    if (localStorage.getItem('dark-mode') === 'enabled') {
        document.body.classList.add('dark-mode');
        modeToggle.textContent = '☀️'; 
    } else {
        document.body.classList.remove('dark-mode');
        modeToggle.textContent = '🌙'; 
    }

    modeToggle.addEventListener('click', function () {
        document.body.classList.toggle('dark-mode');
        
        if (document.body.classList.contains('dark-mode')) {
            localStorage.setItem('dark-mode', 'enabled');
            this.textContent = '☀️'; 
        } else {
            localStorage.setItem('dark-mode', 'disabled');
            this.textContent = '🌙'; 
        }
    });

    const githubApiUrl = 'https://api.github.com/users/umut7/repos?sort=created&direction=desc';
    const projectsPerPage = 10; 
    let currentPage = 1; 

    async function fetchProjects(page = 1) {
        const response = await fetch(`${githubApiUrl}&page=${page}&per_page=${projectsPerPage}`);
        const projects = await response.json();
        return projects;
    }

    function renderProjects(projects) {
        const projectsContainer = document.getElementById('projects-list');
        projectsContainer.innerHTML = ''; 

        projects.forEach(project => {
            const projectElement = document.createElement('div');
            projectElement.innerHTML = `
                <h3><a href="${project.html_url}" target="_blank">${project.name}</a></h3>
                <p>${project.description || 'No description available'}</p>
            `;
            projectsContainer.appendChild(projectElement);
        });
    }

    document.getElementById('next-btn').addEventListener('click', async function () {
        currentPage++;
        const projects = await fetchProjects(currentPage);
        renderProjects(projects);
        updatePaginationButtons();
    });

    document.getElementById('prev-btn').addEventListener('click', async function () {
        currentPage--;
        const projects = await fetchProjects(currentPage);
        renderProjects(projects);
        updatePaginationButtons();
    });

    function updatePaginationButtons() {
        document.getElementById('prev-btn').disabled = currentPage === 1; 
        document.getElementById('next-btn').disabled = currentPage * projectsPerPage >= 38; 
    }

    window.onload = async () => {
        const projects = await fetchProjects(currentPage);
        renderProjects(projects);
        updatePaginationButtons();
    };
});
