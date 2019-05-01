<template>
    <div>
        <youtube :fitParent="true" :resize="true" :resizeDelay="0" :video-id="videoId" ref="youtube" @playing="playing"></youtube>
    </div>
</template>

<script>
export default {
    name: 'WatchVideo',
    data() {
        return {
        videoId: null,
        }
    },
    methods: {
        // playVideo() {
        // this.player.playVideo()
        // },
        // playing() {
        // console.log('\o/ we are watching!!!')
        // }
    },
    computed: {
        player() {
        return this.$refs.youtube.player
        }
    },
    mounted() {
        this.videoId = this.$store.state.documents[this.$route.params.id].videoId;
    }
}
</script>
