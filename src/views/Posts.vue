<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title class="ion-text-center">BLOGGY 😃</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-spinner
      name="bubbles"
      v-if="!posts.list || posts.list.length === 0"
    ></ion-spinner>
    <ion-content :fullscreen="true" v-else-if="posts.list && posts.list.length > 0">
      <ion-grid>
        <ion-row v-for="item in posts.list" :key="item.id">
          <ion-col class="ion-padding">
            <ion-item
              detail
              @click="() => router.push(`/post-detail/${item.id}`)"
            >
              <ion-label class="ion-text-wrap">
                <ion-text color="secondary">
                  <h2>{{ item.title }}</h2>
                </ion-text>
                <p>{{ item.body }}</p>
              </ion-label>
            </ion-item>
          </ion-col>
        </ion-row>
      </ion-grid>
      <ion-list
        v-if="posts.list && posts.list.length > 0"
        inset="true"
        lines="inset"
      >
        <ion-card>
          <ion-item>
            <ion-label class="ion-text-wrap">
              <!-- Put comments here -->
            </ion-label>
          </ion-item>
        </ion-card>
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
  IonList,
  IonCard,
  IonItem,
  IonLabel,
  IonGrid,
  IonRow,
  IonCol,
  IonText,
} from "@ionic/vue";
import { defineComponent } from "vue";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "Posts",
  components: {
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonPage,
    IonList,
    IonCard,
    IonItem,
    IonLabel,
    IonGrid,
    IonRow,
    IonCol,
    IonText,
  },
  data() {
    const posts = {
      list: [],
      error: {},
    };
    const title = "Blog Entry";
    return {
      posts,
      title,
    };
  },
  methods: {
    submitted() {
      fetch("https://jsonplaceholder.typicode.com/posts")
        .then((response) => response.json())
        .then((json) => (this.posts.list = json));
    },
  },
  created() {
    this.submitted();
  },
  setup() {
    const router = useRouter();
    return { router };
  },
});
</script>
