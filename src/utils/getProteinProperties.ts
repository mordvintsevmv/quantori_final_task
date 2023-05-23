import { Protein } from "../types/Protein.ts"

export const getLocationString = (protein: Protein): string => {
  if (protein.comments) {
    const comments = protein.comments

    const locations = comments.map((comment) =>
      comment.commentType === "SUBCELLULAR LOCATION"
        ? comment.subcellularLocations
        : null,
    )

    const location_value = locations
      .flat(Number.POSITIVE_INFINITY)
      .map((location) => {
        return location && "location" in location ? location.location.value : ""
      })

    const unique_location = [...new Set(location_value.join(", ").split(","))]

    return unique_location.length > 1 ? unique_location.join(", ") : "-"
  } else {
    return "-"
  }
}

export const getGenesArray = (protein: Protein): string[] => {
  if (protein.primaryAccession === "Q9Y238") {
    console.log(protein)
  }

  if (Array.isArray(protein.genes)) {
    const genes = protein.genes.map((gene) =>
      gene?.geneName?.value ? gene.geneName.value : "",
    )

    return genes.join("").length > 0 ? genes : ["-"]
  } else if (protein.genes?.geneName) {
    return [protein.genes.geneName.value]
  } else {
    return ["-"]
  }
}
