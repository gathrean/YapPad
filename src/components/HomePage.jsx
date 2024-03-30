import React, { useState, useEffect } from 'react';
import '../style/Home.css';
import axios from 'axios';

function HomePage() {
    const [storyInput, setStoryInput] = useState(''); // holds user's initial input
    const [continuedStory, setContinuedStory] = useState('');
    const [error, setError] = useState(''); 
    const [apiCalls, setApiCalls] = useState(0); // track API calls


    useEffect(() => {
        fetchApiConsumption();
      }, []);
  
      const fetchApiConsumption = async () => {
        try {
            const response = await axios.get('http://localhost:8000/yaps/api-consumption', {
                withCredentials: true 
            });
            setApiCalls(response.data.calls);
            // setMaxApiCalls(response.data.maxCalls); // returning maxCalls from the backend
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
            const response = await axios.get(`https://b4ae-70-71-130-6.ngrok-free.app/gen/${encodeURIComponent(textToContinue)}`, { withCredentials: false });
            setError('');
            return response.data[0].generated_text;
        } catch (error) {
            console.error('Error fetching the continued story:', error);
            setError('Yap too long dude! Pls try again.');
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
            setError('Enter your initial story first!');
            return;
        }
        let promptText = extractUniqueSnippet(continuedStory);
        if (!promptText) {
            setError("Couldn't find a unique part to continue the story.");
            return;
        }
        const newPartOfStory = await fetchStory(promptText);
        setContinuedStory(prevStory => prevStory + " " + newPartOfStory);
    };

    const handleDiscard = () => {
        setContinuedStory(''); 
    };

    function extractUniqueSnippet(story) {
        const sentences = story.match(/[^\.!\?]+[\.!\?]+/g);
        if (!sentences || sentences.length === 0) {
            return '';
        }
    
        for (let i = sentences.length - 1; i > 0; i--) {
            if (sentences[i] !== sentences[i - 1]) {
                return sentences[i].trim();
            }
        }
    
        return sentences[sentences.length - 1].trim();
    }


    const handleSaveYap = async () => {
        try {
            // title is the first 30 characters of continuedStory
            const title = continuedStory.substring(0, 30);
            const content = continuedStory;
    
            const response = await axios.post('http://localhost:8000/yaps/create', { title, content }, { withCredentials: true });
            console.log('Yap saved:', response.data);
            alert('Yap saved successfully!');
            // clears the yap input and continued story when successfully save
            setStoryInput('');
            setContinuedStory('');
        } catch (error) {
            console.error('Error saving the yap:', error);
            setError('Failed to save the yap. Please try again.');
        }
    };
    

    return (
        <div className="homepage-container">
            <h1>Welcome to YapPad</h1>
            <p>How it works: Enter the start of whatever story you want and let YapPad finish the rest.</p>
            {error && <p className="error">{error}</p>}
            <div className="search-container">
                <form className="search-form" onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Start typing your story..."
                        className="search-input"
                        value={storyInput}
                        onChange={handleInputChange}
                    />
                    <button type="submit" className="search-button">Start Yapping</button>
                </form>
            </div>

            <div className="yapStory">
            {continuedStory ? <p>{continuedStory}</p> : <p className="yapStory-placeholder">This is where your yap will be generated!</p>}
            </div>


            <div className="buttons">
                <button className="discard" onClick={handleDiscard}>Discard</button>
                <button className="save" onClick={handleSaveYap}>Save</button>
                <button className="yapping" onClick={handleKeepYapping}>Keep Yapping</button>
            </div>

            <div className="api-calls-display">
                You have made {apiCalls}/20 Yap calls
            </div>
        </div>
    );
}

export default HomePage;
