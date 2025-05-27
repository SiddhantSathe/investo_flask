// // import { useState, useEffect } from "react";

// // const Suggestions = () => {
// //   const [suggestions, setSuggestions] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState(null);
  
// //   const budget = 50000; // Replace with user input
// //   const risk = "low"; // Replace with user-selected risk level

// //   useEffect(() => {
// //     const fetchSuggestions = async () => {
// //       try {
// //         const response = await fetch(
// //           `http://127.0.0.1:8000/api/suggestions/?budget=${budget}&risk=${risk}`
// //         );
// //         if (!response.ok) {
// //           throw new Error("Failed to fetch suggestions");
// //         }
// //         const data = await response.json();
// //         setSuggestions(data);
// //       } catch (err) {
// //         setError(err.message);
// //       } finally {
// //         setLoading(false);
// //       }
// //     };

// //     fetchSuggestions();
// //   }, []);

// //   if (loading) return <p>Loading...</p>;
// //   if (error) return <p>Error: {error}</p>;

// //   return (
// //     <div>
// //       <h2>Stock Suggestions</h2>
// //       <ul>
// //         {suggestions.map((suggestion, index) => (
// //           <li key={index}>{suggestion}</li>
// //         ))}
// //       </ul>
// //     </div>
// //   );
// // };

// // export default Suggestions;



// import { useState } from "react";

// const Suggestions = () => {
//   const [suggestions, setSuggestions] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [budget, setBudget] = useState(""); // User input for budget
//   const [risk, setRisk] = useState("low"); // User input for risk level

//   const fetchSuggestions = async () => {
//     if (!budget) {
//       setError("Please enter a budget");
//       return;
//     }

//     setLoading(true);
//     setError(null);

//     try {
//       const response = await fetch(
//         `http://127.0.0.1:5501/api/suggestions/?budget=${budget}&risk=${risk}`
//       );
//       if (!response.ok) {
//         throw new Error("hi");
//       }
//       const data = await response.json();
//       setSuggestions(data);
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div>
//       <h2>Stock Suggestions</h2>
//       <div>
//         <label>
//           Budget: 
//           <input
//             type="number"
//             value={budget}
//             onChange={(e) => setBudget(e.target.value)}
//             placeholder="Enter budget"
//           />
//         </label>
//         <label>
//           Risk Level: 
//           <select value={risk} onChange={(e) => setRisk(e.target.value)}>
//             <option value="low">Low</option>
//             <option value="medium">Medium</option>
//             <option value="high">High</option>
//           </select>
//         </label>
//         <button onClick={fetchSuggestions}>Get Suggestions</button>
//       </div>

//       {loading && <p>Loading...</p>}
//       {error && <p style={{ color: "red" }}>Error: {error}</p>}

//       <ul>
//         {suggestions.map((suggestion, index) => (
//           <li key={index}>{suggestion}</li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default Suggestions;




import { useState } from "react";

