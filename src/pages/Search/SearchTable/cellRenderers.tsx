import { FC, Fragment } from "react"
import { Link } from "react-router-dom"
import { TableCellProps } from "react-virtualized"

export const EntryCellRenderer: FC<TableCellProps> = ({ cellData }) => {
  return (
    <Link className="search-table__link" to={`/protein/${cellData}`}>
      {cellData}
    </Link>
  )
}

export const GenesCellRenderer: FC<TableCellProps> = ({ cellData }) => {
  const genes = cellData.join(", ")
  const firstSpaceIndex = genes.indexOf(" ")

  return cellData.length > 1 ? (
    <Fragment>
      <span className="search-table__row--bold">
        {genes.slice(0, Math.max(0, firstSpaceIndex))}
      </span>
      <span>{genes.slice(Math.max(0, firstSpaceIndex))}</span>
    </Fragment>
  ) : (
    <span className="search-table__row--bold">{genes}</span>
  )
}

export const OrganismCellRenderer: FC<TableCellProps> = ({ cellData }) => {
  return <div className="search-table__organism">{cellData}</div>
}
