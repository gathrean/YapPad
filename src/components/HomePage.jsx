import React, { useState } from 'react';
import '../style/Home.css';
import axios from 'axios';

function HomePage() {
    const [storyInput, setStoryInput] = useState(''); // holds user's initial input
    const [continuedStory, setContinuedStory] = useState('');
    const [error, setError] = useState(''); 

    const handleInputChange = (event) => {
        setStoryInput(event.target.value);
        if (error) setError(''); 
    };

    const fetchStory = async (textToContinue) => {
        try {
            const response = await axios.get(`https://306f-70-71-130-6.ngrok-free.app/gen/${encodeURIComponent(textToContinue)}`);
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

    // const handleKeepYapping = async () => {
    //     if (!storyInput && !continuedStory) {
    //         setError('Enter your initial story first!');
    //         return;
    //     }
    //     const promptText = continuedStory.slice(-280); // our current max prompt length
    //     const newPartOfStory = await fetchStory(promptText);
    //     if (newPartOfStory) {
    //         setContinuedStory(prevStory => prevStory + " " + newPartOfStory);
    //     }
    // };

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
    
    function extractUniqueSnippet(story) {
        // split yap into sentences. 
        const sentences = story.match(/[^\.!\?]+[\.!\?]+/g);
        if (!sentences || sentences.length === 0) {
            return ''; // story is too short
        }
    
        // start from the end and look for a sentence that doesn't immediately repeat
        for (let i = sentences.length - 1; i > 0; i--) {
            if (sentences[i] !== sentences[i - 1]) {
                return sentences[i].trim(); // found a unique sentence to use as the next yap prompt
            }
        }
    
        return sentences[sentences.length - 1].trim(); // Default to the last sentence if all else fails.
    }

    
    return (
        <div className="homepage-container">
            <h1>Welcome to the YapPad</h1>
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
                {continuedStory && <p>{continuedStory}</p>}
            </div>

            <div className="buttons">
                <button className="discard">Discard</button>
                <button className="save">Save</button>
                <button className="yapping" onClick={handleKeepYapping}>Keep Yapping</button>
            </div>
        </div>
    );
}

export default HomePage;
