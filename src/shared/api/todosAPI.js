const config = {
    baseUrl: 'http://localhost:3001/todos',
    headers: {
        'Content-Type': 'application/json',
    },
}

async function getResponseData(response) {
    if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`)
    }

    return response.json()
}

export async function getAllTasks() {
    const response = await fetch(config.baseUrl, {
        headers: config.headers,
    })

    return getResponseData(response)
}

export async function addTask(taskData) {
    const response = await fetch(config.baseUrl, {
        method: 'POST',
        body: JSON.stringify(taskData),
        headers: config.headers,
    })

    return getResponseData(response)
}

export async function deleteTask(id) {
    const response = await fetch(`${config.baseUrl}/${id}`, {
        method: 'DELETE',
        headers: config.headers,
    })

    return getResponseData(response)
}

export async function changeTaskState(id, completed) {
    const response = await fetch(`${config.baseUrl}/${id}`, {
        method: 'PATCH',
        body: JSON.stringify({completed : !completed}),
        headers: config.headers,
    })

    return getResponseData(response)
}

export async function deleteAll(tasks) {
    await Promise.all(
        tasks.map(({id}) => deleteTask(id))
    )
}