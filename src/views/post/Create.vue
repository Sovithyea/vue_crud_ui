<template>
    <v-container fluid>
        <v-card class="mb-3">
            <template v-if="loading">
                <v-skeleton-loader type="card-heading"></v-skeleton-loader>
                <v-skeleton-loader class="px-4 pb-3" type="text"></v-skeleton-loader>
            </template>
            <template v-else>
                <v-card-title>Post</v-card-title>
                <v-card-subtitle>Fill form below to create post.</v-card-subtitle>
            </template>
        </v-card>
        <v-form lazy-validation ref="form" @submit.prevent="onSubmit" :disabled="form.submitting">
            <v-card>
                <v-card-subtitle>
                    <v-btn class="ma-1" outlined color="primary" @click="$router.go(-1)"><v-icon left>mdi-arrow-left</v-icon>Back</v-btn>
                </v-card-subtitle>
                <v-card-text>
                    <v-row class="mt-3">
                        <v-col class="py-0" cols="12">
                            <v-text-field
                                v-model="form.data.title"
                                required
                                :rules="[v => !!v || 'Title is required']"
                                outlined
                                label="Title">
                            </v-text-field>
                        </v-col>
                        <v-col class="py-0" cols="12">
                            <v-text-field
                                v-model="form.data.description"
                                required
                                outlined
                                label='Description'>
                            </v-text-field>
                        </v-col>
                        <v-col class="py-0" cols="12">
                            <v-autocomplete
                                v-model="form.data.category_id"
                                :items="categories"
                                required
                                outlined
                                label="Category"
                                item-text="name"
                                item-value="id"
                                :rules="[v => !!v || 'Category is required']"
                                clearable
                            >
                            </v-autocomplete>
                        </v-col>
                    </v-row>
                </v-card-text>
                <v-card-actions class="px-4 pb-4">
                    <v-btn type="submit" color="success" :loading="form.submitting"><v-icon left>mdi-checkbox-marked-circle-outline</v-icon>Save</v-btn>
                    <!-- <v-btn  @click="$router.go(-1)" color="secondary"><v-icon left>mdi-cancel</v-icon>Cancel</v-btn> -->
                </v-card-actions>
            </v-card>
        </v-form>
    </v-container>
</template>
<script>

export default {
    data: () => ({
        loading: true,
        form: {
            submitting: false,
            data: {
                title: null,
                category_id: null,
                description: null
            },
        },
        categories: []
    }),

    mounted()
    {
        this.fetchData()
        this.loading = false
    },

    methods:
    {
        onSubmit()
        {
            if (this.$refs.form.validate())
            {
                this.form.submitting = true
                this.axios.post('post/Store.php', this.form.data)
                .then(response => {
                    console.log(response);
                    this.$router.go(-1)
                })
                .catch(({ response }) => {
                    console.log(response);
                })
                .finally(() => {
                    this.form.submitting = false
                })
            }
        },

        fetchData()
        {
            this.axios.get('post/Create.php')
            .then((res) => {
                this.categories = res.data.categories
                // console.log(this.categories);
            })
            .catch(({res}) => {
                console.log(res);
            })
        }

        // keyDown(e)
        // {
        //     var charCode = e.keyCode
        //     console.log(e)
        //     if (charCode < 8 || charCode > 9 && charCode < 16 || charCode > 20 && charCode < 33 || charCode > 40 && charCode < 45 || charCode == 47 || charCode > 57 && charCode < 61 || charCode > 61 && charCode < 91 || charCode > 91) e.preventDefault();
        // }
    }

}
</script>
