<template>
  <div class="root">
    <div class="main__content">
      <v-text-field v-model="searchValue" label="Search package"></v-text-field>
      <v-card>
        <v-list>
          <v-subheader>{{getTitle()}}</v-subheader>
          <v-list-item-group color="primary">
            <v-list-item
              @click="() => onSelect(item.package)"
              v-for="(item, i) in packagesList"
              :key="i"
            >
              <v-list-item-content>
                <v-list-item-title v-html="item.package.name"></v-list-item-title>
                <v-list-item-subtitle v-html="item.package.description"></v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-card>
      <v-pagination
        v-if="packagesCount"
        total-visible="5"
        v-model="page"
        prev-icon="<<"
        next-icon=">>"
        :length="packagesCount"
      ></v-pagination>
    </div>
    <Modal />
    <Footer />
  </div>
</template>

<script>
import _ from "lodash";
import { mapGetters } from "vuex";

import Modal from "../components/Modal";
import Footer from "../components/Footer";

import { GET_PACKAGES_LIST } from "../store/actions.type";
import { SAVE_TARGET_PACKAGE } from "../store/mutations.type";

export default {
  components: {
    Modal,
    Footer
  },
  data() {
    return {
      searchValue: "",
      page: 1
    };
  },
  computed: mapGetters(["isLoading", "packagesList", "packagesCount"]),
  watch: {
    searchValue() {
      this.debouncedSearch();
    },
    page() {
      this.search();
    }
  },
  methods: {
    getTitle() {
      if (this.isLoading) return "Loading...";
      if (this.packagesList.length) return "Packages";
      return "No results";
    },
    onSelect(data) {
      this.$store.commit(SAVE_TARGET_PACKAGE, data);
    },
    search() {
      this.$store.dispatch(GET_PACKAGES_LIST, {
        name: this.searchValue,
        page: this.page
      });
    }
  },
  created() {
    this.debouncedSearch = _.debounce(this.search, 350);
  }
};
</script>

<style lang="scss">
html,
body {
  height: 100%;
}

.root {
  text-align: center;
  padding: 50px 20px;
  height: 100%;
}

.main {
  &__content {
    padding: 0 0 80px 0;
  }
}

.v {
  &-list-item__content {
    text-align: left;
  }

  &-subheader {
    font-size: 22px;
  }

  &-application--wrap {
    min-width: unset;
    min-height: unset;
  }
}

.theme--light.v-pagination .v-pagination__item--active,
.theme--light.v-pagination .v-pagination__navigation {
  color: white;
  background: grey;
  font-weight: 600;

  .v-icon {
    font-size: 20px;
    color: white;
  }
}
</style>
