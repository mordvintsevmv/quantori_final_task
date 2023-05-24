import "./SearchTable.scss"

import { FC, Fragment, useState } from "react"
import { InfiniteLoader } from "react-virtualized/dist/es/InfiniteLoader"
import { Column, Table } from "react-virtualized/dist/es/Table"

import { getMoreUniprotProteinsAsync } from "../../../api/uniProt.ts"
import {
  useTypedDispatch,
  useTypedSelector,
} from "../../../hooks/reduxHooks.ts"
import { setLink, setProteins } from "../../../redux/slices/proteinSlice.ts"
import { Protein } from "../../../types/Protein.ts"
import {
  EntryCellRenderer,
  GenesCellRenderer,
  LocationCellRenderer,
  OrganismCellRenderer,
} from "./cellRenderers.tsx"
import { HeaderSortableRenderer } from "./headerRenderers.tsx"

const SearchTable: FC = () => {
  const { totalResults, proteins, link } = useTypedSelector(
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
          >
            <Column
              dataKey="index"
              label="#"
              width={50}
              cellRenderer={({ rowIndex }) => <div>{rowIndex + 1}</div>}
            />
            <Column
              headerRenderer={HeaderSortableRenderer}
              dataKey="entry"
              label="Entry"
              width={125}
              cellRenderer={EntryCellRenderer}
            />
            <Column
              headerRenderer={HeaderSortableRenderer}
              dataKey="entry_names"
              label="Entry Names"
              width={166}
            />
            <Column
              headerRenderer={HeaderSortableRenderer}
              dataKey="genes"
              label="Genes"
              width={196}
              cellRenderer={GenesCellRenderer}
            />
            <Column
              headerRenderer={HeaderSortableRenderer}
              dataKey="organism"
              label="Organism"
              width={190}
              cellRenderer={OrganismCellRenderer}
            />
            <Column
              dataKey="subcellular_location"
              label="Subcellular Location"
              width={190}
              cellRenderer={LocationCellRenderer}
            />
            <Column
              headerRenderer={HeaderSortableRenderer}
              dataKey="length"
              label="Length"
              width={100}
            />
          </Table>
        )}
      </InfiniteLoader>
      {isLoading ? <div className="search-table__loading-line" /> : null}
    </Fragment>
  )
}

export default SearchTable
