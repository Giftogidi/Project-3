document.addEventListener("DOMContentLoaded", function () {
    const jobListings = document.querySelectorAll(".job");
    const selectedFiltersContainer = document.getElementById("selected-filters");
    const filterBar = document.getElementById("filter-bar");
    const clearButton = document.getElementById("clear-filters");
    let selectedTags = new Set();

    document.querySelectorAll(".tag").forEach(tag => {
        tag.addEventListener("click", function () {
            const tagText = this.getAttribute("data-tag");

            if (selectedTags.has(tagText)) {
                selectedTags.delete(tagText);
            } else {
                selectedTags.add(tagText);
            }

            updateFilterBar();
            filterJobs();
        });
    });

    function updateFilterBar() {
        selectedFiltersContainer.innerHTML = "";

        selectedTags.forEach(tag => {
            const filterTag = document.createElement("span");
            filterTag.className = "bg-blue-500 text-white px-2 py-1 rounded flex items-center";
            filterTag.innerHTML = `${tag} <button class='ml-2 text-white font-bold'>&times;</button>`;
            filterTag.querySelector("button").addEventListener("click", () => {
                selectedTags.delete(tag);
                updateFilterBar();
                filterJobs();
            });
            selectedFiltersContainer.appendChild(filterTag);
        });

        filterBar.style.display = selectedTags.size > 0 ? "flex" : "none";
    }

    function filterJobs() {
        jobListings.forEach(job => {
            const jobTags = job.getAttribute("data-tags").split(",").map(tag => tag.trim());
            const matches = [...selectedTags].some(tag => jobTags.includes(tag));

            if (selectedTags.size === 0 || matches) {
                job.style.display = "flex";
            } else {
                job.style.display = "none";
            }
        });
    }

    clearButton.addEventListener("click", function () {
        selectedTags.clear();
        updateFilterBar();
        filterJobs();
    });
});