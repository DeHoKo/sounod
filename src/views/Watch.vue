<template>
    <v-container fill-height>
        <v-layout align-center justify-center>
            <v-flex xs8> 
                <v-card>
                    <v-toolbar>
                        <v-toolbar-title>Some video</v-toolbar-title>
                    </v-toolbar>
                    <v-card-text>
                        <watch-video></watch-video>
                    </v-card-text>
                    <v-card-actions>
                        <v-btn to="/">Home</v-btn>
                    </v-card-actions>    
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
import WatchComments from '@/components/WatchComments';
import WatchDescription from '@/components/WatchDescription';
import WatchVideo from '@/components/WatchVideo';

export default {
    name: 'watch',
    components: {
        WatchComments,
        WatchDescription,
        WatchVideo
    }    
}
</script>
