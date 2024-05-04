import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import APIConfig from "../utils/APIConfig";
import Header from "./Header";
import Loader from "../pages/Loader";
import IssueCard from "./IssueCard";

const ViewRepositories = () => {
  const { repoName, owner } = useParams();
  const [repo, setRepo] = useState(null);
  const [issue, setIssue] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRepo = async () => {
      try {
        const res = await APIConfig({
          url: `/repos/${owner}/${repoName}`,
          method: "GET",
        });
        setRepo(res);
      } catch (error) {
        console.error(error);
      }
    };
    const fetchIssue = async () => {
      try {
        const res = await APIConfig({
          url: `/repos/${owner}/${repoName}/issues?per_page=5`,
          method: "GET",
        });
        setIssue(res);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
    fetchRepo();
    fetchIssue();
  }, [repoName, owner]);

  if (loading) {
    return (
      <>
        <Header />
        <Loader />
      </>
    );
  }
  return (
    <>
      <Header />
      <section className="bg-slate-700 h-full flex justify-center">
        <div className="bg-gray-200 shadow-lg rounded-lg w-1/2 m-5">
          <div className="flex items-center justify-start m-5 gap-5">
            <img
              src={repo.owner.avatar_url}
              alt="owner img"
              className="rounded-full h-28 w-28 object-cover"
            />
            <div>
              <h2 className="text-3xl font-semibold">{repo.full_name}</h2>
              <p className="text-gray-600">{repo.description}</p>
            </div>
          </div>
          <div className="flex justify-between items-center m-4 font-semibold">
            <div className="flex flex-col items-center">
              <h5 className="text-3xl">{repo.stargazers_count}</h5>
              <span>Stars</span>
            </div>
            <div className="flex flex-col items-center">
              <h5 className="text-3xl">{repo.forks}</h5>
              <span>Forks</span>
            </div>
            <div className="flex flex-col items-center">
              <h5 className="text-3xl">{repo.open_issues_count}</h5>
              <span>Open issues</span>
            </div>
          </div>
          {issue ? (
            <div className="p-5 mb-2">
              {issue.map((i) => (
                <IssueCard
                  title={i.title}
                  html_url={i.html_url}
                  user={i.user.login}
                  avatar_url={i.user.avatar_url}
                />
              ))}
            </div>
          ) : (
            ""
          )}
        </div>
      </section>
    </>
  );
};

export default ViewRepositories;
