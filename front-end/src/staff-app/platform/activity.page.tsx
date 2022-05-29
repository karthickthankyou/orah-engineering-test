import React, { useEffect } from "react"
import styled from "styled-components"
import { Spacing } from "shared/styles/styles"
import { useApi } from "shared/hooks/use-api"

export const ActivityPage: React.FC = () => {
  const [getActivities, data, loading] = useApi<{
    activity: { entity: { id: number; name: string; completed_at: string; student_roll_states: { roll_state: RolllStateType; student_id: string }[] } }[]
    success: boolean
  }>({
    url: "get-activities",
  })
  useEffect(() => {
    void getActivities()
  }, [getActivities])

  console.log("data ", data)

  return <S.Container>Activity Page</S.Container>
}

const S = {
  Container: styled.div`
    display: flex;
    flex-direction: column;
    width: 50%;
    margin: ${Spacing.u4} auto 0;
  `,
}
