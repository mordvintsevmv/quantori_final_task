import { FC } from "react"
import { TableHeaderProps } from "react-virtualized"

import sort_asc_img from "../assets/sort-asc.svg"
import sort_desc_img from "../assets/sort-desc.svg"
import sort_inactive_img from "../assets/sort-inactive.svg"

export const HeaderSortableRenderer: FC<TableHeaderProps> = ({
  label,
  dataKey,
  sortBy,
  sortDirection,
}) => {
  let sort_icon = sort_inactive_img

  if (sortBy === dataKey && sortDirection === "DESC") {
    sort_icon = sort_desc_img
  } else if (sortBy === dataKey && sortDirection === "ASC") {
    sort_icon = sort_asc_img
  }

  return (
    <div className="search-table__sortable-header">
      <span className="search-table__sortable-header-label">{label}</span>
      <button
        className={`search-table__sortable-header-btn ${
          sortBy === dataKey ? "search-table__sortable-header-btn--active" : ""
        }`}
      >
        <img src={sort_icon} alt="Sorting Inactive" />
      </button>
    </div>
  )
}
