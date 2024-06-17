"use client";

import React, { useState, useCallback } from "react";

const DEFAULT_TEXT = "GO TO APP";
const HOVER_TEXT = "SOON";

const ActionButton = () => {
  const [text, setText] = useState<string>(DEFAULT_TEXT);

  const handleMouseEnter = useCallback(() => {
    setText(HOVER_TEXT);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setText(DEFAULT_TEXT);
  }, []);

  return (
    <button
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="bg-[#C72626] rounded-3xl py-4 w-full max-w-[352px] text-center text-[20px] m:text-[28px] font-semibold hover:scale-[1.03] transition-all"
    >
      {text}
    </button>
  );
};

export default ActionButton;
