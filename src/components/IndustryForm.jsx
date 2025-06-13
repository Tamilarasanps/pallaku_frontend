import React, { useState } from "react";

const IndustryForm = () => {
  const [industry, setIndustry] = useState("Fashion");
  const [categories, setCategories] = useState([
    { name: "Clothing", subcategories: ["T-Shirts", "Hoodies"] },
    { name: "Accessories", subcategories: ["Watches"] },
  ]);

  const handleSubChange = (catIdx, subIdx, value) => {
    const updated = [...categories];
    updated[catIdx].subcategories[subIdx] = value;
    setCategories(updated);
  };

  const addCategory = () => {
    setCategories([...categories, { name: "", subcategories: [""] }]);
  };

  const addSubcategory = (catIdx) => {
    const updated = [...categories];
    updated[catIdx].subcategories.push("");
    setCategories(updated);
  };

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <label className="block mb-2 font-semibold">Industry Name:</label>
      <input
        className="border px-3 py-2 rounded w-full mb-4"
        value={industry}
        onChange={(e) => setIndustry(e.target.value)}
        placeholder="Industry Name"
      />

      <table className="w-full border text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="border px-2 py-1 text-left">Category</th>
            <th className="border px-2 py-1 text-left">Subcategory</th>
            <th className="border px-2 py-1 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((cat, i) =>
            cat.subcategories.map((sub, j) => (
              <tr key={`${i}-${j}`} className="border-t">
                <td className="px-2 py-1">
                  {j === 0 ? (
                    <input
                      className="border p-1 rounded w-full"
                      value={cat.name}
                      onChange={(e) => {
                        const updated = [...categories];
                        updated[i].name = e.target.value;
                        setCategories(updated);
                      }}
                    />
                  ) : (
                    ""
                  )}
                </td>
                <td className="px-2 py-1">
                  <input
                    className="border p-1 rounded w-full"
                    value={sub}
                    onChange={(e) =>
                      handleSubChange(i, j, e.target.value)
                    }
                  />
                </td>
                <td className="px-2 py-1 text-sm space-x-2">
                  {j === cat.subcategories.length - 1 && (
                    <button
                      onClick={() => addSubcategory(i)}
                      className="text-blue-600 text-xs"
                    >
                      + Add Subcategory
                    </button>
                  )}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      <button
        onClick={addCategory}
        className="mt-4 bg-purple-600 text-white px-3 py-1 rounded"
      >
        + Add Category
      </button>
    </div>
  );
};

export default IndustryForm;
