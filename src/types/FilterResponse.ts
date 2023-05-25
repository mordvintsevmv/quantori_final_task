export interface FilterResponse {
  facets: Facet[]
  results: Result[]
}

export interface Facet {
  label: string
  name: string
  allowMultipleSelection: boolean
  values: FilterValue[]
}

export interface FilterValue {
  label?: string
  value: string
  count: number
}

export interface Result {
  entryType: string
  primaryAccession: string
  secondaryAccessions?: string[]
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
  recommendedName: RecommendedName
  alternativeNames?: AlternativeName[]
}

export interface RecommendedName {
  fullName: FullName
  ecNumbers?: EcNumber[]
  shortNames?: ShortName[]
}

export interface FullName {
  value: string
  evidences?: Evidence[]
}

export interface Evidence {
  evidenceCode: string
  source?: string
  id?: string
}

export interface EcNumber {
  evidences: Evidence2[]
  value: string
}

export interface Evidence2 {
  evidenceCode: string
  source?: string
  id?: string
}

export interface ShortName {
  value: string
}

export interface AlternativeName {
  fullName: FullName2
  shortNames?: ShortName2[]
}

export interface FullName2 {
  value: string
  evidences?: Evidence3[]
}

export interface Evidence3 {
  evidenceCode: string
  source?: string
  id?: string
}

export interface ShortName2 {
  value: string
}

export interface Gene {
  geneName: GeneName
  synonyms?: Synonym[]
  orfNames?: OrfName[]
}

export interface GeneName {
  evidences?: Evidence4[]
  value: string
}

export interface Evidence4 {
  evidenceCode: string
  source: string
  id: string
}

export interface Synonym {
  value: string
  evidences?: Evidence5[]
}

export interface Evidence5 {
  evidenceCode: string
  source: string
  id: string
}

export interface OrfName {
  value: string
}

export interface Comment {
  texts?: Text[]
  commentType: string
  interactions?: Interaction[]
  note: any
  subcellularLocations?: SubcellularLocation[]
  disease?: Disease
  resourceName?: string
  resourceUrl?: string
  ftp?: boolean
  events?: string[]
  isoforms?: Isoform[]
  molecule?: string
  sequenceCautionType?: string
  sequence?: string
  evidences?: Evidence13[]
  locationType?: string
  positions?: Position[]
  reaction?: Reaction
  cofactors?: Cofactor[]
  physiologicalReactions?: PhysiologicalReaction[]
  kineticParameters?: KineticParameters
}

export interface Text {
  evidences?: Evidence6[]
  value: string
}

export interface Evidence6 {
  evidenceCode: string
  source?: string
  id?: string
}

export interface Interaction {
  interactantOne: InteractantOne
  interactantTwo: InteractantTwo
  numberOfExperiments: number
  organismDiffer: boolean
}

export interface InteractantOne {
  uniProtKBAccession: string
  intActId: string
}

export interface InteractantTwo {
  uniProtKBAccession: string
  geneName?: string
  intActId: string
  chainId?: string
}

export interface SubcellularLocation {
  location: Location
  topology?: Topology
  orientation?: Orientation
}

export interface Location {
  evidences?: Evidence7[]
  value: string
  id: string
}

export interface Evidence7 {
  evidenceCode: string
  source?: string
  id?: string
}

export interface Topology {
  evidences: Evidence8[]
  value: string
  id: string
}

export interface Evidence8 {
  evidenceCode: string
  source?: string
  id?: string
}

export interface Orientation {
  evidences: Evidence9[]
  value: string
  id: string
}

export interface Evidence9 {
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
  evidences?: Evidence10[]
}

export interface DiseaseCrossReference {
  database: string
  id: string
}

export interface Evidence10 {
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
  value: string
  evidences?: Evidence11[]
}

export interface Evidence11 {
  evidenceCode: string
  source: string
  id: string
}

export interface Synonym2 {
  value: string
  evidences?: Evidence12[]
}

export interface Evidence12 {
  evidenceCode: string
  source: string
  id: string
}

export interface Evidence13 {
  evidenceCode: string
}

export interface Position {
  position: string
  evidences: Evidence14[]
}

