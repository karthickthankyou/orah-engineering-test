import React, { Dispatch, useReducer } from "react"
import { ActiveRollOverlay } from "staff-app/components/active-roll-overlay/active-roll-overlay.component"
import { HomeBoardActionType, homeBoardinitialState, homeBoardReducer, HomeBoardStateType } from "./store"
import { useGetStudents } from "./hooks"
import { RenderStudents, S, SearchBar, SortDialog } from "./components"

export const StudentsContext = React.createContext<[HomeBoardStateType, Dispatch<HomeBoardActionType>]>([homeBoardinitialState, () => {}])

export const HomeBoardPage: React.FC = () => {
  const [state, dispatch] = useReducer(homeBoardReducer, homeBoardinitialState)

  return (
    <StudentsContext.Provider value={[state, dispatch]}>
      <S.PageContainer>
        <S.ToolbarContainer>
          <SortDialog />
          <SearchBar />
          <S.Button onClick={() => dispatch({ type: "toggleRollMode" })}>Start Roll</S.Button>
        </S.ToolbarContainer>
        <RenderStudents />
      </S.PageContainer>
      <ActiveRollOverlay />
    </StudentsContext.Provider>
  )
}
