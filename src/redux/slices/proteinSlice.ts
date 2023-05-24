import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

import { getUniprotProteinsAsync } from "../../api/uniProt.ts"
import { Protein } from "../../types/Protein.ts"
import { statusType } from "../../types/statusType.ts"

interface proteinState {
  proteins: Array<Protein>
  searchQuery: string | null
  totalResults: number
  link: string | null
  status: statusType
}

const initialState: proteinState = {
  proteins: [],
  searchQuery: null,
  totalResults: 0,
  link: null,
  status: statusType.IDLE,
}

export const fetchProteins = createAsyncThunk(
  "proteins/fetchProteins",
  async (query: string, thunkAPI) => {
    try {
      const { proteins, totalResults, link } = await getUniprotProteinsAsync(
        query,
      )

      return thunkAPI.fulfillWithValue({ proteins, totalResults, link, query })
    } catch {
      return thunkAPI.rejectWithValue("ERROR")
    }
  },
)

const proteinSlice = createSlice({
  name: "proteins",
  initialState,
  reducers: {
    setProteins: (state, action) => {
      state.proteins = action.payload
    },
    setLink: (state, action) => {
      state.link = action.payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProteins.pending, (state) => {
      state.proteins = []
      state.totalResults = 0
      state.searchQuery = null
      state.link = null
      state.status = statusType.LOADING
    })
    builder.addCase(fetchProteins.fulfilled, (state, action) => {
      state.proteins = action.payload.proteins
      state.totalResults = action.payload.totalResults
      state.searchQuery = action.payload.query
      state.link = action.payload.link
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
export const { setProteins, setLink } = proteinSlice.actions
