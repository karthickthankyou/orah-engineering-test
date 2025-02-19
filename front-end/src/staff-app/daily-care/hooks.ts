import { useEffect, useState } from "react"
import { useApi } from "shared/hooks/use-api"
import { Person, PersonHelper } from "shared/models/person"
import { HomeBoardStateType, HomeBoardActionType } from "./store"

const sortByProperty = (arr: Person[], sortBy: HomeBoardStateType["sortBy"] = "first_name", sortOrder: HomeBoardStateType["sortOrder"] = "asc") => {
  const order = sortOrder === "asc" ? 1 : -1
  return arr.sort(function (a, b) {
    const A = typeof a[sortBy] === "string" ? a[sortBy].toLowerCase() : a[sortBy]
    const B = typeof b[sortBy] === "string" ? b[sortBy].toLowerCase() : b[sortBy]
    const r: number = A < B ? -1 : 1
    return r * order
  })
}

type GetStudentsType = { state: HomeBoardStateType; dispatch: React.Dispatch<HomeBoardActionType> }

export const useGetStudents = ({ state, dispatch }: GetStudentsType) => {
  const { searchTerm, sortBy, sortOrder, attendanceFilter, attendance } = state
  const [getStudents, data, isLoading] = useApi<{ students: Person[] }>({ url: "get-homeboard-students" })
  const [studentsList, setStudentsList] = useState<Person[]>([])

  useEffect(() => {
    const payload = data?.students || []
    dispatch({ type: "setAllStudents", payload })
  }, [data?.students])

  useEffect(() => {
    let payload: Person[] = []

    // Filter
    payload = data?.students.filter((item) => PersonHelper.getFullName(item).toLowerCase().includes(searchTerm.toLowerCase())) || []

    if (attendanceFilter && attendanceFilter !== "all") {
      payload = payload.filter((item) => attendance[item.id] === attendanceFilter)
    }

    // Sort
    payload = sortByProperty(payload, sortBy, sortOrder)

    setStudentsList(payload)
  }, [data?.students, searchTerm, sortBy, sortOrder, attendance, attendanceFilter])

  useEffect(() => {
    void getStudents()
  }, [getStudents])

  return { studentsList, isLoading } as const
}
