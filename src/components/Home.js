import { useEffect, useState } from "react";
import APIConfig from "../utils/APIConfig";
import Loader from "../pages/Loader";
import RepoCard from "./RepoCard";
import Header from "./Header";

const Home = () => {
  const [data, setData] = useState(null);
  const [inputText, setInputtext] = useState("");

  useEffect(() => {
    async function fetchRepo() {
      try {
        let url =
          "/search/repositories?q=is:public&sort=stars&order=desc&per_page=9";
        if (inputText !== "") {
          url += `&q=${inputText}`;
        }
        const res = await APIConfig({
          url: url,
          method: "GET",
        });
        setData(res);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchRepo(); // Call the async function immediately
  }, [inputText]);

  return (
    <div className="bg-slate-700 h-screen w-screen overflow-y-auto">
      <Header />
      <section className="p-4">
        <div className="flex justify-between m-2">
          <h2 className="text-white font-mono font-semibold text-2xl p-2">
            Explore Trending Repositories
          </h2>
          <input
            type="text"
            className="rounded-md p-2"
            placeholder="Search repositories"
            value={inputText}
            onChange={(e) => setInputtext(e.target.value)}
          />
        </div>

        {data ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
            {data.items &&
              data.items.map((repo, index) => (
                <RepoCard
                  key={index}
                  ownerName={repo.full_name}
                  repoName={repo.name}
                  avatarImgUrl={repo.owner.avatar_url}
                  description={repo.description}
                />
              ))}
          </div>
        ) : (
          <Loader />
        )}
      </section>
    </div>
  );
};

export default Home;
