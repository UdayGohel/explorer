import { useEffect, useState } from "react";
import APIConfig from "../utils/APIConfig";
import Loader from "../pages/Loader";
import RepoCard from "./RepoCard";
import Header from "./Header";
import filterImage from "../assets/filter.svg";
import Filter from "./Filter";
import { useDispatch, useSelector } from "react-redux";
import { setFilter, setPageNumber, setSearchText } from "../store/UserState";

const Home = () => {
  const [data, setData] = useState(null);
  const [showFilter, setShowFilter] = useState(false);
  const [totalPages, setTotalPages] = useState(null);

  const dispatch = useDispatch();

  const userState = useSelector((state) => state.user);
  const { pageNumber, searchText, filter } = userState;

  useEffect(() => {
    fetchRepo();
  }, [searchText, filter, pageNumber]);

  const fetchRepo = async () => {
    try {
      let url = `/search/repositories?q=is:public&sort=${filter}&order=desc&per_page=9&page=${pageNumber}`;
      if (searchText !== "") {
        url += `&q=${searchText}`;
      }
      const res = await APIConfig({
        url: url,
        method: "GET",
      });
      setData(res);
      setTotalPages(Math.ceil(res.total_count / 9));
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const handlePageChange = (page) => {
    dispatch(setPageNumber(page));
  };

  const handleFilterChange = (value) => {
    dispatch(setFilter(value));
    dispatch(setPageNumber(1));
  };

  const renderPagination = () => {
    const visiblePages = 3; // Number of visible page numbers
    const pages = [];
    let startPage = pageNumber - Math.floor(visiblePages / 2);
    if (startPage < 1) {
      startPage = 1;
    }
    let endPage = startPage + visiblePages - 1;
    if (endPage > totalPages) {
      endPage = totalPages;
      startPage = endPage - visiblePages + 1;
      if (startPage < 1) {
        startPage = 1;
      }
    }

    if (startPage > 1) {
      pages.push(
        <button
          key={1}
          className="px-3 py-1 mx-1 rounded bg-gray-300"
          onClick={() => handlePageChange(1)}
        >
          1
        </button>
      );
      if (startPage > 2) {
        pages.push(<span key="startEllipsis">...</span>);
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button
          key={i}
          className={`px-3 py-1 mx-1 rounded ${
            pageNumber === i ? "bg-blue-500 text-white" : "bg-gray-300"
          }`}
          onClick={() => handlePageChange(i)}
        >
          {i}
        </button>
      );
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pages.push(<span key="endEllipsis">...</span>);
      }
      pages.push(
        <button
          key={totalPages}
          className="px-3 py-1 mx-1 rounded bg-gray-300"
          onClick={() => handlePageChange(totalPages)}
        >
          {totalPages}
        </button>
      );
    }

    return pages;
  };

  return (
    <div className="bg-slate-700 h-screen w-screen overflow-y-auto">
      <Header />
      <section className="p-4">
        <div className="flex justify-between m-2">
          <h2 className="text-white font-mono font-semibold text-2xl p-2">
            Explore Trending Repositories
          </h2>
          <div className="flex items-center">
            <input
              type="text"
              className="rounded-md p-2 w-64 bg-slate-900 text-white placeholder-white::placeholder"
              placeholder="Search repositories..."
              value={searchText}
              onChange={(e) => dispatch(setSearchText(e.target.value))}
            />
            <img
              src={filterImage}
              className="h-10 w-10 ml-2 cursor-pointer"
              alt="filter svg"
              onClick={() => setShowFilter(!showFilter)}
            />
            {showFilter ? <Filter onFilterChange={handleFilterChange} /> : ""}
          </div>
        </div>

        {data ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
            {data.items &&
              data.items.map((repo, index) => (
                <RepoCard
                  key={repo.id}
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

        <div className="flex justify-center mt-4">{renderPagination()}</div>
      </section>
    </div>
  );
};

export default Home;
