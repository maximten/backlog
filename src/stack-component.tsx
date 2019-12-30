import React, { FC } from 'react'
import { Stack } from 'src/use-stacks'
import { ItemComponent } from 'src/item-component'

type Props = {
    stack: Stack,
    stackKey: string,
}

export const StackComponent: FC<Props> = ({ stack, stackKey }) => {
    return (
        <>
            {
                stack.map((item, key) => (
                    <ItemComponent key={key} data={item} index={key} stackKey={stackKey} />
                ))
            }
        </>
    )
}