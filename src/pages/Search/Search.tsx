import "./Search.css"

import React, { FC, Fragment, useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"

import Filters from "../../components/Filters/Filters.tsx"
import Header from "../../components/Header/Header.tsx"
import Loading from "../../components/Loading/Loading.tsx"
import { useTypedDispatch, useTypedSelector } from "../../hooks/reduxHooks.ts"
import {
  fetchProteins,
  setFilters,
  setSort,
} from "../../redux/slices/proteinSlice.ts"
import { initialFilters } from "../../types/Filter.ts"
import { statusType } from "../../types/statusType.ts"
import { hasAnyFilter } from "../../utils/getProteinProperties.ts"
import options_img from "./assets/options.svg"
import SearchPlaceholder from "./SearchPlaceholder.tsx"
import SearchResults from "./SearchResults.tsx"

const Search: FC = () => {
  const { totalResults, status, sort, filterQuery } = useTypedSelector(
    (state) => state.proteins,
  )

  const [searchParams, setSearchParams] = useSearchParams()

  const [searchInput, setSearchInput] = useState<string>("")
  const [isFiltersOpened, setIsFiltersOpened] = useState<boolean>(false)

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

    setIsFiltersOpened(false)
    setSearchParams(searchParams)
    dispatch(setFilters(initialFilters))
    dispatch(setSort({ sortBy: null, sortDirection: null }))

    searchInput
      ? dispatch(
          fetchProteins({ query: searchInput, sort, filters: filterQuery }),
        )
      : dispatch(fetchProteins({ query: "*", sort, filters: filterQuery }))
  }

  const handleSearchEnter = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      startSearch()
    }
  }

  const handleToggleFilters = () => {
    setIsFiltersOpened(!isFiltersOpened)
  }

  useEffect(() => {
    if (searchQuery) {
      setSearchInput(searchQuery)
      dispatch(
        fetchProteins({ query: searchQuery, sort, filters: filterQuery }),
      )
    }
  }, [dispatch, sort, filterQuery])

  useEffect(() => {
    document.title = searchQuery
      ? `Searching for "${searchQuery}"`
      : `Q-1 Search`
  }, [searchQuery])

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
          <div className="search__filters-btn-wrapper">
            <button
              className={`search__filters-btn ${
                isFiltersOpened ? "search__filters-btn--active" : ""
              } ${
                hasAnyFilter(filterQuery) ? "search__filters-btn--selected" : ""
              }`}
              onClick={handleToggleFilters}
            >
              <img src={options_img} alt="Filters" />
            </button>
          </div>
          {isFiltersOpened && (
            <Filters
              setFiltersOpened={setIsFiltersOpened}
              className="search__filters"
            />
          )}
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
