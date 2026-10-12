import {computed, onMounted, ref, watch} from 'vue'
import {
    getAllTasks,
    deleteTask,
    addTask,
    changeTaskState,
    deleteAll
} from '@/shared/api/todosAPI.js'

const STORAGE_KEY = 'TODO_LIST'

export function useTodos() {
    //const tasks = ref(JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]'))
    const tasks = ref([])
    const newTaskTitle = ref('')
    const search = ref('')

    const isLoading = ref(false)
    const error = ref(null)

    const filteredTasks = computed(() => {
        return tasks.value.length > 0 && search.value.trim().length > 0
            ? tasks.value.filter(({title}) => title.toLowerCase().includes(search.value.trim().toLowerCase()))
            : null
    })

    async function loadTodos() {
        isLoading.value = true
        error.value = null

        try {
            const data = await getAllTasks()

            if(!Array.isArray(data)) {
                throw new Error('API returned wrong todosList')
            }

            tasks.value = data
        } catch (err) {
            error.value = err instanceof Error
                ? err.message
                : 'Не удалось загрузить задачи'
            console.error(`Failed to load tasks: ${err}`)
        } finally {
            isLoading.value = false
        }
    }

    const stats = computed(() => ({
        total: tasks.value.length,
        done: tasks.value.filter(({completed}) => completed).length
    }))

    async function createTask() {
        isLoading.value = true
        error.value = null

        if(newTaskTitle.value.trim().length > 0) {
            try {
                const data = await addTask({
                    title: newTaskTitle.value.trim(),
                    completed: false
                })

                if(!data) {
                    throw new error ('Failed to create task')
                }

                tasks.value = [...tasks.value, {...data}]
                newTaskTitle.value = ''
            } catch (err) {
                console.error(`Failed to create task: ${err}`)
                error.value = err instanceof Error
                    ? err.message
                    : 'Не удалось загрузить задачи'
            } finally {
                isLoading.value = false
            }
        }
    }

    async function deleteTaskItem(taskId) {
        try {
            const data = await deleteTask(taskId)
            if(!data) {
                throw new error('Failed to delete task item')
            }

            tasks.value = tasks.value.filter((id) => id !== taskId)
        } catch (err) {
            error.value = err instanceof Error
            ? err.message
                : 'Не удалось удалить задачу'
        }
        tasks.value = tasks.value.filter(({id}) => id !== taskId)
    }

    async function toggleTask(taskId, completed) {
        try {
            const data = await changeTaskState(taskId, completed)

            if(!data) {
                throw new error('Failed to change task state')
            }

            tasks.value = tasks.value.map((task) => {
                if(task.id === taskId) {
                    return {...data}
                }

                return task
            })
        } catch (err) {
            console.error(`Failed to toggle task: ${taskId}`)
            error.value = err instanceof Error
                ? err.message
                : 'Не удалось поменять статус задачи'
        }
    }

    async function deleteAllTasks() {
        if (!tasks.value.length) return

        if (!globalThis.confirm('Вы уверены, что хотите удалить все задачи?')) {
            return
        }

        isLoading.value = true
        error.value = null

        try {
            await deleteAll(tasks.value)

            tasks.value = []
            newTaskTitle.value = ''
            search.value = ''
        } catch (err) {
            error.value = err instanceof Error
                ? err.message
                : 'Не удалось удалить все задачи'

            console.error(err)

            await loadTodos()
        } finally {
            isLoading.value = false
        }
    }

    return {
        tasks,
        filteredTasks,
        newTaskTitle,
        search,
        stats,
        isLoading,
        error,
        loadTodos,
        createTask,
        deleteTaskItem,
        toggleTask,
        deleteAllTasks
    }
}