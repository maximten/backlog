import { useSelector, useDispatch } from 'react-redux'
import { setStacks, setKey, setOrder } from 'src/store/stacks'

export type StackItem = {
    title: string;
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

    const getStack = () => {
        return [...stacks[key]]
    }

    const setStack = (stack: Stack) => {
        const newStacks = { ...stacks }
        newStacks[key] = stack
        dispatch(setStacks(newStacks))
    }

    const pushStackItem = (item: StackItem) => {
        const newStack = getStack()
        newStack.push(item)
        setStack(newStack)
    }

    const modifyStackItem = (index: number, item: StackItem) => {
        const newStack = getStack()
        newStack[index] = item
        setStack(newStack)
    }

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