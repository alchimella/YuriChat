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
      @mouseenter="isReply = true"
      @mouseleave="isReply = false"
    >
      <div class="MessageBubble">
        <div class="MessageContainer">
          <img class="MessageAvatar" src="@/assets/avatars/admin.svg" alt="" />
          <div class="Message">
            <span>Admin</span>
            <span class="MessageText">
              {{ msg.message }}
            </span>
            <div class="AdminMessageDateTime">
              <span>Date</span>
              <span>Time</span>
            </div>
            <div class="AdminMessageDateTimeContent">
              <span>Date</span>
              <span>Time</span>
            </div>
            <div class="AdminMessageDescription">
              <span>Event description</span>
              <span>{{ msg.description }}</span>
            </div>
            <div class="ButtonWrapper">
              <button class="Button">{{ buttonText.toUpperCase() }}</button>
            </div>
          </div>
        </div>

        <div class="MessageDetails">
          <div>
            <img
              src="@/assets/icons/reply-message.svg"
              v-show="isReply"
              alt=""
            />
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
import "./AdminMessage.css";

export default {
  name: "AdminMessage",
  props: {
    messages: { type: Array },
  },
  data() {
    return {
      buttonText: "Copy Link",
      isReply: false,
    };
  },
};
</script>
