<template>
    <v-container fluid>
        <v-card class="mb-3">
            <template v-if="loading">
                <v-skeleton-loader type="card-heading"></v-skeleton-loader>
                <v-skeleton-loader class="px-4 pb-3" type="text"></v-skeleton-loader>
            </template>
            <template v-else>
                <v-card-title>Post</v-card-title>
                <v-card-subtitle>List all posts.</v-card-subtitle>
            </template>
        </v-card>
        <v-dialog v-model="diaglogDelete" max-width="500">
            <v-card>
                <v-card-title>Are you sure?</v-card-title>
                <v-card-text>Do you want to delete?</v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="secondary" outlined :disabled="deleting" @click="diaglogDelete = false"><v-icon left>mdi-cancel</v-icon>Cancel</v-btn>
                    <v-btn color="error" :loading="deleting" @click="onConfirmDelete"><v-icon left>mdi-trash-can-outline</v-icon>Confirm</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <v-data-table
            :headers="headers"
            :items="items"
            :items-per-page="15"
            class="elevation-1"
        >
        <template #[`top`]>
                <v-toolbar flat>
                    <v-btn class="ma-1" color="primary" :to="{ name: 'post.create' }"><v-icon left>mdi-plus</v-icon>New Customer</v-btn>
                    <v-spacer></v-spacer>
                </v-toolbar>
        </template>
        <template #[`item.no`]="{ item, index }" :ref="item.id">
            {{index+1}}
        </template>

        <template #[`item.actions`]="{ item }">
                <v-tooltip top>
                    <template #activator="{ on, attrs }">
                        <v-btn color="primary" v-bind="attrs" icon small :to="{ name: 'post.show', params: { post: item.id } }" v-on="on"><v-icon>mdi-eye</v-icon></v-btn>
                    </template>
                    <span>Detail</span>
                </v-tooltip>
                <v-tooltip top>
                    <template #activator="{ on, attrs }">
                        <v-btn color="warning" icon small :to="{ name: 'post.edit', params: { post: item.id } }" v-bind="attrs" v-on="on"><v-icon>mdi-pencil-box-outline</v-icon></v-btn>
                    </template>
                    <span>Edit</span>
                </v-tooltip>
                <v-tooltip top>
                    <template #activator="{ on, attrs }">
                        <v-btn color="error" icon small v-bind="attrs" @click="onClickDelete(item)" v-on="on"><v-icon>mdi-trash-can-outline</v-icon></v-btn>
                    </template>
                    <span>Delete</span>
                </v-tooltip>
            </template>
        </v-data-table>
        <!-- <div v-for="item in itemss">
            <h5>{{item.id}}</h5>
            <h5>{{item.title}}</h5>
            <h5>{{item.category_name}}</h5>
            <h5>{{item.description}}</h5>
        </div> -->
    </v-container>
</template>

<script>
export default {
    data() {
        return {
            diaglogDelete: false,
            deleteItem: null,
            deleting: false,      
            loading: true,
            headers: [
                {
                    text: 'No',
                    sortable: false,
                    value: 'no'
                },
                {
                    text: 'Title',
                    sortable: false,
                    value: 'title'
                },
                {
                    text: 'Type',
                    sortable: false,
                    value: 'category_name'
                },
                {
                    text: 'Description',
                    sortable: false,
                    value: 'description'
                },
                {
                    text: 'Actions',
                    sortable: false,
                    value: 'actions'
                },
            ],
            items: [],
        }
    },
    // props: {
    //     items: {
    //         type: Array,
    //         default: []
    //     }
    // },
    watch: {
        options: {
            handler() {
                this.fetchData();
            },
        },
    },
    mounted() {
        this.fetchData()
    },
    methods: {
        fetchData() {
            this.axios.get('post', {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
            })   
            .then((res) => {
                this.items = res.data.data;
            })
            .catch(({res}) => {
                console.log(res);
            })  
            .finally(() => {
                this.loading = false
            })
        },
        onClickDelete(item)
        {
            this.deleteItem = item.id
            this.diaglogDelete = true
        },

        onConfirmDelete()
        {
            this.deleting = true
            this.axios.delete(`post/Delete.php`, {
                params: {
                    'id': `${ this.deleteItem }`
                },
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                }
            })
            .then( response => {
                this.fetchData()
                console.log(response);
                this.diaglogDelete = false
            })
            .catch(({ response }) => {
                console.log(response);
            })
            .finally(() => {
                this.deleting = false
            })
        },

    }
}
</script>

<style>

</style>