import { customAlphabet } from "nanoid";

const genrateUniqueString = (length) => {
  const nanoid = customAlphabet("12345asdfgh", length || 13);
  return nanoid();
};

export default genrateUniqueString;
