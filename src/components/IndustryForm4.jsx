import React, { useState } from "react";

const IndustryForm4 = () => {
  const [industry, setIndustry] = useState("");
  const [categories, setCategories] = useState([]);
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(null);

  const addCategory = () => {
    setCategories([...categories, { name: "", subcategories: [] }]);
    setSelectedCategoryIndex(categories.length);
  };

  const handleCategoryChange = (index, value) => {
    const updated = [...categories];
    updated[index].name = value;
    setCategories(updated);
  };

  const addSubcategory = (index) => {
    const updated = [...categories];
    updated[index].subcategories.push("");
    setCategories(updated);
  };

  const handleSubChange = (catIdx, subIdx, value) => {
    const updated = [...categories];
    updated[catIdx].subcategories[subIdx] = value;
    setCategories(updated);
  };

  return (
    <div className="max-w-xl mx-auto p-4 space-y-6">
      {/* Step 1: Industry Name */}
      <div>
        <label className="block font-semibold">Step 1: Industry Name</label>
        <input
          className="w-full border px-3 py-2 rounded mt-1"
          placeholder="Enter industry"
          value={industry}
          onChange={(e) => setIndustry(e.target.value)}
        />
      </div>

      {/* Step 2: Add Categories */}
      <div>
        <label className="block font-semibold">Step 2: Categories</label>
        {categories.map((cat, i) => (
          <div
            key={i}
            className="mt-3 p-3 border rounded bg-gray-50 space-y-2"
          >
            <input
              className="w-full border px-2 py-1 rounded"
              placeholder="Category name"
              value={cat.name}
              onChange={(e) => handleCategoryChange(i, e.target.value)}
              onClick={() => setSelectedCategoryIndex(i)}
            />

            {selectedCategoryIndex === i && (
              <>
                {cat.subcategories.map((sub, j) => (
                  <input
                    key={j}
                    className="w-full border px-2 py-1 rounded text-sm"
                    placeholder={`Subcategory ${j + 1}`}
                    value={sub}
                    onChange={(e) =>
                      handleSubChange(i, j, e.target.value)
                    }
                  />
                ))}

                <button
                  onClick={() => addSubcategory(i)}
                  className="text-blue-600 text-sm mt-1"
                >
                  + Add Subcategory
                </button>
              </>
            )}
          </div>
        ))}

        <button
          onClick={addCategory}
          className="bg-purple-600 text-white px-4 py-2 mt-3 rounded"
        >
          + Add Category
        </button>
      </div>
    </div>
  );
};

export default IndustryForm4;
