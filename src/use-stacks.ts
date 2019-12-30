import { useState } from 'react'

export type StackItem = {
    title: string;
    data: string;
}

export type Stack = StackItem[]

export type Stacks = Record<string, Stack>

const DEFAULT_STACK_KEY = 'default';

const DEFAULT_INIT_VALUE = {
    [DEFAULT_STACK_KEY]: []
}

const DEFAULT_STACKS_ORDER = [
    DEFAULT_STACK_KEY
]

export const useStacks = (
    initStacks: Stacks = DEFAULT_INIT_VALUE,
    initStackKey = DEFAULT_STACK_KEY,
    initStackOrder = DEFAULT_STACKS_ORDER
) => {
    const [stacks, setStacks] = useState(initStacks)
    const [stackKey, setStackKey] = useState(initStackKey)
    const [stackOrder, setStackOrder] = useState(initStackOrder)

    const getStack = () => {
        return [...stacks[stackKey]]
    }
    const setStack = (stack: Stack) => {
        const newStacks = { ...stacks }
        newStacks[stackKey] = stack
        setStacks(newStacks)
    }

    const addStackItem = (item: StackItem) => {
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

    const swapStackItems = (indexA: number, indexB: number) => {
        const newStack = getStack()
        const itemA = { ...newStack[indexA] }
        const itemB = { ...newStack[indexB] }
        newStack[indexA] = itemB
        newStack[indexB] = itemA
        setStack(newStack)
    }

    return {
        addStackItem,
        modifyStackItem,
        removeStackItem,
        swapStackItems
    }
}