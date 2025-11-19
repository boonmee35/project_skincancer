import React from "react";

function Pagination({ currentPage, totalPages, onPageChange }) {
  const handlePrev = () => {
    if (currentPage > 1) onPageChange(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) onPageChange(currentPage + 1);
  };

  const generatePages = () => {
    const pages = [];

    if (totalPages <= 3) {
      // แสดงทุกหน้า ถ้าน้อยกว่าเท่ากับ 3
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      // ถ้าอยู่ใกล้จุดเริ่มต้น
      if (currentPage <= 3) {
        pages.push(1, 2, 3, "...", totalPages);
      }
      // ถ้าอยู่ใกล้จุดสิ้นสุด
      else if (currentPage >= totalPages - 2) {
        pages.push(1, "...", totalPages - 2, totalPages - 1, totalPages);
      }
      // ถ้าอยู่ตรงกลาง
      else {
        pages.push(
          1,
          "...",
          currentPage - 1,
          currentPage,
          currentPage + 1,
          "...",
          totalPages
        );
      }
    }

    return pages;
  };

  return (
    <div className="flex items-center justify-center gap-2 mt-6 flex-wrap">
      {/* ปุ่มก่อนหน้า */}
      <button
        onClick={handlePrev}
        disabled={currentPage === 1}
        className="px-3 py-1 border rounded text-sm bg-white hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        ก่อนหน้า
      </button>

      {/* ปุ่มเลขหน้า */}
      {generatePages().map((page, index) =>
        page === "..." ? (
          <span key={index} className="px-3 py-1 text-gray-500">
            ...
          </span>
        ) : (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`px-3 py-1 border rounded text-sm ${
              currentPage === page
                ? "bg-teal-700 text-white"
                : "bg-white hover:bg-gray-100"
            }`}
          >
            {page}
          </button>
        )
      )}

      {/* ปุ่มถัดไป */}
      <button
        onClick={handleNext}
        disabled={currentPage === totalPages}
        className="px-3 py-1 border rounded text-sm bg-white hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        ถัดไป
      </button>
    </div>
  );
}

export default Pagination;