import axios from 'axios'

export async function sendToDB(game) {
  await postInitGame(game)
}

async function postInitGame(game) {
  const response = await axios
    .post('http://localhost:3000/initgame', game)
    .catch((error) => {
      console.log(error)
      return { error: 'something happened bad trying to post this' }
    })
  console.log(response)
}
