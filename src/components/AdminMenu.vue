<template>
    <v-container grid-list-lg>
        <v-layout row wrap>
            <v-flex xs12 sm6 md4 lg3 v-for="(video, index) in videos" :key="index">
                <v-card min-height="361px">
                    <v-img
                    :src="video.videoThumbnailUrl"
                    aspect-ratio="2.75"
                    ></v-img>

                    <v-card-title primary-title>
                    <div>
                        <h3 class="headline mb-0"> {{ video.videoTitle }} </h3>
                        <div> {{ video.videoDescription || "This video doesn't have a description" }} </div>
                    </div>
                    </v-card-title>

                    <v-card-actions>
                    <v-btn color="orange" :to="'/watch/' + index">go</v-btn>
                    <v-spacer></v-spacer>
                    <v-btn color="orange" @click="deleteVideo(index)">Delete</v-btn>
                    </v-card-actions>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
// в этом компоненте есть баг с добавлением видео при каждой перезагрузке, возможно стоит разобраться
export default {
    name: 'AdminMenu',
    computed: {
        videos() {
            return this.$store.state.documents;
        },
    },
    methods: {
        deleteVideo(videoNumber) {
            console.log(videoNumber);
            this.$store.dispatch('deleteDocument', {
                delVideo: videoNumber,
            });
        }
    },
};
</script>


