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

export const ItemComponent: FC<Props> = ({ data: { title, content }, index }) => {
    const [currentTitle, setCurrentTitle] = useState(title)
    const [currentContent, setCurrentContent] = useState(content)

    const { modifyStackItem } = useStacks()

    const handleTitleChange = useCallback((e) => {
        e.preventDefault()
        setCurrentTitle(e.target.value)
    }, [])
    const handleContentChange = useCallback((e) => {
        e.preventDefault()
        setCurrentContent(e.target.value)
    }, [])
    const handleSubmit = useCallback((e) => {
        modifyStackItem(index, { title: currentTitle, content: currentContent })
        e.preventDefault()
    }, [currentTitle, currentContent])

    return (
        <Form onSubmit={handleSubmit}>
            <input value={currentTitle} onChange={handleTitleChange} />
            <textarea value={currentContent} onChange={handleContentChange} />
            <button>submit</button>
        </Form>
    )
}

