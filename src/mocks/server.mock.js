import { setupServer } from "msw/node";
import { handlers } from "./handler.mock";

export const mockServer = setupServer(...handlers);
