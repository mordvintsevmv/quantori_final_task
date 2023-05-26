export interface ProteinDetailed {
  entryType: string
  primaryAccession: string
  secondaryAccessions: string[]
  uniProtkbId: string
  entryAudit: EntryAudit
  annotationScore: number
  organism: Organism
  proteinExistence: string
  proteinDescription: ProteinDescription
  genes: Gene[]
  comments: Comment[]
  features: Feature[]
  keywords: Keyword[]
  references: Reference[]
  uniProtKBCrossReferences: UniProtKbcrossReference[]
  sequence: Sequence
  extraAttributes: ExtraAttributes
}

export interface EntryAudit {
  firstPublicDate: string
  lastAnnotationUpdateDate: string
  lastSequenceUpdateDate: string
  entryVersion: number
  sequenceVersion: number
}

export interface Organism {
  scientificName: string
  commonName: string
  taxonId: number
  lineage: string[]
}

export interface ProteinDescription {
  recommendedName?: RecommendedName
  alternativeNames?: AlternativeName[]
  submissionNames?: SubmissionName[]
}

export interface RecommendedName {
  fullName: FullName
}

export interface FullName {
  value: string
}

export interface AlternativeName {
  fullName: FullName
  shortNames: ShortName[]
}

export interface SubmissionName {
  fullName: FullName
}

export interface ShortName {
  value: string
}

export interface Gene {
  geneName: GeneName
  synonyms: Synonym[]
}

export interface GeneName {
  evidences: Evidence[]
  value: string
}

export interface Evidence {
  evidenceCode: string
  source: string
  id: string
}

export interface Synonym {
  evidences: Evidence2[]
  value: string
}

export interface Evidence2 {
  evidenceCode: string
  source: string
  id: string
}

export interface Comment {
  texts?: Text[]
  commentType: string
  subcellularLocations?: SubcellularLocation[]
  events?: string[]
  isoforms?: Isoform[]
  note: Text[]
  disease?: Disease
  molecule?: string
  sequenceCautionType?: string
  sequence?: string
  evidences?: Evidence8[]
}

export interface Text {
  evidences?: Evidence3[]
  value: string
}

export interface Evidence3 {
  evidenceCode: string
  source?: string
  id?: string
}

export interface SubcellularLocation {
  location: Location
}

export interface Location {
  evidences: Evidence4[]
  value: string
  id: string
}

export interface Evidence4 {
  evidenceCode: string
  source: string
  id: string
}

export interface Isoform {
  name: Name
  isoformIds: string[]
  isoformSequenceStatus: string
  sequenceIds?: string[]
  synonyms?: Synonym2[]
}

export interface Name {
  evidences?: Evidence5[]
  value: string
}

export interface Evidence5 {
  evidenceCode: string
  source: string
  id: string
}

export interface Synonym2 {
  evidences: Evidence6[]
  value: string
}

export interface Evidence6 {
  evidenceCode: string
  source: string
  id: string
}

export interface Disease {
  diseaseId: string
  diseaseAccession: string
  acronym: string
  description: string
  diseaseCrossReference: DiseaseCrossReference
  evidences?: Evidence7[]
}

export interface DiseaseCrossReference {
  database: string
  id: string
}

export interface Evidence7 {
  evidenceCode: string
  source: string
  id: string
}

export interface Evidence8 {
  evidenceCode: string
}

export interface Feature {
  type: string
  location: Location2
  description: string
  featureId?: string
  evidences?: Evidence9[]
  alternativeSequence?: AlternativeSequence
  featureCrossReferences?: FeatureCrossReference[]
}

export interface Location2 {
  start: Start
  end: End
}

export interface Start {
  value: number
  modifier: string
}

export interface End {
  value: number
  modifier: string
}

export interface Evidence9 {
  evidenceCode: string
  source?: string
  id?: string
}

export interface AlternativeSequence {
  originalSequence?: string
  alternativeSequences?: string[]
}

export interface FeatureCrossReference {
  database: string
  id: string
}

export interface Keyword {
  id: string
  category: string
  name: string
}

export interface Reference {
  citation: Citation
  referencePositions: string[]
  evidences?: Evidence10[]
  referenceComments?: ReferenceComment[]
}

export interface Citation {
  id: string
  citationType: string
  authors: string[]
  citationCrossReferences: CitationCrossReference[]
  title: string
  publicationDate: string
  journal: string
  firstPage: string
  lastPage: string
  volume: string
}

export interface CitationCrossReference {
  database: string
  id: string
}

export interface Evidence10 {
  evidenceCode: string
  source?: string
  id?: string
}

export interface ReferenceComment {
  value: string
  type: string
}

export interface UniProtKbcrossReference {
  database: string
  id: string
  properties: Property[]
  isoformId?: string
  evidences?: Evidence11[]
}

export interface Property {
  key: string
  value: string
}

export interface Evidence11 {
  evidenceCode: string
  source: string
  id: string
}

export interface Sequence {
  value: string
  length: number
  molWeight: number
  crc64: string
  md5: string
}

export interface ExtraAttributes {
  countByCommentType: CountByCommentType
  countByFeatureType: CountByFeatureType
  uniParcId: string
}

export interface CountByCommentType {
  FUNCTION: number
  SUBUNIT: number
  "SUBCELLULAR LOCATION": number
  "ALTERNATIVE PRODUCTS": number
  "TISSUE SPECIFICITY": number
  DISEASE: number
  MISCELLANEOUS: number
  "SEQUENCE CAUTION": number
}

export interface CountByFeatureType {
  Chain: number
  Region: number
  "Compositional bias": number
  "Alternative sequence": number
  "Natural variant": number
  "Sequence conflict": number
}
