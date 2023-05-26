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
    let PubMedId = null
    let DoiID = null

    publication.citation.citationCrossReferences?.forEach((crossReference) => {
      if (crossReference.database === "PubMed") {
        PubMedId = crossReference.id
      } else if (crossReference.database === "DOI") {
        DoiID = crossReference.id
      }
    })
    setCrossReferences({ PubMed: PubMedId, DOI: DoiID })
  }, [publication])

  return (
    <div className={`publication ${className}`}>
      <h3 className="publication__title">
        {publication.citation?.title || "No Title"}
      </h3>

      {/* Authors */}
      <div
        className="publication__authors"
        title={publication.citation?.authors?.join(", ")}
      >
        {publication.citation?.authors?.map((author, index) => {
          return (
            <Fragment
              key={publication.citation?.id + "-" + author + "-" + index}
            >
              <span className="publication__author-item">{author}</span>
              <span>
                {publication.citation?.authors &&
                  index + 1 < publication.citation?.authors?.length &&
                  ", "}
              </span>
            </Fragment>
          )
        })}
      </div>
      {/* Categories */}
      <div className="publication__description">
        <span className="publication__description-title">{"Categories: "}</span>
        <span className="publication__description-text">
          {publication.references?.map((reference) => {
            return reference.sourceCategories?.join(", ") || "N/A"
          })}
        </span>
      </div>

      {/* Cited for */}
      <div className="publication__description">
        <span className="publication__description-title">{"Cited for: "}</span>
        <span className="publication__description-text">
          {publication.references?.map((reference) => {
            return reference.referencePositions?.join(", ") || "N/A"
          })}
        </span>
      </div>

      {/* Source */}
      <div className="publication__description">
        <span className="publication__description-title">{"Source: "}</span>
        <span className="publication__description-text">
          {publication.references?.map((reference) => {
            return reference.source?.name || "N/A"
          })}
        </span>
      </div>

      {/* Links */}
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
            {publication.citation?.journal &&
              `${publication.citation?.journal} ${publication.citation?.volume}: ${publication.citation?.firstPage}-${publication.citation?.lastPage} (${publication.citation?.publicationDate})`}
            {!publication.citation.journal &&
              publication.citation.publicationDate &&
              `Publication (${publication.citation?.publicationDate || "N/A"})`}
            <img src={link_img} alt="PubMed Publication" />
          </button>
        </a>
      </div>
    </div>
  )
}

export default PublicationComponent
