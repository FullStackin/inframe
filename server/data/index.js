import mongoose from "mongoose";

const userIds = [
  new mongoose.Types.ObjectId(),
  new mongoose.Types.ObjectId(),
  new mongoose.Types.ObjectId(),
  new mongoose.Types.ObjectId(),
  new mongoose.Types.ObjectId(),
  new mongoose.Types.ObjectId(),
  new mongoose.Types.ObjectId(),
  new mongoose.Types.ObjectId(),
];

export const users = [
  {
    _id: userIds[0],
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    password: "$2b$10$dsasdgsagasda//G9JxQ4bQ8KXf4OAIe/X/AK9skyWUy",
    picturePath: "p11.png",
    friends: [],
    location: "San Francisco, CA",
    occupation: "Software Developer",
    viewedProfile: 12345,
    impressions: 67890,
    createdAt: 1609459200,
    updatedAt: 1609459200,
    __v: 0,
  },
  {
    _id: userIds[1],
    firstName: "Michael",
    lastName: "Jones",
    email: "M.Jones@example.com",
    password: "$!FEAS@!O)_IDJda//G9JxQ4bQ8KXf4OAIe/X/AK9skyWUy",
    picturePath: "p3.png",
    friends: [],
    location: "New York, NY",
    occupation: "Graphic Designer",
    viewedProfile: 54321,
    impressions: 98765,
    createdAt: 1620384000,
    updatedAt: 1620384000,
    __v: 0,
  },
  {
    _id: userIds[2],
    firstName: "Hakeem",
    lastName: "Dubai",
    email: "D.Hakeem@example.com",
    password: "da39a3ee5e6b4b0d3255bfef95601890afd80709",
    picturePath: "p6.png",
    friends: [],
    location: "Toronto, ON",
    occupation: "Entrepreneur",
    viewedProfile: 87654,
    impressions: 34567,
    createdAt: 1634620800,
    updatedAt: 1634620800,
    __v: 0,
  },
  {
    _id: userIds[3],
    firstName: "Eva",
    lastName: "Green",
    email: "eva.green@example.com",
    password: "$2b$10$dsasdgsagasda//G9JxQ4bQ8KXf4OAIe/X/AK9skyWUy",
    picturePath: "p5.png",
    friends: [],
    location: "Athens, GR",
    occupation: "Teacher",
    viewedProfile: 13579,
    impressions: 24680,
    createdAt: 1640995200,
    updatedAt: 1640995200,
    __v: 0,
  },
  {
    _id: userIds[4],
    firstName: "Grace",
    lastName: "Smith",
    email: "grace.smith@example.com",
    password: "$2b$10$dsasdgsagasda//G9JxQ4bQ8KXf4OAIe/X/AK9skyWUy",
    picturePath: "p2.png",
    friends: [],
    location: "Salt Lake City, UT",
    occupation: "Developer",
    viewedProfile: 24680,
    impressions: 13579,
    createdAt: 1652208000,
    updatedAt: 1652208000,
    __v: 0,
  },
  {
    _id: userIds[5],
    firstName: "Khabib",
    lastName: "MountainMan",
    email: "Khabib.M@example.com",
    password: "$2b$10$dsasdgsagasda//G9JxQ4bQ8KXf4OAIe/X/AK9skyWUy",
    picturePath: "p7.png",
    friends: [],
    location: "Los Angeles, CA",
    occupation: "Journalist",
    viewedProfile: 97531,
    impressions: 86420,
    createdAt: 1663564800,
    updatedAt: 1663564800,
    __v: 0,
  },
  {
    _id: userIds[6],
    firstName: "Olivia",
    lastName: "Parker",
    email: "olivia.parker@example.com",
    password: "$2b$10$dsasdgsagasda//G9JxQ4bQ8KXf4OAIe/X/AK9skyWUy",
    picturePath: "p8.png",
    friends: [],
    location: "Chicago, IL",
    occupation: "Nurse",
    viewedProfile: 12345,
    impressions: 67890,
    createdAt: 1675033600,
    updatedAt: 1675033600,
    __v: 0,
  },
  {
    _id: userIds[7],
    firstName: "Donna",
    lastName: "Paulson",
    email: "Dpaulson@gmail.com",
    password: "$2b$10$dsasdgsagasda//G9JxQ4bQ8KXf4OAIe/X/AK9skyWUy",
    picturePath: "p1.jpg",
    friends: [],
    location: "New York, Manhattan",
    occupation: "Executive Secretary",
    viewedProfile: 19420,
    impressions: 82970,
    createdAt: 1369908044,
    updatedAt: 1359322268,
    __v: 0,
  },
];

