import React, { useState } from "react";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

const BugReportTable = () => {
  const [bugs, setBugs] = useState([
    {
      bugNo: "BUG-00126",
      bugType: "Data Issue",
      module: "JSV",
      subModule: "Role Filter",
      description:
        "Role dropdown shows 'No results found' instead of listing Production Planner, Supervisor, and Operators roles. No JSV data shown as result.",
      priority: "High",
      status: "Open",
      roles: "QA, Dev",
      tester: "Your Name",
      testData: "Open JSV Module → Try selecting roles in dropdown",
      screenshot: "✅",
      createdBy: "Your Name",
      createdDate: "14-Jun-2025",
    },
  ]);

  const [newBug, setNewBug] = useState({
    bugNo: "",
    bugType: "",
    module: "",
    subModule: "",
    description: "",
    priority: "High",
    status: "Open",
    roles: "",
    tester: "",
    testData: "",
    screenshot: "",
    createdBy: "",
    createdDate: "",
  });

  const handleChange = (e) => {
    setNewBug({ ...newBug, [e.target.name]: e.target.value });
  };

  const addBug = () => {
    setBugs([...bugs, newBug]);
    alert("✅ Bug entry added successfully!");
    setNewBug({
      bugNo: "",
      bugType: "",
      module: "",
      subModule: "",
      description: "",
      priority: "High",
      status: "Open",
      roles: "",
      tester: "",
      testData: "",
      screenshot: "",
      createdBy: "",
      createdDate: "",
    });
  };

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(bugs);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Bug Report");
    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    const data = new Blob([excelBuffer], {
      type: "application/octet-stream",
    });
    saveAs(data, "Bug_Report.xlsx");
    alert("📁 Excel file exported successfully!");
  };

  const roleOptions = ["Operator", "Supervisor", "Production Planner", "QA", "Dev"];

  return (
    <div className="p-8 animate-fade-in">
      <div className="bg-white border-2 border-gray-300 shadow-lg rounded-xl p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b pb-2">
          🪲 Bug Report
        </h2>

        {/* Bug Input Form */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {Object.keys(newBug).map((key, i) => (
            <div key={i} className="flex flex-col">
              <label className="text-sm font-medium text-gray-700 capitalize mb-1">
                {key.replace(/([A-Z])/g, " $1")}
              </label>
              {key === "priority" || key === "status" ? (
                <select
                  name={key}
                  value={newBug[key]}
                  onChange={handleChange}
                  className="p-2 border border-gray-300 rounded bg-white"
                >
                  <option value="">Select {key}</option>
                  {key === "priority" && ["Low", "Medium", "High", "Critical"].map((opt) => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                  {key === "status" && ["Open", "In Progress", "Fixed", "Closed"].map((opt) => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              ) : key === "roles" ? (
                <select
                  name={key}
                  value={newBug[key]}
                  onChange={handleChange}
                  className="p-2 border border-gray-300 rounded bg-white"
                >
                  <option value="">Select Role</option>
                  {roleOptions.map((role) => (
                    <option key={role} value={role}>{role}</option>
                  ))}
                </select>
              ) : (
                <input
                  name={key}
                  value={newBug[key]}
                  onChange={handleChange}
                  placeholder={`Enter ${key}`}
                  className="p-2 border border-gray-300 rounded bg-white"
                />
              )}
            </div>
          ))}
        </div>
        <div className="text-right mb-6">
          <button
            onClick={addBug}
            className="bg-primary text-white px-6 py-2 rounded hover:bg-primary-dark transition duration-300"
          >
            ➕ Add Bug
          </button>
        </div>

        {/* Row and Column Layout */}
        <div className="overflow-auto border border-gray-200 rounded">
          <table className="min-w-full table-auto text-sm text-left">
            <thead className="bg-gray-100">
              <tr>
                {Object.keys(bugs[0]).map((key, idx) => (
                  <th
                    key={idx}
                    className="border px-4 py-2 font-medium text-gray-700"
                  >
                    {key.replace(/([A-Z])/g, " $1")}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {bugs.map((bug, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  {Object.values(bug).map((val, idy) => (
                    <td key={idy} className="border px-4 py-2 text-gray-600">
                      {val}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Final Submit Button */}
        <div className="mt-6 text-right">
          <button
            onClick={exportToExcel}
            className="bg-primary text-white px-6 py-2 rounded hover:bg-primary-dark transition duration-300"
          >
            Final Submit (Export Excel)
          </button>
        </div>
      </div>

      {/* Animations */}
      <style jsx>{`
        .animate-fade-in {
          animation: fadeIn 0.8s ease-in-out;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default BugReportTable;
