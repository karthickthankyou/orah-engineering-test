import React, { useContext } from "react"
import styled from "styled-components"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { RollStateIcon } from "staff-app/components/roll-state/roll-state-icon.component"
import { Spacing, FontWeight } from "shared/styles/styles"
import { RollStateType } from "shared/models/roll"
import { StudentsContext } from "staff-app/daily-care/home-board.page"

interface Props {
  stateList: StateList[]
  size?: number
  clickable?: boolean
}
export const RollStateList: React.FC<Props> = ({ stateList, size = 14, clickable = true }) => {
  const [{ attendanceFilter }, dispatch] = useContext(StudentsContext)
  const onClick = (type: ItemType) => {
    dispatch({ type: "setAttendanceFilter", payload: type })
  }

  return (
    <S.ListContainer>
      {stateList.map((s, i) => {
        if (s.type === "all") {
          return (
            <S.ListItem active={s.type === attendanceFilter} key={i}>
              <div>
                <FontAwesomeIcon icon="users" size="sm" style={{ cursor: "pointer" }} onClick={clickable ? () => onClick(s.type) : undefined} />
              </div>
              <span>{s.count}</span>
            </S.ListItem>
          )
        }

        return (
          <S.ListItem active={s.type === attendanceFilter} key={i}>
            <RollStateIcon type={s.type} size={size} onClick={clickable ? () => onClick(s.type) : undefined} />
            <span>{s.count}</span>
          </S.ListItem>
        )
      })}
    </S.ListContainer>
  )
}

const S = {
  ListContainer: styled.div`
    display: flex;
    align-items: center;
  `,
  ListItem: styled.div<{ active?: boolean }>`
    display: flex;
    align-items: center;
    margin-right: ${Spacing.u2};

    div {
      padding: 2px;
      ${({ active }) =>
        active &&
        `border: 2px solid white;
        border-radius: 9999px;`}
    }

    span {
      font-weight: ${FontWeight.strong};
      margin-left: ${Spacing.u2};
    }
  `,
}

interface StateList {
  type: ItemType
  count: number
}

type ItemType = RollStateType | "all"
