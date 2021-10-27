import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://oh-two-project-default-rtdb.europe-west1.firebasedatabase.app/'
})

export default instance