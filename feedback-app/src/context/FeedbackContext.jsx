import { createContext, useState, useEffect } from 'react';

const FeedbackContext = createContext();

export const FeedbackProvider = ({ children }) => {
    const [isLoading, setIsLoading] = useState(true);

    const [feedback, setFeedback] = useState([]);

    const [feedbackEdit, setFeedbackEdit] = useState({
        item: {},
        edit: false,
    });

    const addFeedback = async (newFeedback) => {
        const url = '/feedback';
        const options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newFeedback),
        }
        const response = await fetch(url, options);
        const data = await response.json();
        setFeedback([data, ...feedback]);
    }

    const deleteFeedback = async (id) => {
        if (window.confirm('Are you sure you want to delete?')) {
            const url = `/feedback/${id}`;
            const options = { method: 'DELETE' }
            await fetch(url, options);
            setFeedback(feedback.filter((item) => item.id !== id));
        }
    }

    const editFeedback = (item) => {
        setFeedbackEdit({ item, edit: true});
    }

    const updateFeedback = async (id, updItem) => {
        const url = `/feedback/${id}`;
        const options = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updItem),
        }
        const response = await fetch(url, options);
        const data = await response.json();
        setFeedback(feedback.map((item) => item.id === id ? { ...item, ...data } : item));
    }

    useEffect(() => {
        fetchFeedback();
    }, []);

    const fetchFeedback = async () => {
        const response = await fetch('/feedback?_sort=id');
        const data = await response.json();
        setFeedback(data);
        setIsLoading(false);
    }

    return (
        <FeedbackContext.Provider value={{
            feedback,
            feedbackEdit,
            isLoading,
            addFeedback,
            deleteFeedback,
            editFeedback,
            updateFeedback,
        }}>
            { children }
        </FeedbackContext.Provider>
    );
}

export default FeedbackContext;