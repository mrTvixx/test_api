<template>
  <v-app>
    <v-dialog v-model="dialog" width="500">
      <v-card v-if="targetPackage.name">
        <v-card-title class="headline grey lighten-2" primary-title>{{targetPackage.name}}</v-card-title>
        <v-card-text>
          <div class="cart">
            <div class="cart__author">{{getAuthor(targetPackage.author)}}</div>
            <div class="cart__description" v-html="targetPackage.description" />
            <div class="cart__links">
              <div class="cart__title">
                <b>Links:</b>
              </div>
              <a
                class="links__element"
                v-for="item in Object.keys(targetPackage.links)"
                :key="item"
                :href="targetPackage.links[item]"
                target="_blank"
              >{{item}}</a>
            </div>
            <div class="cart__author">
              <b>Publish:</b>
              <div class="author">
                <span>{{getAuthor(targetPackage.publisher)}}</span>
                <span>{{targetPackage.date | formatDate}}</span>
              </div>
            </div>
          </div>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="onClose">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-app>
</template>

<script>
import { mapGetters } from "vuex";

import { CLEAR_TARGET_PACKAGE } from "../store/mutations.type";

export default {
  data() {
    return {
      dialog: false
    };
  },
  computed: mapGetters(["targetPackage"]),
  watch: {
    targetPackage() {
      if (this.targetPackage.name) this.dialog = true;
    }
  },
  filters: {
    formatDate(value) {
      return value.split("T")[0] || "";
    }
  },
  methods: {
    onClose() {
      this.dialog = false;
      this.$store.commit(CLEAR_TARGET_PACKAGE);
    },
    getAuthor(data) {
      if (!data) return "No name";
      return `${data.name || data.username} -- ${data.email || "no email"}`;
    }
  }
};
</script>

<style lang="scss" scoped>
.cart {
  text-align: left;

  &__author {
    padding: 20px 0 0;
  }

  .author {
    display: flex;
    justify-content: space-between;
  }

  .links {
    &__element {
      color: #1976d2;
      padding: 0 10px;
      border-right: 1px solid grey;

      &:last-child {
        border-right: unset;
      }
    }
  }
}
</style>