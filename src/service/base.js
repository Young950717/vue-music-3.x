const axios = require('axios')
const ERR_OK = 0
const baseURL = '/'
axios.defaults.baseURL = baseURL
export function get(url, params) {
    return axios.get(url, {
        params
    }).then(res => {
        const serrverData = res.data
        if (serrverData.code === ERR_OK) {
            return serrverData.result
        }
    }).catch(e => {
        console.log(e)
    })
}
