import axios from "axios"

import { Protein } from "../types/Protein.ts"

const uniprotSearch = axios.create({
  baseURL: "https://rest.uniprot.org/uniprotkb",
})

const searchFields =
  "fields=accession,id,gene_names,organism_name,length,cc_subcellular_location"

export const getUniprotProteinsAsync = async (
  query: string,
): Promise<{
  totalResults: number
  proteins: Protein[]
}> => {
  const response = await uniprotSearch.get(
    `search?${searchFields}&query=${query}&size=500`,
  )

  return {
    proteins: response.data.results,
    totalResults: +response.headers["x-total-results"],
  }
}
