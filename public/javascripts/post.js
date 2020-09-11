Vue.use(CKEditor);

new Vue({
    el:'#post',
    components:{
        Multiselect:window.VueMultiselect.default
    },
    data:{
        editor: ClassicEditor,
        editorData: '<p>Content of the editor.</p>',
        editorConfig: {
           
        },
        posts:[],
        postsCount:0,
        post:{id:'',title:'',metaDescription:'',category:'',featuredImage:'',excerpt:'',tags:[],description:''},
        deletePostId:'',
        categories:[],
        publishedPosts:[],
        publishedPostsCount:0,
        tpublishedPostsCount:0,
        tlpublishedPostsCount:0,
        pendingPosts:[],
        pendingPostsCount:0,
        unpublishedPosts:[],
        unpublishedPostsCount:0,
        lunpublishedPostsCount:0,
        lunpublishedPostsCount:[],
        lpendingPostsCount:0,
        lpendingPosts:[],
        lpublishedPostsCount:0,
        lpublishedPosts:[],
        leditedPosts:[],
        leditedPostsCount:0,
        tlunpublishedPostsCount:0,
        tunpublishedPostsCount:0,
        tleditedPostsCount:0,
        loggedInUser:{name:'',role:''},
        action:'',
        date:'',
        year:'',
        month:''
        },
    created(){
        this.getCategories()
        this.getPosts()
        this.getEditPostsContent()
        this.getLoggedInUser()
        this.getTodaysDate()
    },
    methods:{
        addTags(newTag){
            this.post.tags.push(newTag)
        },
        getPosts(){
            this.pendingPosts=[],
            this.publishedPosts=[],
            this.unpublishedPosts=[],
            this.pendingPostsCount=0,
            this.publishedPostsCount=0,
            this.unpublishedPostsCount=0,

            this.lpendingPosts=[],
            this.lpublishedPosts=[],
            this.lunpublishedPosts=[],
            this.lpendingPostsCount=0,
            this.lpublishedPostsCount=0,
            this.lunpublishedPostsCount=0,
            this.tpublishedPostsCount=0,
            this.leditedPosts=[],
            this.leditedPostsCount=0,
            this.tlpublishedPostsCount=0
            this.tlunpublishedPostsCount=0
            this.tunpublishedPostsCount=0
            this.tleditedPostsCount=0
            
            axios({method:"get",url:"/backend/getPosts"})
            .then(r=>{
                r.data.posts.forEach((post)=>{
                    if(post.status=='published'){
                    this.publishedPosts.push(post)
                    this.publishedPostsCount+=1
                    
                    var writtenDate=new Date(post.writtenDate)
                    var pdate=writtenDate.getDate();
                    var pmonth=writtenDate.getMonth();
                    var pyear=writtenDate.getFullYear();

                    var checkedDate=new Date(post.checkedDate)
                    var cdate=checkedDate.getDate();
                    var cmonth=checkedDate.getMonth();
                    var cyear=checkedDate.getFullYear();
                    
                    if(post.writtenBy==this.loggedInUser.name){
                            this.lpublishedPosts.push(post)
                            this.lpublishedPostsCount+=1
                        }
                        if(post.writtenBy==this.loggedInUser.name && pdate==this.date && pmonth==this.month && pyear==this.year){
                            
                            this.tlpublishedPostsCount+=1
                        }
                        if(pdate==this.date && pmonth==this.month && pyear==this.year){
                            
                            this.tpublishedPostsCount+=1
                        }
                        if(post.checkedBy==this.loggedInUser.name){
                            this.leditedPosts.push(post)
                            this.leditedPostsCount+=1
                        }
                        if(post.checkedBy==this.loggedInUser.name && cdate==this.date && cmonth==this.month && cyear==this.year)
                       
                        this.tleditedPostsCount+=1
                    }
                    else if(post.status=='unpublished'){
                        var writtenDate=new Date(post.writtenDate)
                        var pdate=writtenDate.getDate();
                        var pmonth=writtenDate.getMonth();
                        var pyear=writtenDate.getFullYear();

                        this.unpublishedPosts.push(post)
                        this.unpublishedPostsCount+=1
                        
                        if( pdate==this.date && pmonth==this.month && pyear==this.year){
                            this.tunpublishedPostsCount+=1
                        }

                        if(post.writtenBy==this.loggedInUser.name){
                            this.lunpublishedPosts.push(post)
                            this.lunpublishedPostsCount+=1
                        }
                        if(post.writtenBy==this.loggedInUser.name  && pdate==this.date && pmonth==this.month && pyear==this.year){
                            this.tlunpublishedPostsCount+=1
                        }
                    }
            
                    else if(post.status=='pending'){
                        var writtenDate=new Date(post.writtenDate)
                        var pdate=writtenDate.getDate();
                        var pmonth=writtenDate.getMonth();
                        var pyear=writtenDate.getFullYear();
                        if(post.writtenBy==this.loggedInUser.name){
                            this.lunpublishedPosts.push(post)
                            this.lunpublishedPostsCount+=1
                        }
                        if(post.writtenBy==this.loggedInUser.name  && pdate==this.date && pmonth==this.month && pyear==this.year){
                            this.tlunpublishedPostsCount+=1
                        }
                        if(post.checkedBy==this.loggedInUser.name){
                        this.pendingPosts.push(post)
                        this.pendingPostsCount+=1

                        var checkedDate=new Date(post.checkedDate)
                        var cdate=checkedDate.getDate();
                        var cmonth=checkedDate.getMonth();
                        var cyear=checkedDate.getFullYear();

                        
                        if(post.writtenBy==this.loggedInUser.name){
                            this.lunpublishedPosts.push(post)
                            this.lunpublishedPostsCount+=1
                        }
                        if(post.checkedBy==this.loggedInUser.name){
                            this.leditedPosts.push(post)
                            this.leditedPostsCount+=1
                        }
                        if(post.checkedBy==this.loggedInUser.name && cdate==this.date && cmonth==this.month && cyear==this.year){
                            
                            this.tleditedPostsCount+=1
                        }
                    }

                    }

                    // if(post.status=='unpublished' || post.status=='pending'){
                    //     if(post.writtenBy==this.loggedInUser.name){
                    //         this.lunpublishedPosts.push(post)
                    //         this.lunpublishedPostsCount+=1
                    //     }
                    // }

                })
            })
            .catch(e=>{
                console.log(e)
            })
            console.log(this.posts)
        },
        addPost(){
            console.log(this.post.description)
            axios({method:"post",url:"/backend/addPost",data:{post:this.post,user:this.loggedInUser.name}})
            .then(r=>{
                console.log(r)
                
            })
            .catch(e=>{
                console.log(e)
            })
            if(this.post.id!=null && this.post.id!=''){
                this.action='edit'
            }
            else{
                this.action='add'
            }
            window.location='/backend/posts'
        },
        deletePost(){
            console.log(this.deletePostId)
            axios({method:"post",url:"/backend/deletePost",data:{postId:this.deletePostId}})
            .then(r=>{
                console.log(r)
            })
            .catch(e=>{
                console.log(e)
            })
            this.action='delete'
            this.$forceUpdate()
            this.getPosts()
        },
        publishPost(id){
            axios({method:"post",url:"/backend/editStatus/"+id})
            .then(r=>{
                console.log(r)
            })
            .catch(e=>{
                console.log(e)
            })
            
            this.getPosts()
        },
        setDeletePostsId(id){
            this.deletePostId=id
            console.log(this.deletePostId)
        },
        editPost(id){
           
            window.location=`/backend/editPost/${id}`
            
        },
        viewPost(id){
            window.location=`/backend/getPost/${id}`
        },
        getEditPostsContent(){
            let url=window.location.href.split('/');
            url=url[url.length-1];
            console.log(url)
            axios({method:"get",url:"/backend/getPosts"})
            .then(r=>{
                r.data.posts.forEach((d)=>{
                    if(d._id==url){
                        d.tags.forEach((tag)=>{
                            this.post.tags.push(tag.name)
                        })
                        this.post.id=d._id,
                        this.post.title=d.title,
                        this.post.category=d.category,
                        this.post.metaDescription=d.metaDescription,
                        this.post.excerpt=d.excerpt,
                        this.post.description=d.description
                    }
                })
            })
            .catch(e=>{
                console.log(e)
            })
        },
        getCategories(){
            axios({method:"get",url:"/backend/getCategory"})
            .then(r=>{
                r.data.categories.forEach((category)=>{
                    this.categories.push(category.name)
                })
            })
            .catch(e=>{
                console.log(e)
            })
            console.log(this.categories)
        },
        getLoggedInUser(){
            this.loggedInUser.name=JSON.parse(window.localStorage.getItem('Name'))
            this.loggedInUser.role=JSON.parse(window.localStorage.getItem('Role'))
            console.log(this.loggedInUser)
        },
        getTodaysDate(){
            var today=new Date();
             this.date=today.getDate();
            this.month=today.getMonth();
        this.year=today.getFullYear();
        }
    }
})