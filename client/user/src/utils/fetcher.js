const routeToFecth = path => `/api/${path}`

export async function getFromAPI (action) {
  try {
    const response = await fetch(routeToFecth(action), { credentials: 'include' })
    const result = await response.json()
    return result
  } catch (err) {
    console.error(err)
  }
}

export async function sendFormToAPI (event) {
  event.preventDefault()
  const formData = new FormData(event.target).entries()
  return await sendRequest('POST', event.target.action, Object.fromEntries(formData))
}

export async function postToAPI (action, objectToSend) {
  return await sendRequest('POST', routeToFecth(action), objectToSend)
}
export async function patchToAPI (action, objectToSend) {
  return await sendRequest('PATCH', routeToFecth(action), objectToSend)
}
export async function deleteToAPI (action) {
  return await sendRequest('DELETE', routeToFecth(action), {})
}

async function sendRequest (method, route, requestBody) {
  try {
    const body = JSON.stringify(requestBody)
    const response = await fetch(route, {
      method: method,
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body,
    })
    return await response.json()
  } catch (err) {
    console.error(err)
  }
}