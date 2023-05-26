export interface sortType {
  sortBy: SortByType
  sortDirection: SortDirectionType
}

export type SortByType =
  | "accession"
  | "id"
  | "gene"
  | "organism_name"
  | "length"
  | null
export type SortDirectionType = "ASC" | "DESC" | null
