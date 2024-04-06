// DISCLOSURE: the following JavaScript code has been created with the aid of 
// Chat GPT 3.5 and edited by Group 6. 

// React and Libraries
import React, { useState, useEffect } from 'react';
import axios from 'axios';

// CSS and Assets
import '../style/Home.css';

// Contexts
import { homePageMessages } from '../lang/messages/user';

// API
import { API_BASE } from '../api_constants';

function HomePage() {
    const [storyInput, setStoryInput] = useState('');
    const [continuedStory, setContinuedStory] = useState('');
    const [error, setError] = useState('');
    const [apiCalls, setApiCalls] = useState(0);

    useEffect(() => {
        fetchApiConsumption();
    }, []);

    const fetchApiConsumption = async () => {
        try {
            const response = await axios.get(`${API_BASE}/yaps/api-consumption`, { withCredentials: true });
            setApiCalls(response.data.calls);
        } catch (error) {
            console.error('Error fetching API consumption:', error);
        }
    };

    const handleInputChange = (event) => {
        setStoryInput(event.target.value);
        if (error) setError('');
    };

    const fetchStory = async (textToContinue) => {
        try {
            const response = await axios.post(`${API_BASE}/yaps/yap`, {
                withCredentials: true, data: {
                    text: textToContinue
                }
            });
            setError('');
            return response.data[0].generated_text;
        } catch (error) {
            console.error('Error fetching the continued story:', error);
            setError(homePageMessages.tooLong);
            return '';
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const newPartOfStory = await fetchStory(storyInput);
        if (newPartOfStory) {
            setContinuedStory(newPartOfStory);
        }
    };

    const handleKeepYapping = async () => {
        if (!storyInput && !continuedStory) {
            setError(homePageMessages.enterYourInitialStory);
            return;
        }

        const newPartOfStory = await fetchStory(continuedStory);
        setContinuedStory(newPartOfStory);
    };

    const handleDiscard = () => {
        setContinuedStory('');
    };

    const handleSaveYap = async () => {
        try {
            const title = continuedStory.substring(0, 30);
            const content = continuedStory;

            const response = await axios.post(`${API_BASE}/yaps/create`, { title, content }, { withCredentials: true });
            console.log('Yap saved:', response.data);
            alert(homePageMessages.yapSavedSuccessfully);
            alert(homePageMessages.yapSavedSuccessfully);
            setStoryInput('');
            setContinuedStory('');
        } catch (error) {
            console.error('Error saving the yap:', error);
            setError(homePageMessages.failedToSaveYap);
            setError(homePageMessages.failedToSaveYap);
        }
    };

    return (
        <div className="homepage-container">
            <h1>{homePageMessages.welcome}</h1>
            <p className="how-it-works">{homePageMessages.howItWorks}</p>

            <div className="api-calls-display">
                {homePageMessages.apiCallsMade.replace("{apiCalls}", apiCalls)}
            </div>


            {error && <p className="error">{error}</p>}
            <div className="search-container">
                <form className="search-form" onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder={homePageMessages.startTypingYourStory}
                        className="search-input"
                        value={storyInput}
                        onChange={handleInputChange}
                    />
                    <button type="submit" className="button-general search-button">{homePageMessages.startYapping}</button>                </form>
            </div>

            <div className="yapStory">
                {continuedStory ? <p>{continuedStory}</p> : <p className="yapStory-placeholder">{homePageMessages.yapStoryPlaceholder}</p>}
            </div>
            <div className="buttons">
                <button className="button yapping" onClick={handleKeepYapping}>{homePageMessages.keepYapping}</button>
            </div>
            <div className="buttons">
                <button className="button discard" onClick={handleDiscard}>{homePageMessages.discard}</button>
                <button className="button save" onClick={handleSaveYap}>{homePageMessages.save}</button>
            </div>
        </div>
    );
}

export default HomePage;