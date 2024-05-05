const IssueCard = ({ title, user, html_url, avatar_url }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg p-3 my-3">
      <h3 className="text-lg lg:text-xl font-semibold mb-2">{title}</h3>
      <div className="flex items-center">
        <span className="text-sm mr-2">Issue Created By : </span>

        <span className="text-gray-600">{user}</span>
      </div>
      <a
        href={html_url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-500 hover:underline block mt-2"
      >
        View Issue
      </a>
    </div>
  );
};

export default IssueCard;
