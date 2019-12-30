import React, { FC, useCallback, useState } from 'react'
import { StackItem } from 'src/use-stacks'
import { useStacks } from 'src/use-stacks'
import styled from 'styled-components'

type Props = {
    data: StackItem
    index: number
}

const Form = styled.form`
    display: flex;
    flex-direction: column;
`

export const ItemComponent: FC<Props> = ({ data: { content }, index }) => {
    const [currentContent, setCurrentContent, stacks, key] = useState(content)

    const { modifyStackItem } = useStacks()

    const handleContentChange = useCallback((e) => {
        e.preventDefault()
        setCurrentContent(e.target.value)
    }, [])
    const handleSubmit = useCallback((e) => {
        e.preventDefault()
        modifyStackItem(index, { content: currentContent })
    }, [currentContent, modifyStackItem])

    return (
        <Form onSubmit={handleSubmit}>
            <textarea value={currentContent} onChange={handleContentChange} />
            <button>submit</button>
        </Form>
    )
}

