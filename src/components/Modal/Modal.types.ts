export interface ModalProps {
    title?: string,
    content: string, //for accessibility purpose I choose to restrain content to string
    height?: string,
    width?: string,
    color?: string,
    footerButton?: JSX.Element,
    backgroundColor?: string,
    open: boolean,
    onClose: () => void | void
}