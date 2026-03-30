// GrowthX Scroll to Pricing
function scrollToPricing() {
    const pricing = document.getElementById("pricing");
    if(pricing) pricing.scrollIntoView({ behavior: "smooth" });
}

// Job Portal Functionality
let jobs = [];
let savedJobs = [];

async function loadJobs() {
    try {
        const res = await fetch('jobs.json');
        jobs = await res.json();
        displayJobs(jobs);
        displaySavedJobs();
    } catch(e) {
        console.error("Failed to load jobs:", e);
    }
}

function displayJobs(list) {
    const container = document.getElementById("jobList");
    if(!container) return;
    container.innerHTML = '';
    list.forEach(job => {
        const div = document.createElement("div");
        div.className = "job-card";
        div.innerHTML = `
            <h3>${job.role}</h3>
            <p>${job.company} | ${job.location}</p>
            <button onclick="openPopup('${job.role}')">Apply</button>
            <button onclick="saveJob('${job.role}')">Save Job</button>
        `;
        container.appendChild(div);
    });
}

function saveJob(role) {
    if(!savedJobs.includes(role)) savedJobs.push(role);
    displaySavedJobs();
}

function displaySavedJobs() {
    const container = document.getElementById("savedJobs");
    if(!container) return;
    container.innerHTML = '';
    savedJobs.forEach(job => {
        const div = document.createElement("div");
        div.className = "job-card";
        div.innerHTML = `<h3>${job}</h3>`;
        container.appendChild(div);
    });
}

function openPopup(role) {
    const popup = document.getElementById("popup");
    popup.style.display = "flex";
}

function closePopup() {
    const popup = document.getElementById("popup");
    popup.style.display = "none";
}

function submitForm() {
    alert("Application submitted!");
    closePopup();
}

// Initialize Job Portal
document.addEventListener('DOMContentLoaded', () => {
    if(document.getElementById("jobList")) loadJobs();
});
