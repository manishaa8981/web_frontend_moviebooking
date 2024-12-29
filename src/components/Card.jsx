// // card.jsx
// import React from "react";

// export const Card = ({ children, className, ...props }) => (
//   <div className={`bg-white shadow rounded p-4 ${className}`} {...props}>
//     {children}
//   </div>
// );

// export const CardContent = ({ children, className, ...props }) => (
//   <div className={`space-y-2 ${className}`} {...props}>
//     {children}
//   </div>
// );
const Card = ({ title, children }) => {
  return (
    <div className="p-4 border border-gray-200 rounded-lg shadow-sm bg-white">
      {title && (
        <h3 className="text-lg font-semibold text-blue-800 mb-3">{title}</h3>
      )}
      {children}
    </div>
  );
};
