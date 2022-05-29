import React, { useContext, useState } from "react"
import { Person } from "shared/models/person"
import { RollStateType } from "shared/models/roll"
import { RollStateIcon } from "staff-app/components/roll-state/roll-state-icon.component"
import { StudentsContext } from "staff-app/daily-care/home-board.page"

interface Props {
  studentId: Person["id"]
  initialState?: RollStateType
  size?: number
}
export const RollStateSwitcher: React.FC<Props> = ({ studentId, initialState = "unmark", size = 40 }) => {
  const [{ attendance }, dispatch] = useContext(StudentsContext)
  const [rollState, setRollState] = useState(() => attendance[studentId] || initialState)

  const nextState = () => {
    const states: RollStateType[] = ["present", "late", "absent"]
    if (rollState === "unmark" || rollState === "absent") return states[0]
    const matchingIndex = states.findIndex((s) => s === rollState)
    return matchingIndex > -1 ? states[matchingIndex + 1] : states[0]
  }

  const onClick = () => {
    const next = nextState()
    setRollState(next)
    dispatch({ type: "setAttendance", payload: { id: studentId, attendance: next } })
  }

  return <RollStateIcon type={rollState} size={size} onClick={onClick} />
}
