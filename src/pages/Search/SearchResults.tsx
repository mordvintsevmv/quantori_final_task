import { FC } from "react"

import { useTypedSelector } from "../../hooks/reduxHooks.ts"
import SearchTable from "./SearchTable/SearchTable.tsx"

const SearchResults: FC = () => {
  const { totalResults, searchQuery } = useTypedSelector(
    (state) => state.search,
  )

  return (
    <div className="search__results">
      <h3 className="search__count">
        {totalResults.toLocaleString() +
          ' Search Results for "' +
          searchQuery +
          '"'}
      </h3>

      <SearchTable />
    </div>
  )
}

export default SearchResults
