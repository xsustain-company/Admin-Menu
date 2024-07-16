// import images
import avatar1 from "../../assets/images/users/avatar-1.jpg";
import avatar2 from "../../assets/images/users/avatar-2.jpg";
import avatar3 from "../../assets/images/users/avatar-3.jpg";
import avatar4 from "../../assets/images/users/avatar-4.jpg";
import avatar5 from "../../assets/images/users/avatar-5.jpg";
import avatar6 from "../../assets/images/users/avatar-6.jpg";
import avatar7 from "../../assets/images/users/avatar-7.jpg";
import avatar10 from "../../assets/images/users/avatar-10.jpg";
import userImage from "../../assets/images/users/multi-user.jpg";
import img1 from "assets/images/small/img-1.jpg";
import img2 from "assets/images/small/img-2.jpg";

const chatMessage = [
  {
    direactContact: [
      {
        id: 1,
        roomId: 1,
        status: "Online",
        name: "Lisa Parker",
        image: avatar2,
        number: "+(256) 2451 8974",
        email: "lisaparker@gmail.com",
        location: "California, USA",
      },
      {
        id: 2,
        roomId: 2,
        status: "Online",
        name: "Frank Thomas",
        image: avatar3,
        number: "+(256) 2451 8974",
        email: "lisaparker@gmail.com",
        location: "California, USA",
        badge: 8,
      },
      {
        id: 3,
        roomId: 3,
        status: "Offline",
        name: "Clifford Taylor",
        bgColor: "primary",
        number: "+(256) 2451 8974",
        email: "lisaparker@gmail.com",
        location: "California, USA",
      },
      {
        id: 4,
        roomId: 4,
        status: "Online",
        name: "Janette Caster",
        image: avatar4,
        number: "+(256) 2451 8974",
        email: "lisaparker@gmail.com",
        location: "California, USA",
      },
      {
        id: 5,
        roomId: 5,
        status: "Online",
        name: "Sarah Beattie",
        image: avatar5,
        number: "+(256) 2451 8974",
        email: "lisaparker@gmail.com",
        location: "California, USA",
        badge: 5,
      },
      {
        id: 6,
        roomId: 6,
        status: "Offline",
        name: "Nellie Cornett",
        image: avatar6,
        number: "+(256) 2451 8974",
        email: "lisaparker@gmail.com",
        location: "California, USA",
        badge: 2,
      },
      {
        id: 7,
        roomId: 7,
        status: "Online",
        name: "Chris Kiernan",
        bgColor: "primary",
        number: "+(256) 2451 8974",
        email: "lisaparker@gmail.com",
        location: "California, USA",
      },
      {
        id: 8,
        roomId: 8,
        status: "Offline",
        name: "Edith Evans",
        bgColor: "primary",
        number: "+(256) 2451 8974",
        email: "lisaparker@gmail.com",
        location: "California, USA",
      },
      {
        id: 9,
        roomId: 9,
        status: "Offline",
        name: "Joseph Siegel",
        image: avatar7,
        number: "+(256) 2451 8974",
        email: "lisaparker@gmail.com",
        location: "California, USA",
      },
    ]
  },
  {
    channelsList: [
      {
        id: 1,
        roomId: 10,
        name: "Landing Design",
        unReadMessage: 7,
        image: userImage,
        isChannelsList: true,
        status: null
      },
      {
        id: 2,
        roomId: 11,
        name: "General",
        image: userImage,
        isChannelsList: true,
        status: null
      },
      {
        id: 3,
        roomId: 12,
        name: "Project Tasks",
        unReadMessage: 3,
        image: userImage,
        isChannelsList: true,
        status: null
      },
      {
        id: 4,
        roomId: 13,
        name: "Meeting",
        image: userImage,
        isChannelsList: true,
        status: null
      },
      {
        id: 5,
        roomId: 14,
        name: "Reporting",
        image: userImage,
        isChannelsList: true,
        status: null
      },
    ]
  }
]

