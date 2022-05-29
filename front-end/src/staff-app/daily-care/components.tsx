import React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Dialog, DialogContent, DialogTitle, FormControl, FormControlLabel, InputLabel, MenuItem, Radio, RadioGroup, Select } from "@material-ui/core"
import Button from "@material-ui/core/ButtonBase"
import { useContext, useState } from "react"
import { CenteredContainer } from "shared/components/centered-container/centered-container.component"
import { LoadState } from "shared/hooks/use-api"
import { Person } from "shared/models/person"
import { Colors } from "shared/styles/colors"
import { BorderRadius, FontWeight, Spacing } from "shared/styles/styles"
import { StudentListTile } from "staff-app/components/student-list-tile/student-list-tile.component"
import styled from "styled-components"
import { StudentsContext } from "./home-board.page"

export const S = {
  PageContainer: styled.div`
    display: flex;
    flex-direction: column;
    width: 50%;
    margin: ${Spacing.u4} auto 140px;
  `,
  ToolbarContainer: styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #fff;
    background-color: ${Colors.blue.base};
    padding: 6px 14px;
    font-weight: ${FontWeight.strong};
    border-radius: ${BorderRadius.default};
  `,
  Button: styled(Button)`
    && {
      padding: ${Spacing.u2};
      font-weight: ${FontWeight.strong};
      border-radius: ${BorderRadius.default};
    }
  `,
}

const SortByValues = {
  first_name: "First Name",
  last_name: "Last Name",
}

export const SortDialog: React.FC = () => {
  const [open, setOpen] = useState(false)
  const [{ sortBy, sortOrder }, dispatch] = useContext(StudentsContext)

  return (
    <>
      <div onClick={() => setOpen((state) => !state)} style={{ cursor: "pointer" }}>
        {SortByValues[sortBy]} {sortOrder === "asc" ? <>&#8593;</> : <>&#8595;</>}
      </div>
      <Dialog disableEscapeKeyDown open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Sort students</DialogTitle>
        <DialogContent>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Sort by</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={sortBy}
              label="Age"
              onChange={(e) => {
                const payload = e.target.value as typeof sortBy
                dispatch({ type: "setSortBy", payload })
              }}
            >
              <MenuItem value={"first_name"}>{SortByValues["first_name"]}</MenuItem>
              <MenuItem value={"last_name"}>{SortByValues["last_name"]}</MenuItem>
            </Select>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue="female"
              name="radio-buttons-group"
              value={sortOrder}
              onChange={(e) => {
                const payload = e.target.value as typeof sortOrder
                dispatch({ type: "setSortOrder", payload })
              }}
            >
              <FormControlLabel value="asc" control={<Radio />} label={<div style={{ fontSize: "12px" }}>A &#8594; Z</div>} />
              <FormControlLabel value="desc" control={<Radio />} label={<div style={{ fontSize: "12px" }}>Z &#8594; A</div>} />
            </RadioGroup>
          </FormControl>
        </DialogContent>
      </Dialog>
    </>
  )
}

export const SearchBar: React.FC = () => {
  const [{ searchTerm }, dispatch] = useContext(StudentsContext)
  return <input placeholder="Search students" value={searchTerm} onChange={(e) => dispatch({ type: "setSearchTerm", payload: e.target.value })} />
}

type RenderStudentsType = {
  isLoading: LoadState
  studentsList: Person[]
}
export const RenderStudents: React.FC<RenderStudentsType> = ({ isLoading, studentsList }) => (
  <>
    {isLoading === "loading" && (
      <CenteredContainer>
        <FontAwesomeIcon icon="spinner" size="2x" spin />
      </CenteredContainer>
    )}

    {isLoading === "loaded" && studentsList && (
      <>
        {studentsList.map((s) => (
          <StudentListTile key={s.id} student={s} />
        ))}
      </>
    )}

    {isLoading === "error" && (
      <CenteredContainer>
        <div>Failed to load</div>
      </CenteredContainer>
    )}
  </>
)
