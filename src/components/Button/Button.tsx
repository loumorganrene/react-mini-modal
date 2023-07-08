import { ButtonProps } from "./Button.types"

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