interface ButtonProps {
    content: string,
    onClick: () => void | void
}

function Button({ onClick, content }: ButtonProps) {
    return (
        <>
            <button
                className='modal__btn'
                type='button'
                onClick={onClick}
            >
                {content}
            </button>
        </>
    )
}

export default Button