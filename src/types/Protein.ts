export interface Protein {
  accession: string
  id: string
  gene: string
  organism_name: string
  subcellular_location: string
  length: number
}

export interface ProteinResponse {
  primaryAccession: string
  uniProtkbId: string
  organism: Organism
  genes?: Gene[]
  comments?: Comment[]
  sequence: Sequence
}

export interface Organism {
  scientificName: string
  commonName?: string
  taxonId: number
  lineage: string[]
  synonyms?: string[]
  evidences?: Evidence[]
}

export interface Evidence {
  evidenceCode: string
  source: string
  id: string
}

export interface Gene {
  geneName?: GeneName
  synonyms?: Synonym[]
  orfNames?: OrfName[]
  orderedLocusNames?: OrderedLocusName[]
}

export interface GeneName {
  value: string
  evidences?: Evidence2[]
}

export interface Evidence2 {
  evidenceCode: string
  source: string
  id: string
}

export interface Synonym {
  value: string
  evidences?: Evidence3[]
}

export interface Evidence3 {
  evidenceCode: string
  source: string
  id: string
}

export interface OrfName {
  value: string
  evidences?: Evidence4[]
}

export interface Evidence4 {
  evidenceCode: string
  source: string
  id: string
}

export interface OrderedLocusName {
  value: string
}

export interface Comment {
  commentType: string
  subcellularLocations?: SubcellularLocation[]
  note?: Note
  molecule?: string
}

export interface SubcellularLocation {
  location: Location
  topology?: Topology
  orientation?: Orientation
}

export interface Location {
  evidences?: Evidence5[]
  value: string
  id: string
}

export interface Evidence5 {
  evidenceCode: string
  source?: string
  id?: string
}

export interface Topology {
  evidences?: Evidence6[]
  value: string
  id: string
}

export interface Evidence6 {
  evidenceCode: string
  source?: string
  id?: string
}

export interface Orientation {
  value: string
  id: string
  evidences?: Evidence7[]
}

export interface Evidence7 {
  evidenceCode: string
  source: string
  id: string
}

export interface Note {
  texts: Text[]
}

export interface Text {
  evidences?: Evidence8[]
  value: string
}

export interface Evidence8 {
  evidenceCode: string
  source?: string
  id?: string
}

export interface Sequence {
  length: number
}
