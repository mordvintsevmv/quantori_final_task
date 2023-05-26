import "./Filters.scss"

import { FC, useEffect, useState } from "react"
import { toast, ToastContainer } from "react-toastify"
import axios, { AxiosResponse } from "axios"
import { Field, Form, Formik } from "formik"

import { useTypedDispatch, useTypedSelector } from "../../hooks/reduxHooks.ts"
import { setFilters } from "../../redux/slices/proteinSlice.ts"
import { FilterValues, initialFilters } from "../../types/Filter.ts"
import { FilterResponse, FilterValue } from "../../types/FilterResponse.ts"
import { getFilterQuery } from "../../utils/getProteinProperties.ts"
import Loading from "../Loading/Loading.tsx"
import reset_img from "./assets/reset.svg"

interface FiltersProps {
  setFiltersOpened: (value: boolean) => void
  className?: string
}

const Filters: FC<FiltersProps> = ({ className, setFiltersOpened }) => {
  const { searchQuery, filterQuery } = useTypedSelector(
    (state) => state.proteins,
  )

  const [availableFilters, setAvailableFilters] = useState<null | {
    organism: FilterValue[]
    protein_with: FilterValue[]
    score: FilterValue[]
  }>(null)

  const [isLoading, setIsLoading] = useState<boolean>(false)

  const dispatch = useTypedDispatch()

  const handleSubmit = (values: FilterValues) => {
    setFiltersOpened(false)
    dispatch(setFilters(values))
  }

  const handleClose = () => {
    setFiltersOpened(false)
  }

  const handleReset = () => {
    setFiltersOpened(false)
    dispatch(setFilters(initialFilters))
  }

  useEffect(() => {
    const filters = getFilterQuery(filterQuery)

    setIsLoading(true)
    axios
      .get(
        `https://rest.uniprot.org/uniprotkb/search?facets=model_organism,proteins_with,annotation_score&query=${searchQuery}${filters}`,
      )
      .then((response: AxiosResponse<FilterResponse>) => {
        let organism: FilterValue[] = []
        let protein_with: FilterValue[] = []
        let score: FilterValue[] = []

        response.data.facets.forEach((facet) => {
          if (facet.label === "Popular organisms") {
            organism = facet.values
          }

          if (facet.label === "Proteins with") {
            protein_with = facet.values
          }

          if (facet.label === "Annotation score") {
            score = facet.values
          }
        })
        setAvailableFilters({ organism, protein_with, score })
        setIsLoading(false)

        return { organism, protein_with, score }
      })
      .catch(() => {
        toast.error("Filter load failed!", {
          position: "top-right",
          autoClose: 3000,
          closeOnClick: true,
          theme: "light",
        })
      })
  }, [searchQuery, filterQuery])

  return (
    <div className={`filters-block ${className}`}>
      {isLoading && <Loading />}

      <ToastContainer />

      <div className="filters-block__header">
        <h2 className="filters-block__title">{"Filters"}</h2>
        <button
          className="icon-button--transparent filters-block__reset-btn"
          onClick={handleReset}
        >
          <img src={reset_img} alt="reset" />
        </button>
      </div>

      <Formik initialValues={filterQuery} onSubmit={handleSubmit}>
        {({ dirty }) => (
          <Form>
            {/* Gene Name*/}
            <div className="filters__form-element">
              <label htmlFor="filter-gene-name">{"Gene Name"}</label>
              <Field
                id="filter-gene-name"
                name="gene"
                type="text"
                placeholder="Enter Gene Name"
                className="filters__input"
              />
            </div>

            {/* Organism */}
            <div className="filters__form-element">
              <label htmlFor="filter-organism">{"Organism"}</label>
              <Field
                id="filter-organism"
                name="model_organism"
                placeholder="Select an option"
                className="filters__input"
                element="select"
                as="select"
              >
                <option value="">{"Select an option"}</option>
                {availableFilters &&
                  availableFilters.organism.map((organism) => {
                    return (
                      <option value={organism.value} key={organism.value}>
                        {organism.label}
                      </option>
                    )
                  })}
              </Field>
            </div>

            {/* Sequence length */}
            <label htmlFor="filters-length">{"Sequence length"}</label>
            <div className="filters__length" id="filters-length">
              <div className="filters__form-element">
                <Field
                  id="filter-length-from"
                  name="length_from"
                  type="text"
                  placeholder="From"
                  className="filters__input"
                />
              </div>

              <hr />

              <div className="filters__form-element">
                <Field
                  id="filter-length-to"
                  name="length_to"
                  type="text"
                  placeholder="To"
                  className="filters__input"
                />
              </div>
            </div>

            {/* Annotation score */}
            <div className="filters__form-element">
              <label htmlFor="filter-score">{"Annotation score"}</label>
              <Field
                id="filter-score"
                name="annotation_score"
                type="text"
                placeholder="Select an option"
                className="filters__input"
                as="select"
              >
                <option value="">{"Select an option"}</option>
                {availableFilters &&
                  availableFilters.score.map((score) => {
                    return (
                      <option value={score.value} key={score.value}>
                        {score.value}
                      </option>
                    )
                  })}
              </Field>
            </div>

            {/* Protein with */}
            <div className="filters__form-element">
              <label htmlFor="filter-protein_with">{"Protein with"}</label>
              <Field
                id="filter-protein_with"
                name="proteins_with"
                type="text"
                placeholder="Select"
                className="filters__input"
                as="select"
              >
                <option value="">{"Select"}</option>
                {availableFilters &&
                  availableFilters.protein_with.map((option) => {
                    return (
                      <option value={option.value} key={option.value}>
                        {option.label}
                      </option>
                    )
                  })}
              </Field>
            </div>

            <div className="filters__buttons">
              <button className="button--transparent" onClick={handleClose}>
                {"Cancel"}
              </button>
              <button className="button" type="submit" disabled={!dirty}>
                {"Apply filters"}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  )
}

export default Filters
