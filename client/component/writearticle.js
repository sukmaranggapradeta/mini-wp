Vue.component('form-add-article', {
    data() {
      return {
        inputarticle: {
            title: '',
            content: '',
            featured_image: '',
            // text:'',
        }
      }
    },
    components: {
        wysiwyg: vueWysiwyg.default.component,
      },
    methods: {
        kirim() {
        this.$emit('addarticle', this.inputarticle);
        this.inputarticle = {
            title: '',
            content: '',
            featured_image: '',
            // text:''
        }
      },
    //   inputfile(){
    //       this.$emit('')
    //   }
    },
    template: `
    <div>
        <form method="post" enctype="multipart/form-data">
            <br>
            <h2>Write Article</h2>
            <br>
            <input v-model="inputarticle.title" class="form-control" type="text" placeholder="Title..."><br>
            <wysiwyg v-model="inputarticle.text"></wysiwyg>
            <textarea class="form-control" v-model="inputarticle.content" rows="5"
                placeholder="Conten Description..."></textarea><br>
                <input type="file" id="file" ref="file" v-on:change="handleFileUpload()"/>  <br>  
                <button class="btn btn-success" @click.prevent="kirim()">Post Article</button><br>
        </form>
    </div>
    `
  })