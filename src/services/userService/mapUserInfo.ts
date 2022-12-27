import { IUser } from '../../models'
import { TUserResponse } from '../authService'

export const mapUserInfo = (user: TUserResponse): Partial<IUser> => ({
  names: user.names,
  userName: user.userName,
  surnames: user.surnames,
  avatar: user.avatars?.[0] !== undefined ? user.avatars[0] : {},
  birthday: user.birthday,
  createdAt: user.createdAt,
  id: user.id,
  isFriend: user.isFriend
})
