<template>
    <v-container fluid>
        <v-card class="mb-3">
            <template v-if="loading">
                <v-skeleton-loader type="card-heading"></v-skeleton-loader>
                <v-skeleton-loader class="px-4 pb-3" type="text"></v-skeleton-loader>
            </template>
            <template v-else>
                <v-card-title>Post</v-card-title>
                <v-card-subtitle>Post Detail</v-card-subtitle>
            </template>
        </v-card>
        <v-card>
            <v-card-subtitle>
                <v-btn class="ma-1" outlined color="primary" @click="$router.go(-1)"><v-icon left>mdi-arrow-left</v-icon>Back</v-btn>
                <v-btn class="ma-1" color="warning" :to="{ name: 'post.edit' }"><v-icon left>mdi-pencil-box-outline</v-icon>Edit Post</v-btn>
            </v-card-subtitle>
            <v-card-text v-if="!loading">
                <v-row class="my-3">

        <v-col lg="8" cols="12" class="px-5 mx-auto">
          <v-subheader>
            Post Information
            <v-divider/>
          </v-subheader>
          <v-row class="mx-1">
            <v-col class="font-weight-bold" sm="5" lg="4" xl="3" cols="5">
              Title:
            </v-col>
            <v-col class="font-weight-bold" sm="7" lg="8" xl="9" cols="7">
              {{model.title}}
            </v-col>
          </v-row>
          <v-row class="mx-1">
            <v-col class="font-weight-bold" sm="5" lg="4" xl="3" cols="5">
              Type:
            </v-col>
            <v-col class="font-weight-bold" sm="7" lg="8" xl="9" cols="7">
              {{model.category_name}}
            </v-col>
          </v-row>
          <v-row class="mx-1">
            <v-col class="font-weight-bold" sm="5" lg="4" xl="3" cols="5">
              Description
            </v-col>
            <v-col class="font-weight-bold" sm="7" lg="8" xl="9" cols="7">
              {{model.description ? model.description : 'N/A'}}
            </v-col>
          </v-row>
        </v-col>
      </v-row>
            </v-card-text>
        </v-card>
    </v-container>
</template>
<script>
export default {
    data: () => ({
        loading: true,
        model: {}
    }),

    mounted()
    {
        this.fetchData()
    },

    methods:
    {
        fetchData()
        {
            this.axios.get(`post/Show.php?id=${ this.$route.params.post }`)
            .then((res) => {
                this.model = res.data
                // console.log(res.data);
            })
            .catch(({res}) => {
                console.log(res);
            })
            .finally((res) => {
                this.loading = false
            })
        }
    }
}
</script>
