<template>
  <div class="ChatRoom">
    <ChatLeftPanel :chatList="chatRooms" />
    <ChatContent
      :currentRoom="room"
      :chatList="chatRooms"
      :messages="messages"
      :isAttach="true"
    />
  </div>
</template>

<script>
import "./ChatRoom.css";
import ChatLeftPanel from "./ChatLeftPanel/ChatLeftPanel.vue";
import ChatContent from "./ChatContent/ChatContent.vue";

export default {
  name: "ChatRoom",
  components: { ChatLeftPanel, ChatContent },

  setup() {
    return {
      userType: "user",
    };
  },
  computed: {
    room() {
      return this.$store.getters.room;
    },
    chatRooms() {
      return this.$store.getters.chatRooms;
    },
    messages() {
      return this.$store.getters.userMessages;
    },
  },
  mounted() {
    console.log(this.$store.getters.room);
  },
};
</script>
