const Pagination = ({ pageNumber, totalPages, handlePageChange }) => {
  const renderPagination = () => {
    const visiblePages = 3;
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

  return <div className="flex justify-center mt-4">{renderPagination()}</div>;
};

export default Pagination;
