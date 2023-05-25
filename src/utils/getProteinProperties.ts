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
