function onSignIn(googleUser) {
    console.log('masuk google')
    // var profile = googleUser.getBasicProfile();
    let token = googleUser.getAuthResponse().id_token;
    console.log(token, "ini token google")
    axios({
        url: 'http://127.0.0.1:3000/api/google',
        method: 'post',
        headers:{
            token: token
        }
    })
    .then(user=>{
        console.log(user.data)
        return  axios({
            url: `http://127.0.0.1:3000/users/findEmail/${user.data.data.email}`,
            method: 'get',
        })
        .then(found=>{
            console.log(user.data)
            console.log(found, "ini found")
            if (found === null){
                console.log('create baru')
                return axios({
                    url:`http://127.0.0.1:3000/users/register`,
                    method: 'post',
                    data:{
                        name:user.data.data.name,
                        email: user.data.data.email,
                        password: 'this.password'
                    }
                })
                .then(newUser=>{
                    console.log(newUser, 'userbaru')
                    localStorage.setItem('token',user.data.token)
                    localStorage.setItem('id',found.data._id)
                    localStorage.setItem('name',user.data.data.name)
                    app.page_home= true
                    app.page_login=false            
                })
            }else{
                console.log('sudah ada')
                console.log(user.data.token)
                    localStorage.setItem('token',user.data.token)
                    localStorage.setItem('id',found.data._id)
                    localStorage.setItem('name',user.data.data.name)
                app.page_home=true
                app.page_login=false            
            }
        })
    })
    .catch(err=>{
        console.log(err)
    })

  }

  function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      console.log('User signed out.');
      app.page_home = false
        app.page_login = true
        localStorage.removeItem('token')
        localStorage.removeItem('id')
        localStorage.removeItem('name')
        // localStorage.removeItem('email')
        app.logout()
    });
  }

