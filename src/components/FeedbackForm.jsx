import { useState } from 'react';
import Card from './shared/Card';
import Button from './shared/Button';
import RatingSelect from './RatingSelect';

function FeedbackForm({ handleAdd }) {
    const [rating, setRating] = useState(10);
    const [text, setText] = useState('');
    const [btnDisabled, setBtnDisabled] = useState(true);
    const [message, setMessage] = useState('');
    const handleTextChange = (e) => {
        if (text === '') {
            setBtnDisabled(true);
            setMessage(null);
        } else if (text !== '' && text.trim().length < 10) {
            setBtnDisabled(true);
            setMessage('Review must be at least 10 characters');
        } else {
            setBtnDisabled(false);
            setMessage(null);
        }
        setText(e.target.value);
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        if (text.trim().length >= 10) {
            const newFeedback = {
                text,
                rating,
            }
            handleAdd(newFeedback);
            setText('');
        }
    }

    return (
        <Card>
            <form onSubmit={ handleSubmit }>

                {/* Title */}
                <h2>
                    How would you rate your service with us?
                </h2>

                {/* Select Rating */}
                <RatingSelect select={ (rating) => setRating(rating) } />

                {/* Text Input */}
                <div className='input-group'>
                    <input
                        type='text'
                        placeholder='Write a review'
                        onChange={ handleTextChange }
                        onKeyUp={ handleTextChange }
                        value={ text }
                    />
                    <Button type='submit' version='primary' isDisabled={ btnDisabled }>
                        Send
                    </Button>

                </div>

                { message && <div className='message'>{ message }</div> }

            </form>
        </Card>
    );
}

export default FeedbackForm;
