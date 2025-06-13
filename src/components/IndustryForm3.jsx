import React, { useState } from "react";

const IndustryForm3 = () => {
  const [industry, setIndustry] = useState("Fashion");
  const [categories, setCategories] = useState([
    { name: "Clothing", subcategories: ["T-Shirts", "Hoodies"] },
    { name: "Accessories", subcategories: ["Watches"] },
  ]);

  const handleCategoryChange = (i, value) => {
    const updated = [...categories];
    updated[i].name = value;
    setCategories(updated);
  };

  const handleSubChange = (catIndex, subIndex, value) => {
    const updated = [...categories];
    updated[catIndex].subcategories[subIndex] = value;
    setCategories(updated);
  };

  const addCategory = () => {
    setCategories([...categories, { name: "", subcategories: [""] }]);
  };

  const addSubcategory = (catIndex) => {
    const updated = [...categories];
    updated[catIndex].subcategories.push("");
    setCategories(updated);
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <label className="block font-semibold mb-1">Industry Name:</label>
      <input
        className="w-full border px-3 py-2 mb-6 rounded"
        value={industry}
        onChange={(e) => setIndustry(e.target.value)}
        placeholder="Enter industry name"
      />

      {categories.map((cat, i) => (
        <div key={i} className="mb-6">
          <input
            className="w-full font-medium border-b px-2 py-1 mb-2"
            placeholder="Category Name"
            value={cat.name}
            onChange={(e) => handleCategoryChange(i, e.target.value)}
          />

          {cat.subcategories.map((sub, j) => (
            <input
              key={j}
              className="w-full text-sm border px-2 py-1 mb-1 rounded"
              placeholder="Subcategory Name"
              value={sub}
              onChange={(e) => handleSubChange(i, j, e.target.value)}
            />
          ))}

          <button
            onClick={() => addSubcategory(i)}
            className="text-blue-600 text-sm mt-1"
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
  );
};

export default IndustryForm3;
