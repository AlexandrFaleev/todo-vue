import { computed, ref, watch } from 'vue'

const STORAGE_KEY = 'TODO_LIST'

export function useTodos() {
    const tasks = ref(JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]'))
    const newTaskTitle = ref('')
    const search = ref('')

    const filteredTasks = computed(() => {
        return tasks.value.length > 0 && search.value.trim().length > 0
            ? tasks.value.filter(({title}) => title.toLowerCase().includes(search.value.trim().toLowerCase()))
            : null
    })

    watch(tasks, (val) => {
        if(val.length > 0) {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(val))
        } else {
            localStorage.removeItem(STORAGE_KEY)
        }
    }, {deep: true})

    const stats = computed(() => ({
        total: tasks.value.length,
        done: tasks.value.filter(({isDone}) => isDone).length
    }))

    function addTask() {
        if(newTaskTitle.value.trim().length > 0) {
            tasks.value = [...tasks.value, {
                id: crypto?.randomUUID() ?? Date.now().toString(),
                title: newTaskTitle.value.trim(),
                isDone: false
            }]
            newTaskTitle.value = ''
        }
    }

    function deleteTask(taskId) {
        tasks.value = tasks.value.filter(({id}) => id !== taskId)
    }

    function toggleTask(taskId) {
        tasks.value = tasks.value.map((task) => {
            if(task.id === taskId) {
                return {...task, isDone: !task.isDone}
            }

            return task
        })
    }

    function deleteAll() {
        if(confirm('Вы уверены, что хотите удалить все задачи?')) {
            tasks.value = []
            newTaskTitle.value = ''
            search.value = ''
        }
    }

    return {
        tasks,
        filteredTasks,
        newTaskTitle,
        search,
        stats,
        addTask,
        deleteTask,
        toggleTask,
        deleteAll
    }
}