import "./CircularProgress.css";

const CircularProgress = ({ size = 120, progress = 65, stroke = 10, color = "#4caf50" }) => {
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <div
      className="circular-progress"
      style={{
        width: size,
        height: size,
        "--stroke": `${stroke}px`,
        "--radius": radius,
        "--circumference": circumference,
        "--offset": offset,
        "--color": color
      }}
    >
      <svg width={size} height={size}>
        {/* background circle */}
        <circle
          className="bg"
          cx={size / 2}
          cy={size / 2}
          r={radius}
        />
        {/* progress circle */}
        <circle
          className="progress"
          cx={size / 2}
          cy={size / 2}
          r={radius}
        />
      </svg>
      <div className="label">{progress}%</div>
    </div>
  );
};

export default CircularProgress;
