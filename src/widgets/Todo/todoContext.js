import { inject } from 'vue'

export const TODO_CONTEXT = Symbol('todo-context')

export function useTodoContext() {
    const context = inject(TODO_CONTEXT)

    if (!context) {
        throw new Error('useTodoContext must be used inside Todo')
    }

    return context
}