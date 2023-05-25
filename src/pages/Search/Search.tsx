import "./Search.css"

import React, { FC, Fragment, useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"

import Header from "../../components/Header/Header.tsx"
import Loading from "../../components/Loading/Loading.tsx"
import { useTypedDispatch, useTypedSelector } from "../../hooks/reduxHooks.ts"
import { fetchProteins } from "../../redux/slices/proteinSlice.ts"
import { statusType } from "../../types/statusType.ts"
import options_img from "./assets/options.svg"
import SearchPlaceholder from "./SearchPlaceholder.tsx"
import SearchResults from "./SearchResults.tsx"

const Search: FC = () => {
  const { totalResults, status, sort } = useTypedSelector(
    (state) => state.proteins,
  )

  const [searchParams, setSearchParams] = useSearchParams()

  const [searchInput, setSearchInput] = useState<string>("")

  const searchQuery = searchParams.get("query")

  const dispatch = useTypedDispatch()

  const handleSearch = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const input = event.target as HTMLInputElement

    setSearchInput(input.value)
  }

  const startSearch = () => {
    if (searchInput.length > 0) {
      searchParams.set("query", searchInput)
    } else {
      searchParams.set("query", "*")
    }

    setSearchParams(searchParams)

    searchInput
      ? dispatch(fetchProteins({ query: searchInput, sort }))
      : dispatch(fetchProteins({ query: "*", sort }))
  }

  const handleSearchEnter = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      startSearch()
    }
  }

  useEffect(() => {
    if (searchQuery) {
      setSearchInput(searchQuery)
      dispatch(fetchProteins({ query: searchQuery, sort }))
    }
  }, [dispatch, searchQuery, sort])

  return (
    <Fragment>
      <Header />
      <div className="search">
        <div className="search__controls">
          <input
            className="search__input"
            type="text"
            placeholder="Enter search value"
            onInput={handleSearch}
            onKeyDown={handleSearchEnter}
            value={searchInput}
          />
          <button className="button search__search-btn" onClick={startSearch}>
            {"Search"}
          </button>
          <button className="icon-button search__filter-btn" disabled={true}>
            <img src={options_img} alt="Filters" />
          </button>
        </div>

        <div className="search__content">
          {status === statusType.LOADING && <Loading />}
          {[statusType.IDLE, statusType.SUCCESS].includes(status) &&
            totalResults === 0 && <SearchPlaceholder />}
          {status === statusType.SUCCESS && totalResults !== 0 && (
            <SearchResults />
          )}
        </div>
      </div>
    </Fragment>
  )
}

export default Search
