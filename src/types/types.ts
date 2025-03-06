export type TShape = {
    x: number,
    y: number,
    width: number,
    height: number,
    tool: TTool,
    html: string,
    id: string,
    text: string,
    type: string
}

export type TTool = 'shape' | 'cursor'