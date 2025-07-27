// Basicallty will call the api here using axios and return the data
// Abhi ke liye, we are using static data
// Later, we will replace this with actual API calls

const flaggedMessagesData = [
  {
    employee_id: "emp001",
    text: "Sharing client credit card info here...",
    risk_score: 5,
    highlights: ["credit card info"],
    timestamp: "2025-06-23T14:22:10Z"
  },
  {
    employee_id: "emp003",
    text: "Sharing client credit card info here...",
    risk_score: 5,
    highlights: ["credit card info"],
    timestamp: "2025-06-24T14:22:10Z"
  },
  {
    employee_id: "emp004",
    text: "Sharing client credit card info here...",
    risk_score: 5,
    highlights: ["credit card info"],
    timestamp: "2025-06-22T14:22:10Z"
  },
  {
    employee_id: "emp002",
    text: "My password is Password@123",
    risk_score: 5,
    highlights: ["password"],
    timestamp: "2025-06-24T10:15:00Z"
  }
];

export default flaggedMessagesData;
