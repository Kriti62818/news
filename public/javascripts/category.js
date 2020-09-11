new Vue({
    el:"#category",
    data:{
        category:{name:'',id:''},
        categories:[],
        deleteCategoryId:'',
        categoryCount:0,
        loggedInUser:{name:'',role:''},
        action:''
    },
    created(){
        this.getCategories()
        this.getLoggedInUser()
    },
    methods:{
        addCategory(){
            
            axios({method:"post",url:'/backend/addCategory',data:{category:this.category}})
            .then(r=>{
                console.log(r)
                
               
            })
            .catch(e=>{
                console.log(e)
            })

            if(this.category.id!='' && this.category.id!=null){
                this.action="edit"
            }
            else{
                this.action="add"
            }
           
            this.getCategories();
            this.$forceUpdate();
            this.empty()

        },
        getCategories(){
            this.categoryCount=0
            axios({method:"get",url:"/backend/getCategory"})
            .then(r=>{
                this.categories=r.data.categories,
                this.categoryCount+=r.data.categories.length
            })
            .catch(e=>{
                console.log(e)
            })
        },
        setDeleteCategory(id){
            this.deleteCategoryId=id
            
        },
        deleteCategory(){
            
            axios({method:"post",url:"/backend/deleteCategory",data:{categoryId:this.deleteCategoryId}})
            .then(r=>{
                console.log(r)
            })
            .catch(e=>{
                console.log(e)
            })
            this.action="delete"
            this.getCategories();
            this.$forceUpdate();
        },
        editCategory(id,name){
            this.category.id=id,
            this.category.name=name,
             this.getCategories()
        },
        empty(){
            this.category={name:'',id:''}
           
        },
        getLoggedInUser(){
            this.loggedInUser.name=JSON.parse(window.localStorage.getItem('Name'))
            this.loggedInUser.role=JSON.parse(window.localStorage.getItem('Role'))
            console.log(this.loggedInUser)
        }
    }

})