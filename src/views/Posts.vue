<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>BLOGGY 😃</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar> <ion-title size="large">Posts</ion-title> </ion-toolbar>Î
      </ion-header>
      <ion-grid>
        <ion-row>
          <ion-col class="ion-padding">
            <h1>{{ title }}</h1>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum
            minima cupiditate non neque debitis harum dolorem distinctio, minus
            esse blanditiis asperiores ipsum tempore amet ab quibusdam fugiat
            quaerat, facere aut!
          </ion-col>
        </ion-row>
      </ion-grid>
      <ion-list
        v-if="posts.list && posts.list.length > 0"
        inset="true"
        lines="inset"
      >
        <ion-card v-for="item in posts.list" :key="item.id">
          <ion-item>
            <ion-label>
              <h2>{{ item.title }}</h2>
              <p>{{ item.body }}</p>
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
} from "@ionic/vue";
import { ref, reactive, defineComponent } from "vue";

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
  },
  data() {
    const posts = reactive({
      list: [],
      error: {},
    });
    return {
      posts,
      title: "Blog Entry",
    };
  },
  methods: {
    async submitted(): Promise<void> {
      try {
        const response = await fetch(
          `https://jsonplaceholder.typicode.com/posts`
        );
        const json = await response.json();
        this.posts.list = ref(json);
      } catch (error) {
        this.posts.error = { error };
      } finally {
        // do something else
      }
      return;
    },
  },
  created() {
    // fetch("https://jsonplaceholder.typicode.com/posts").then(list => {
    //   console.log("Component has been created!");
    //   this.posts.list = list as any;
    // });
    this.submitted();
  },
});
</script>
