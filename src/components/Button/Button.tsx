import { ButtonProps } from "./Button.types"

/**
 * Represents a simple button component with customizable text content.
 *
 * @typedef {Object} ButtonProps
 * @property {Function} onClick - The callback function to be called when the button is clicked.
 * @property {string} content - The text content to be displayed inside the button.
 * @returns {JSX.Element} The Button component JSX element.
 * @example
 * <Button onClick={() => console.log("Button clicked")} content="Click Me" />
 */
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