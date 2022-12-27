import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IComment } from '../../models'
import { TCommentsOutput } from '../../services'

export interface ICommentState {
  memory: {
    [publicationId: number]:
      | undefined
      | {
          comments?: IComment[]
          totalItems?: number
        }
  }
  editContent: IComment | null
}

const initialCommentState: ICommentState = {
  memory: {},
  editContent: null
}

const commentSlice = createSlice({
  name: 'comment',
  initialState: initialCommentState,
  reducers: {
    updateCommentsMemory(
      state,
      action: PayloadAction<{
        output: TCommentsOutput
        publicationId: number
      }>
    ) {
      const publicationId = action.payload.publicationId
      const comments =
        state.memory[publicationId]?.comments !== undefined
          ? (state.memory[publicationId]?.comments as IComment[])
          : ([] as IComment[])
      state.memory[publicationId] = {
        comments: [...comments, ...action.payload.output.items],
        totalItems: action.payload.output.meta.totalItems
      }
    },
    addComment(state, action: PayloadAction<IComment>) {
      const publicationId = action.payload.publicationId
      const comments =
        state.memory[publicationId]?.comments !== undefined
          ? (state.memory[publicationId]?.comments as IComment[])
          : ([] as IComment[])
      state.memory[action.payload.publicationId] = {
        totalItems: state.memory[action.payload.publicationId]?.totalItems,
        comments: [...comments, action.payload]
      }
    },
    removeComment(
      state,
      action: PayloadAction<{
        commentId?: number
        publicationId?: number
      }>
    ) {
      const publicationId = action.payload.publicationId
      if (publicationId === undefined) return
      state.memory[publicationId] = {
        totalItems: state.memory[publicationId]?.totalItems,
        comments: state.memory[publicationId]?.comments?.filter(
          (com) => com.id !== action.payload.commentId
        )
      }
    },
    updateComment(state, action: PayloadAction<IComment>) {
      state.memory[action.payload.publicationId] = {
        comments: state.memory[action.payload.publicationId]?.comments?.map(
          (com) => (com.id === action.payload.id ? action.payload : com)
        ),
        totalItems: state.memory[action.payload.publicationId]?.totalItems
      }
    },
    setCommentEditContent(state, action: PayloadAction<IComment | null>) {
      state.editContent = action.payload
    }
  }
})

export const {
  addComment,
  removeComment,
  updateComment,
  updateCommentsMemory,
  setCommentEditContent
} = commentSlice.actions

export default commentSlice.reducer
