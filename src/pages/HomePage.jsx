// DISCLOSURE: the following JavaScript code has been created with the aid of 
// Chat GPT 3.5 and edited by Group 6. 

import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "../style/Home.css";
import Modal from "../components/Modal";
import YapLoadingImage from "../assets/images/yappad-logo-orange.png";
import { homePageMessages } from "../lang/messages/user";
import { useAuth } from "../authentication/AuthContext";
import { API_BASE } from "../api_constants";
import { useNavigate } from "react-router-dom";

function TypingAnimation() {
  const [dots, setDots] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prevDots) => {
        if (prevDots === "...") {
          return "";
        } else {
          return prevDots + ".";
        }
      });
    }, 160);

    return () => clearInterval(interval);
  }, []);

  return <span> {dots}</span>;
}

function HomePage() {
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const [storyInput, setStoryInput] = useState("");
  const [continuedStory, setContinuedStory] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [error, setError] = useState("");
  const [apiCalls, setApiCalls] = useState(0);
  const [loading, setLoading] = useState(false);
  const [prevStory, setPrevStory] = useState("");
  const [newPartOfStory, setNewPartOfStory] = useState("");
  const yapStoryRef = useRef(null);
  const [nextText, setNextText] = useState("");

  useEffect(() => {
    if (continuedStory && prevStory) {
      const remainingText = continuedStory.slice(prevStory.length);
      setNextText(remainingText);
    }
  }, [continuedStory, prevStory]);

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/");
    }
  });

  useEffect(() => {
    fetchApiConsumption();
  }, []);

  const fetchApiConsumption = async () => {
    try {
      const response = await axios.get(`${API_BASE}/yaps/api-consumption`, {
        withCredentials: true,
      });
      setApiCalls(response.data.calls);
    } catch (error) {
      console.error("Error fetching API consumption:", error);
    }
  };

  const handleInputChange = (event) => {
    setStoryInput(event.target.value);
    if (error) setError("");
  };

  useEffect(() => {
    yapStoryRef.current.scrollTop = yapStoryRef.current.scrollHeight;
  }, [continuedStory]);

  const fetchStory = async (textToContinue) => {
    try {
      setLoading(true);
      const response = await axios.post(`${API_BASE}/yaps/yap`, {
        withCredentials: true,
        data: {
          text: textToContinue,
        },
      });
      setLoading(false);
      setError("");
      return response.data[0].generated_text;
    } catch (error) {
      console.error("Error fetching the continued story:", error);
      setError(homePageMessages.tooLong);
      setLoading(false);
      return "";
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const newPartOfStory = await fetchStory(storyInput);
    if (!storyInput) {
      setError(homePageMessages.enterYourInitialStory);
      return;
    }
    if (newPartOfStory) {
      setPrevStory(continuedStory);
      setContinuedStory(newPartOfStory);
      fetchApiConsumption();
    }
  };

  const handleKeepYapping = async () => {
    if (!storyInput) {
      setError(homePageMessages.enterYourInitialStory);
      return;
    }
    if (!continuedStory) {
      setError(homePageMessages.startYappingFirst);
      return;
    }

    const newPartOfStory = await fetchStory(continuedStory);
    setPrevStory(continuedStory); // Store previous story
    setContinuedStory(newPartOfStory);
    setNewPartOfStory(newPartOfStory); // Update new part of story
    fetchApiConsumption();
  };

  const handleDiscard = () => {
    setError("");
    setStoryInput("");
    setPrevStory(""); // Clear previous story
    setContinuedStory("");
  };

  const handleSaveYap = async () => {
    try {
      if (continuedStory.trim() === "") {
        setError(homePageMessages.emptyYap);
        return;
      }
      const title = continuedStory.substring(0, 30);
      const content = continuedStory;

      const response = await axios.post(
        `${API_BASE}/yaps/create`,
        { title, content },
        { withCredentials: true }
      );
      console.log("Yap saved:", response.data);
      setModalMessage(homePageMessages.yapSavedSuccessfully);
      setShowModal(true);
      setStoryInput("");
      setPrevStory(""); // Clear previous story
      setContinuedStory("");
    } catch (error) {
      console.error("Error saving the yap:", error);
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
          <textarea
            type="text"
            placeholder={homePageMessages.startTypingYourStory}
            className="search-input"
            value={storyInput}
            onChange={handleInputChange}
          />
          <button type="submit" className="button-general search-button">
            {homePageMessages.startYapping}
          </button>{" "}
        </form>
      </div>

      <div className="yapStory" ref={yapStoryRef}>
        {loading ? (
          <div className="loading-container">
            <p>
              {continuedStory ? (
                <>
                  <span style={{ color: "black" }}>{continuedStory}</span>
                  <TypingAnimation text={newPartOfStory} />
                </>
              ) : (
                <p className="yapStory-placeholder">
                  {homePageMessages.yapStoryPlaceholder}
                </p>
              )}
            </p>
          </div>
        ) : (
          <p>
            {continuedStory && !prevStory ? (
              <>
                <span style={{ color: "#FF5108" }}>{continuedStory}</span>
              </>
            ) : (
              <>
                {prevStory ? (
                  <>
                    <span style={{ color: "black" }}>{prevStory}</span>
                    <span style={{ color: "#FF5108" }}>{nextText}</span>
                  </>
                ) : (
                  <p className="yapStory-placeholder">
                    {homePageMessages.yapStoryPlaceholder}
                  </p>
                )}
              </>
            )}
          </p>
        )}
      </div>

      <div className="buttons">
        {loading ? (
          <img
            src={YapLoadingImage}
            alt="Loading..."
            className="yap-loading-image"
          />
        ) : (
          <>
            <div className="buttons">
              <button className="button yapping" onClick={handleKeepYapping}>
                {homePageMessages.keepYapping}
              </button>
            </div>
            <div className="buttons">
              <button className="button discard" onClick={handleDiscard}>
                {homePageMessages.discard}
              </button>
              <button className="button save" onClick={handleSaveYap}>
                {homePageMessages.save}
              </button>
            </div>
          </>
        )}
      </div>

      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        message={modalMessage}
      />
    </div>
  );
}

export default HomePage;
