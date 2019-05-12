Vue.component("article-card", {
    props:['article'],
    methods: {
        deleteArtikel(input){
            this.$parent.deleteArtikel(input);
        },
        editArtikel(input){
            this.$parent.editArtikel(input);
        }
    },
    template: `
    <div>
        <div class="card" >
        <img class="card-img-top" :src="article.featured_image" :alt="article.title">
        <div class="card-body">
            <h5 class="card-title">{{ article.title }} </h5>
            <p class="card-text">{{ article.content }}</p>
            <p class="card-text"><small class="text-muted">Published: {{ article.created_at }}</small></p>
            <p class="card-text"><small class="text-muted">Owner: {{ article.author.name }}</small></p>
        </div>
            <button class="btn btn-secondary" @click.prevent="editArtikel(article._id)">Edit</button>
            <button class="btn btn-danger" @click.prevent="deleteArtikel(article._id)">Delete</button>
        </div>    
    </div>
    `,
})