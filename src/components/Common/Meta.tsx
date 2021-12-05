const Meta: React.FC = ({ points, comments }) => {
  return (
    <div style={{ display: "flex", marginTop: "12px", alignItems: "center" }}>
      <div
        style={{ display: "flex", alignItems: "center", marginRight: "8px" }}
      >
        <img src="./upvote.svg" height="14px" width="14px" />
        <p style={{ fontSize: "12px", marginLeft: "4px" }}>{points}</p>
      </div>
      <div
        style={{ display: "flex", alignItems: "center", marginRight: "8px" }}
      >
        <img src="./comment.svg" height="14px" width="14px" />
        <p style={{ fontSize: "12px", marginLeft: "4px" }}>{comments}</p>
      </div>
    </div>
  );
};

export default Meta;
