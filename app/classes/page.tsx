export default function ClassesPage() {
    // Here, fetch your courses from the DB or a custom data source
    const mockCourses = [
      {
        id: "1",
        title: "Intro to Tech Support",
        description: "Master basic troubleshooting skills...",
        price: 49
      },
      {
        id: "2",
        title: "Advanced Gaming Support",
        description: "Dive deep into gaming community management...",
        price: 99
      },
      // ...
    ];
  
    return (
      <div className="classes-container">
        <h1>Classes</h1>
        <div className="course-grid">
          {mockCourses.map(course => (
            <div key={course.id} className="course-card">
              <h2>{course.title}</h2>
              <p>{course.description}</p>
              <span>${course.price}</span>
              <button>Purchase</button>
            </div>
          ))}
        </div>
      </div>
    );
  }
  