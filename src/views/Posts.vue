<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Posts</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Posts</ion-title>
        </ion-toolbar>
      </ion-header>

      <ion-list v-if="posts.list && posts.list.length > 0" inset="true" lines="inset">
        <ion-item v-for="item in posts.list" :key="item.id">
          <ion-label>
            <h2>{{ item.title }}</h2>
            <p>{{ item.body }}</p>
          </ion-label>
        </ion-item>
      </ion-list>
      <ion-label v-else>
        {{ posts.error }}
      </ion-label>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
} from "@ionic/vue";
import { ref, reactive } from "vue";

export default {
  name: "Posts",
  components: {
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonPage,
  },
  data() {
    const posts = reactive({
      list: [],
      error: {},
    });
    const submitted = async () => {
      try {
        const response = await fetch(
          `https://jsonplaceholder.typicode.com/posts`
        );
        const json = await response.json();
        posts.list = ref(json);
        // console.log(posts.list);
      } catch (error) {
        // console.log(error);
        posts.error = reactive({ error });
      } finally {
        // do something
      }
    };
    submitted();
    return {
      posts,
    };
  },
};
</script>