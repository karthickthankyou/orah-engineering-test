export interface Roll {
  id: number
  name: string
  completed_at: Date
  student_roll_states: { student_id: number; roll_state: RollStateType }[]
}

export interface RollInput {
  student_roll_states: { student_id: number; roll_state: RollStateType }[]
}

export type RollStateType = "unmark" | "present" | "absent" | "late"
