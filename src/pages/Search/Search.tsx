import "./Search.css"

import React, { FC, Fragment, useEffect, useRef, useState } from "react"
import { useSearchParams } from "react-router-dom"

import Filters from "../../components/Filters/Filters.tsx"
import Header from "../../components/Header/Header.tsx"
import Loading from "../../components/Loading/Loading.tsx"
import { useTypedDispatch, useTypedSelector } from "../../hooks/reduxHooks.ts"
import {
  fetchProteins,
  resetSearch,
  setSearchQuery,
} from "../../redux/slices/searchSlice.ts"
import { statusType } from "../../types/statusType.ts"
import { hasAnyFilter } from "../../utils/getProteinProperties.ts"
import options_img from "./assets/options.svg"
import SearchPlaceholder from "./SearchPlaceholder.tsx"
import SearchResults from "./SearchResults.tsx"

const Search: FC = () => {
  const { totalResults, status, sort, filterQuery, searchQuery } =
    useTypedSelector((state) => state.search)

  const [searchParams, setSearchParams] = useSearchParams()
  const searchQueryURL = searchParams.get("query")

  const [isFiltersOpened, setIsFiltersOpened] = useState<boolean>(false)

  const searchRef = useRef<HTMLInputElement>(null)

  const dispatch = useTypedDispatch()

  const startSearch = () => {
    dispatch(resetSearch())

    if (searchRef.current && searchRef.current.value.trimStart().length > 0) {
      searchParams.set("query", searchRef.current.value.trimStart().trimEnd())
      dispatch(setSearchQuery(searchRef.current.value.trimStart().trimEnd()))
    } else {
      searchParams.set("query", "*")
      dispatch(setSearchQuery("*"))
    }

    setSearchParams(searchParams)

    setIsFiltersOpened(false)
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
      dispatch(fetchProteins())
    }
  }, [dispatch, sort, filterQuery, searchQuery])

  useEffect(() => {
    if (searchQueryURL && searchRef.current) {
      searchRef.current.value = searchQueryURL
      dispatch(setSearchQuery(searchQueryURL))
    }

    document.title = searchQueryURL
      ? `Searching for "${searchQueryURL}"`
      : `Q-1 Search`
  }, [dispatch, searchQueryURL])

  return (
    <Fragment>
      <Header />
      <div className="search">
        <div className="search__controls">
          <input
            className="search__input"
            type="text"
            placeholder="Enter search value"
            ref={searchRef}
            onKeyDown={handleSearchEnter}
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