const messages = [
  //direactContact
  {
    id: 1,
    roomId: 1,
    sender: "Lisa Parker",
    createdAt: "09:07 am",
    usermessages: [
      { id: 1, from_id: 2, to_id: 1, msg: "Good morning 😊", isImages: false, has_images: [], datetime: "09:07 am" },
      { id: 2, from_id: 1, to_id: 2, msg: "Good morning, How are you? What about our next meeting?", has_images: [], datetime: "09:08 am" },
      { id: 3, from_id: 2, to_id: 1, msg: "Hey, I'm going to meet a friend of mine at the department store. I have to buy some presents for my parents 🎁.", isImages: false, has_images: [], datetime: "09:11 am" },
      { id: 4, from_id: 2, to_id: 1, msg: "Yeah everything is fine. Our next meeting tomorrow at 10.00 AM", isImages: false, has_images: [], datetime: "10:30 am" },
      { id: 5, from_id: 1, to_id: 2, msg: "Yeah everything is fine. Our next meeting tomorrow at 10.00 AM", isImages: false, has_images: [], datetime: "10:30 am" },
      { id: 6, from_id: 2, to_id: 1, msg: null, isImages: true, has_images: [{ id: 1, image: img1 }, { id: 2, image: img2 }], datetime: "10:30 am" },
    ]
  },
  {
    id: 2,
    roomId: 2,
    sender: "Frank Thomas",
    createdAt: "09:40 am",
    usermessages: [
      { id: 1, from_id: 2, to_id: 1, msg: "Good morning 😊", isImages: false, has_images: [], datetime: "09:07 am" },
      { id: 2, from_id: 1, to_id: 2, msg: "Good morning, How are you? What about our next meeting?", isImages: false, has_images: [], datetime: "09:08 am" },
      { id: 3, from_id: 2, to_id: 1, msg: "Hey, I'm going to meet a friend of mine at the department store. I have to buy some presents for my parents 🎁.", has_images: [], datetime: "09:11 am" },
      { id: 4, from_id: 2, to_id: 1, msg: "Yeah everything is fine", isImages: false, has_images: [], datetime: "10:30 am" },
      { id: 5, from_id: 1, to_id: 2, msg: "Our next meeting tomorrow at 10.00 AM", isImages: false, has_images: [], datetime: "10:30 am" },
      { id: 6, from_id: 2, to_id: 2, msg: "Ok", isImages: false, has_images: [], datetime: "10:30 am" },
      { id: 7, from_id: 1, to_id: 1, msg: "Hey, I'm going to meet a friend. I have to buy some presents for my parents 🎁.", isImages: false, has_images: [], datetime: "09:11 am" },
      { id: 8, from_id: 2, to_id: 1, msg: "Yeah everything is fine", isImages: false, has_images: [], datetime: "10:30 am" },
    ]
  },
  {
    id: 3,
    roomId: 3,
    sender: "Clifford Taylor",
    createdAt: "06: 27 am",
    usermessages: [
      { id: 1, from_id: 2, to_id: 1, msg: "Hey, I'm going to meet a friend of mine at the department store. I have to buy some presents for my parents 🎁.", isImages: false, has_images: [], datetime: "09:11 am" },
      { id: 2, from_id: 2, to_id: 1, msg: "Yeah everything is fine. Our next meeting tomorrow at 10.00 AM", isImages: false, has_images: [], datetime: "10:30 am" },
      { id: 3, from_id: 1, to_id: 2, msg: "Yeah everything is fine. Our next meeting tomorrow at 10.00 AM", isImages: false, has_images: [], datetime: "10:30 am" },
    ]
  },
  {
    id: 4,
    roomId: 4,
    sender: "Janette Caster",
    createdAt: "01:07 am",
    usermessages: [
      { id: 1, from_id: 2, to_id: 1, msg: "Good morning 😊", isImages: false, has_images: [], datetime: "09:07 am" },
      { id: 2, from_id: 1, to_id: 2, msg: "Good morning, How are you? What about our next meeting?", isImages: false, has_images: [], datetime: "09:08 am" },
    ]
  },

  {
    id: 5,
    roomId: 5,
    sender: "Sarah Beattie",
    createdAt: "09:05 am",
    usermessages: [
      { id: 1, from_id: 2, to_id: 1, msg: "Good morning 😊", isImages: false, has_images: [], datetime: "09:07 am" },
      { id: 2, from_id: 1, to_id: 2, msg: "Good morning, How are you? What about our next meeting?", isImages: false, has_images: [], datetime: "09:08 am" },
      { id: 3, from_id: 2, to_id: 1, msg: "Hey, I'm going to meet a friend of mine at the department store. I have to buy some presents for my parents 🎁.", isImages: false, has_images: [], datetime: "09:11 am" },
      { id: 4, from_id: 2, to_id: 1, msg: "Yeah everything is fine. Our next meeting tomorrow at 10.00 AM", isImages: false, has_images: [], datetime: "10:30 am" },
      { id: 5, from_id: 1, to_id: 2, msg: "Yeah everything is fine. Our next meeting tomorrow at 10.00 AM", isImages: false, has_images: [], datetime: "10:30 am" },
    ]
  },
  {
    id: 6,
    roomId: 6,
    sender: "Nellie Cornett",
    createdAt: "01:40  am",
    usermessages: [
      { id: 1, from_id: 1, to_id: 2, msg: "Good morning, How are you? What about our next meeting?", isImages: false, has_images: [], datetime: "09:08 am" },
      { id: 2, from_id: 2, to_id: 1, msg: "Hey, I'm going to meet a friend of mine at the department store. I have to buy some presents for my parents 🎁.", isImages: false, has_images: [], datetime: "09:11 am" },
    ]
  },
  {
    id: 7,
    roomId: 7,
    sender: "Chris Kiernan",
    createdAt: "01: 50 am",
    usermessages: [
      { id: 1, from_id: 2, to_id: 1, msg: "Good morning 😊", isImages: false, has_images: [], datetime: "09:07 am" },
      { id: 2, from_id: 2, to_id: 1, msg: "Hey, I'm going to meet a friend of mine at the department store. I have to buy some presents for my parents 🎁.", isImages: false, has_images: [], datetime: "09:11 am" },
      { id: 3, from_id: 2, to_id: 1, msg: "Yeah everything is fine. Our next meeting tomorrow at 10.00 AM", isImages: false, has_images: [], datetime: "10:30 am" },
      { id: 4, from_id: 1, to_id: 2, msg: "Yeah everything is fine. Our next meeting tomorrow at 10.00 AM", isImages: false, has_images: [], datetime: "10:30 am" },
    ]
  },
  {
    id: 8,
    roomId: 8,
    sender: "Edith Evans",
    createdAt: "02:20 am",
    usermessages: [
      { id: 1, from_id: 2, to_id: 1, msg: "Good morning 😊", isImages: false, has_images: [], datetime: "09:07 am" },
      { id: 2, from_id: 1, to_id: 2, msg: "Good morning, How are you? What about our next meeting?", isImages: false, has_images: [], datetime: "09:08 am" },
      { id: 3, from_id: 2, to_id: 1, msg: "Yeah everything is fine. Our next meeting tomorrow at 10.00 AM", isImages: false, has_images: [], datetime: "10:30 am" },
      { id: 4, from_id: 1, to_id: 2, msg: "Yeah everything is fine. Our next meeting tomorrow at 10.00 AM", isImages: false, has_images: [], datetime: "10:30 am" },
    ]
  },
  {
    id: 9,
    roomId: 9,
    sender: "Joseph Siegel",
    createdAt: "04:00 am",
    usermessages: [
      { id: 1, from_id: 2, to_id: 1, msg: "Good morning 😊", isImages: false, has_images: [], datetime: "09:07 am" },
      { id: 2, from_id: 1, to_id: 2, msg: "Good morning, How are you? What about our next meeting?", isImages: false, has_images: [], datetime: "09:08 am" }
    ]
  },
  //channelsList
  {
    id: 10,
    roomId: 10,
    sender: "Landing Design",
    createdAt: "12:00 am",
    usermessages: [
      { id: 1, from_id: 2, to_id: 1, msg: "Good morning 😊", isImages: false, has_images: [], datetime: "09:07 am" },
      { id: 2, from_id: 1, to_id: 2, msg: "Good morning, How are you? What about our next meeting?", isImages: false, has_images: [], datetime: "09:08 am" },
      { id: 3, from_id: 2, to_id: 1, msg: "Hey, I'm going to meet a friend of mine at the department store. I have to buy some presents for my parents 🎁.", isImages: false, has_images: [], datetime: "09:11 am" },
      { id: 4, from_id: 2, to_id: 1, msg: "Yeah everything is fine. Our next meeting tomorrow at 10.00 AM", isImages: false, has_images: [], datetime: "10:30 am" },
      { id: 5, from_id: 1, to_id: 2, msg: "I Think, Meeting will good", isImages: false, has_images: [], datetime: "10:30 am" },
      { id: 6, from_id: 2, to_id: 2, msg: "Yeah, Right", isImages: false, has_images: [], datetime: "10:30 am" },
      { id: 7, from_id: 1, to_id: 2, msg: "Bye", isImages: false, has_images: [], datetime: "10:30 am" },
    ]
  },
  {
    id: 11,
    roomId: 11,
    sender: "General",
    createdAt: "09:10 am",
    usermessages: [
      { id: 1, from_id: 2, to_id: 1, msg: "I Think, Meeting will good 😊", isImages: false, has_images: [], datetime: "09:07 am" },
      { id: 2, from_id: 1, to_id: 2, msg: "Yeah, Meeting will good", isImages: false, has_images: [], datetime: "09:08 am" },
    ]
  },
  {
    id: 12,
    roomId: 12,
    sender: "Project Tasks",
    createdAt: "08:15 am",
    usermessages: [
      { id: 1, from_id: 2, to_id: 1, msg: "Good morning 😊", isImages: false, has_images: [], datetime: "09:07 am" },
      { id: 2, from_id: 1, to_id: 2, msg: "Good morning, How are you? What about our next meeting?", isImages: false, has_images: [], datetime: "09:08 am" },
      { id: 3, from_id: 2, to_id: 1, msg: "Hey, I'm going to meet a friend of mine at the department store. I have to buy some presents for my parents 🎁.", isImages: false, has_images: [], datetime: "09:11 am" },
    ]
  },
  {
    id: 13,
    roomId: 13,
    sender: "Meeting",
    createdAt: "09:00 am",
    usermessages: [
      { id: 1, from_id: 1, to_id: 2, msg: "Good morning, How are you? What about our next meeting?", isImages: false, has_images: [], datetime: "09:08 am" },
      { id: 2, from_id: 2, to_id: 1, msg: "Hey, I'm going to meet a friend of mine at the department store. I have to buy some presents for my parents 🎁.", isImages: false, has_images: [], datetime: "09:11 am" },
    ]
  },
  {
    id: 14,
    roomId: 14,
    sender: "Reporting",
    createdAt: "10:07 am",
    usermessages: [
      { id: 1, from_id: 2, to_id: 1, msg: "Good morning 😊", isImages: false, has_images: [], datetime: "09:07 am" },
    ]
  },
  //chatContactData

  {
    id: 15,
    roomId: 15,
    sender: "Alice Cruickshank",
    createdAt: "09:08 am",
    usermessages: [
      { id: 1, from_id: 2, to_id: 1, msg: "Good morning 😊", isImages: false, has_images: [], datetime: "09:07 am" },
      { id: 2, from_id: 1, to_id: 2, msg: "Good morning, How are you? What about our next meeting?", isImages: false, has_images: [], datetime: "09:08 am" },
    ]
  },
  {
    id: 16,
    roomId: 16,
    sender: "Barrett Brown",
    createdAt: "09:10 am",
    usermessages: [
      { id: 1, from_id: 2, to_id: 1, msg: "Good morning 😊", isImages: false, has_images: [], datetime: "09:07 am" },
      { id: 2, from_id: 1, to_id: 1, msg: "Hey, I'm going to meet a friend of mine at the department store. I have to buy some presents for my parents 🎁.", isImages: false, has_images: [], datetime: "09:11 am" },
      { id: 3, from_id: 1, to_id: 2, msg: "Yeah everything is fine. Our next meeting tomorrow at 10.00 AM", isImages: false, has_images: [], datetime: "10:30 am" },
    ]
  },
  {
    id: 17,
    roomId: 17,
    sender: "Gilbert Beer",
    createdAt: "09:12 am",
    usermessages: [
      { id: 1, from_id: 2, to_id: 1, msg: "Good morning 😊", isImages: false, has_images: [], datetime: "09:07 am" },
      { id: 2, from_id: 1, to_id: 2, msg: "Good morning, How are you? What about our next meeting?", isImages: false, has_images: [], datetime: "09:08 am" },
      { id: 3, from_id: 2, to_id: 1, msg: "Hey, I'm going to meet a friend of mine at the department store. I have to buy some presents for my parents 🎁.", isImages: false, has_images: [], datetime: "09:11 am" },
      { id: 4, from_id: 2, to_id: 1, msg: "Yeah everything is fine. Our next meeting tomorrow at 10.00 AM", isImages: false, has_images: [], datetime: "10:30 am" },
      { id: 5, from_id: 1, to_id: 2, msg: "Yeah everything is fine. Our next meeting tomorrow at 10.00 AM", isImages: false, has_images: [], datetime: "10:30 am" },
    ]
  },
  {
    id: 18,
    roomId: 18,
    sender: "Justyn Wisoky",
    createdAt: "05:50 am",
    usermessages: [
      { id: 1, from_id: 2, to_id: 1, msg: "Good morning 😊", isImages: false, has_images: [], datetime: "09:07 am" },
      { id: 2, from_id: 1, to_id: 2, msg: "Good morning, How are you? What about our next meeting?", isImages: false, has_images: [], datetime: "09:08 am" }
    ]
  },
  {
    id: 19,
    roomId: 19,
    sender: "Keaton King",
    createdAt: "09:11 am",
    usermessages: [
      { id: 1, from_id: 2, to_id: 1, msg: "Good morning 😊", isImages: false, has_images: [], datetime: "09:07 am" },
      { id: 2, from_id: 1, to_id: 2, msg: "Good morning, How are you? What about our next meeting?", isImages: false, has_images: [], datetime: "09:08 am" },
      { id: 3, from_id: 2, to_id: 1, msg: "Hey, I'm going to meet a friend of mine at the department store. I have to buy some presents for my parents 🎁.", isImages: false, has_images: [], datetime: "09:11 am" },
      { id: 4, from_id: 2, to_id: 1, msg: "Yeah everything is fine. Our next meeting tomorrow at 10.00 AM", isImages: false, has_images: [], datetime: "10:30 am" },
    ]
  },
  {
    id: 19,
    roomId: 19,
    sender: "Marian Moen",
    createdAt: "12:11 am",
    usermessages: [
      { id: 1, from_id: 2, to_id: 1, msg: "Good morning 😊", isImages: false, has_images: [], datetime: "09:07 am" },
    ]
  },
  {
    id: 20,
    roomId: 20,
    sender: "Ronald Downey",
    createdAt: "09:12 am",
    usermessages: [
      { id: 1, from_id: 2, to_id: 1, msg: "Hey, I'm going to meet a friend of mine at the department store. I have to buy some presents for my parents 🎁.", isImages: false, has_images: [], datetime: "09:11 am" },
      { id: 2, from_id: 1, to_id: 1, msg: "Yeah everything is fine. Our next meeting tomorrow at 10.00 AM", isImages: false, has_images: [], datetime: "10:30 am" },
      { id: 3, from_id: 2, to_id: 2, msg: "Yeah everything is fine. Our next meeting tomorrow at 10.00 AM", isImages: false, has_images: [], datetime: "10:30 am" },
    ]
  },
  {
    id: 21,
    roomId: 21,
    sender: "Victor Beahan",
    createdAt: "09:00 am",
    usermessages: [
      { id: 1, from_id: 2, to_id: 1, msg: "Good morning 😊", isImages: false, has_images: [], datetime: "09:07 am" },
      { id: 2, from_id: 1, to_id: 2, msg: "Good morning, How are you? What about our next meeting?", isImages: false, has_images: [], datetime: "09:08 am" },
    ]
  },
  {
    id: 22,
    roomId: 22,
    sender: "Wayne Runte",
    createdAt: "09:12 am",
    usermessages: [
      { id: 1, from_id: 2, to_id: 1, msg: "Good morning 😊", isImages: false, has_images: [], datetime: "09:07 am" },
      { id: 2, from_id: 1, to_id: 2, msg: "Good morning, How are you? What about our next meeting?", isImages: false, has_images: [], datetime: "09:08 am" },
      { id: 3, from_id: 2, to_id: 1, msg: "Hey, I'm going to meet a friend of mine at the department store. I have to buy some presents for my parents 🎁.", isImages: false, has_images: [], datetime: "09:11 am" },
      { id: 4, from_id: 2, to_id: 1, msg: "Yeah everything is fine. Our next meeting tomorrow at 10.00 AM", isImages: false, has_images: [], datetime: "10:30 am" },
      { id: 5, from_id: 1, to_id: 2, msg: "Yeah everything is fine. Our next meeting tomorrow at 10.00 AM", isImages: false, has_images: [], datetime: "10:30 am" },
    ]
  }
];

