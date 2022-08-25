<template>
  <div class="MessageWrapper" v-for="(item, index) in messages" :key="index">
    <div class="MessageHeader">
      <span :class="item.key !== 'Today' ? 'PreviousMessageHeader' : ''">
        {{ item.key }}
      </span>
    </div>

    <div
      class="MessageContainer"
      v-for="(msg, index) in item.value"
      :key="index"
    >
      <div
        class="MessageBubble"
        @mouseover="selectMessage(msg.id)"
        @mouseleave="selectedMessageId = null"
      >
        <div class="MessageContainer">
          <img
            class="MessageAvatar"
            :src="this.getAvatarBySenderId(msg.sender_id)"
            alt=""
          />
          <div class="Message">
            <span>
              {{ this.getNameBySenderId(msg.sender_id) }}
            </span>

            <div class="MessageReply" v-if="msg.replyMessage !== null">
              <span>
                {{ this.getNameBySenderId(msg.replyMessage.sender_id) }}
              </span>
              <span class="MessageText">
                {{ msg.replyMessage.message }}
              </span>
            </div>

            <span class="MessageText">
              {{ msg.message }}
            </span>
          </div>
        </div>
        <div class="MessageDetails">
          <div>
            <transition name="fade">
              <img
                src="@/assets/icons/reply-message.svg"
                v-show="selectedMessageId === msg.id"
                @click="replyMessage(msg)"
                alt=""
              />
            </transition>
            <img src="@/assets/icons/seen-message.svg" alt="" />
            <span>
              {{ msg.time }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import "./UserMessage.css";

export default {
  name: "UserMessage",
  props: {
    currentRoom: { type: Object },
    chatList: { type: Array },
    messages: { type: Array },
  },
  data() {
    return {
      selectedMessageId: null,
    };
  },
  methods: {
    getAvatarBySenderId(senderId) {
      const currentUser = this.$store.state.currentUser;
      let chatList = this.chatList;

      if (senderId === currentUser.id) {
        return currentUser.avatar;
      } else {
        let result = chatList.find((item) => item.id === senderId);
        return result.avatar;
      }
    },
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
    selectMessage(messageId) {
      this.selectedMessageId = messageId;
    },
    replyMessage(message) {
      if (this.$store.getters.message === null) {
        this.$store.dispatch("selectMessage", message);
      }
    },
  },
};
</script>
