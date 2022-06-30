// const session

// findSession by id
// save session by id and session
// find all sesssions return session variable

const sessions = []

// get session id
const findSesssion = (id) => {
  console.log(id)
  return sessions.find((session) => session.id === id)
}

// joins the user to a session
const saveSession = (id, session) => {
  console.log(`id ${id} session: ${session}`)
  const user = { id, session }
  sessions.push(user)
  return { user }
}

// get all sessions
const findAllSessions = () => {
  console.log(sessions)
  return sessions
}

// called when the user leaves the chat and its user object deleted from array
// const deleteUser = (id) => {
//   const index = users.findIndex((user) => user.id === id)

//   if (index !== -1) {
//     return users.splice(index, 1)[0]
//   }
// }

module.exports = {
  findSesssion,
  saveSession,
  findAllSessions,
}
