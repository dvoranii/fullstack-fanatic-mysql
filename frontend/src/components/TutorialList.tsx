import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

interface Tutorial {
  id: number;
  title: string;
  content: string;
  created_at: string;
}

const TutorialList: React.FC = () => {
  const [tutorials, setTutorials] = useState<Tutorial[]>([]);

  useEffect(() => {
    fetch("/api/tutorials")
      .then((response) => response.json())
      .then((data) => setTutorials(data));
  }, []);

  return (
    <div>
      <h1>Tutorials</h1>
      <div className="tutorial-list">
        {tutorials.map((tutorial) => (
          <Link to={`/tutorial/${tutorial.id}`} key={tutorial.id}>
            <div className="tutorial-thumbnail">
              <h2>{tutorial.title}</h2>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default TutorialList;
