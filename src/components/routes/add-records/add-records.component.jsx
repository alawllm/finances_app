import { useState } from "react";
import FormInput from "../../helper-components/form-input/form-input.component";
import Button from "../../helper-components/button/button.component";

const defaultRecords = {
    amount: '',
    category: ''
}
const AddRecords = () => {
    const [records, setRecords] = useState(defaultRecords);
    const [isSubmitted, setIsSubmitted] = useState(false)
    const { amount, category } = records;

    console.log(records)

    const resetRecords = () => {
        setRecords(defaultRecords);
    }

    const handleChange = (event) => {
        //target gives the input
        const { name, value } = event.target;

        setRecords({ ...records, [name]: value })
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsSubmitted(true)

    }

    return (
        <div>
            <h1>
                Here you can add your records
            </h1>
            <form
                className="flex flex-col items-center rounded px-8"
                action=""
                onSubmit={handleSubmit}
            >

                <FormInput
                    label="Amount"
                    type="number"
                    required
                    onChange={handleChange}
                    name="amount"
                    value={amount} />

                <FormInput
                    label="category"
                    type="text"
                    required
                    onChange={handleChange}
                    name="category"
                    value={category}
                />
                <div className="flex flex-col">
                    <Button type="submit">Add record</Button>
                </div>
                {isSubmitted && (
                    <><span>amount: {amount}</span>
                        <span>category: {category}</span></>
                )}
            </form>
        </div>
    )
}

export default AddRecords;