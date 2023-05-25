import "./PublicationComponent.scss"

import { FC, Fragment, useEffect, useState } from "react"

import { Publication } from "../../types/Publication.ts"
import link_img from "./assets/link.svg"

interface PublicationComponentProps {
  publication: Publication
  className?: string
}

const PublicationComponent: FC<PublicationComponentProps> = ({
  publication,
  className,
}) => {
  const [crossReferences, setCrossReferences] = useState<{
    PubMed: null | string
    DOI: null | string
  }>({ PubMed: null, DOI: null })

  useEffect(() => {
    publication.citation.citationCrossReferences?.forEach((crossReference) => {
      if (crossReference.database === "PubMed") {
        setCrossReferences({ ...crossReferences, PubMed: crossReference.id })
      } else if (crossReference.database === "DOI") {
        setCrossReferences({ ...crossReferences, DOI: crossReference.id })
      }
    })
  }, [publication])

  return (
    <div className={`publication ${className}`}>
      <h3 className="publication__title">{publication.citation.title}</h3>

      {/* Authors */}
      {publication.citation.authors && (
        <div
          className="publication__authors"
          title={publication.citation.authors.join(", ")}
        >
          {publication.citation.authors.map((author) => {
            return (
              <Fragment>
                <span className="publication__author-item">{author}</span>
                <span>{", "}</span>
              </Fragment>
            )
          })}
        </div>
      )}

      {/* Categories */}
      <div className="publication__description">
        <span className="publication__description-title">{"Categories: "}</span>
        <span className="publication__description-text">
          {publication.references.map((reference) => {
            return reference.sourceCategories.join(", ")
          })}
        </span>
      </div>

      {/* Cited for */}

      <div className="publication__description">
        <span className="publication__description-title">{"Cited for: "}</span>
        <span className="publication__description-text">
          {publication.references.map((reference) => {
            return reference.referencePositions
              ? reference.referencePositions.join(", ")
              : ""
          })}
        </span>
      </div>

      {/* Source */}

      <div className="publication__description">
        <span className="publication__description-title">{"Source: "}</span>
        <span className="publication__description-text">
          {publication.references.map((reference) => {
            return reference.source ? reference.source.name : ""
          })}
        </span>
      </div>

      <div className="publication__links">
        <a
          href={
            crossReferences.PubMed
              ? `https://pubmed.ncbi.nlm.nih.gov/${crossReferences.PubMed}`
              : undefined
          }
          target="_blank"
          rel="noreferrer"
        >
          <button
            className="publication__link-item"
            role="link"
            disabled={!crossReferences.PubMed}
          >
            {"PubMed"}
            <img src={link_img} alt="PubMed Publication" />
          </button>
        </a>

        <a
          href={
            crossReferences.PubMed
              ? `https://europepmc.org/article/MED/${crossReferences.PubMed}`
              : undefined
          }
          target="_blank"
          rel="noreferrer"
        >
          <button
            className="publication__link-item"
            role="link"
            disabled={!crossReferences.PubMed}
          >
            {"Europe PMC"}
            <img src={link_img} alt="Europe PMC Publication" />
          </button>
        </a>

        <a
          href={
            crossReferences.DOI
              ? `https://dx.doi.org/${crossReferences.DOI}`
              : undefined
          }
          target="_blank"
          rel="noreferrer"
        >
          <button
            className="publication__link-item"
            role="link"
            disabled={!crossReferences.DOI}
          >
            {publication.citation.journal &&
              `${publication.citation.journal} ${publication.citation.volume}: ${publication.citation.firstPage}-${publication.citation.lastPage} (${publication.citation.publicationDate})`}
            {!publication.citation.journal &&
              publication.citation.publicationDate &&
              `Publication (${publication.citation.publicationDate})`}
            <img src={link_img} alt="PubMed Publication" />
          </button>
        </a>
      </div>
    </div>
  )
}

export default PublicationComponent
