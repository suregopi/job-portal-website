let jobs = [];
let savedJobs = [];

fetch('jobs.json')
.then(res => res.json())
.then(data => { jobs = data; displayJobs(jobs); });

function displayJobs(list) {
    const jobList = document.getElementById('jobList');
    jobList.innerHTML = '';
    list.forEach(job => {
        const div = document.createElement('div');
        div.className = 'job-card';
        div.innerHTML = `<h3>${job.title}</h3><p>${job.location}</p>
        <button onclick="openPopup('${job.title}')">Apply</button>
        <button onclick="saveJob('${job.title}')">Save</button>`;
        jobList.appendChild(div);
    });
}

function openPopup(title){ document.getElementById('popup').style.display='flex'; }
function closePopup(){ document.getElementById('popup').style.display='none'; }
function submitForm(){ alert('Application submitted!'); closePopup(); }
function saveJob(title){ 
    if(!savedJobs.includes(title)){ savedJobs.push(title); alert(title+' saved!'); } 
    displaySavedJobs(); 
}
function displaySavedJobs(){
    const savedDiv = document.getElementById('savedJobs');
    savedDiv.innerHTML = savedJobs.map(j=>`<div class="job-card">${j}</div>`).join('');
}

document.getElementById('search').addEventListener('input', e => {
    const filtered = jobs.filter(j=>j.title.toLowerCase().includes(e.target.value.toLowerCase()));
    displayJobs(filtered);
});
