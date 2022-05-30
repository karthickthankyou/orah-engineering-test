import React, { useEffect, useState } from "react"
import styled from "styled-components"
import { FontSize, FontWeight, Spacing } from "shared/styles/styles"
import { useApi } from "shared/hooks/use-api"
import { Button } from "@material-ui/core"
import { useNavigate } from "react-router-dom"
import { RollStateList } from "staff-app/components/roll-state/roll-state-list.component"
import dateFormat from "dateformat"
import { Activity } from "shared/models/activity"
import { CenteredContainer } from "shared/components/centered-container/centered-container.component"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import ChartComponent from "./chart"

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
      {loading === "loading" && (
        <CenteredContainer>
          <FontAwesomeIcon icon="spinner" size="2x" spin />
        </CenteredContainer>
      )}
      {loading === "loaded" && sortedStudents?.length === 0 && (
        <div>
          No rolls found.
          <Button variant="text" onClick={() => navigate("/staff/daily-care")}>
            Create attendance
          </Button>
        </div>
      )}
      {loading === "loaded" &&
        sortedStudents?.map((item) => {
          const reduced = item.entity.student_roll_states.reduce(
            (acc, curr) => {
              acc[curr.roll_state]++
              return acc
            },
            { present: 0, absent: 0, late: 0, unmark: 0 }
          )

          const total = item.entity.student_roll_states.length

          const date = dateFormat(new Date(item.entity.completed_at), "mmm dd, yyyy")
          const time = dateFormat(new Date(item.entity.completed_at), "h:MM TT")
          return (
            <S.Flex key={item.entity.id}>
              <S.Relative>
                <div>
                  <ChartComponent data={reduced} />
                </div>
                <S.AbsoluteCenter>{Math.round((reduced.present / total) * 100)}%</S.AbsoluteCenter>
              </S.Relative>
              <S.FlexCol>
                <S.TextHeavy>{date}</S.TextHeavy>
                <div>{time}</div>
                <div>{item.entity.name}</div>
                <RollStateList
                  clickable={false}
                  size={4}
                  stateList={[
                    { type: "all", count: item.entity.student_roll_states.length },
                    { type: "present", count: reduced.present },
                    { type: "late", count: reduced.late },
                    { type: "absent", count: reduced.absent },
                  ]}
                />
              </S.FlexCol>
            </S.Flex>
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
  Flex: styled.div`
    display: flex;
    gap: ${Spacing.u6};
    padding: ${Spacing.u2} 0 ${Spacing.u2} 0;
  `,
  FlexCol: styled.div`
    display: flex;
    flex-direction: column;
    gap: ${Spacing.u1};
  `,
  AbsoluteCenter: styled.div`
    font-size: ${FontSize.u2};
    position: absolute;
    top: 50%;
    left: 50%;
    padding-bottom: ${Spacing.u2};
    transform: translate(-50%, -50%);
  `,
  Relative: styled.div`
    position: relative;
    display: inline-block;
  `,
  TextHeavy: styled.div`
    font-weight: ${FontWeight.strong};
    font-size: ${FontSize.u4};
  `,
}
