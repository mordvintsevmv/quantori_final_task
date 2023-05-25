import "./SearchTable.scss"

import { FC, Fragment, useState } from "react"
import { InfiniteLoader } from "react-virtualized/dist/es/InfiniteLoader"
import { Column, Table } from "react-virtualized/dist/es/Table"

import { getMoreUniprotProteinsAsync } from "../../../api/uniProt.ts"
import {
  useTypedDispatch,
  useTypedSelector,
} from "../../../hooks/reduxHooks.ts"
import {
  setLink,
  setProteins,
  setSort,
} from "../../../redux/slices/proteinSlice.ts"
import { Protein } from "../../../types/Protein.ts"
import { SortByType, SortDirectionType } from "../../../types/sortType.ts"
import {
  EntryCellRenderer,
  GenesCellRenderer,
  LocationCellRenderer,
  OrganismCellRenderer,
} from "./cellRenderers.tsx"
import { HeaderSortableRenderer } from "./headerRenderers.tsx"

const SearchTable: FC = () => {
  const { totalResults, proteins, link, sort } = useTypedSelector(
    (state) => state.proteins,
  )

  const [isLoading, setIsLoading] = useState<boolean>(false)

  const dispatch = useTypedDispatch()

  const isRowLoaded = ({ index }: { index: number }) => {
    return !!proteins[index]
  }

  const loadMoreRows = (): Promise<Protein[]> => {
    if (link) {
      setIsLoading(true)

      return getMoreUniprotProteinsAsync(link).then((response) => {
        dispatch(setProteins([...proteins, ...response.proteins]))
        dispatch(setLink(response.link))
        setIsLoading(false)

        return response.proteins
      })
    } else {
      return new Promise((resolve) => resolve(proteins))
    }
  }

  const _sort = ({
    sortBy,
    sortDirection,
  }: {
    sortDirection: SortDirectionType
    sortBy: string
  }) => {
    if (sort.sortBy === sortBy && sort.sortDirection === "DESC") {
      dispatch(
        setSort({
          sortDirection: null,
          sortBy: null,
        }),
      )
    } else if (
      ["accession", "id", "gene", "organism_name", "length"].includes(sortBy)
    ) {
      dispatch(
        setSort({
          sortDirection,
          sortBy: sortBy as SortByType,
        }),
      )
    }
  }

  return (
    <Fragment>
      <InfiniteLoader
        loadMoreRows={loadMoreRows}
        isRowLoaded={isRowLoaded}
        rowCount={totalResults}
        key="search-table"
      >
        {({ onRowsRendered, registerChild }) => (
          <Table
            width={1020}
            height={550}
            headerHeight={40}
            rowHeight={48}
            rowCount={proteins.length}
            rowGetter={({ index }) => proteins[index]}
            className="search-table"
            onRowsRendered={onRowsRendered}
            ref={registerChild}
            sort={_sort}
            sortBy={sort.sortBy ? sort.sortBy : undefined}
            sortDirection={sort.sortDirection ? sort.sortDirection : undefined}
          >
            <Column
              dataKey="index"
              label="#"
              width={50}
              cellRenderer={({ rowIndex }) => <div>{rowIndex + 1}</div>}
              disableSort={true}
            />
            <Column
              headerRenderer={HeaderSortableRenderer}
              dataKey="accession"
              label="Entry"
              width={125}
              cellRenderer={EntryCellRenderer}
            />
            <Column
              headerRenderer={HeaderSortableRenderer}
              dataKey="id"
              label="Entry Names"
              width={166}
            />
            <Column
              headerRenderer={HeaderSortableRenderer}
              dataKey="gene"
              label="Genes"
              width={196}
              cellRenderer={GenesCellRenderer}
            />
            <Column
              headerRenderer={HeaderSortableRenderer}
              dataKey="organism_name"
              label="Organism"
              width={190}
              cellRenderer={OrganismCellRenderer}
            />
            <Column
              dataKey="subcellular_location"
              label="Subcellular Location"
              width={190}
              cellRenderer={LocationCellRenderer}
              disableSort={true}
            />
            <Column
              headerRenderer={HeaderSortableRenderer}
              dataKey="length"
              label="Length"
              width={100}
              cellRenderer={({ cellData }) => cellData.toLocaleString()}
            />
          </Table>
        )}
      </InfiniteLoader>
      {isLoading ? <div className="search-table__loading-line" /> : null}
    </Fragment>
  )
}

export default SearchTable
