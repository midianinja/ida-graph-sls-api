export default `
  type User {
    id: ID
    name: String
    last_name: String
    profile_image: Image
  }

  input UserInput {
    id: ID
    name: String
    last_name: String
  }
`;
