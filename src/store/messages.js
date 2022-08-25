import _ from "lodash";
import { createStore } from "vuex";

const store = createStore({
  state() {
    return {
      currentUser: {
        id: 1,
        userType: "user",
        userName: "Kyle Smith",
        avatar: "../../../public/avatars/current-user-avatar.png",
      },
      room: {
        id: 2,
        userType: "user",
        userName: "John Doe",
        avatar: "../../../public/avatars/avatar-2.png",
        lastMessage: "Hello! How are you?",
        time: "11.01.2022",
        unreadCount: 0,
      },
      message: null,
      attachedFile: null,
      chatRooms: [
        {
          id: 2,
          userType: "user",
          userName: "John Doe",
          avatar: "../../../public/avatars/avatar-2.png",
          lastMessage: "Hello! How are you?",
          time: "11.01.2022",
          unreadCount: 0,
        },
        {
          id: 3,
          userType: "user",
          userName: "Jane Brown",
          avatar: "../../../public/avatars/avatar-1.png",
          lastMessage: "Could you check last report?",
          time: "12.01.2022",
          unreadCount: 2,
        },
        {
          id: 4,
          userType: "user",
          userName: "David Snow",
          avatar: "../../../public/avatars/avatar-3.png",
          lastMessage:
            "Hi! Sorry but I can't visit Mark today((( Could you call to him?",
          time: "16.01.2022",
          unreadCount: 4,
        },
        {
          id: 5,
          userType: "admin",
          userName: "Admin",
          avatar: "../../../public/avatars/admin.svg",
          lastMessage: "Event",
          time: "18.01.2022",
          unreadCount: 0,
        },
      ],
      messages: [
        {
          id: 1,
          room_id: 5,
          date: "18.01.2022",
          time: "10:30",
          message: "You are scheduled the hookup",
          description:
            "On the other hand, we denounce with righteous indignation and dislike men who are so beguiled and demoralized by the charms of pleasure of the moment, so blinded by desire, that they cannot foresee the pain and trouble that are bound to ensue; and equal blame belongs to those who fail in their duty through weakness of will, which is the same as saying through shrinking from toil and pain. These cases are perfectly simple and easy to distinguish.",
        },
        {
          id: 2,
          room_id: 2,
          sender_id: 2,
          date: "January 11, 2021",
          time: "21:49",
          message: "Hello! How are you?",
          replyMessage: null,
          attached: null,
        },
        {
          id: 3,
          room_id: 2,
          sender_id: 1,
          date: "January 11, 2021",
          time: "21:51",
          message:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam non neque sapien. Aenean erat turpis, sollicitudin quis ligula eu, tristique dignissim justo. Nunc interdum et urna ut pulvinar. Etiam placerat, orci non aliquet maximus, leo arcu semper dolor, vel dignissim libero felis ut lectus. Sed gravida molestie nibh, eu gravida odio lacinia sit amet.",
          replyMessage: {
            message_id: 1,
            sender_id: 1,
            message: "Hello! How are you?",
          },
          attached: null,
        },
        {
          id: 4,
          room_id: 2,
          sender_id: 2,
          date: "January 12, 2021",
          time: "11:19",
          message: "Test message",
          replyMessage: null,
          attached: {
            fileType: "file",
            fileName: "Some file.txt",
          },
        },
      ],
    };
  },

  getters: {
    room: (state) => {
      return state.room;
    },
    message: (state) => {
      return state.message;
    },
    attachedFile: (state) => {
      return state.attachedFile;
    },
    chatRooms: (state) => {
      return state.chatRooms;
    },
    userMessages: (state) => {
      const userMessages = state.messages.filter((item) => {
        return item.room_id === state.room.id;
      });

      return _.chain(userMessages)
        .groupBy((item) => item.date)
        .map((value, key) => ({ key, value }))
        .value();
    },
  },

  mutations: {
    SELECT_ROOM(state, payload) {
      state.room = payload;
    },
    SELECT_MESSAGE(state, payload) {
      state.message = payload;
    },
    ATTACH_FILE(state, payload) {
      state.attachedFile = payload;
    }
  },

  actions: {
    selectRoom(context, payload) {
      context.commit("SELECT_ROOM", payload);
    },
    selectMessage(context, payload) {
      context.commit("SELECT_MESSAGE", payload);
    },
    attachFile(context, payload) {
      context.commit("ATTACH_FILE", payload);
    },
  },
});

export default store;
