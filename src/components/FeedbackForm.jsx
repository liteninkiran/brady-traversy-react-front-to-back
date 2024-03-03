import { useState } from 'react';
import Card from './shared/Card';
import Button from './shared/Button';

function FeedbackForm() {
    const [text, setText] = useState('');
    const handleTextChange = (e) => {
        setText(e.target.value);
    }

    return (
        <Card>
            <form>

                {/* Title */}
                <h2>
                    How would you rate your service with us?
                </h2>

                {/* Select Rating */}
                {/* TODO... Rating Select Component */}

                {/* Text Input */}
                <div className='input-group'>
                    <input
                        type='text'
                        placeholder='Write a review'
                        onChange={ handleTextChange }
                        value={ text }
                    />
                    <Button type='submit' version='primary'>Send</Button>
                </div>

            </form>
        </Card>
    );
}

export default FeedbackForm;
