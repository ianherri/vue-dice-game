const { ref } = require('vue')

const game = ref({
  _id: '63361087a85089dbf764f451',
  users: [{ active: true, userId: '5775292', scoreCard: {} }],
})

const activeUser = game.value.users.filter((user) => user.active)[0].userId

const changeActiveUser = () => {
  const users = game.value.users
  const numUsers = users.length
  let index = 0
  while (users[index].userId != activeUser) {
    index += 1
  }
  if (index < numUsers - 1) {
    users[index].active = false
    users[index + 1].active = true
  } else {
    users[index].active = false
    users[0].active = true
  }
}

changeActiveUser(game.value)
console.log(game.value)
