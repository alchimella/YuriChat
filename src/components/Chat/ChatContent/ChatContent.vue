<template>
  <div class="ChatWrapper">
    <div class="ChatContentHeader">
      <img :src="currentRoom.avatar" alt="" />
      <span>{{ currentRoom.userName }}</span>
      <span v-if="currentRoom.userType === 'user'">
        was online 19 minutes ago
      </span>
    </div>

    <div class="ChatContainer">
      <AdminMessage
        v-if="currentRoom.userType === 'admin'"
        :messages="messages"
      />
      <UserMessage
        v-if="currentRoom.userType === 'user'"
        :currentRoom="currentRoom"
        :chatList="chatList"
        :messages="messages"
      />
    </div>

    <div class="ChatInputWrapper" v-if="currentRoom.userType === 'user'">
      <div class="ChatReplyWrapper" v-if="replyMessage !== null">
        <img src="@/assets/icons/reply.svg" alt="" />
        <div class="ChatReplyContainer">
          <div class="MessageReply">
            <span>
              {{ this.getNameBySenderId(replyMessage.sender_id) }}
            </span>
            <span>
              {{ replyMessage.message }}
            </span>
          </div>

          <img src="@/assets/icons/close.svg" @click="closeReply" alt="" />
        </div>
      </div>

      <div class="ChatReplyWrapper" v-if="attachedFile !== null">
        Attach File
      </div>

      <div class="ChatInput">
        <transition name="fade">
          <div v-show="showAttachMenu" class="ChatAttach">
            <div class="ChatAttachItem">
              <img src="@/assets/icons/image.svg" alt="" />
              <input
                type="file"
                class="UploadInput PhotoUpload"
                accept="image/png, image/jpeg"
              />
            </div>
            <div class="ChatAttachItem">
              <img src="@/assets/icons/file.svg" alt="" />
              <input
                type="file"
                class="UploadInput FileUpload"
                accept=".pdf, .doc, .docx, .txt"
              />
            </div>
          </div>
        </transition>

        <button
          v-if="isAttach"
          class="ChatMessageButton"
          @click="showAttachMenu = !showAttachMenu"
        >
          <img src="@/assets/icons/attach.svg" alt="" />
        </button>
        <textarea
          ref="textarea"
          v-model="message"
          rows="1"
          @focus="resize"
          @keyup="resize"
          placeholder="Message..."
        />
        <button class="ChatMessageButton">
          <img
            src="@/assets/icons/send-message.svg"
            @click="sendMessage"
            alt=""
          />
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import "./ChatContent.css";
import UserMessage from "./UserMessage/UserMessage.vue";
import AdminMessage from "./AdminMessage/AdminMessage.vue";

export default {
  name: "ChatContent",
  components: { UserMessage, AdminMessage },
  props: {
    currentRoom: { type: Object },
    chatList: { type: Array },
    messages: { type: Array },
    isAttach: { type: Boolean },
  },
  data() {
    return {
      message: "",
      showAttachMenu: false,
    };
  },
  computed: {
    replyMessage() {
      return this.$store.getters.message;
    },
    attachedFile() {
      return this.$store.getters.attachedFile;
    },
  },
  mounted() {
    if (this.userType === "user") {
      this.resize();
    }
  },
  methods: {
    getNameBySenderId(senderId) {
      const currentUser = this.$store.state.currentUser;

      let chatList = this.chatList;

      if (senderId === currentUser.id) {
        return currentUser.userName;
      } else {
        let result = chatList.find((item) => item.id === senderId);
        return result.userName;
      }
    },
    sendMessage() {
      this.clearInputs();
    },
    attachFile(file) {
      if (this.$store.getters.attachedFile === null) {
        this.$store.dispatch("attachFile", file);
      }
    },
    closeReply() {
      this.$store.dispatch("selectMessage", null);
    },
    resize() {
      const { textarea } = this.$refs;
      textarea.style.height = "auto";
      textarea.style.height = textarea.scrollHeight + "px";
    },
    clearInputs() {
      this.$store.dispatch("selectMessage", null);
      this.$store.dispatch("attachFile", null);
      this.message = "";
    },
  },
};
</script>
