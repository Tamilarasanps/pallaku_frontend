import React, { useState } from "react";

// 1. Glassmorphism Spinner with Gradient
const GlassmorphismSpinner = () => (
  <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-cyan-500">
    <div className="relative">
      {/* Backdrop blur effect */}
      <div className="absolute inset-0 bg-white/20 backdrop-blur-sm rounded-full w-24 h-24 animate-pulse"></div>

      {/* Main spinner */}
      <div className="relative w-24 h-24 rounded-full border-4 border-white/30 border-t-white animate-spin">
        <div className="absolute inset-2 rounded-full border-2 border-white/20 border-b-white/80 animate-spin animate-reverse"></div>
      </div>

      {/* Center dot */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full animate-ping"></div>
    </div>

    {/* Loading text */}
    <div className="absolute mt-32">
      <p className="text-white text-lg font-medium animate-pulse">
        Loading your journey...
      </p>
    </div>
  </div>
);

// 2. Morphing Shapes Loader
const MorphingLoader = () => (
  <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-[#cfa602] via-[#] to-[#ff1d58] space-y-6">
    {/* Loader section */}
    <div className="relative flex items-center justify-center">
      {/* Morphing shape */}
      <div className="w-16 h-16 bg-gradient-to-r from-[#ff1d58] to-[#ff6b81] rounded-full animate-bounce relative">
        <div className="absolute inset-0 bg-gradient-to-r from-[#ff6b81] to-[#ff1d58] rounded-full animate-ping opacity-75"></div>
        <div className="absolute inset-2 bg-gradient-to-r from-[#ffefba] to-[#ff1d58] rounded-full animate-pulse"></div>
      </div>

      {/* Orbiting dots */}
      <div className="absolute inset-0 animate-spin">
        <div className="absolute -top-2 left-1/2 w-3 h-3 bg-[#ff1d58] rounded-full transform -translate-x-1/2 animate-pulse"></div>
        <div className="absolute top-1/2 -right-2 w-2 h-2 bg-[#ff6b81] rounded-full transform -translate-y-1/2 animate-pulse delay-75"></div>
        <div className="absolute -bottom-2 left-1/2 w-3 h-3 bg-[#ffd6e0] rounded-full transform -translate-x-1/2 animate-pulse delay-150"></div>
        <div className="absolute top-1/2 -left-2 w-2 h-2 bg-[#ffefba] rounded-full transform -translate-y-1/2 animate-pulse delay-300"></div>
      </div>
    </div>

    {/* Three bouncing dots below loader */}
    <div className="flex space-x-1 mt-4">
      <div className="w-2 h-2 bg-[#ff1d58] rounded-full animate-bounce"></div>
      <div className="w-2 h-2 bg-[#ff6b81] rounded-full animate-bounce delay-100"></div>
      <div className="w-2 h-2 bg-[#ffd6e0] rounded-full animate-bounce delay-200"></div>
    </div>

    {/* Title text with brand color gradient */}
    <h3 className="text-3xl font-bold text-center bg-[linear-gradient(135deg,#ff1d58,#ff6b81,#ffd6e0)] bg-clip-text text-transparent mt-4">
      Shree Pallak Cabs
    </h3>
  </div>
);

// 3. Car Journey Loader (Perfect for Travel App)
const CarJourneyLoader = () => (
  <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500">
    <div className="relative">
      {/* Road */}
      <div className="w-64 h-2 bg-gray-600 rounded-full relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-50 animate-pulse"></div>
        {/* Moving road lines */}
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="animate-marquee flex space-x-4 h-full items-center">
            <div className="w-8 h-0.5 bg-white opacity-60"></div>
            <div className="w-8 h-0.5 bg-white opacity-60"></div>
            <div className="w-8 h-0.5 bg-white opacity-60"></div>
            <div className="w-8 h-0.5 bg-white opacity-60"></div>
            <div className="w-8 h-0.5 bg-white opacity-60"></div>
            <div className="w-8 h-0.5 bg-white opacity-60"></div>
            <div className="w-8 h-0.5 bg-white opacity-60"></div>
            <div className="w-8 h-0.5 bg-white opacity-60"></div>
          </div>
        </div>
      </div>

      {/* Car */}
      <div className="absolute -top-6 left-4 animate-bounce">
        <div className="relative">
          {/* Car body */}
          <div className="w-12 h-6 bg-gradient-to-r from-red-500 to-red-600 rounded-lg shadow-lg">
            {/* Windows */}
            <div className="absolute top-1 left-1 w-4 h-2 bg-blue-200 rounded-sm opacity-80"></div>
            <div className="absolute top-1 right-1 w-4 h-2 bg-blue-200 rounded-sm opacity-80"></div>
          </div>

          {/* Wheels */}
          <div className="absolute -bottom-1 left-1 w-3 h-3 bg-gray-800 rounded-full animate-spin"></div>
          <div className="absolute -bottom-1 right-1 w-3 h-3 bg-gray-800 rounded-full animate-spin"></div>
        </div>
      </div>

      {/* Destination pin */}
      <div className="absolute -top-8 right-0 animate-pulse">
        <div className="w-6 h-6 bg-green-500 rounded-full relative">
          <div className="absolute inset-1 bg-white rounded-full"></div>
          <div className="absolute top-6 left-1/2 w-0 h-0 border-l-3 border-r-3 border-t-4 border-transparent border-t-green-500 transform -translate-x-1/2"></div>
        </div>
      </div>
    </div>

    {/* Loading text with typing effect */}
    <div className="absolute mt-32 text-center">
      <p className="text-white text-xl font-bold animate-pulse">
        Planning your perfect trip
      </p>
      <div className="flex justify-center space-x-1 mt-2">
        <div className="w-2 h-2 bg-white rounded-full animate-bounce"></div>
        <div className="w-2 h-2 bg-white rounded-full animate-bounce delay-100"></div>
        <div className="w-2 h-2 bg-white rounded-full animate-bounce delay-200"></div>
      </div>
    </div>
  </div>
);

// 4. Modern Minimal Spinner
const MinimalSpinner = () => (
  <div className="flex items-center justify-center min-h-screen bg-white">
    <div className="relative">
      {/* Outer ring */}
      <div className="w-20 h-20 border-4 border-gray-200 rounded-full animate-pulse"></div>

      {/* Inner spinning ring */}
      <div className="absolute inset-0 w-20 h-20 border-4 border-transparent border-t-blue-500 border-r-blue-500 rounded-full animate-spin"></div>

      {/* Center logo/icon area */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg animate-pulse shadow-lg"></div>
      </div>
    </div>

    <div className="absolute mt-32">
      <p className="text-gray-700 text-lg font-medium">Just a moment...</p>
    </div>
  </div>
);

// 5. Neon Glow Loader
const NeonLoader = () => (
  <div className="flex items-center justify-center min-h-screen bg-black">
    <div className="relative">
      {/* Neon ring */}
      <div className="w-24 h-24 border-4 border-transparent border-t-cyan-400 border-r-cyan-400 rounded-full animate-spin shadow-2xl shadow-cyan-400/50">
        <div className="absolute inset-2 border-2 border-transparent border-b-pink-400 border-l-pink-400 rounded-full animate-spin animate-reverse shadow-lg shadow-pink-400/50"></div>
      </div>

      {/* Pulsing center */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-4 h-4 bg-white rounded-full animate-ping shadow-lg shadow-white/50"></div>
      </div>

      {/* Floating particles */}
      <div className="absolute -inset-8">
        <div className="absolute top-0 left-1/2 w-1 h-1 bg-cyan-400 rounded-full animate-ping"></div>
        <div className="absolute bottom-0 right-1/4 w-1 h-1 bg-pink-400 rounded-full animate-ping delay-75"></div>
        <div className="absolute top-1/3 right-0 w-1 h-1 bg-yellow-400 rounded-full animate-ping delay-150"></div>
        <div className="absolute bottom-1/3 left-0 w-1 h-1 bg-green-400 rounded-full animate-ping delay-300"></div>
      </div>
    </div>

    <div className="absolute mt-32 text-center">
      <p className="text-white text-xl font-light tracking-wider animate-pulse">
        LOADING
      </p>
      <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent mt-2 animate-pulse"></div>
    </div>
  </div>
);

// Demo component to showcase all loaders
export default function LoadingSpinnersDemo() {
  const [currentLoader, setCurrentLoader] = useState(0);

  const loaders = [
    { name: "Glassmorphism", component: <GlassmorphismSpinner /> },
    { name: "Morphing Shapes", component: <MorphingLoader /> },
    { name: "Car Journey", component: <CarJourneyLoader /> },
    { name: "Minimal", component: <MinimalSpinner /> },
    { name: "Neon Glow", component: <NeonLoader /> },
  ];

  return (
    <div className="relative">
      {/* Navigation */}
      <div className="fixed top-4 left-4 z-50 bg-white/90 backdrop-blur-sm rounded-lg p-4 shadow-lg">
        <h3 className="text-sm font-semibold mb-2 text-gray-700">
          Choose Loader:
        </h3>
        <div className="flex flex-col space-y-2">
          {loaders.map((loader, index) => (
            <button
              key={index}
              onClick={() => setCurrentLoader(index)}
              className={`text-xs px-3 py-1 rounded-full transition-all ${
                currentLoader === index
                  ? "bg-blue-500 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {loader.name}
            </button>
          ))}
        </div>
      </div>

      {/* Current loader */}
      {loaders[currentLoader].component}
    </div>
  );
}

// Individual loader components for easy import
export {
  GlassmorphismSpinner,
  MorphingLoader,
  CarJourneyLoader,
  MinimalSpinner,
  NeonLoader,
};
