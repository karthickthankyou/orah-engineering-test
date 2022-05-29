import React, { useContext } from "react"
import styled from "styled-components"
import Button from "@material-ui/core/Button"
import { BorderRadius, Spacing } from "shared/styles/styles"
import { RollStateList } from "staff-app/components/roll-state/roll-state-list.component"
import { StudentsContext } from "staff-app/daily-care/home-board.page"
import { HomeBoardStateType } from "staff-app/daily-care/store"
import { RollStateType } from "shared/models/roll"

export const getAttendanceLength = (attendance: HomeBoardStateType["attendance"], type?: RollStateType) => {
  if (!type) return Object.values(attendance).length
  return Object.values(attendance).filter((item) => item === type).length
}

export type ActiveRollAction = "filter" | "exit"

export const ActiveRollOverlay: React.FC = () => {
  const [{ isRollMode, attendance }, dispatch] = useContext(StudentsContext)
  return (
    <S.Overlay isRollMode={isRollMode}>
      <S.Content>
        <div>Class Attendance</div>
        <div>
          <RollStateList
            stateList={[
              { type: "all", count: getAttendanceLength(attendance) },
              { type: "present", count: getAttendanceLength(attendance, "present") },
              { type: "late", count: getAttendanceLength(attendance, "late") },
              { type: "absent", count: getAttendanceLength(attendance, "absent") },
            ]}
          />
          <div style={{ marginTop: Spacing.u6 }}>
            <Button color="inherit" onClick={() => dispatch({ type: "toggleRollMode", payload: false })}>
              Exit
            </Button>
            <Button color="inherit" style={{ marginLeft: Spacing.u2 }} onClick={() => dispatch({ type: "toggleRollMode", payload: false })}>
              Complete
            </Button>
          </div>
        </div>
      </S.Content>
    </S.Overlay>
  )
}

const S = {
  Overlay: styled.div<{ isRollMode: boolean }>`
    position: fixed;
    bottom: 0;
    left: 0;
    height: ${({ isRollMode }) => (isRollMode ? "120px" : 0)};
    width: 100%;
    background-color: rgba(34, 43, 74, 0.92);
    backdrop-filter: blur(2px);
    color: #fff;
  `,
  Content: styled.div`
    display: flex;
    justify-content: space-between;
    width: 52%;
    height: 100px;
    margin: ${Spacing.u3} auto 0;
    border: 1px solid #f5f5f536;
    border-radius: ${BorderRadius.default};
    padding: ${Spacing.u4};
  `,
}
