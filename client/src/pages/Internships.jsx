import Navbar from "../components/Navbar";

const Internships = () => {
  const internships = [
    { id: 1, company: "Google", role: "Frontend Developer" },
    { id: 2, company: "Amazon", role: "Backend Intern" },
    { id: 3, company: "Microsoft", role: "ML Engineer Intern" },
  ];

  return (
    <>
      <Navbar />
      <div className="internships">
        <h2>Available Internships</h2>
        {internships.map((job) => (
          <div key={job.id} className="card">
            <h3>{job.company}</h3>
            <p>{job.role}</p>
            <button className="btn">Apply</button>
          </div>
        ))}
      </div>
    </>
  );
};

export default Internships;