var app = new Vue({
    el: '#app',
    data: {
        articles:[],
        id:'',
        title:'',
        content:'',
        created_at:'',
        featured_image:'',
        name:'',
        email:'',
        password:'',
        register_name:'',
        register_email:'',
        register_password:'',
        register_confirm_password:'',        
        author:localStorage.getItem('id'),
        author_name:localStorage.getItem('name'),    
        title_search:'',
        file:'',
        page_search:false,
        page_input:false,
        page_reader:false,
        page_edit:false,
        page_home:false,
        page_login:true,
        page_signup:false
    },  
    methods: {
        handleFileUpload(){
            this.file = this.$refs.file.files[0];
            console.log(this.file)
        },
        submitFile(){
            let formData = new FormData();
            formData.append('image', this.file);
            console.log(formData)

            axios.post( 'http://localhost:3000/articles/upload',
            formData,
            {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
            }
                ).then((data)=>{
                    console.log(data.data);
                    return axios({
                        url: 'http://localhost:3000/articles',
                        // url: 'http://localhost:3000/articles/upload',
                        method: 'post',
                        data:{
                            title: this.title,
                            content: this.content,
                            created_at: new Date(),
                            featured_image: data.data,
                            author:localStorage.getItem('id')
                        },
                        headers:{
                            token: localStorage.getItem('token')
                        }
                    })
                    .then(response=>{
                        this.articles.push(response.data)
                        // this.articles.reverse()                
                        this.page_reader = true,
                        this.page_input = false,
                        this.title = '',
                        this.content = '',
                        this.featured_image = ''
                        this.author = ''
                        Swal.fire({
                            type: 'success',
                            title: 'Created success.',
                            showConfirmButton: false,
                            timer: 1500
                        })
                    })
         
                })
                .catch(function(){
                    console.log('FAILURE!!');
                    Swal.fire({
                        title: 'Error!',
                        text: 'Connection Error!',
                        type: 'warning',
                        confirmButtonText: 'OK'
                      })
                });
        },
        register(){
            if (this.register_password === this.register_confirm_password){
                console.log('cari email')
                console.log(this.register_email)
                axios({
                    url: `http://127.0.0.1:3000/users/findEmail/${this.register_email}`,
                    method: 'get',
                })
                .then(found=>{
                    console.log(found.data)
                    if (found.data == null){
                        axios({
                            url:`http://127.0.0.1:3000/users/register`,
                            method: 'post',
                            data:{
                                name:this.register_name,
                                email: this.register_email,
                                password: this.register_password
                            }
                        })
                        .then(newUser=>{
                            console.log(newUser)
                            Swal.fire({
                                type: 'success',
                                title: 'Register success.',
                                confirmButtonText: 'OK'
                            })
                            this.page_login=true
                            this.page_signup=false
                            this.register_name=''
                            this.register_email=''
                            this.register_password=''
                            this.register_confirm_password=''
                        })
                        .catch(err=>{
                            console.log(err)
                            Swal.fire({
                                title: 'Error!',
                                text: 'Connection Error!',
                                type: 'warning',
                                confirmButtonText: 'OK'
                              })
                        })
                    }else{
                        Swal.fire({
                            title: 'Warning!',
                            text: 'Email Already in use!',
                            type: 'warning',
                            confirmButtonText: 'OK'
                          })
                    }
                })
                .catch(err=>{
                    console.log(err)
                    Swal.fire({
                        title: 'Error!',
                        text: 'Connection Error!',
                        type: 'warning',
                        confirmButtonText: 'OK'
                      })
                })
            }else{
                  Swal.fire({
                    title: 'Information!',
                    text: 'Password not macth',
                    type: 'info',
                    confirmButtonText: 'OK'
                  })
            }
        },
        login(){
            axios({
                url:`http://localhost:3000/users/login`,
                method: 'post',
                data:{
                    email: this.email,
                    password: this.password
                }
            })
            .then(user=>{
                console.log(user)
                Swal.fire({
                    type: 'success',
                    title: `Welcome ${user.data.currentUser.name}`,
                    showConfirmButton: false,
                    timer: 1500
                  })
                localStorage.setItem('token',user.data.token)
                localStorage.setItem('id',user.data.currentUser.userId)
                localStorage.setItem('name',user.data.currentUser.name)
                this.isLogin()
            })
            .catch(err=>{
                console.log(err)
                Swal.fire({
                    title: 'Email/Password wrong!',
                    text: 'Please input the correct email and password',
                    type: 'warning',
                    confirmButtonText: 'OK'
                  })
            })
        },
        logout(){
            // signOut()
            console.log('keluar')
            // gapi.signin2.render('my-signin2', {
            //     'scope': 'profile email',
            //     'width': 140,
            //     'height': 50,
            //     'longtitle': true,
            //     'theme': 'dark',
            //     // 'onsuccess': onSuccess,
            //     // 'onfailure': onFailure
            //   });
            localStorage.removeItem('token')
            localStorage.removeItem('id')
            localStorage.removeItem('name')
            localStorage.removeItem('email')
            this.email='',
            this.password='',
            this.isLogin()
        },
        // signOut() {
        //     swal.fire({
        //         title: "Are you sure?",
        //         text: "We don't want to see you go so early :(",
        //         icon: "warning",
        //         buttons: true
        //     })
        //         .then((willLogout) => {
        //             if (willLogout) {
        //                 var auth2 = gapi.auth2.getAuthInstance();
        //                 auth2.signOut().then(function () {
        //                     console.log('User signed out.')
        //                 })
        //             localStorage.removeItem('token')
        //             localStorage.removeItem('id')
        //             localStorage.removeItem('name')
        //             localStorage.removeItem('email')
        //             this.isLogin()
        //             }
        //         })
        //         .catch((err) => {
        //             console.log(err)
        //         })

        // },
        cariArtikel(){
            axios({
                url: `http://localhost:3000/articles?title=${this.title_search}`,
                method: 'get',
                headers:{
                    token: localStorage.getItem('token')
                }
            })
            .then(response=>{
                console.log(response)
            })
            .catch(err=>{
                console.log(err)
                swal({
                    title: "ERROR!",
                    text: `${err.message}`,
                    icon: "error",
                    button: "Aww yiss!",
                  });
            })
        },
        // upload(event) {
        //     this.featured_image = event.target.files[0]
        //     console.log(this.featured_image)
        // },
        createArtikel(){
            axios({
                url: 'http://localhost:3000/articles',
                // url: 'http://localhost:3000/articles/upload',
                method: 'post',
                data:{
                    title: this.title,
                    content: this.content,
                    created_at: new Date(),
                    featured_image: this.featured_image,
                    author:localStorage.getItem('id')
                },
                headers:{
                    token: localStorage.getItem('token')
                }
            })
            .then(response=>{
                this.articles.push(response.data)
                // this.articles.reverse()                
                this.page_reader = true,
                this.page_input = false,
                this.title = '',
                this.content = '',
                this.featured_image = ''
                this.author = ''
                Swal.fire({
                    type: 'success',
                    title: 'Created success.',
                    showConfirmButton: false,
                    timer: 1500
                })
            })
            .catch(err=>{
                swal({
                    title: "ERROR!",
                    text: `${err.message}`,
                    icon: "error",
                    button: "Aww yiss!",
                  });
            })
        },
        deleteArtikel(input){
            Swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                type: 'question',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
              }).then((result) => {
                if (result.value) {
                    console.log(input,' ini input')
                    axios({
                        url:`http://localhost:3000/articles/${input}`,
                        method: 'get',
                        headers:{
                            token: localStorage.getItem('token')
                        }
                    })
                    .then(article=>{
                        if (article.data.author._id === localStorage.getItem('id')){
                            // console.log(article)
                            axios({
                                url: `http://localhost:3000/articles/${input}`,
                                method: 'delete',
                                headers:{
                                    token: localStorage.getItem('token')
                                }
                            })
                            .then(response=>{
                                console.log(response, `ini response client`)
                                this.articles = this.articles.filter(el=>{
                                    if(el._id !== input) return el
                                })
                                Swal.fire({
                                    type: 'success',
                                    title: 'Deleted succes.',
                                    showConfirmButton: false,
                                    timer: 1500
                                })
                            })
                            .catch(err=>{
                                console.log(err)
                            })
                        }else{
                            // console.log('anda tidak punya wewenang')
                            Swal.fire({
                                title: 'Access Denied ',
                                text: 'you dont have authorization to delete this content',
                                type: 'warning',
                                confirmButtonText: 'OK'
                              })
                        }
                    })
                    .catch(err=>{
                        console.log(err)
                    })
                }
              })
        },
        editArtikel(input){
            console.log(input)
            axios({
                url: `http://localhost:3000/articles/${input}`,
                method: 'get',
                headers:{
                    token: localStorage.getItem('token')
                }

            })
            .then(article=>{
                if (article.data.author._id === localStorage.getItem('id')){
                    console.log(article.data)
                    this.title = article.data.title,
                    this.content = article.data.content
                    this.id = article.data._id
                    this.created_at = article.data.created_at
                    this.page_edit = true, 
                    this.page_reader = false    
                }else{
                    Swal.fire({
                        title: 'Access Denied ',
                        text: 'you dont have authorization to edit this content',
                        type: 'warning',
                        confirmButtonText: 'OK'
                      })
                }
            })
            .catch(err=>{
                console.log(err)
                swal({
                    title: "ERROR!",
                    text: `${err.message}`,
                    icon: "error",
                    button: "Aww yiss!",
                  });
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
                },
                headers:{
                    token: localStorage.getItem('token')
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
                swal({
                    title: "ERROR!",
                    text: `${err.message}`,
                    icon: "error",
                    button: "Aww yiss!",
                  });
            })
        },
        isLogin(){
            if(localStorage.getItem('token')){
                this.page_login = false
                this.page_home = true
            }else{
                this.page_login = true
                this.page_home = false
            }
        },

        
    },
    // mounted() {
        // gapi.signin2.render('my-signin2', {
        //     'scope': 'profile email',
        //     'theme': 'dark',
        //     'onsuccess': this.onSuccess,
        //     'onfailure': this.onFailure
        //   });
    // },
    computed: {
        filterTitle:function(){
            return this.articles.filter((article)=>{
                return article.title.match(this.title_search)
            })
        }
    },
    created(){
        this.isLogin()
        // $('#summernote').summernote();
        // console.log('click get article')
        axios({
            url: 'http://localhost:3000/articles',
            method: 'get',
        })
        .then(respoonse=>{
            this.articles = respoonse.data
            this.page_reader = true
            // console.log(this.articles)
        })
        .catch(err=>{
            console.log(err)
        })
    }
})
