import { useCallback, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setStacks } from 'src/store/stacks'
import { entriesOf } from 'src/types'

export type StackItem = {
    content: string;
}

export type Stack = StackItem[]

export type Stacks = Record<string, Stack>

export const createEmptyItem = () => ({
    title: '',
    content: ''
})

export const useStacks = () => {
    const {
        stacks,
        key,
        order
    } = useSelector((state) => {
        return state.stacks
    });
    const dispatch = useDispatch()

    const getStack = useCallback(() => {
        return [...stacks[key]]
    }, [stacks])

    const setStack = useCallback((stack: Stack) => {
        const newStacks = { ...stacks }
        newStacks[key] = stack
        dispatch(setStacks(newStacks))
    }, [stacks])

    const pushStackItem = (item: StackItem) => {
        const newStack = getStack()
        newStack.push(item)
        setStack(newStack)
    }

    const modifyStackItem = useCallback((index: number, item: StackItem) => {
        const newStack = getStack()
        newStack[index] = item
        setStack(newStack)
    }, [getStack])

    const removeStackItem = (index: number) => {
        const newStack = getStack()
        newStack.splice(index)
        setStack(newStack)
    }

    const popStackItem = () => {
        const stack = getStack();
        removeStackItem(stack.length - 1)
    }

    const swapStackItems = (indexA: number, indexB: number) => {
        const newStack = getStack()
        const itemA = { ...newStack[indexA] }
        const itemB = { ...newStack[indexB] }
        newStack[indexA] = itemB
        newStack[indexB] = itemA
        setStack(newStack)
    }

    return {
        pushStackItem,
        modifyStackItem,
        removeStackItem,
        popStackItem,
        swapStackItems,
        stacks,
        stackKey: key,
        stacksOrder: order
    }
}