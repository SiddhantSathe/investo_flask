// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import "../styles/insurance.css";

// const Insurance = () => {
//     const [policies, setPolicies] = useState([]);

//     useEffect(() => {
//         axios.get("http://localhost:5500/api/insurance")
//             .then(response => {
//                 setPolicies(response.data);
//             })
//             .catch(error => {
//                 console.error("Error fetching insurance policies:", error);
//             });
//     }, []);

//     return (
//         <div className="container">
//             <h2>Insurance Policies</h2>
//             <br />
//             <table>
//                 <thead>
//                     <tr>
//                         <th>Policy ID</th>
//                         <th>Type</th>
//                         <th>Insurer</th>
//                         <th>Coverage</th>
//                         <th>Premium</th>
//                         <th>Term (Years)</th>
//                         <th>Benefits</th>
//                         <th>Renewable</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {policies.map((policy, index) => (
//                         <tr key={index}>
//                             <td>{policy.policy_id}</td>
//                             <td>{policy.type}</td>
//                             <td>{policy.insurer}</td>
//                             <td>₹{policy.coverage.toLocaleString()}</td>
//                             <td>₹{policy.premium.toLocaleString()}</td>
//                             <td>{policy.term}</td>
//                             <td>
//                                 <ul>
//                                     {policy.benefits.map((benefit, i) => (
//                                         <li key={i}>{benefit}</li>
//                                     ))}
//                                 </ul>
//                             </td>
//                             <td>{policy.renewable ? "Yes" : "No"}</td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>
//         </div>
//     );
// };

// export default Insurance;


import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/insurance.css";

const Insurance = () => {
    const [policies, setPolicies] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:5000/insurance")
            .then(response => {
                setPolicies(response.data);
            })
            .catch(error => {
                console.error("Error fetching insurance policies:", error);
            });
    }, []);

    // Function to handle Buy button click
    const handleBuy = (policyId) => {
        alert(`Proceeding to buy policy: ${policyId}`);
        // You can navigate to a payment page or open a checkout modal here
    };

    return (
        <div className="container">
            <h2>Insurance Policies</h2>
          
            <table>
                <thead>
                    <tr>
                        <th>Policy ID</th>
                        <th>Type</th>
                        <th>Insurence</th>
                        <th>Coverage</th>
                        <th>Premium</th>
                        <th>Term (Years)</th>
                        <th>Benefits</th>
                        <th>Renewable</th>
                        <th>Buy</th>  {/* ✅ New Buy column */}
                    </tr>
                </thead>
                <tbody>
                    {policies.map((policy, index) => (
                        <tr key={index}>
                            <td>{policy.policy_id}</td>
                            <td>{policy.type}</td>
                            <td>{policy.insurer}</td>
                            <td>₹{policy.coverage.toLocaleString()}</td>
                            <td>₹{policy.premium.toLocaleString()}</td>
                            <td>{policy.term}</td>
                            <td>
                                <ul>
                                    {policy.benefits.map((benefit, i) => (
                                        <li key={i}>{benefit}</li>
                                    ))}
                                </ul>
                            </td>
                            <td>{policy.renewable ? "Yes" : "No"}</td>
                            <td>
                                <button className="buy-btn" onClick={() => handleBuy(policy.policy_id)}>
                                    Buy Now
                                </button>
                            </td>  {/* ✅ New Buy button */}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Insurance;
