import { useState } from "react";

const jobListings = [
  {
    id: 1,
    company: "Photosnap",
    logo: "photosnap.png",
    isNew: true,
    isFeatured: true,
    position: "Senior Frontend Developer",
    posted: "1d ago",
    contract: "Full Time",
    location: "USA only",
    tags: ["Frontend", "Senior", "HTML", "CSS", "JavaScript"],
  },
  {
    id: 2,
    company: "Manage",
    logo: "manage.png",
    isNew: true,
    isFeatured: true,
    position: "Fullstack Developer",
    posted: "1d ago",
    contract: "Part Time",
    location: "Remote",
    tags: ["Fullstack", "Midweight", "Python", "React"],
  },
  {
    id: 3,
    company: "Account",
    logo: "account.png",
    isNew: true,
    isFeatured: false,
    position: "Junior Frontend Developer",
    posted: "2d ago",
    contract: "Part Time",
    location: "USA only",
    tags: ["Frontend", "Junior", "React", "Sass", "JavaScript"],
  },
];

export default function JobBoard() {
  const [filters, setFilters] = useState([]);

  const addFilter = (tag) => {
    if (!filters.includes(tag)) {
      setFilters([...filters, tag]);
    }
  };

  const removeFilter = (tag) => {
    setFilters(filters.filter((f) => f !== tag));
  };

  const clearFilters = () => {
    setFilters([]);
  };

  const filteredJobs = filters.length
    ? jobListings.filter((job) => filters.every((tag) => job.tags.includes(tag)))
    : jobListings;

  return (
    <div className="bg-teal-100 min-h-screen p-6">
      {filters.length > 0 && (
        <div className="bg-white p-4 flex gap-2 rounded shadow-md mb-6">
          {filters.map((filter) => (
            <span key={filter} className="bg-teal-500 text-white px-2 py-1 rounded flex items-center">
              {filter}
              <button onClick={() => removeFilter(filter)} className="ml-2">&times;</button>
            </span>
          ))}
          <button onClick={clearFilters} className="ml-auto text-teal-700">Clear</button>
        </div>
      )}

      {filteredJobs.map((job) => (
        <div key={job.id} className="bg-white p-6 rounded-lg shadow-md flex flex-wrap gap-4 mb-4 items-center">
          <div>
            <h3 className="text-lg font-bold text-teal-700">{job.company}</h3>
            <p className="text-gray-700">{job.position}</p>
            <div className="text-gray-500 text-sm">{job.posted} · {job.contract} · {job.location}</div>
          </div>
          <div className="ml-auto flex gap-2 flex-wrap">
            {job.tags.map((tag) => (
              <span
                key={tag}
                onClick={() => addFilter(tag)}
                className="bg-teal-200 text-teal-800 px-2 py-1 rounded cursor-pointer hover:bg-teal-400"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
