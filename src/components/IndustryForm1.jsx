import React, { useState } from "react";

const IndustryForm1 = () => {
  const [industryName, setIndustryName] = useState("Fashion");
  const [categories, setCategories] = useState([
    { name: "Clothing", subcategories: ["T-Shirts", "Hoodies"] },
    { name: "Accessories", subcategories: ["Watches"] },
  ]);

  const handleCategoryChange = (index, value) => {
    const updated = [...categories];
    updated[index].name = value;
    setCategories(updated);
  };

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
    <div className="p-6 max-w-4xl mx-auto">
      <label className="font-semibold mb-2 block">Industry Name:</label>
      <input
        type="text"
        className="border rounded px-3 py-2 w-full mb-6"
        value={industryName}
        onChange={(e) => setIndustryName(e.target.value)}
      />

      {categories.map((category, i) => (
        <div key={i} className="border rounded p-4 mb-4 bg-gray-50 shadow-sm">
          <input
            type="text"
            className="border-b w-full mb-3 px-2 py-1 text-lg font-medium"
            placeholder="Category Name"
            value={category.name}
            onChange={(e) => handleCategoryChange(i, e.target.value)}
          />

          {category.subcategories.map((sub, j) => (
            <input
              key={j}
              type="text"
              className="border px-2 py-1 rounded w-full mb-2 text-sm"
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

export default IndustryForm1;
