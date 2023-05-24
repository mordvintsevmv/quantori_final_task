import { Protein, ProteinResponse } from "../types/Protein.ts"

export const getLocationString = (protein: ProteinResponse): string => {
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

export const getGenesString = (protein: ProteinResponse): string => {
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

export const getProteinObject = (protein: ProteinResponse): Protein => {
  const genes = getGenesString(protein)
  const subcellular_location = getLocationString(protein)

  return {
    entry: protein.primaryAccession,
    entry_names: protein.uniProtkbId,
    genes,
    organism: protein.organism.scientificName,
    subcellular_location,
    length: protein.sequence.length,
  }
}
