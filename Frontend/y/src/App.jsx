import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [message, setMessage] = useState("");
  const [userInput, setUserInput] = useState("");
  const [serverResponse, setServerResponse] = useState("");

  // 🔹 جلب البيانات من Express server
  useEffect(() => {
    axios.get("http://localhost:8000/api/get-message")
      .then(response => setMessage(response.data.message))
      .catch(error => console.error("Error fetching message:", error));
  }, []);

  // 🔹 إرسال البيانات إلى Express server
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await axios.post("http://localhost:8000/api/post-message", { userMessage: userInput });
      setServerResponse(response.data.response);
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>React Frontend</h1>

      {/* عرض البيانات القادمة من السيرفر */}
      <h2>{message}</h2>

      {/* فورم لإرسال رسالة */}
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          placeholder="Enter a message" 
          value={userInput} 
          onChange={(e) => setUserInput(e.target.value)} 
        />
        <button type="submit">Send</button>
      </form>

      {/* عرض استجابة السيرفر */}
      {serverResponse && <h3>Response: {serverResponse}</h3>}
    </div>
  );
}

export default App;
