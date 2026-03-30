let jobsData = [];
const jobList = document.getElementById("jobList");
const savedJobsContainer = document.getElementById("savedJobs");

// FETCH JOBS FROM JSON
fetch("jobs.json")
    .then(response => response.json())
    .then(data => {
        jobsData = data;
        displayJobs(jobsData);
    });

// DISPLAY JOBS FUNCTION
function displayJobs(jobs) {
    jobList.innerHTML = "";
    jobs.forEach(job => {
        const div = document.createElement("div");
        div.className = "job-card";
        div.innerHTML = `
            <h3>${job.title}</h3>
            <p>Company: ${job.company}</p>
            <p>Location: ${job.location}</p>
            <button onclick="openPopup()">Apply</button>
            <button onclick="saveJob(this)">❤️ Save</button>
        `;
        jobList.appendChild(div);
    });
}

// SEARCH FUNCTION
document.getElementById("search").addEventListener("keyup", function() {
    const filter = this.value.toLowerCase();
    const filtered = jobsData.filter(job => 
        job.title.toLowerCase().includes(filter) ||
        job.company.toLowerCase().includes(filter) ||
        job.location.toLowerCase().includes(filter)
    );
    displayJobs(filtered);
});

// FILTERS
document.getElementById("roleFilter").addEventListener("change", filterJobs);
document.getElementById("locationFilter").addEventListener("change", filterJobs);

function filterJobs() {
    const role = document.getElementById("roleFilter").value;
    const location = document.getElementById("locationFilter").value;

    let filtered = jobsData;

    if (role) filtered = filtered.filter(job => job.title === role);
    if (location) filtered = filtered.filter(job => job.location === location);

    displayJobs(filtered);
}

// POPUP FUNCTIONS
function openPopup() { document.getElementById("popup").style.display = "block"; }
function closePopup() { document.getElementById("popup").style.display = "none"; }
function submitForm() { alert("Application submitted!"); closePopup(); }

// SAVE JOB FUNCTION
function saveJob(button) {
    const jobCard = button.parentElement;
    const jobText = jobCard.innerText;

    let savedJobs = JSON.parse(localStorage.getItem("jobs")) || [];

    if (!savedJobs.includes(jobText)) {
        savedJobs.push(jobText);
        localStorage.setItem("jobs", JSON.stringify(savedJobs));
        alert("Job saved!");
        loadSavedJobs();
    } else {
        alert("Already saved!");
    }
}

// LOAD SAVED JOBS
function loadSavedJobs() {
    const savedJobs = JSON.parse(localStorage.getItem("jobs")) || [];
    savedJobsContainer.innerHTML = "";

    savedJobs.forEach(job => {
        const div = document.createElement("div");
        div.className = "job-card";
        div.innerText = job;
        savedJobsContainer.appendChild(div);
    });
}

window.onload = loadSavedJobs;
