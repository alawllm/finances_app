//default button, inverted button, google sign in button

// const BUTTON_TYPE_CLASSES = {
//     google: 'google-sign-in',
//     inverted: 'inverted'

// }

const Button = ({ children, type, ...otherProps }) => {
    return (
        <button type={type}
            {...otherProps}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full m-2 w-25">
            {children}
        </button>
    )
}

export default Button;