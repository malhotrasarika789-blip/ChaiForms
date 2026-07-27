const seedForms = [
  {
    id: 1,
    title: "Customer Feedback Form",
    description: "Help us improve our products and services.",
    visibility: "PUBLIC",
    status: "Published",
    theme: "Sunset 🌅",
    views: 120,
    questions: [
      {
        id: 1,
        type: "Short Text",
        title: "What do you like the most?",
        required: true,
      },
      {
        id: 2,
        type: "Rating",
        title: "Rate our service",
        required: true,
      },
    ],
    responses: [
      {
        question: "What do you like the most?",
        answer: "Fast delivery",
      },
      {
        question: "Rate our service",
        answer: "5",
      },
    ],
  },

  {
    id: 2,
    title: "Event Registration",
    description: "Register for our annual tech event.",
    visibility: "PUBLIC",
    status: "Published",
    theme: "Ocean 🌊",
    views: 240,
    questions: [
      {
        id: 1,
        type: "Short Text",
        title: "Full Name",
        required: true,
      },
      {
        id: 2,
        type: "Email",
        title: "Email",
        required: true,
      },
    ],
    responses: [
      {
        question: "Full Name",
        answer: "Rahul",
      },
      {
        question: "Email",
        answer: "rahul@gmail.com",
      },
    ],
  },

  {
    id: 3,
    title: "Movie Review",
    description: "Share your thoughts about the latest movie.",
    visibility: "UNLISTED",
    status: "Draft",
    theme: "Galaxy 🌌",
    views: 70,
    questions: [
      {
        id: 1,
        type: "Paragraph",
        title: "Write your review",
        required: true,
      },
    ],
    responses: [],
  },

  {
    id: 4,
    title: "Developer Survey",
    description: "Survey for software developers.",
    visibility: "PUBLIC",
    status: "Published",
    theme: "Forest 🌲",
    views: 380,
    questions: [
      {
        id: 1,
        type: "Short Text",
        title: "Favorite Language",
        required: true,
      },
      {
        id: 2,
        type: "Short Text",
        title: "Years of Experience",
        required: true,
      },
    ],
    responses: [
      {
        question: "Favorite Language",
        answer: "TypeScript",
      },
      {
        question: "Years of Experience",
        answer: "3",
      },
      {
        question: "Favorite Language",
        answer: "JavaScript",
      },
    ],
  },

  {
    id: 5,
    title: "Startup Research",
    description: "Understand startup founders' challenges.",
    visibility: "PUBLIC",
    status: "Published",
    theme: "Minimal ⚪",
    views: 510,
    questions: [
      {
        id: 1,
        type: "Paragraph",
        title: "Biggest challenge?",
        required: true,
      },
    ],
    responses: [
      {
        question: "Biggest challenge?",
        answer: "Funding",
      },
      {
        question: "Biggest challenge?",
        answer: "Hiring",
      },
    ],
  },
];