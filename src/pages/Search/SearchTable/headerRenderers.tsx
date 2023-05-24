import { FC } from "react"
import { TableHeaderProps } from "react-virtualized"

import sort_inactive_img from "../assets/sort-inactive.svg"

export const HeaderSortableRenderer: FC<TableHeaderProps> = ({ label }) => {
  return (
    <div className="search-table__sortable-header">
      <span className="search-table__sortable-header-label">{label}</span>
      <button className="search-table__sortable-header-btn" disabled={true}>
        <img src={sort_inactive_img} alt="Sorting Inactive" />
      </button>
    </div>
  )
}
