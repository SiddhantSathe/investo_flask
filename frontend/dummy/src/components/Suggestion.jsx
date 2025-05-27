"use client"

import { useState } from "react"

export default function Suggestion() {
  const [suggestions, setSuggestions] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [budget, setBudget] = useState(0)
  const [risk, setRisk] = useState("low")

  const fetchSuggestions = async () => {
    setLoading(true)
    setError(null) // Reset error state
    try {
      const response = await fetch(`http://127.0.0.1:5000/suggestion?budget=${budget}&risk=${risk}`)
      const data = await response.json()
      console.log("API Response:", data)

      // Handle different possible response formats from the backend
      if (data && Array.isArray(data)) {
        // If the response is directly an array
        setSuggestions(data)
      } else if (data && Array.isArray(data.recommendations)) {
        // If the response has a recommendations array
        setSuggestions(data.recommendations)
      } else if (data && typeof data === "object") {
        // If the response is an object with stock data
        // Convert the object to an array for rendering
        setSuggestions(Object.values(data))
      } else {
        setSuggestions([]) // Reset to empty array if no valid data
        setError({ message: "Invalid data format received from server" })
      }

      console.log("Updated Suggestions State:", suggestions) // Log the updated state
    } catch (error) {
      console.error("Error fetching suggestions:", error)
      setError(error)
      setSuggestions([]) // Reset suggestions on error
    } finally {
      setLoading(false)
    }
  }

  // Function to render a suggestion item based on its structure
  const renderSuggestionItem = (suggestion) => {
    if (typeof suggestion === "string") {
      return suggestion
    } else if (suggestion && typeof suggestion === "object") {
      // Check for different possible properties
      if (suggestion.name) {
        return (
          <div>
            <strong>{suggestion.name}</strong>
            {suggestion.category && <span> ({suggestion.category})</span>}
            {suggestion.description && <p>{suggestion.description}</p>}
            {suggestion.reasoning && <p>{suggestion.reasoning}</p>}
          </div>
        )
      } else if (suggestion.stock) {
        return (
          <div>
            <strong>{suggestion.stock}</strong>
            {suggestion.type && <span> ({suggestion.type})</span>}
            {suggestion.reason && <p>{suggestion.reason}</p>}
          </div>
        )
      } else {
        // Fallback for other object structures
        return JSON.stringify(suggestion)
      }
    }
    return "Unknown suggestion format"
  }

  return (
    <div className="container mx-auto p-4 max-w-md">
      <div className="mb-4">
        <label className="block mb-2">Budget:</label>
        <input
          type="number"
          placeholder="Enter Budget"
          value={budget}
          onChange={(e) => setBudget(e.target.value)}
          className="w-full p-2 border rounded"
        />
      </div>

      <div className="mb-4">
        <label className="block mb-2">Risk Level:</label>
        <select value={risk} onChange={(e) => setRisk(e.target.value)} className="w-full p-2 border rounded">
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>

      <h1 className="text-2xl font-bold my-4">Suggestions</h1>
      <button
        onClick={fetchSuggestions}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4"
      >
        Get Suggestions
      </button>

      {loading && <p className="text-gray-600">Loading...</p>}
      {error && <p className="text-red-500">Error: {error.message}</p>}

      {!loading && !error && (
        <div className="mt-4">
          {Array.isArray(suggestions) && suggestions.length > 0 ? (
            <ul className="list-disc pl-5 space-y-4">
              {suggestions.map((suggestion, index) => (
                <li key={index} className="border-b pb-2">
                  {renderSuggestionItem(suggestion)}
                </li>
              ))}
            </ul>
          ) : (
            <p>No suggestions available</p>
          )}
        </div>
      )}
    </div>
  )
}




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
//       const response = await fetch(`http://127.0.0.1:8000/api/suggestions/?budget=${budget}&risk=${risk}`)

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
//       console.error("Error fetching suggestions:", err)
//       setError(err.message)
//       setSuggestions([]) // Reset suggestions on error
//     } finally {
//       setLoading(false)
//     }
//   }

//   // Ensure suggestions is always an array before rendering
//   const renderSuggestions = () => {
//     if (!Array.isArray(suggestions)) {
//       console.warn("Suggestions is not an array:", suggestions)
//       return <p>Error: Invalid data format received</p>
//     }

//     if (suggestions.length === 0) {
//       return <p>No suggestions available</p>
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

