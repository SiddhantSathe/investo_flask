// import { useEffect, useState } from "react";

// const BondsList = () => {
//   const [bonds, setBonds] = useState([]);

//   useEffect(() => {
//     fetch("http://127.0.0.1:8000/api/bonds/") // Django API URL
//       .then((response) => response.json())
//       .then((data) => {
//         if (data.status === "ok" && data.result?.list) {
//           setBonds(data.result.list);
//         }
//       })
//       .catch((error) => console.error("Error fetching bonds:", error));
//   }, []);

//   return (
//     <div className="p-4">
//       <h2 className="text-xl font-bold mb-4">Available Bonds</h2>
//       <div className="overflow-x-auto">
//         <table className="min-w-full border border-gray-300">
//           <thead>
//             <tr className="bg-gray-200">
//               <th className="border px-4 py-2">Symbol</th>
//               <th className="border px-4 py-2">Name</th>
//               <th className="border px-4 py-2">Country</th>
//               <th className="border px-4 py-2">Currency</th>
//               <th className="border px-4 py-2">Exchange</th>
//             </tr>
//           </thead>
//           <tbody>
//             {bonds.map((bond, index) => (
//               <tr key={index} className="border">
//                 <td className="border px-4 py-2">{bond.symbol}</td>
//                 <td className="border px-4 py-2">{bond.name}</td>
//                 <td className="border px-4 py-2">{bond.country}</td>
//                 <td className="border px-4 py-2">{bond.currency}</td>
//                 <td className="border px-4 py-2">{bond.exchange}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default BondsList;


import { useEffect, useState } from "react";

const BondsList = () => {
  const [bonds, setBonds] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://127.0.0.1:5000/bonds/")
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "ok" && data.result?.list) {
          setBonds(data.result.list);
        }
      })
      .catch((error) => console.error("Error fetching bonds:", error))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">Available Bonds</h2>

      {loading ? (
        <p className="text-center text-gray-500">Loading bonds...</p>
      ) : bonds.length === 0 ? (
        <p className="text-center text-gray-500">No bonds available.</p>
      ) : (
        <div className="overflow-x-auto rounded-lg shadow-md">
          <table className="w-full border-collapse bg-white rounded-lg shadow-sm">
            <thead>
              <tr className="bg-gray-100 text-gray-700 text-lg">
                <th className="px-6 py-3 text-left">Name</th>
                <th className="px-6 py-3 text-left">Status</th>
                <th className="px-6 py-3 text-left">Symbol</th>
                <th className="px-6 py-3 text-left">Country</th>
                <th className="px-6 py-3 text-left">Currency</th>
                <th className="px-6 py-3 text-left">Exchange</th>
              </tr>
            </thead>
            <tbody>
              {bonds.map((bond, index) => (
                <tr key={index} className="border-t hover:bg-gray-50 transition">
                  <td className="px-6 py-4 font-medium text-gray-900">{bond.name}</td>

                  {/* Status Badge (Example: If USD then "Online", otherwise "Offline") */}
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        bond.currency === "USD"
                          ? "bg-green-100 text-green-600"
                          : "bg-gray-200 text-gray-700"
                      }`}
                    >
                      {bond.currency === "USD" ? "Active" : "Inactive"}
                    </span>
                  </td>

                  <td className="px-6 py-4">{bond.symbol}</td>
                  <td className="px-6 py-4">{bond.country}</td>
                  <td className="px-6 py-4">{bond.currency}</td>
                  <td className="px-6 py-4">{bond.exchange}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default BondsList;
