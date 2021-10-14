export interface IState {
  [propertyName: string]: any;
}
interface ICommon{
  id: number,
  name: string,
  createdAt: Date
}
export interface IUser extends ICommon{
  email: string,
  balance: number,
  groupId: number,
}

export interface IGroup extends ICommon{
  comment: string,
}