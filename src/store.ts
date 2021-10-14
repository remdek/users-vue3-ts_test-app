import {reactive, readonly} from 'vue'
import {IState, IUser, IGroup} from "@/assets/ts/interfaces";

const host = 'http://localhost:3000'

const state: IState = reactive({
  // status
  view: 'users' as string,
  modalWindow: false as boolean,

  // pagination
  itemsQtyOnPage: 15 as number,
  currentPage: 1 as number,

  // users
  users: [] as IUser[],
  user: {} as IUser,
  usersCount: 0 as number,
  groups: [] as IGroup[],
  userAction: 'update',

  // sort results
  // _sort=user,views&_order=desc,asc
  sort: {
    name: null,
    balance: 'asc',
    group: 'desc',
    createdAt: 'desc'
  }


})


const commit = function (key: string, value: any) {
  state[key] = value
}

const SET_OBJ = function (key: string, value: any) {
  commit(key, value)
}

const changeSort = function (key: string, value: any) {
  console.log(key, value)
  const newSort = state.sort
  newSort[key] = value
  SET_OBJ('sort', newSort)

  fetchUsers()
}

// Network
const generateFetchString = function () {
  let fetchStr = String(`/users?_start=${state.currentPage * state.itemsQtyOnPage - state.itemsQtyOnPage}&_end=${state.currentPage * state.itemsQtyOnPage}`).trim()
  const field = []
  const sort = []
  for (const [key, value] of Object.entries(state.sort)) {
    if (value) {
      field.push(key)
      sort.push(value)
    }
  }

  if (field.length) {
    let _sort = '&_sort='
    let _order = '&_order='
    for (let i = 0; i < field.length; i++) {
      _sort+=`${field[i]}${i === field.length-1 ? '' : ','}`
      _order+=`${sort[i]}${i === field.length-1 ? '' : ','}`
    }
    let strResult = fetchStr+_sort+_order
    return strResult
  }
}

const fetchUsers = async function () {

  try {
    const res = await fetch(`${host}${generateFetchString()}`)


    if (res.ok) {
      const users = await res.json()
      const usersCount = res.headers.get('X-Total-Count')
      SET_OBJ('users', users)
      SET_OBJ('usersCount', usersCount)
      return {users, usersCount}
    } else {
      console.log('HTTP error', res.status)
    }
  } catch (e) {
    console.log(e)
  }
}

const fetchUserGroups = async function () {
  try {
    const res = await fetch(`${host}/groups`)
    if (res.ok) {
      const groups = await res.json()
      SET_OBJ('groups', groups)
      return groups
    } else {
      console.log('HTTP error', res.status)
    }
  } catch (e) {
    console.log(e)
  }
}

const deleteUser = async function (id: number) {
  try {
    const res = await fetch(`${host}/users/${id}`, {
      method: 'DELETE',
    })
    if (res.ok) {
      const filteredUsers = state.users.filter((user: IUser) => user.id !== id)
      SET_OBJ('users', filteredUsers)
      return filteredUsers
    } else {
      console.log('HTTP error', res.status)
    }
  } catch (e) {
    console.log(e)
  }
}

const updateOrCreateUser = async function () {
  const action = state.userAction
  const user = state.user
  const users = JSON.parse(JSON.stringify(state.users))
  try {
    const res = await fetch(
      action === 'update'
        ? `${host}/users/${user.id}`
        : `${host}/users`, {
        method: action === 'update' ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
      })
    if (res.ok) {
      if (action === 'update') {
        const userIdx = users.findIndex((u: IUser) => u.id === user.id)
        users[userIdx] = user
      } else {
        users.unshift(user)
      }
      SET_OBJ('modalWindow', false)
      SET_OBJ('users', users)
      SET_OBJ('user', {} as IUser)
    }
  } catch (e) {
    console.log(e)
  }
}

const updateGroup = async function(groupId: number, value: any) {
  try {
    const res = await fetch(`${host}/groups/${groupId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(value)
    })

    if (res.ok) {
      console.log(value.createdAt)
      const newGroups = state.groups
      const groupIdx = newGroups.findIndex((g: IGroup) => g.id === groupId)
      newGroups[groupIdx].createdAt = value.createdAt
      SET_OBJ('groups', newGroups)
    } else {
      console.log('HTTP error', res.status)
    }
  } catch (e) {
    console.log(e)
  }
}


// user functions
const findUser = function (id: number) {
  const user = state.users.find((user: IUser) => user.id === id)

  if (user) {
    SET_OBJ('user', user)
    return user
  }
  return null
}


export default {
  state: readonly(state),
  SET_OBJ,
  fetchUsers,
  fetchUserGroups,
  deleteUser,
  findUser,
  updateOrCreateUser,
  updateGroup,
  changeSort
}