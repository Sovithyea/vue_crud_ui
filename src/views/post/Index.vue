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
            :items-per-page="5"
            class="elevation-1"
        ></v-data-table>
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
                    value: 'item.id'
                },
                {
                    text: 'Title',
                    sortable: false,
                    value: 'item.title'
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
                console.log(this.items);
                // console.log(res.data.tests);
                // this.items = Object.keys(res.data).map((key) => [Number(key), obj[key]])
                // console.log(res.data);
                // this.items = res.data[0];
                // console.log(this.items);
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
            this.axios.delete(`Delete.php?id=${ this.deleteItem }`)
            .then( response => {
                this.fetchData()
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