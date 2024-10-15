import { PaginationWrapper, PageButton } from "./Pagination.styled";

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  onLoadMore: () => void;
}

const Pagination: React.FC<PaginationProps> = ({
  totalPages,
  currentPage,
  onPageChange,
  onLoadMore,
}) => {
  const handlePageClick = (page: number) => {
    onPageChange(page);
    if (page > currentPage) {
      onLoadMore();
    }
  };

  // Helper function to determine pagination structure
  const getPageNumbers = () => {
    const pages = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);

      if (currentPage > 3) {
        pages.push("...");
      }

      if (currentPage === 1) {
        pages.push(2, 3);
      } else if (currentPage === totalPages) {
        pages.push(totalPages - 2, totalPages - 1);
      } else {
        pages.push(currentPage - 1, currentPage, currentPage + 1);
      }

      if (currentPage < totalPages - 2) {
        pages.push("...");
      }

      pages.push(totalPages);
    }

    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <PaginationWrapper>
      <PageButton
        onClick={() => handlePageClick(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <span>{"←"}</span>
      </PageButton>

      {pageNumbers.map((page, index) => (
        <PageButton
          key={index}
          isActive={currentPage === page}
          onClick={() => typeof page === "number" && handlePageClick(page)}
          disabled={typeof page !== "number"}
        >
          {page}
        </PageButton>
      ))}

      <PageButton
        onClick={() => handlePageClick(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        <span>{"→"}</span>
      </PageButton>
    </PaginationWrapper>
  );
};

export default Pagination;
