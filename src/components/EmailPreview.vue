<template>
  <div class="email-preview">
    <div v-if="email">
      <div class="header">
        <div class="subject">
          <span>Subject: </span>
          <h2>{{email.subject}}</h2>
        </div>
        <div class="from">
          <span>from: </span>
          <h3>{{email.from}}</h3>
        </div>
      </div>
      <div class="content">
        <p>{{email.content}}</p>
      </div>
      <div class="buttons">
        <button @click="replyEmail()">
          <img src="../../materials/Faumail/reply.png">
        </button>
        <button @click="toggleTags('read')" v-model="markRead">
          <img v-if="!this.email.isRead" src="../../materials/Faumail/mark-as-read.png" >
          <img v-else src="../../materials/Faumail/mark-as-unread.png">
        </button>
        <button @click="toggleTags('trash')" v-model="trashedEmail">
          <img v-if="!this.email.isTrashed" src="../../materials/Faumail/trash.png">
          <img v-else src="../../materials/Faumail/recover-mail.png">
        </button>
        <button @click="toggleTags('important')" v-model="markImportant">
          <img v-if="!this.email.isImportant" src="../../materials/Faumail/important.png">
          <img v-else src="../../materials/Faumail/notimportant.png">
        </button>
      </div>
    </div>
  </div>
</template>



<script>
import EmailService from '../api/email.services'

export default {
  name: 'email-preview',
  props: ['email'],
  watch: {
    email: function () {
      if (this.email) {
        !this.email.isImportant ? this.markImportant = "Mark as important" : this.markImportant = "Mark as Unimportant";
        !this.email.isTrashed ? this.trashedEmail = "Trash this mail" : this.trashedEmail = "Move to inbox";
        !this.email.isRead ? this.markRead = "Mark as read" : this.markRead = "Mark as Unread";
      }
    }
  },
  data() {
    return {
      markRead: 'Mark as read',
      trashedEmail: "Trash this mail",
      markImportant: "Mark as important",
      filter: null
    }
  },
  methods: {
    trashEmail() {
      this.$emit('replyEmail', this.email);
      console.log(this.email)
      EmailService.trashEmail(this.email);
    },
    replyEmail() {
      console.log('reply');
      this.$emit('replyEmail', this.email);
    },
    toggleTags(tag) {
      this.filter = {
        id: this.email.id,
        isImportant: this.email.isImportant,
        isTrashed: this.email.isTrashed,
        isRead: this.email.isRead
      };
      console.log('before', this.filter);
      switch (tag) {
        case 'important': {
          this.email.isImportant ? this.markImportant = "Mark as important" : this.markImportant = "Mark as Unimportant"
          this.filter.isImportant = !this.email.isImportant;
          break;
        }
        case 'trash': {
          this.email.isTrashed ? this.trashedEmail = "Trash this mail" : this.trashedEmail = "Move to inbox";
          this.filter.isTrashed = !this.email.isTrashed;
          break;
        }
        case 'read': {
          this.email.isRead ? this.markRead = "Mark as read" : this.markRead = "Mark as Unread"
          this.filter.isRead = !this.email.isRead;
          break;
        }
      }
      console.log('email over', this.filter);
      EmailService.toggleTags(this.filter);
      this.$emit('toggleTags', this.filter);
    }
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css?family=Montserrat');
.email-preview {
  width: 63vw;
  min-height: 83.2vh;
}

.buttons {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  background: #4cd964;
  padding: 50px 50px;
  button {
    height: 55px;
    width: 55px;
    border-radius: 5px;
    img {
      width: 100%;
    }
  }
}

.header {
  background-color: #007aff;
  padding-left: 5vw;
  .subject {
    padding-left: 1.25vw;
    display: flex;
    align-items: center;
    span {
      color: #74a9ff;
      font-size: 26px;
    }
  }
  .from {
    padding-left: 1.25vw;
    display: flex;
    align-items: center;
    span {
      color: #74a9ff;
      font-size: 26px;
    }
  }
  h2 {
    padding-left: 4vw;
    font-family: 'Montserrat', sans-serif;
    color: white;
  }
  h3 {
    padding-left: 6.3vw;
    font-family: 'Montserrat', sans-serif;
    color: white;
  }
}

.content {
  padding: 20px 20px;
  min-height: 40vh;
  p {
    color: #787474;
    font-family: 'Montserrat', sans-serif;
    font-size: 16px;
  }
}
</style>