export const posts = [
  {
    _id: new mongoose.Types.ObjectId(),
    userId: userIds[1],
    firstName: "Michael",
    lastName: "Jones",
    location: "New York, NY",
    description: "Pool side breakfast date!",
    picturePath: "post1.png",
    userPicturePath: "p3.png",
    likes: new Map([
      [userIds[0], true],
      [userIds[2], true],
      [userIds[3], true],
      [userIds[4], true],
    ]),
    comments: [
      {
        userId: userIds[0],
        comment: "OMG. JELLY!",
      },
      {
        userId: userIds[1],
        comment: "Wow thats beautiful, where is this?",
      },
      {
        userId: userIds[2],
        comment: "Make sure to wait 30 min before swimming!",
      },
    ],
  },
  {
    _id: new mongoose.Types.ObjectId(),
    userId: userIds[3],
    firstName: "Eva",
    lastName: "Green",
    location: "San Jose, CA",
    description: "Mendocino Farms is has the best salads around",
    picturePath: "post2.png",
    userPicturePath: "p5.png",
    likes: new Map([
      [userIds[6], true],
      [userIds[4], true],
      [userIds[1], true],
      [userIds[2], true],
    ]),
    comments: [
      {
        userId: userIds[3],
        comment: "AVOCADO!!!",
      },
      {
        userId: userIds[4],
        comment: "OOO next time i want to go, is this in Santana Row?!",
      },
      {
        userId: userIds[5],
        comment: "I like the Chicken Salad more.",
      },
      {
        userId: userIds[6],
        comment: "I prefer Ike's Next door, lol.",
      },
    ],
  },
  {
    _id: new mongoose.Types.ObjectId(),
    userId: userIds[4],
    firstName: "Grace",
    lastName: "Smith",
    location: "Salt Lake City, UT",
    description: "Star Wars Rave - Darth Vader raving hard! ",
    picturePath: "post3.png",
    userPicturePath: "p2.png",

    likes: new Map([
      [userIds[1], true],
      [userIds[6], true],
      [userIds[3], true],
      [userIds[5], true],
    ]),
    comments: [
      {
        userId: userIds[1],
        comment: "Luke, I am your father!",
      },
      {
        userId: userIds[0],
        comment: "WHERES YODA THO!",
      },
      {
        userId: userIds[2],
        comment: "This must of been lit!",
      },
      {
        userId: userIds[3],
        comment: "Oooo Girl! Im definitely not gonna skip next time",
      },
      {
        userId: userIds[4],
        comment: "WELCOME TO THE DARK SIDE!",
      },
    ],
  },
  {
    _id: new mongoose.Types.ObjectId(),
    userId: userIds[5],
    firstName: "Khabib",
    lastName: "MountainMan",
    location: "Los Angeles, CA",
    description: "The hike of a life time!",
    picturePath: "post7.png",
    userPicturePath: "p7.png",

    likes: new Map([
      [userIds[1], true],
      [userIds[6], true],
      [userIds[3], true],
    ]),
    comments: [
      {
        userId: userIds[5],
        comment: "This is the most magical image ive seen!",
      },
      {
        userId: userIds[6],
        comment: "WAIT HOW!!!, Who took the pic!",
      },
      {
        userId: userIds[0],
        comment: "That sunset is gorgeous.",
      },
      {
        userId: userIds[1],
        comment: "I can do that in my sleep",
      },
      {
        userId: userIds[2],
        comment: "Climin aint easy!",
      },
      {
        userId: userIds[3],
        comment: "I'd prob look at the mountain and turn back around lol.",
      },
    ],
  },
  {
    _id: new mongoose.Types.ObjectId(),
    userId: userIds[6],
    firstName: "Olivia",
    lastName: "Parker",
    location: "Chicago, IL",
    description:
      "Dancing to the rhythm of waves and beats – where music meets the magic of the water! 🌊🎶 #ElectrifyingConcert",
    picturePath: "post5.png",
    userPicturePath: "p8.png",

    likes: new Map([
      [userIds[1], true],
      [userIds[3], true],
      [userIds[5], true],
      [userIds[0], true],
    ]),
    comments: [
      {
        userId: userIds[4],
        comment:
          "The concert by the water with fireworks is an absolute thrill! The energy is incredible! 🔥🎇",
      },
      {
        userId: userIds[5],
        comment:
          "Absolutely mesmerized by the lively concert and those breathtaking fireworks! 🌟🎆",
      },
      {
        userId: userIds[6],
        comment:
          "This concert is pure excitement, especially with those vibrant fireworks lighting up the night! 🕺🌊",
      },
      {
        userId: userIds[7],
        comment:
          "Ditching boredom for an unforgettable night of music, water, and electrifying fireworks! 🎶🌅",
      },
      {
        userId: userIds[0],
        comment:
          "The concert's energy, combined with the dazzling fireworks, creates an unforgettable atmosphere! 🔥🎵",
      },
    ],
  },
  {
    _id: new mongoose.Types.ObjectId(),
    userId: userIds[7],
    firstName: "Donna",
    lastName: "Paulson",
    location: "San Francisco, CA",
    description:
      "Lost in the serene embrace of snow-kissed mountains, where silence speaks louder than words. 🏔️ #WinterWonderland",
    picturePath: "post6.png",
    userPicturePath: "p1.png",

    likes: new Map([
      [userIds[1], true],
      [userIds[2], true],
    ]),
    comments: [
      {
        userId: userIds[1],
        comment: "Can I get a sled and hit those slopes? 🏂",
      },
      {
        userId: userIds[2],
        comment: "I'm moving to the mountains ASAP! 🏞️",
      },
      {
        userId: userIds[3],
        comment: "Books or snowball fights? The choice is obvious. ⛄😁",
      },
      {
        userId: userIds[4],
        comment: "Start building a snowman! ⛄",
      },
      {
        userId: userIds[5],
        comment: "Forget the stress, embrace the chill vibes of nature! 🌲",
      },
    ],
  },
];
