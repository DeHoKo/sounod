<template>
    <v-container fill-height>
        <v-layout align-center justify-center>
            <v-flex md4> 
                <v-card>
                    <v-toolbar>
                        <v-toolbar-title>Register Form</v-toolbar-title>
                    </v-toolbar>
                    <v-card-text>
                        <v-form
                        ref="form"
                        v-model="valid"
                        lazy-validation
                        >
                            <v-text-field
                            v-model="name"
                            :counter="12"
                            :rules="nameRules"
                            label="Name"
                            color="white"
                            required
                            ></v-text-field>

                            <v-text-field
                            v-model="email"
                            :rules="emailRules"
                            label="E-mail"
                            color="white"
                            required
                            ></v-text-field>

                            <v-text-field
                            v-model="password"
                            :append-icon="show ? 'visibility' : 'visibility_off'"
                            :rules="passwordRules"
                            :type="show ? 'text' : 'password'"
                            label="Password"
                            hint="At least 8 characters"
                            color="white"
                            counter
                            @click:append="show = !show"
                            ></v-text-field>
                        </v-form>
                    </v-card-text>
                    <v-card-actions>
                        <v-btn :disabled="!valid" @click="submit">Join</v-btn>
                    </v-card-actions>    
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>  
</template>

<script>
export default {
   name: 'RegisterForm',
    data () {
        return {
            valid: true,
            name: '',
            nameRules: [
                v => !!v || 'Name is required',
                v => (v && v.length <= 12) || 'Name must be less than 12 characters'
            ],
            email: '',
            emailRules: [
                v => !!v || 'E-mail is required',
                v => /.+@.+/.test(v) || 'E-mail must be valid'
            ],
            password: '',
            show: false,
            passwordRules: [
                v => !!v || 'Password is required',
                v => (v && v.length >= 8) || 'Password must be more than 8 characters'
            ],
        }
    },

    methods: {
        validate () {
        if (this.$refs.form.validate()) {
            this.snackbar = true
        }
        },
        reset () {
        this.$refs.form.reset()
        },
        resetValidation () {
        this.$refs.form.resetValidation()
        },
        submit() {
            if (this.$refs.form.validate()) {
                this.$store.dispatch('userJoin', {
                    email: this.email,
                    password: this.password
                });
            }
        }
    }
}
</script>

