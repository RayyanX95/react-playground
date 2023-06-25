// import faker from "faker";

import { randUser, randCreditCard } from "@ngneat/falso";

const user = {
  ...randUser(3),
  ...randCreditCard(),
};

console.log("user", user);

export default user;
