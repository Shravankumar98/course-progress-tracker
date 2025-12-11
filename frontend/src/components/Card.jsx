import "./Card.css";
import { useNavigate } from "react-router";

const Card = ({ id, title, lessons, progress = 0 }) => {
  const navigate = useNavigate();
  return (
    <div
      className="card"
      onClick={() => navigate(window.location.pathname + "courses/" + id)}
    >
      <h2 className="card-title">{title}</h2>
      {lessons && (
        <p className="card-subtitle">
          {lessons.map((lesson, i) => (
            <span key={lesson.id}>
              {lesson.title + (i !== lessons.length - 1 ? ", " : ".")}
            </span>
          ))}
        </p>
      )}
      <div className="card-progress-bar">
        <div className="card-progress" style={{ width: `${progress}%` }}></div>
      </div>
      <div className="card-footer">More →</div>
    </div>
  );
};

export default Card;
