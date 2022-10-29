<template>
    <v-container fluid>
        <h2>Hi</h2>
    </v-container>
</template>

<script>
export default {
    mounted()
    {
        // this.axios.get('post', {
        //     headers: {
        //             'Content-Type': 'application/json',
        //             'Accept': 'application/json',
        //         },
        // })
        this.axios.get('post/Show.php?id=2', {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
            })   
        .then((res) => {
            console.log(res.data);
        })
        .catch(({res}) => {
            console.log(res);
        })  
    }
}
</script>

<style>

</style>