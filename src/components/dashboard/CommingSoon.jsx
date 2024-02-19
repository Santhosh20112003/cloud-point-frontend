import React, { useState } from "react";

function CommingSoon() {
  const [showPopover, setShowPopover] = useState(true);

  return (
    <div className="relative">
      <div className="fixed inset-0 right-0 top-0 w-full flex items-center justify-center z-50 overflow-x-hidden overflow-y-auto">
        <div className="min-w-[250px] w-[10%] h-full">
          
        </div>
        <div className="w-[90%] h-full flex items-center justify-center fixed right-0 backdrop-brightness-75 backdrop-blur-sm">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-4xl font-semibold text-center">Your Dashboard Content Goes Here</h2>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CommingSoon;