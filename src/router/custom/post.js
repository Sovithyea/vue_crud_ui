export default [
    {
        path: '/post',
        name: 'post.index',
        component: () => import('./../../views/post/Index.vue')
    },
    {
        path: '/post/create',
        name: 'post.create',
        component: () => import('./../../views/post/Create.vue')
    },
    {
        path: '/post/:post/edit',
        name: 'post.edit',
        component: () => import('./../../views/post/Edit.vue')
    },
    {
        path: '/post/:post/show',
        name: 'post.show',
        component: () => import('./../../views/post/Show.vue')
    },
]
