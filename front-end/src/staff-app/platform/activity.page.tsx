import React, { useEffect, useState } from "react"
import styled from "styled-components"
import { Spacing } from "shared/styles/styles"
import { useApi } from "shared/hooks/use-api"
import { Button } from "@material-ui/core"
import { useNavigate } from "react-router-dom"
import { RollStateList } from "staff-app/components/roll-state/roll-state-list.component"
import dateFormat from "dateformat"
import { Activity } from "shared/models/activity"

export const ActivityPage: React.FC = () => {
  const [getActivities, data, loading] = useApi<{
    activity: Activity[]
    success: boolean
  }>({
    url: "get-activities",
  })
  useEffect(() => {
    void getActivities()
  }, [getActivities])

  const [sortedStudents, setSortedStudents] = useState<Activity[]>([])
  useEffect(() => {
    const sortedArr =
      data?.activity.sort((a, b) => {
        const A = a.entity.completed_at
        const B = b.entity.completed_at
        const r: number = A > B ? -1 : 1
        return r
      }) || []

    setSortedStudents(sortedArr)
  }, [data?.activity])

  const navigate = useNavigate()

  return (
    <S.Container>
      Activity Page
      {sortedStudents?.length === 0 && (
        <div>
          No rolls found.
          <Button variant="text" onClick={() => navigate("/staff/daily-care")}>
            Create attendance
          </Button>
        </div>
      )}
      {sortedStudents?.map((item) => {
        const reduced = item.entity.student_roll_states.reduce(
          (acc, curr) => {
            acc[curr.roll_state]++
            return acc
          },
          { present: 0, absent: 0, late: 0, unmark: 0 }
        )

        const total = item.entity.student_roll_states.length

        const date = dateFormat(new Date(item.entity.completed_at), "mmm dS, yyyy, h:MM TT")
        return (
          <div key={item.entity.id} style={{ paddingTop: "1rem", paddingBottom: "1rem" }}>
            <div style={{ fontWeight: 800 }}>{item.entity.name}</div>
            <div style={{ fontWeight: 500 }}>{date}</div>
            <div style={{ fontWeight: 300 }}>{Math.round((reduced.present / total) * 100)}%</div>

            <RollStateList
              stateList={[
                { type: "all", count: item.entity.student_roll_states.length },
                { type: "present", count: reduced.present },
                { type: "late", count: reduced.late },
                { type: "absent", count: reduced.absent },
              ]}
            />
          </div>
        )
      })}
    </S.Container>
  )
}

const S = {
  Container: styled.div`
    display: flex;
    flex-direction: column;
    width: 50%;
    margin: ${Spacing.u4} auto 0;
  `,
}
