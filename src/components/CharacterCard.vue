<template>
  <div class="card mb-3 text-bg-secondary border-0"
    style="width: 640px; ">
    <div class="row g-0">
      <div class="col-4">
        <img :src="character.image"
          class="img-fluid rounded-start h-100 w-100"
          :alt="character.name">
      </div>
      <div class="col-8">
        <div class="card-body">
          <h3 class="card-title fw-bolder mb-1 text-nowrap overflow-hidden">{{ character.name }}</h3>
          <h6 class="card-title fw-bold mb-4">
            <span class="position-relative">
              <span v-if="character.status === 'unknown'"
                class="position-absolute text-body-tertiary"
                style="top:0;">&#9679;</span>
              <span v-else-if="character.status === 'Alive'"
                class="position-absolute text-success"
                style="top:0;">&#9679;</span>
              <span v-else
                class="position-absolute text-danger"
                style="top:0;">&#9679;</span>
            </span>
            <span class="ms-3">{{ character.status }} - {{ character.species }}</span>
          </h6>

          <h6 class="card-subtitle text-secondary-emphasis mb-1">Last known location:</h6>
          <h5 class="fw-normal card-text mb-4">{{ character.location.name }}</h5>

          <h6 class="card-subtitle text-secondary-emphasis mb-1">First seen:</h6>
          <h5 class="fw-normal card-text">{{ firstSeen }}</h5>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';


const props = defineProps({
  character: {
    default: {
      id: 0,
      name: '',
      status: '',
      species: '',
      location: {
        name: ''
      },
      episode: [''],
      image: ''
    },
    required: true
  }
})

const firstSeen = ref('')

async function getFirstSeenName() {
  try {
    const response = await fetch(props.character.episode[0])
    if (!response.ok) {
      throw new Error('Network response was not ok ' + response.statusText);
    }
    const data = await response.json()
    console.log(data);

    return data.name;
  } catch (error) {
    console.error('There was a problem with your fetch operation:', error);
  }

  return ''
}

onMounted(async () => {
  firstSeen.value = await getFirstSeenName()
})
</script>