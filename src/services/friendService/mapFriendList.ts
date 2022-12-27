import { IFriendModel, IPaginatedResults, IUser } from '../../models'

export const mapFriendList = (
  friends: IPaginatedResults<IFriendModel>,
  userId: number
): Array<Partial<IUser>> => {
  const friendList = friends.items.reduce(
    (prev: Array<Partial<IUser>>, curr: IFriendModel) => {
      const friend = curr.receiverId === userId ? curr.sender : curr.receiver
      const user: Partial<IUser> = {
        userName: friend.userName,
        names: friend.names,
        surnames: friend.surnames,
        birthday: friend.birthday,
        createdAt: friend.createdAt,
        id: friend.id,
        avatar: friend.avatars[0]
      }
      return [...prev, user]
    },
    []
  )
  return friendList
}
