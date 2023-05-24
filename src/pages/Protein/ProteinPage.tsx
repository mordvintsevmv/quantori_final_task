import "./ProteinPage.css"
import "react-toastify/dist/ReactToastify.css"

import { FC, Fragment, useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { Tab, TabList, TabPanel, Tabs } from "react-tabs"
import { toast, ToastContainer } from "react-toastify"

import { uniprotSearch } from "../../api/uniProt.ts"
import Header from "../../components/Header/Header.tsx"
import Loading from "../../components/Loading/Loading.tsx"
import { ProteinDetailed } from "../../types/ProteinDetailed.ts"
import { getGenesString } from "../../utils/getProteinProperties.ts"
import back_img from "./assets/back.svg"
import copy_img from "./assets/copy.svg"

const month_array: string[] = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
]

const convertDate = (date: string) => {
  const [year, month, day] = date.split("-").map(Number)

  return `${month_array[month - 1]} ${day} ${year}`
}

const ProteinPage: FC = () => {
  const { id } = useParams()

  const [protein, setProtein] = useState<ProteinDetailed | null>(null)

  const navigate = useNavigate()

  const handleBack = () => {
    navigate(-1)
  }

  const handleCopy = () => {
    if (protein) {
      window.navigator.clipboard
        .writeText(protein.sequence.value)
        .then(() => {
          return toast.info("Sequence copied!", {
            position: "top-right",
            autoClose: 3000,
            closeOnClick: true,
            theme: "light",
          })
        })
        .catch(() => {
          toast.error("Copy failed!", {
            position: "top-right",
            autoClose: 3000,
            closeOnClick: true,
            theme: "light",
          })
        })
    }
  }

  useEffect(() => {
    if (id) {
      uniprotSearch
        .get(id)
        .then((response) => {
          setProtein(response.data)

          return response.data
        })
        .catch(() => {
          toast.error("Loading failed1", {
            position: "top-right",
            autoClose: 3000,
            closeOnClick: true,
            theme: "light",
          })
        })
    }
  }, [id])

  return (
    <Fragment>
      <Header />

      <ToastContainer />

      {protein && (
        <div className="protein-page">
          <button
            className="protein-page__back-btn icon-button--transparent"
            onClick={handleBack}
          >
            <img src={back_img} alt="Back" />
          </button>

          <div className="protein-page__header">
            <h1 className="protein-page__title">
              {protein.primaryAccession} {" / "} {protein.uniProtkbId}
            </h1>
            <div className="protein-page__organism">
              {protein.organism.scientificName}
            </div>
          </div>
          <div className="protein-page__description">
            <div className="protein-page__description-block">
              <div className="protein-page__description-title">{"Protein"}</div>
              <div className="protein-page__description-text">
                {protein.proteinDescription.recommendedName.fullName.value}
              </div>
            </div>
            <div className="protein-page__description-block">
              <div className="protein-page__description-title">{"Gene"}</div>
              <div className="protein-page__description-text">
                {getGenesString(protein)}
              </div>
            </div>
          </div>

          <Tabs className="protein-page__tabs">
            <TabList>
              <Tab>{"Details"}</Tab>
              <Tab>{"Feature viewer"}</Tab>
              <Tab>{"Publications"}</Tab>
            </TabList>

            <TabPanel className="protein-page__details-tab protein-details">
              <h2>{"Sequence"}</h2>
              <div className="protein-details__params">
                <div>
                  <div className="protein-page__description-block">
                    <div className="protein-page__description-title">
                      {"Length"}
                    </div>
                    <div className="protein-page__description-text">
                      {protein.sequence.length}
                    </div>
                  </div>

                  <div className="protein-page__description-block">
                    <div className="protein-page__description-title">
                      {"Mass (Da)"}
                    </div>
                    <div className="protein-page__description-text">
                      {protein.sequence.molWeight / 1000}
                    </div>
                  </div>
                </div>

                <div>
                  <div className="protein-page__description-block">
                    <div className="protein-page__description-title">
                      {"Last updated"}
                    </div>
                    <div className="protein-page__description-text">
                      {convertDate(protein.entryAudit.lastSequenceUpdateDate)}
                    </div>
                  </div>

                  <div className="protein-page__description-block">
                    <div className="protein-page__description-title">
                      {"Checksum"}
                    </div>
                    <div className="protein-page__description-text">
                      {protein.sequence.crc64}
                    </div>
                  </div>
                </div>
              </div>

              <div className="protein-details__sequence">
                <button
                  className="protein-details__sequence-copy"
                  onClick={handleCopy}
                >
                  <img src={copy_img} alt="Copy" />
                  {"Copy"}
                </button>

                <div className="protein-details__sequence-text">
                  {protein.sequence.value}
                </div>
              </div>
            </TabPanel>

            <TabPanel>
              <h2>{"Feature viewer"}</h2>
            </TabPanel>

            <TabPanel>
              <h2>{"Publications"}</h2>
            </TabPanel>
          </Tabs>
        </div>
      )}
      {!protein && <Loading />}
    </Fragment>
  )
}

export default ProteinPage
