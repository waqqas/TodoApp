import apisauce from 'apisauce'

import AppConfig from '../Config/AppConfig'

const create = (baseURL = AppConfig.apiBaseUrl) => {

  const api = apisauce.create({
    // base URL is read from the "constructor"
    baseURL,
    // here are some default headers
    headers: {
      'Cache-Control': 'no-cache',
      'Content-Type': 'application/json; charset=utf-8',
      'Accept': 'application/json',
    },
    // 10 second timeout...
    timeout: 10000
  })

  const getTasks = () => api.get('/device/tasks')
  const addTask = (form) => api.post(`/device/tasks`, form)
  const deleteTasks = () => api.delete(`/device/tasks`)
  const updateTask = (form, taskId) => api.put(`/device/tasks/${taskId}`, form)
  const deleteTask = (taskId) => api.delete(`/device/tasks/${taskId}`)

  return {
    setHeader: api.setHeader,
    getTasks,
    addTask,
    updateTask,
    deleteTask,
    deleteTasks,
  }
}

export default {
  create
}
