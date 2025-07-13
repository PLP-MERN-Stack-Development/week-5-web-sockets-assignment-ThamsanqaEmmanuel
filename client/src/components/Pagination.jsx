import PropTypes from "prop-types";
import '../styles/Pagination.css'

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const getPageNumbers = () => {
    const pages = []
    const maxVisiblePages = 5 // Maximum number of page buttons to show
    
    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
      }
    } else {
      let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2))
      let endPage = startPage + maxVisiblePages - 1

      if (endPage > totalPages) {
        endPage = totalPages
        startPage = endPage - maxVisiblePages + 1
      }

      if (startPage > 1) {
        pages.push(1)
        if (startPage > 2) {
          pages.push('...')
        }
      }

      for (let i = startPage; i <= endPage; i++) {
        pages.push(i)
      }

      if (endPage < totalPages) {
        if (endPage < totalPages - 1) {
          pages.push('...')
        }
        pages.push(totalPages)
      }
    }

    return pages
  }

  return (
    <div className="pagination-container">
      <button
        className={`pagination-button ${currentPage === 1 ? 'disabled' : ''}`}
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        &laquo; Prev
      </button>

      <div className="page-numbers">
        {getPageNumbers().map((page, index) => (
          <button
            key={index}
            className={`pagination-button ${page === currentPage ? 'active' : ''} ${page === '...' ? 'ellipsis' : ''}`}
            onClick={() => typeof page === 'number' && onPageChange(page)}
            disabled={page === '...' || page === currentPage}
          >
            {page}
          </button>
        ))}
      </div>

      <button
        className={`pagination-button ${currentPage === totalPages ? 'disabled' : ''}`}
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next &raquo;
      </button>
    </div>
  )
}

Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
}

export default Pagination