import { Person } from "shared/models/person"
import { RollStateType } from "shared/models/roll"

export type HomeBoardStateType = {
  isRollMode: boolean
  searchTerm: string
  sortBy: "first_name" | "last_name"
  sortOrder: "asc" | "desc"
  attendance: {
    [key in Person["id"]]: RollStateType
  }
  attendanceFilter?: RollStateType | "all"
}

export const homeBoardinitialState: HomeBoardStateType = {
  isRollMode: false,
  searchTerm: "",
  sortBy: "first_name",
  sortOrder: "asc",
  attendance: {},
}

export type HomeBoardActionType =
  | {
      type: "toggleRollMode"
      payload?: HomeBoardStateType["isRollMode"]
    }
  | {
      type: "setSearchTerm"
      payload: HomeBoardStateType["searchTerm"]
    }
  | {
      type: "setSortBy"
      payload: HomeBoardStateType["sortBy"]
    }
  | {
      type: "setSortOrder"
      payload: HomeBoardStateType["sortOrder"]
    }
  | {
      type: "setAttendance"
      payload: { id: Person["id"]; attendance: RollStateType }
    }
  | {
      type: "setAttendanceFilter"
      payload: HomeBoardStateType["attendanceFilter"]
    }

export const homeBoardReducer = (state: HomeBoardStateType, action: HomeBoardActionType): HomeBoardStateType => {
  switch (action.type) {
    case "toggleRollMode":
      const toggledState = action.payload || !state.isRollMode
      return { ...state, isRollMode: toggledState }
    case "setSearchTerm":
      return { ...state, searchTerm: action.payload }
    case "setSortBy":
      return { ...state, sortBy: action.payload }
    case "setSortOrder":
      return { ...state, sortOrder: action.payload }
    case "setAttendance":
      const { id, attendance } = action.payload
      return { ...state, attendance: { ...state.attendance, [id]: attendance } }
    case "setAttendanceFilter":
      return { ...state, attendanceFilter: action.payload }

    default:
      throw new Error()
  }
}
