const searchInput = document.getElementById("search");

searchInput.addEventListener("keyup", function() {
    const filter = searchInput.value.toLowerCase();
    const jobs = document.querySelectorAll(".job-card");

    jobs.forEach(job => {
        const text = job.innerText.toLowerCase();
        if (text.includes(filter)) {
            job.style.display = "block";
        } else {
            job.style.display = "none";
        }
    });
});