export interface Evidence14 {
  evidenceCode: string
  source: string
  id: string
}

export interface Reaction {
  name: string
  reactionCrossReferences?: ReactionCrossReference[]
  evidences: Evidence15[]
  ecNumber?: string
}

export interface ReactionCrossReference {
  database: string
  id: string
}

export interface Evidence15 {
  evidenceCode: string
  source?: string
  id?: string
}

export interface Cofactor {
  name: string
  evidences: Evidence16[]
  cofactorCrossReference: CofactorCrossReference
}

export interface Evidence16 {
  evidenceCode: string
  source: string
  id: string
}

export interface CofactorCrossReference {
  database: string
  id: string
}

export interface PhysiologicalReaction {
  directionType: string
  reactionCrossReference: ReactionCrossReference2
  evidences: Evidence17[]
}

export interface ReactionCrossReference2 {
  database: string
  id: string
}

export interface Evidence17 {
  evidenceCode: string
  source: string
  id: string
}

export interface KineticParameters {
  michaelisConstants: MichaelisConstant[]
}

export interface MichaelisConstant {
  constant: number
  unit: string
  substrate: string
  evidences: Evidence18[]
}

export interface Evidence18 {
  evidenceCode: string
  source: string
  id: string
}

export interface Feature {
  type: string
  location: Location2
  description: string
  featureId?: string
  evidences?: Evidence19[]
  alternativeSequence?: AlternativeSequence
  featureCrossReferences?: FeatureCrossReference[]
  ligand?: Ligand
}

export interface Location2 {
  start: Start
  end: End
  sequence?: string
}

export interface Start {
  value: number
  modifier: string
}

export interface End {
  value: number
  modifier: string
}

export interface Evidence19 {
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

export interface Ligand {
  name: string
  id: string
  label?: string
  note?: string
}

export interface Keyword {
  id: string
  category: string
  name: string
}

export interface Reference {
  citation: Citation
  referencePositions: string[]
  referenceComments?: ReferenceComment[]
  evidences?: Evidence20[]
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
  authoringGroup?: string[]
  submissionDatabase?: string
}

export interface CitationCrossReference {
  database: string
  id: string
}

export interface ReferenceComment {
  value: string
  type: string
}

export interface Evidence20 {
  evidenceCode: string
  source?: string
  id?: string
}

export interface UniProtKbcrossReference {
  database: string
  id: string
  properties: Property[]
  isoformId?: string
  evidences?: Evidence21[]
}

export interface Property {
  key: string
  value: string
}

export interface Evidence21 {
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
  FUNCTION?: number
  SUBUNIT?: number
  "SUBCELLULAR LOCATION"?: number
  "ALTERNATIVE PRODUCTS"?: number
  "TISSUE SPECIFICITY"?: number
  DISEASE?: number
  MISCELLANEOUS?: number
  "SEQUENCE CAUTION"?: number
  INTERACTION?: number
  PTM?: number
  "WEB RESOURCE"?: number
  SIMILARITY?: number
  "RNA EDITING"?: number
  INDUCTION?: number
  DOMAIN?: number
  CAUTION?: number
  "CATALYTIC ACTIVITY"?: number
  "ACTIVITY REGULATION"?: number
  PATHWAY?: number
  POLYMORPHISM?: number
  "DISRUPTION PHENOTYPE"?: number
  COFACTOR?: number
  "BIOPHYSICOCHEMICAL PROPERTIES"?: number
}

export interface CountByFeatureType {
  Chain: number
  Region?: number
  "Compositional bias"?: number
  "Alternative sequence"?: number
  "Natural variant"?: number
  "Sequence conflict"?: number
  Repeat?: number
  Motif?: number
  "Modified residue"?: number
  Mutagenesis?: number
  Helix?: number
  "Beta strand"?: number
  Turn?: number
  Transmembrane?: number
  "Topological domain"?: number
  "Coiled coil"?: number
  Domain?: number
  "Zinc finger"?: number
  "Cross-link"?: number
  "Active site"?: number
  "Initiator methionine"?: number
  "Binding site"?: number
  Site?: number
  Lipidation?: number
  "Disulfide bond"?: number
  "DNA binding"?: number
}
