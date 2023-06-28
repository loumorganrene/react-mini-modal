export interface ModalProps {
    title?: string,
    content: string,
    height?: string,
    width?: string,
    color?: string,
    backgroundColor?: string,
    open: boolean,
    onClose: () => void | void
}