const attachements = [
  {
    id: 1,
    foldericon: "ri-folder-zip-line",
    foldername: "App pages.zip",
    foldersize: "2.2MB",
  },
  {
    id: 2,
    foldericon: "ri-file-ppt-2-line",
    foldername: "Velzon admin.ppt",
    foldersize: "2.4MB",
  },
  {
    id: 3,
    foldericon: "ri-folder-zip-line",
    foldername: "Images.zip",
    foldersize: "1.2MB",
  },
  {
    id: 4,
    foldericon: "ri-image-2-line",
    foldername: "bg-pattern.png",
    foldersize: "1.1MB",
  },
];

const chatContactData = [
  {
    id: 1,
    title: 'A',
    contacts: [{ id: 1, name: 'Alice Cruickshank', status: "Online", roomId: 15 }],
  },
  {
    id: 2,
    title: 'B',
    contacts: [{ id: 2, name: 'Barrett Brown', status: "Online", roomId: 16, image: avatar4 }],
  },
  {
    id: 3,
    title: 'C',
    contacts: [
      { id: 3, name: 'Chris Kiernan', status: "Offline", roomId: 7 },
      { id: 4, name: 'Clifford Taylor', status: "Online", roomId: 3 }],
  },
  {
    id: 5,
    title: 'E',
    contacts: [{ id: 5, name: 'Edith Evans', status: "Offline", roomId: 8 }],
  },
  {
    id: 6,
    title: 'F',
    contacts: [{ id: 6, name: 'Frank Thomas', status: "Online", roomId: 2, image: avatar3 }],
  },
  {
    id: 7,
    title: 'G',
    contacts: [{ id: 7, name: 'Gilbert Beer', status: "Offline", roomId: 17 }],
  },
  {
    id: 8,
    title: 'J',
    contacts: [
      { id: 8, name: 'Janette Caster', status: "Online", roomId: 4, image: avatar4 },
      { id: 9, name: 'Joseph Siegel', status: "Online", roomId: 9, image: avatar7 },
      { id: 10, name: 'Justyn Wisoky', status: "Offline", roomId: 18, image: avatar1 }],
  },
  {
    id: 9,
    title: 'K',
    contacts: [{ id: 11, name: 'Keaton King', status: "Online", roomId: 19, image: avatar5 }],
  },
  {
    id: 10,
    title: 'L',
    contacts: [{ id: 12, name: 'Lisa Parker', status: "Offline", roomId: 1, image: avatar2 }],
  },
  {
    id: 11,
    title: 'M',
    contacts: [{ id: 13, name: 'Marian Moen', status: "Online", roomId: 20 }],
  },
  {
    id: 12,
    title: 'N',
    contacts: [{ id: 14, name: 'Nellie Cornett', status: "Online", roomId: 6, image: avatar6 }],
  },
  {
    id: 13,
    title: 'R',
    contacts: [{ id: 15, name: 'Ronald Downey', status: "Online", roomId: 21 }],
  },
  {
    id: 14,
    title: 'S',
    contacts: [{ id: 16, name: 'Sarah Beattie', status: "Offline", roomId: 5, image: avatar5 }],
  },
  {
    id: 15,
    title: 'V',
    contacts: [{ id: 17, name: 'Victor Beahan', status: "Online", roomId: 22, image: avatar10 }],
  },
  {
    id: 16,
    title: 'W',
    contacts: [{ id: 18, name: 'Wayne Runte', status: "Offline", roomId: 23, image: avatar2 }],
  },
];

export { chatMessage, messages, attachements, chatContactData };