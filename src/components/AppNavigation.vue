<template>
    <span>
        <v-navigation-drawer
        v-model="drawer"
        clipped
        fixed
        app
        >
        <v-list dense>
            <!-- <v-list-tile @click="">
            <v-list-tile-action>
                <v-icon>dashboard</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
                <v-list-tile-title>Dashboard</v-list-tile-title>
            </v-list-tile-content>
            </v-list-tile>
            <v-list-tile @click="">
            <v-list-tile-action>
                <v-icon>settings</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
                <v-list-tile-title>Settings</v-list-tile-title>
            </v-list-tile-content>
            </v-list-tile> -->

            <v-list-tile>
                <v-btn to="/">Home</v-btn>
            </v-list-tile>
            <v-list-tile>
                <v-btn to="/watch/0">Watch</v-btn>
            </v-list-tile>
            <v-list-tile>
                <v-btn to="/login">Login</v-btn>
            </v-list-tile>
            <v-list-tile>
                <v-btn to="/profile">Profile</v-btn>
            </v-list-tile>
            <v-list-tile>
                <v-btn to="/register">Join</v-btn>
            </v-list-tile>
            <v-list-tile>
                <v-btn to="/admin">Admin</v-btn>
            </v-list-tile>
        </v-list>
        </v-navigation-drawer>
        <v-toolbar app fixed clipped-left>
        <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
        <v-toolbar-title><v-btn to="/" flat>Sounod</v-btn></v-toolbar-title>
            <!-- <v-btn to="/">/</v-btn>
            <v-btn to="/watch">/watch</v-btn>
            <v-btn to="/login">/login</v-btn>
            <v-btn to="/profile">/profile</v-btn>
            <v-btn to="/register">/register</v-btn>
            <v-btn to="/admin">/admin</v-btn> -->
        <v-spacer></v-spacer>
        <div>
            <v-btn to="/login" flat>SIGN IN</v-btn>
            <v-btn to="/register" flat>JOIN</v-btn>
        </div>
        <div>
            <v-btn to="/profile" flat>PROFILE</v-btn>
            <v-btn flat @click="logout">LOGOUT</v-btn>
        </div>
        </v-toolbar>   
    </span> 
</template>

<script>
  export default {
    name: 'AppNavigation',
    data: () => ({
      drawer: false
    }),
    methods: {
        logout() {
            this.$store.dispatch('userSignOut');
        }
    }
  }
</script>
