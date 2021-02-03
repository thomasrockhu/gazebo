import PropTypes from 'prop-types'
import cs from 'classnames'

import Icon from 'ui/Icon'

const pageClasses =
  'outline-none focus:ring-1 relative inline-flex items-center p-2 text-sm font-medium'
const endClasses =
  'px-4 bg-white hover:bg-gray-100 text-black disabled:text-gray-200'

const PaginationClasses = {
  nav:
    'rounded-full relative z-0 inline-flex shadow-sm -space-x-px bg-gray-300 border border-gray-200 text-white',
  previous: cs(pageClasses, endClasses, 'rounded-l-full'),
  next: cs(pageClasses, endClasses, 'rounded-r-full'),
  entry: cs(pageClasses, 'hover:bg-gray-200'),
  desktopOnly: cs(pageClasses, 'hover:bg-gray-400 hidden md:inline-flex'),
  filler: cs(pageClasses, ''),
  current: cs(pageClasses, 'rounded-md bg-blue-400 hover:bg-blue-300'),
}

function Page({
  isRendered,
  location,
  clickable = true,
  desktopOnly = false,
  onClick,
}) {
  if (!isRendered) return null
  if (!clickable) {
    return <span className={PaginationClasses.filler}>...</span>
  }
  return (
    <button
      onClick={() => onClick(location)}
      className={
        desktopOnly ? PaginationClasses.desktopOnly : PaginationClasses.entry
      }
    >
      {location}
    </button>
  )
}

Page.propTypes = {
  isRendered: PropTypes.bool.isRequired,
  location: PropTypes.number,
  clickable: PropTypes.bool,
  desktopOnly: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
}

function Pagination({ onPageChange, totalPages, pointer, next, previous }) {
  return (
    <nav className={PaginationClasses.nav} aria-label="Pagination">
      <button
        onClick={() => onPageChange(pointer - 1)}
        className={PaginationClasses.previous}
        disabled={pointer === 1 || !previous}
      >
        <span className="sr-only">Previous</span>
        <Icon name="leftChevron" color="text-current" className="w-4 h-4" />
      </button>
      <Page onClick={onPageChange} isRendered={pointer !== 1} location={1} />
      <Page
        onClick={onPageChange}
        isRendered={pointer - 1 > 2}
        clickable={false}
      />
      <Page
        onClick={onPageChange}
        isRendered={pointer - 2 > 1}
        location={pointer - 2}
        desktopOnly={true}
      />
      <Page
        onClick={onPageChange}
        isRendered={pointer - 1 > 1}
        location={pointer - 1}
      />
      <button
        onClick={() => onPageChange(pointer)}
        className={PaginationClasses.current}
      >
        {pointer}
      </button>
      <Page
        onClick={onPageChange}
        isRendered={pointer + 1 < totalPages}
        location={pointer + 1}
      />
      <Page
        onClick={onPageChange}
        isRendered={pointer + 2 < totalPages}
        location={pointer + 2}
        desktopOnly={true}
      />
      <Page
        onClick={onPageChange}
        isRendered={pointer + 2 < totalPages}
        clickable={false}
      />
      <Page
        onClick={onPageChange}
        isRendered={pointer < totalPages}
        location={totalPages}
      />
      <button
        onClick={() => onPageChange(pointer + 1)}
        className={PaginationClasses.next}
        disabled={pointer === totalPages || !next}
      >
        <span className="sr-only">Next</span>
        <Icon name="rightChevron" color="text-current" className="w-4 h-4" />
      </button>
    </nav>
  )
}

Pagination.propTypes = {
  onPageChange: PropTypes.func.isRequired,
  totalPages: PropTypes.number.isRequired,
  pointer: PropTypes.number.isRequired,
  next: PropTypes.string,
  previous: PropTypes.string,
}

export default Pagination
