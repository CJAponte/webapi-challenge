const data = [
  {
    name: "Gary",
    id: 1,
    chores: [
      {
        id: 1,
        description: "wash the car",
        notes: "wax on, wax off",
        completed: true,
        assignedTo: 1
      },
      {
        id: 2,
        description: "water the plants",
        notes: "drowning is bad",
        completed: false,
        assignedTo: 1
      }
    ]
  },

  {
    name: "James",
    id: 2,
    chores: [
      {
        id: 1,
        description: "take out the trash",
        notes: "upstairs too",
        completed: false,
        assignedTo: 2
      },
      {
        id: 2,
        description: "clean bedroom",
        notes: "dont hide everything under the bed",
        completed: true,
        assignedTo: 2
      }
    ]
  }
];

module.exports = data