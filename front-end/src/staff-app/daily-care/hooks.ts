import { useEffect, useState } from "react"
import { useApi } from "shared/hooks/use-api"
import { Person } from "shared/models/person"

export const useGetStudents = () => {
  const [getStudents, data, isLoading] = useApi<{ students: Person[] }>({ url: "get-homeboard-students" })
  const [studentsList, setStudentsList] = useState<Person[]>([])

  useEffect(() => {
    setStudentsList(data?.students || [])
  }, [data?.students])

  useEffect(() => {
    void getStudents()
  }, [getStudents])

  return { studentsList, isLoading } as const
}
