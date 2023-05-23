import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

import { getUniprotProteinsAsync } from "../../api/uniProt.ts"
import { Protein } from "../../types/Protein.ts"
import { statusType } from "../../types/statusType.ts"

interface proteinState {
  proteins: Array<Protein>
  searchQuery: string | null
  totalResults: number
  status: statusType
}

const initialState: proteinState = {
  proteins: [],
  searchQuery: null,
  totalResults: 0,
  status: statusType.IDLE,
}

export const fetchProteins = createAsyncThunk(
  "proteins/fetchProteins",
  async (query: string, thunkAPI) => {
    try {
      const { proteins, totalResults } = await getUniprotProteinsAsync(query)

      return thunkAPI.fulfillWithValue({ proteins, totalResults, query })
    } catch {
      return thunkAPI.rejectWithValue("ERROR")
    }
  },
)

const proteinSlice = createSlice({
  name: "proteins",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchProteins.pending, (state) => {
      state.proteins = []
      state.totalResults = 0
      state.searchQuery = null
      state.status = statusType.LOADING
    })
    builder.addCase(fetchProteins.fulfilled, (state, action) => {
      state.proteins = action.payload.proteins
      state.totalResults = action.payload.totalResults
      state.searchQuery = action.payload.query
      state.status = statusType.SUCCESS
    })
    builder.addCase(fetchProteins.rejected, (state) => {
      state.proteins = []
      state.totalResults = 0
      state.searchQuery = null
      state.status = statusType.ERROR
    })
  },
})

export const proteinReducer = proteinSlice.reducer
