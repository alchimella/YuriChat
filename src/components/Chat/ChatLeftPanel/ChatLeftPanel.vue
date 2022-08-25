<template>
  <div class="ChatLeftPanel">
    <div class="ChatLeftPanelHeader">
      <img src="@/assets/icons/search.svg" alt="" />
      <input placeholder="Search" />
    </div>
    <ul>
      <li
        v-for="(item, index) in chatList"
        :key="index"
        @click="selectRoom(item)"
        :class="{ ActiveItem: currentRoom.id === item.id }"
      >
        <img :src="item.avatar" alt="" />
        <div class="ItemContainer">
          <div class="ItemContent">
            <span class="UserNameText">{{ item.userName }}</span>
            <span class="TimeText">{{ item.time }}</span>
          </div>
          <div class="ItemContent">
            <span class="LastMessageText">{{ item.lastMessage }}</span>
            <div v-if="item.unreadCount > 0" class="UnreadMessages">
              <span>{{ item.unreadCount }}</span>
            </div>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import "./ChatLeftPanel.css";
export default {
  name: "ChatLeftPanel",
  props: { chatList: { type: Array } },
  computed: {
    currentRoom() {
      return this.$store.getters.room;
    },
  },
  methods: {
    selectRoom(room) {
      this.$store.dispatch("selectRoom", room);
    },
  },
};
</script>
