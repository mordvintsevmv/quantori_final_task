import axios from "axios"

import { Protein, ProteinResponse } from "../types/Protein.ts"
import { getProteinObject } from "../utils/getProteinProperties.ts"

export const uniprotSearch = axios.create({
  baseURL: "https://rest.uniprot.org/uniprotkb",
})

const searchFields =
  "fields=accession,id,gene_names,organism_name,length,cc_subcellular_location"

export const getUniprotProteinsAsync = async (
  query: string,
): Promise<{
  totalResults: number
  proteins: Protein[]
  link: string | null
}> => {
  const response = await uniprotSearch.get(
    `search?${searchFields}&query=${query}&size=500`,
  )

  const link: string | null = response.headers.link
    ? response.headers.link
    : null

  const proteins = response.data.results.map((protein: ProteinResponse) =>
    getProteinObject(protein),
  )

  return {
    proteins,
    link: link ? link.slice(link.indexOf("<") + 1, link.indexOf(">")) : null,
    totalResults: +response.headers["x-total-results"],
  }
}

export const getMoreUniprotProteinsAsync = async (
  link: string,
): Promise<{ proteins: Protein[]; link: string | null }> => {
  const response = await axios.get(link)

  const newLink: string | null = response.headers.link
    ? response.headers.link
    : null

  const proteins = response.data.results.map((protein: ProteinResponse) =>
    getProteinObject(protein),
  )

  return {
    proteins,
    link: newLink
      ? newLink.slice(newLink.indexOf("<") + 1, newLink.indexOf(">"))
      : null,
  }
}
