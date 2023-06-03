import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"

import { getUniprotProteinsAsync } from "../../api/uniProt.ts"
import { FilterValues, initialFilters } from "../../types/Filter.ts"
import { Protein } from "../../types/Protein.ts"
import { sortType } from "../../types/sortType.ts"
import { statusType } from "../../types/statusType.ts"
import { RootState } from "../store.ts"

interface searchState {
  proteins: Array<Protein>
  searchQuery: string | null
  totalResults: number
  link: string | null
  status: statusType
  sort: sortType
  filterQuery: FilterValues
}

const initialState: searchState = {
  proteins: [],
  searchQuery: null,
  totalResults: 0,
  link: null,
  status: statusType.IDLE,
  sort: {
    sortDirection: null,
    sortBy: null,
  },
  filterQuery: initialFilters,
}

export const fetchProteins = createAsyncThunk(
  "proteins/fetchProteins",
  async (__, thunkAPI) => {
    try {
      const { search } = thunkAPI.getState() as RootState

      const { proteins, totalResults, link } = await getUniprotProteinsAsync(
        search.searchQuery || "*",
        search.sort,
        search.filterQuery,
      )

      return thunkAPI.fulfillWithValue({ proteins, totalResults, link })
    } catch {
      return thunkAPI.rejectWithValue("ERROR")
    }
  },
)

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setProteins: (state, action) => {
      state.proteins = action.payload
    },
    setLink: (state, action) => {
      state.link = action.payload
    },
    setSort: (state, { payload }: PayloadAction<sortType>) => {
      state.sort = payload
    },
    setFilters: (state, { payload }: PayloadAction<FilterValues>) => {
      state.filterQuery = payload
    },
    setSearchQuery: (state, { payload }: PayloadAction<string>) => {
      state.searchQuery = payload
    },
    resetSearch: (state) => {
      state.proteins = []
      state.totalResults = 0
      state.searchQuery = null
      state.filterQuery = initialFilters
      state.sort = {
        sortBy: null,
        sortDirection: null,
      }
      state.link = null
      state.status = statusType.IDLE
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProteins.pending, (state) => {
      state.proteins = []
      state.totalResults = 0
      state.link = null
      state.status = statusType.LOADING
    })
    builder.addCase(fetchProteins.fulfilled, (state, action) => {
      state.proteins = action.payload.proteins
      state.totalResults = action.payload.totalResults
      state.link = action.payload.link
      state.status = statusType.SUCCESS
    })
    builder.addCase(fetchProteins.rejected, (state) => {
      state.proteins = []
      state.totalResults = 0
      state.status = statusType.ERROR
    })
  },
})

export const searchReducer = searchSlice.reducer
export const {
  setProteins,
  setLink,
  setSort,
  resetSearch,
  setFilters,
  setSearchQuery,
} = searchSlice.actions
