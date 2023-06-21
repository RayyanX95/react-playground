import { render, screen } from "@testing-library/react";
import Vote from "./vote";
import userEvent from "@testing-library/user-event";

test("should thumb up or down once", () => {
  render(<Vote totalGlobalLikes={10} />);

  const ThumbUpBtn = screen.getByRole("button", { name: "thumbs up" });
  const ThumbDownBtn = screen.getByRole("button", { name: "thumbs down" });

  userEvent.click(ThumbUpBtn); // totalGlobalLikes: 10 => 11
  // userEvent.click(ThumbUpBtn); // totalGlobalLikes: no changes => 11
  userEvent.click(ThumbDownBtn); // totalGlobalLikes: 11 => 10
  userEvent.click(ThumbDownBtn); // totalGlobalLikes: 10 => 9
  // userEvent.click(ThumbDownBtn); // totalGlobalLikes:no changes => 9

  // expect the total likes still the same: 10
  expect(screen.getByRole("heading", { name: 9 }));
});
