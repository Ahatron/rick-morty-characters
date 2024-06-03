<template>
  <nav aria-label="Page navigation example">
    <ul class="pagination">
      <li class="page-item"><a class="page-link"
          href="#"
          @click="appStore.goPrev">Previous</a></li>

      <li class="page-item"><a class="page-link"
          href="#"
          @click="appStore.goNext">Next</a></li>
    </ul>
  </nav>
</template>

<script setup>
import { useAppStore } from "@/stores/app.js";

const appStore = useAppStore()
</script>