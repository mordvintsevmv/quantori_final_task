import { FilterValues } from "../types/Filter.ts"
import { Protein, ProteinResponse } from "../types/Protein.ts"
import { ProteinDetailed } from "../types/ProteinDetailed.ts"

export const getLocationString = (
  protein: ProteinResponse | ProteinDetailed,
): string => {
  if (protein.comments && protein.comments.length > 0) {
    const locations = protein.comments.map((comment) => {
      return comment.commentType === "SUBCELLULAR LOCATION" &&
        comment.subcellularLocations
        ? comment.subcellularLocations
            .map((sub_location) => sub_location.location.value)
            .join("; ")
        : ""
    })

    return locations.join(", ")
  } else {
    return ""
  }
}

export const getGenesString = (
  protein: ProteinResponse | ProteinDetailed,
): string => {
  if (protein.genes) {
    const gene_names = protein.genes.map((gene) => {
      const name = gene?.geneName?.value ? gene.geneName.value : ""
      let synonym_name = ""

      if (gene.synonyms) {
        synonym_name = gene.synonyms.map((synonym) => synonym.value).join(", ")
      }

      return synonym_name.length > 0 ? `${name}, ${synonym_name}` : name
    })

    return gene_names.join("; ")
  } else {
    return ""
  }
}

export const getProteinName = (protein: ProteinDetailed): string => {
  return (
    protein.proteinDescription.recommendedName?.fullName.value ||
    protein.proteinDescription.alternativeNames
      ?.map((name) => name.fullName.value)
      .join(", ") ||
    protein.proteinDescription.submissionNames
      ?.map((name) => name.fullName.value)
      .join(", ") ||
    "N/A"
  )
}

export const getProteinObject = (
  protein: ProteinResponse | ProteinDetailed,
): Protein => {
  const genes = getGenesString(protein)
  const subcellular_location = getLocationString(protein)

  return {
    accession: protein.primaryAccession,
    id: protein.uniProtkbId,
    gene: genes,
    organism_name: protein.organism.scientificName,
    subcellular_location,
    length: protein.sequence.length,
  }
}

export const getFilterQuery = (filters: FilterValues) => {
  let filterQuery = ""

  if (filters.gene !== "") {
    filterQuery += ` AND (gene:${filters.gene})`
  }

  if (filters.model_organism !== "") {
    filterQuery += ` AND (model_organism:${filters.model_organism})`
  }

  if (filters.length_from !== "" || filters.length_to !== "") {
    filterQuery += ` AND (length:%5B${filters.length_from || "*"} TO ${
      filters.length_to || "*"
    }%5D)`
  }

  if (filters.annotation_score !== "") {
    filterQuery += ` AND (annotation_score:${filters.annotation_score})`
  }

  if (filters.proteins_with !== "") {
    filterQuery += ` AND (proteins_with:${filters.proteins_with})`
  }

  return filterQuery
}

export const hasAnyFilter = (filters: FilterValues) => {
  return Object.values(filters).some((value) => value !== "")
}
