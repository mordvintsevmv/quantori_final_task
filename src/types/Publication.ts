export interface Publication {
  citation: Citation
  references: Reference[]
  statistics: Statistics
}

export interface Citation {
  id: string
  citationType: string
  authors?: string[]
  citationCrossReferences?: CitationCrossReference[]
  title?: string
  publicationDate: string
  journal?: string
  firstPage?: string
  lastPage?: string
  volume?: string
  completeAuthorList?: boolean
  literatureAbstract?: string
  submissionDatabase?: string
  authoringGroup?: string[]
}

export interface CitationCrossReference {
  database: string
  id: string
}

export interface Reference {
  source: Source
  citationId: string
  sourceCategories: string[]
  referencePositions?: string[]
  referenceNumber?: number
  referenceComments?: ReferenceComment[]
  annotation?: string
}

export interface Source {
  name: string
  id?: string
}

export interface ReferenceComment {
  value: string
  type: string
}

export interface Statistics {
  reviewedProteinCount: number
  unreviewedProteinCount: number
  computationallyMappedProteinCount: number
  communityMappedProteinCount: number
}
