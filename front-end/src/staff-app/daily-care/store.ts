export type HomeBoardStateType = {
  isRollMode: boolean
  searchTerm: string
  sortBy: "first_name" | "last_name"
  sortOrder: "asc" | "desc"
}

export const homeBoardinitialState: HomeBoardStateType = {
  isRollMode: false,
  searchTerm: "",
  sortBy: "first_name",
  sortOrder: "asc",
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

export const homeBoardReducer = (state: HomeBoardStateType, action: HomeBoardActionType): HomeBoardStateType => {
  switch (action.type) {
    case "toggleRollMode":
      const toggledState = action.payload || !state.isRollMode
      console.log("toggledState: ", toggledState)
      return { ...state, isRollMode: toggledState }
    case "setSearchTerm":
      return { ...state, searchTerm: action.payload }
    case "setSortBy":
      return { ...state, sortBy: action.payload }
    case "setSortOrder":
      return { ...state, sortOrder: action.payload }

    default:
      throw new Error()
  }
}
