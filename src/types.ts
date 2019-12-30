export const entriesOf = <T>(value: T) => Object.entries(value) as [keyof T, T[keyof T]][]
