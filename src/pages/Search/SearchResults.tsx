import { FC } from "react"
import { useSearchParams } from "react-router-dom"

import { useTypedSelector } from "../../hooks/reduxHooks.ts"
import SearchTable from "./SearchTable/SearchTable.tsx"

const SearchResults: FC = () => {
  const { totalResults } = useTypedSelector((state) => state.proteins)

  const [searchParams] = useSearchParams()

  const searchQuery = searchParams.get("query")

  return (
    <div className="search__results">
      <h3 className="search__count">
        {totalResults + ' Search Results for "' + searchQuery + '"'}
      </h3>

      <SearchTable />
    </div>
  )
}

export default SearchResults
