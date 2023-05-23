import "./SearchTable.scss"

import { FC, useEffect, useState } from "react"
import { Column, Table } from "react-virtualized/dist/es/Table"

import { useTypedSelector } from "../../../hooks/reduxHooks.ts"
import {
  getGenesArray,
  getLocationString,
} from "../../../utils/getProteinProperties.ts"
import {
  EntryCellRenderer,
  GenesCellRenderer,
  OrganismCellRenderer,
} from "./cellRenderers.tsx"
import { HeaderSortableRenderer } from "./headerRenderers.tsx"

interface ProteinRow {
  index: number
  entry: string
  entry_names: string
  genes: string[]
  organism: string
  subcellular_location: string
  length: number
}

const SearchTable: FC = () => {
  const { proteins } = useTypedSelector((state) => state.proteins)

  const [rowData, setRowData] = useState<ProteinRow[]>([])

  useEffect(() => {
    setRowData(
      proteins.map((protein, index) => {
        const genes = getGenesArray(protein)
        const location = getLocationString(protein)

        return {
          index: index + 1,
          entry: protein.primaryAccession,
          entry_names: protein.uniProtkbId,
          genes,
          organism: protein.organism.scientificName,
          subcellular_location: location,
          length: protein.sequence.length,
        } as ProteinRow
      }),
    )
  }, [proteins])

  return (
    <Table
      width={1020}
      height={550}
      headerHeight={40}
      rowHeight={48}
      rowCount={rowData.length}
      rowGetter={({ index }) => rowData[index]}
      className="search-table"
    >
      <Column dataKey="index" label="#" width={48} />
      <Column
        headerRenderer={HeaderSortableRenderer}
        dataKey="entry"
        label="Entry"
        width={115}
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
        width={166}
        cellRenderer={GenesCellRenderer}
      />
      <Column
        headerRenderer={HeaderSortableRenderer}
        dataKey="organism"
        label="Organism"
        width={166}
        cellRenderer={OrganismCellRenderer}
      />
      <Column
        dataKey="subcellular_location"
        label="Subcellular Location"
        width={191}
      />
      <Column
        headerRenderer={HeaderSortableRenderer}
        dataKey="length"
        label="Length"
        width={156}
      />
    </Table>
  )
}

export default SearchTable