const Suggestions = () => {
  const [suggestions, setSuggestions] = useState([]); // Ensure initial state is an array
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [budget, setBudget] = useState(""); // User input for budget
  const [risk, setRisk] = useState("low"); // User input for risk level

  const fetchSuggestions = async () => {
    if (!budget) {
      setError("Please enter a budget");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `http://127.0.0.1:5000/suggestion/?budget=${budget}&risk=${risk}` , {
          method: "GET",
        }
      );
      
      if (!response.ok) {
        throw new Error("Failed to fetch suggestions");
      }

      const data = await response.json();
      console.log("API Response:", data); // Debugging log

      // Ensure data is always an array
      setSuggestions(Array.isArray(data) ? data : []);
      
    } catch (err) {
      setError(err.message);
      setSuggestions([]); // Reset suggestions on error
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Stock Suggestions</h2>
      <div>
        <label>
          Budget: 
          <input
            type="number"
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
            placeholder="Enter budget"
          />
        </label>
        <label>
          Risk Level: 
          <select value={risk} onChange={(e) => setRisk(e.target.value)}>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </label>
        <button onClick={fetchSuggestions}>Get Suggestions</button>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>Error: {error}</p>}

      {suggestions.length === 0 && !loading && !error ? (
        <p>No suggestions available</p>
      ) : (
        <ul>
          {suggestions.map((suggestion, index) => (
            <li key={index}>{suggestion}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Suggestions;

// "use client"

// import { useState } from "react"

// const Suggestions = () => {
//   const [suggestions, setSuggestions] = useState([]) // Ensure initial state is an array
//   const [loading, setLoading] = useState(false)
//   const [error, setError] = useState(null)
//   const [budget, setBudget] = useState("") // User input for budget
//   const [risk, setRisk] = useState("low") // User input for risk level

//   const fetchSuggestions = async () => {
//     if (!budget) {
//       setError("Please enter a budget")
//       return
//     }

//     setLoading(true)
//     setError(null)

//     try {
//       // const response = await fetch(`http://127.0.0.1:5501//api/suggestions/?budget=${budget}&risk=${risk}`)

//       const response = await fetch(`http://127.0.0.1:5501/api/suggestions?budget=234&risk=medium`)


//       if (!response.ok) {
//         throw new Error("Failed to fetch suggestions")
//       }

//       const data = await response.json()
//       console.log("API Response:", data) // Debugging log
//       console.log("API Response type:", typeof data) // Check the type of data

//       // More robust handling of the response data
//       if (Array.isArray(data)) {
//         setSuggestions(data)
//       } else if (data && typeof data === "object") {
//         // If it's an object, it might have a property that contains the array
//         // Common patterns include data.results, data.suggestions, etc.
//         // Check for common array properties or convert object values to array
//         const possibleArrays = ["results", "suggestions", "data", "items"]

//         for (const key of possibleArrays) {
//           if (Array.isArray(data[key])) {
//             setSuggestions(data[key])
//             break
//           }
//         }

//         // If no array property found, try to convert object to array
//         if (!Array.isArray(suggestions)) {
//           // Convert object values to array if possible
//           const values = Object.values(data)
//           if (values.length > 0) {
//             setSuggestions(values)
//           } else {
//             setSuggestions([])
//           }
//         }
//       } else {
//         // If it's neither an array nor an object, wrap it in an array
//         setSuggestions([data].filter((item) => item !== null && item !== undefined))
//       }
//     } catch (err) {
// return<p>
// 📈 Stock Recommendations Based on Your Budget & Risk Profile

// ✅ Safe Investments
// 1️⃣ Johnson & Johnson (JNJ)  
//    - Reason: Low volatility, consistent dividend payments, strong financial health, diversified across pharmaceuticals, medical devices, and consumer health.  

// 2️⃣ Procter & Gamble (PG)  
//    - Reason: Strong brand recognition, stable revenue growth, history of dividend increases, and resilient performance even during economic downturns.  

// ⚖️ Balanced Investments
// 3️⃣ Microsoft (MSFT)  
//    - Reason: Diversified business model (cloud computing, software, gaming), strong revenue & EPS growth, moderate volatility, and generally positive market sentiment.  

// 4️⃣ Adobe (ADBE)  
//    - Reason: Leader in creative and digital marketing software, strong recurring revenue model, consistent EPS growth, and balanced risk-reward profile.  

// 🔥 High-Risk Investments
// 5️⃣ Tesla (TSLA)  
//    - Reason: High growth potential in electric vehicles and renewable energy, but known for high volatility. While revenue growth is strong, profitability can be inconsistent, making it a high-risk option.  

// 🏆 Investment Strategy Tips
// - Safe Investments → Best for risk-averse investors seeking stability.  
// - Balanced Investments → Good mix of growth and stability.  
// - High-Risk Investments → High reward potential but comes with volatility.  
// `</p>      
//       setSuggestions([]) // Reset suggestions on error
//     } finally {
//       setLoading(false)
//     }
//   }

//   // Ensure suggestions is always an array before rendering
//   const renderSuggestions = () => {
//     if (!Array.isArray(suggestions)) {
//       console.warn("Suggestions is not an array:", suggestions)
//       return <p>
//       📈 Stock Recommendations Based on Your Budget & Risk Profile
      
//       ✅ Safe Investments
//       1️⃣ Johnson & Johnson (JNJ)  
//          - Reason: Low volatility, consistent dividend payments, strong financial health, diversified across pharmaceuticals, medical devices, and consumer health.  
      
//       2️⃣ Procter & Gamble (PG)  
//          - Reason: Strong brand recognition, stable revenue growth, history of dividend increases, and resilient performance even during economic downturns.  
      
//       ⚖️ Balanced Investments
//       3️⃣ Microsoft (MSFT)  
//          - Reason: Diversified business model (cloud computing, software, gaming), strong revenue & EPS growth, moderate volatility, and generally positive market sentiment.  
      
//       4️⃣ Adobe (ADBE)  
//          - Reason: Leader in creative and digital marketing software, strong recurring revenue model, consistent EPS growth, and balanced risk-reward profile.  
      
//       🔥 High-Risk Investments
//       5️⃣ Tesla (TSLA)  
//          - Reason: High growth potential in electric vehicles and renewable energy, but known for high volatility. While revenue growth is strong, profitability can be inconsistent, making it a high-risk option.  
      
//       🏆 Investment Strategy Tips
//       - Safe Investments → Best for risk-averse investors seeking stability.  
//       - Balanced Investments → Good mix of growth and stability.  
//       - High-Risk Investments → High reward potential but comes with volatility.  
//       </p>
//     }

//     if (suggestions.length === 0) {
//       return <p>
//       📈 Stock Recommendations Based on Your Budget & Risk Profile
//       <br/>
//       ✅ Safe Investments
//       <br/>
//       1️⃣ Johnson & Johnson (JNJ)      <br/>
  
//          - Reason: Low volatility, consistent dividend payments, strong financial health, diversified across pharmaceuticals, medical devices, and consumer health.        <br/>

      
//       2️⃣ Procter & Gamble (PG)        <br/>

//          - Reason: Strong brand recognition, stable revenue growth, history of dividend increases, and resilient performance even during economic downturns.        <br/>

      
//       ⚖️ Balanced Investments       <br/>

//       3️⃣ Microsoft (MSFT)        <br/>

//          - Reason: Diversified business model (cloud computing, software, gaming), strong revenue & EPS growth, moderate volatility, and generally positive market sentiment.       <br/>
 
      
//       4️⃣ Adobe (ADBE)        <br/>

//          - Reason: Leader in creative and digital marketing software, strong recurring revenue model, consistent EPS growth, and balanced risk-reward profile.        <br/>

      
//       🔥 High-Risk Investments      <br/>

//       5️⃣ Tesla (TSLA)        <br/>

//          - Reason: High growth potential in electric vehicles and renewable energy, but known for high volatility. While revenue growth is strong, profitability can be inconsistent, making it a high-risk option.        <br/>

      
//       🏆 Investment Strategy Tips      <br/>

//       - Safe Investments → Best for risk-averse investors seeking stability.        <br/>

//       - Balanced Investments → Good mix of growth and stability.        <br/>

//       - High-Risk Investments → High reward potential but comes with volatility.        <br/>

//       </p>
//     }

//     return (
//       <ul>
//         {suggestions.map((suggestion, index) => (
//           <li key={index}>{typeof suggestion === "object" ? JSON.stringify(suggestion) : suggestion.toString()}</li>
//         ))}
//       </ul>
//     )
//   }

//   return (
//     <div>
//       <h2>Stock Suggestions</h2>
//       <div>
//         <label>
//           Budget:
//           <input type="number" value={budget} onChange={(e) => setBudget(e.target.value)} placeholder="Enter budget" />
//         </label>
//         <label>
//           Risk Level:
//           <select value={risk} onChange={(e) => setRisk(e.target.value)}>
//             <option value="low">Low</option>
//             <option value="medium">Medium</option>
//             <option value="high">High</option>
//           </select>
//         </label>
//         <button onClick={fetchSuggestions}>Get Suggestions</button>
//       </div>

//       {loading && <p>Loading...</p>}
//       {error && <p style={{ color: "red" }}>Error: {error}</p>}

//       {!loading && !error && renderSuggestions()}
//     </div>
//   )
// }

// export default Suggestions