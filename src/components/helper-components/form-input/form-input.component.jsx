const FormInput = ({ label, ...otherProps }) => {
    return (
        <div className="flex flex-col items-center m-2">
            <label htmlFor="">{label}</label>
            <input {...otherProps} />
        </div>
    )
}

export default FormInput;