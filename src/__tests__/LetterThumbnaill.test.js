import React from 'react';
import { render, screen } from "@testing-library/react";
import LetterThumbnail from "../components/layouts/LetterThumbnaill";
import "@testing-library/jest-dom";

it("should render LetterThumbnail", () => {
  render(<LetterThumbnail text="Hi"  backgroundColor="#3498db"/>);

  const name = screen.getByText("H");

  expect(name).toBeInTheDocument();
});


