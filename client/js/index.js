var app = new Vue({
    el: '#app',
    data: {
        articles:[],
        id:'',
        title:'',
        content:'',
        created_at:'',
        title_search:'',
        page_search:false,
        page_input:false,
        page_reader:false,
        page_edit:false,
    },
    methods: {
        cariArtikel(){
            axios({
                url: `http://localhost:3000/articles?title=${this.title_search}`,
                method: 'get',
            })
            .then(response=>{
                console.log(response)
            })
            .catch(err=>{
                console.log(err)
            })
        },
        createArtikel(){
            axios({
                url: 'http://localhost:3000/articles',
                method: 'post',
                data:{
                    title: this.title,
                    content: this.content,
                    created_at: new Date()
                }
            })
            .then(response=>{
                this.articles.push(response.data)
                this.articles.reverse()
                this.page_reader = true,
                this.page_input = false,
                this.title = '',
                this.content = ''             
            })
            .catch(err=>{
                console.log(err)
            })
        },
        deleteArtikel(input){
            axios({
                url: `http://localhost:3000/articles/${input}`,
                method: 'delete'
            })
            .then(response=>{
                this.articles = this.articles.filter(el=>{
                    if(el._id !== input) return el
                })
                this.articles.reverse()
            })
            .catch(err=>{
                console.log(err)
            })
        },
        editArtikel(input){
            console.log(input)
            axios({
                url: `http://localhost:3000/articles/${input}`,
                method: 'get',
            })
            .then(response=>{
                console.log(response.data)
                this.title = response.data.title,
                this.content = response.data.content
                this.id = response.data._id
                this.created_at = response.data.created_at
            })
            .catch(err=>{
                console.log(err)
            })
        },
        updateArtikel(id){
            axios({
                url: `http://localhost:3000/articles/${id}`,
                method: 'put',
                data:{
                    title:this.title,
                    content:this.content,
                    created_at:this.created_at,
                }
            })
            .then(response=>{
                this.page_reader = true,
                this.page_edit = false,
                this.title = '',
                this.content = ''
                this.id = ''
                this.articles = this.articles.map(el=>{
                    // console.log(el._id, "-----", response.data._id)
                    if(el._id === response.data._id){
                        el.title = response.data.title
                        el.content = response.data.content
                    }
                    return el
                })
            })
            .catch(err=>{
                console.log(err)
            })
        }
    },
    computed: {
        filterTitle:function(){
            return this.articles.filter((article)=>{
                return article.title.match(this.title_search)
            })
        }
    },
    created(){
        console.log('click get article')
        axios({
            url: 'http://localhost:3000/articles',
            method: 'get',
        })
        .then(respoonse=>{
            this.articles = respoonse.data
            this.page_reader = true
            console.log(this.articles)
        })
        .catch(err=>{
            console.log(err)
        })
    }
})
