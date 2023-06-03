export interface FilterValues {
  gene: string
  model_organism: string
  length_from: string
  length_to: string
  annotation_score: string
  proteins_with: string
}

export const initialFilters: FilterValues = {
  gene: "",
  model_organism: "",
  length_from: "",
  length_to: "",
  annotation_score: "",
  proteins_with: "",
}
