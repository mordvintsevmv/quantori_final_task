import { FC } from "react"

const SearchPlaceholder: FC = () => {
  return (
    <div className="search__placeholder">
      <p>{"No data to display"}</p>
      <p>{"Please start search to display results"}</p>
    </div>
  )
}

export default SearchPlaceholder
