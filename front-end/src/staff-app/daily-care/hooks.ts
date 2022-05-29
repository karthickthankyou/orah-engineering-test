import { useEffect, useState } from "react"
import { useApi } from "shared/hooks/use-api"
import { Person, PersonHelper } from "shared/models/person"
import { HomeBoardStateType } from "./store"

const sortByProperty = (arr: Person[], sortBy: HomeBoardStateType["sortBy"] = "first_name", sortOrder: HomeBoardStateType["sortOrder"] = "asc") => {
  const order = sortOrder === "asc" ? 1 : -1
  return arr.sort(function (a, b) {
    const A = typeof a[sortBy] === "string" ? a[sortBy].toLowerCase() : a[sortBy]
    const B = typeof b[sortBy] === "string" ? b[sortBy].toLowerCase() : b[sortBy]
    const r: number = A < B ? -1 : 1
    return r * order
  })
}

type GetStudentsType = { state: HomeBoardStateType }

export const useGetStudents = ({ state }: GetStudentsType) => {
  const { searchTerm, sortBy, sortOrder } = state
  const [getStudents, data, isLoading] = useApi<{ students: Person[] }>({ url: "get-homeboard-students" })
  const [studentsList, setStudentsList] = useState<Person[]>([])

  useEffect(() => {
    let payload: Person[] = []
    payload = data?.students.filter((item) => PersonHelper.getFullName(item).toLowerCase().includes(searchTerm.toLowerCase())) || []

    payload = sortByProperty(payload, sortBy, sortOrder)
    setStudentsList(payload)
  }, [data?.students, searchTerm, sortBy, sortOrder])

  useEffect(() => {
    void getStudents()
  }, [getStudents])

  return { studentsList, isLoading } as const
}
