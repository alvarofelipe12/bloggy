<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button></ion-back-button>
        </ion-buttons>
        <ion-title>Post Detail {{ id }}</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-spinner
      name="bubbles"
      v-if="!post.id || !comments.list || comments.list.length === 0"
    ></ion-spinner>
    <ion-content :fullscreen="true" v-else-if="post.id && comments.list && comments.list.length > 0">
      <ion-grid>
        <ion-row>
          <ion-col class="ion-padding">
            <ion-item>
              <ion-label class="ion-text-wrap">
                <ion-text>
                  <h2>{{ post.title }}</h2>
                </ion-text>
                <p>{{ post.body }}</p>
              </ion-label>
            </ion-item>
          </ion-col>
        </ion-row>
      </ion-grid>
      <ion-list
        inset="true"
        lines="inset"
        v-if="!comments.list || comments.list.length > 0"
      >
        <ion-card v-for="comment in comments.list" :key="comment.id">
          <ion-item>
            <ion-label class="ion-text-wrap">
              <ion-text color="secondary">
                <p>{{ comment.email }} says...</p>
              </ion-text>
              <h2>{{ comment.name }}</h2>
              <p>{{ comment.body }}</p>
            </ion-label>
          </ion-item>
        </ion-card>
      </ion-list>
      <ion-label v-else>
        {{ comments.error }}
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
  IonBackButton,
  IonButtons,
} from "@ionic/vue";
import { defineComponent } from "vue";
import { useRoute } from "vue-router";

export default defineComponent({
  name: "Post-details",
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
    IonBackButton,
    IonButtons,
  },
  data() {
    const post = {
      id: null,
      title: "",
      body: "",
      userId: null,
    };
    const comments = {
      list: [],
      error: {},
    };
    const title = "Post Details";
    return {
      post,
      comments,
      title,
    };
  },
  methods: {
    fetchPostData() {
      fetch(`https://jsonplaceholder.typicode.com/posts/${this.id}`)
        .then((response) => response.json())
        .then((json) => (this.post = json));
    },
    fetchPostComments() {
      fetch(`https://jsonplaceholder.typicode.com/posts/${this.id}/comments`)
        .then((response) => response.json())
        .then((json) => (this.comments.list = json));
    },
  },
  created() {
    this.fetchPostData();
    this.fetchPostComments();
  },
  setup() {
    const route = useRoute();
    const { id } = route.params;
    return { id };
  },
});
</script>
