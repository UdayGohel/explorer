import { useEffect, useState } from "react";
import APIConfig from "../utils/APIConfig";
import Loader from "../pages/Loader";
import RepoCard from "./RepoCard";
import Header from "./Header";
import filterImage from "../assets/filter.svg";
import Filter from "./Filter";
import { useDispatch, useSelector } from "react-redux";
import {
  setFilter,
  setPageNumber,
  setSearchText,
  setSortType,
} from "../store/UserState";

const Home = () => {
  const [data, setData] = useState(null);
  const [showFilter, setShowFilter] = useState(false);
  const [totalPages, setTotalPages] = useState(null);
  const [error, setError] = useState("");
  const dispatch = useDispatch();

  const userState = useSelector((state) => state.user);
  const { pageNumber, searchText, filter, sortType } = userState;

  useEffect(() => {
    const debounceTimeout = setTimeout(() => {
      fetchRepo();
    }, 500);
    return () => clearTimeout(debounceTimeout);
  }, [searchText, filter, pageNumber, sortType]);

  const fetchRepo = async () => {
    try {
      let url = `/search/repositories?q=stars:>1&sort=${filter}&order=${sortType}&per_page=9&page=${pageNumber}`;
      if (searchText !== "") {
        url += `&q=${searchText}`;
      }
      const res = await APIConfig({
        url: url,
        method: "GET",
      });
      if (res.total_count == 0) {
        setError("Oops! No repositories found matching your input.");
      }
      setData(res);
      setTotalPages(Math.ceil(res.total_count / 9));
    } catch (error) {
      if (error.message.includes("Network Error")) {
        setError(
          "Network Error: Couldn't connect to server. Please check your internet connection and try again."
        );
      } else if (error.message.includes("API Rate Limit Exceeded")) {
        setError("API Rate Limit Exceeded: Please try again later.");
      } else if (error.message.includes("Internal Server Error")) {
        setError(
          "Internal Server Error: Something went wrong on our servers. Please try again later."
        );
      } else if (error.message.includes("Error code: ")) {
        setError("An unexpected error occurred. Please try again later.");
      } else {
        setError("Oops! Something went wrong. Please try again later.");
      }
    }
  };

  const handlePageChange = (page) => {
    dispatch(setPageNumber(page));
  };

  const handleFilterChange = (sortOrder, sortBy) => {
    dispatch(setFilter(sortOrder));
    dispatch(setSortType(sortBy));
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

  if (error !== "") {
    <div className="bg-slate-700 h-screen w-screen overflow-y-auto">
      <Header />
      {error}
    </div>;
  }

  return (
    <div className="bg-gradient-to-r from-slate-800 to-slate-700 h-screen w-screen overflow-y-auto">
      <Header />

      <section className="p-4">
        <div className="flex flex-col justify-between m-2 md:flex-row">
          <h2 className="text-white font-mono font-semibold text-lg p-2 md:text-2xl">
            Explore Trending Repositories
          </h2>
          <div className="flex items-center">
            <input
              type="text"
              className="rounded-md p-2 w-full md:w-64 bg-slate-900 text-white placeholder-white::placeholder"
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
            <div className="hidden md:block">
              {showFilter && <Filter onFilterChange={handleFilterChange} />}
            </div>
          </div>
          <div className="md:hidden">
            {showFilter && <Filter onFilterChange={handleFilterChange} />}
          </div>
        </div>

        <div className="flex justify-center items-center">
          {error !== "" && (
            <div className="p-3 bg-red-600 font-semibold text-white font-serif rounded-md mt-5">
              {error}
            </div>
          )}
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
