import React, { useState } from "react";

const IndustryForm2 = () => {
  const [industries, setIndustries] = useState([
    {
      name: "Fashion",
      categories: [{ name: "Clothing", subcategories: ["T-Shirts", "Hoodies"] }],
    },
  ]);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleIndustryName = (value) => {
    const updated = [...industries];
    updated[activeIndex].name = value;
    setIndustries(updated);
  };

  const handleCategoryName = (catIdx, value) => {
    const updated = [...industries];
    updated[activeIndex].categories[catIdx].name = value;
    setIndustries(updated);
  };

  const handleSubChange = (catIdx, subIdx, value) => {
    const updated = [...industries];
    updated[activeIndex].categories[catIdx].subcategories[subIdx] = value;
    setIndustries(updated);
  };

  const addIndustry = () => {
    setIndustries([...industries, { name: "", categories: [{ name: "", subcategories: [""] }] }]);
    setActiveIndex(industries.length);
  };

  const addCategory = () => {
    const updated = [...industries];
    updated[activeIndex].categories.push({ name: "", subcategories: [""] });
    setIndustries(updated);
  };

  const addSubcategory = (catIdx) => {
    const updated = [...industries];
    updated[activeIndex].categories[catIdx].subcategories.push("");
    setIndustries(updated);
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-64 bg-gray-100 p-4 border-r overflow-y-auto">
        <h2 className="font-semibold text-lg mb-4">Industries</h2>
        {industries.map((ind, idx) => (
          <div
            key={idx}
            onClick={() => setActiveIndex(idx)}
            className={`cursor-pointer px-2 py-1 rounded ${
              activeIndex === idx ? "bg-purple-200 font-semibold" : "hover:bg-gray-200"
            }`}
          >
            {ind.name || "Untitled"}
          </div>
        ))}
        <button
          onClick={addIndustry}
          className="mt-4 text-sm text-purple-700 underline"
        >
          + Add Industry
        </button>
      </div>

      {/* Right Panel */}
      <div className="flex-1 p-6 overflow-y-auto">
        <label className="block font-semibold">Industry Name:</label>
        <input
          className="border px-3 py-2 rounded w-full mb-6"
          value={industries[activeIndex].name}
          onChange={(e) => handleIndustryName(e.target.value)}
        />

        {industries[activeIndex].categories.map((cat, i) => (
          <div key={i} className="mb-6 border rounded p-4 bg-gray-50">
            <input
              className="border-b px-2 py-1 w-full mb-3 font-medium"
              placeholder="Category Name"
              value={cat.name}
              onChange={(e) => handleCategoryName(i, e.target.value)}
            />
            {cat.subcategories.map((sub, j) => (
              <input
                key={j}
                className="border px-2 py-1 w-full mb-2 text-sm rounded"
                placeholder="Subcategory Name"
                value={sub}
                onChange={(e) => handleSubChange(i, j, e.target.value)}
              />
            ))}
            <button
              className="text-sm text-blue-600 mt-1"
              onClick={() => addSubcategory(i)}
            >
              + Add Subcategory
            </button>
          </div>
        ))}

        <button
          onClick={addCategory}
          className="bg-purple-600 text-white px-4 py-2 rounded"
        >
          + Add Category
        </button>
      </div>
    </div>
  );
};

export default IndustryForm2;
