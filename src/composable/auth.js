import axios from 'axios'
import { ref } from 'vue'
import router from '../router/index'

axios.defaults.withCredentials = true

const user = ref({ username: '', password: '', userId: '' })
const message = ref([])
const loggedIn = ref(false)

async function logIn(username, password) {
  const response = await axios
    .post('http://localhost:3000/auth/login', {
      username: username,
      password: password,
    })
    .catch((error) => {
      message.value = error
    })
  if (response) {
    user.value.userId = response.data.user._id
    user.value.username = response.data.user.username
    loggedIn.value = true
    router.push('/profile')
  }
}

async function registerUser(username, password) {
  const response = await axios
    .post('http://localhost:3000/auth/register', {
      username: username,
      password: password,
    })
    .catch((error) => {
      console.log(error)
      message.value = error
    })
  if (response) {
    console.log(response)
    message.value = 'success now sign in'
  }
}

async function checkAuth() {
  const response = await axios
    .get('http://localhost:3000/auth')
    .catch((error) => {
      console.log(error)
      message.value = error
    })
  if (response) {
    user.value.userId = response.data._id
    user.value.username = response.data.username
    loggedIn.value = true
  }
}

async function logOut() {
  const response = await axios
    .post('http://localhost:3000/auth/logout')
    .catch((error) => {
      console.log(error)
      message.value = error
    })
  if (response) {
    loggedIn.value = false
  }
}

export default function useAuth() {
  return {
    registerUser,
    user,
    logIn,
    message,
    checkAuth,
    logOut,
    loggedIn,
  }
}
