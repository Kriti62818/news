new Vue({
    el:'#user',
    data:{
        users:[],
       
        deleteUserId:'',
        roles:[],
        usersCount:0,
        loggedInUser:{name:'',role:''},
        action:'',
        year:new Date().getFullYear(),
        month:new Date().toLocaleString('default',{month:'long'}),
        day:new Date().getDate(),
        months:['January','February','March','April','May','June','July','August','September','October','November','December'],
        years:[],
        date:[],
        user:{id:'',name:'',email:'',password:'',role:'',joinedDate:''},
        pendingCount:0,
        publishedCount:0,
        checkedCount:0,
        writtenCount:0
    },
    created(){
        this.getUsers()
       this.getRoles()
       this.getLoggedInUser()
       
    },
    methods:{
        getCurrentDate(){
            this.year=(new Date().getFullYear())
            this.month=(new Date().toLocaleString('default',{month:'long'}))
            this.day=(new Date().getDate())
        },
        getUsers(){
            
            axios({method:"get",url:"/backend/getUsers"})
            .then(r=>{
                this.users=r.data.users,
                this.usersCount+=r.data.users.length
            })
            .catch(e=>{
                console.log(e)
            })
        },
        addUser(){
            this.usersCount=0
            axios({method:"post",url:"/backend/addUser",data:{user:this.user}})
            .then(r=>{
                console.log(r)
                this.getUsers()
            })
            .catch(e=>{
                console.log(e)
            })
            if(this.user.id!=null && this.user.id!=''){
                this.action='edit'
            }
            else{
                this.action='add'
            }
               
            this.$forceUpdate();
            this.getUsers(); 
           
            this.empty()    
        },
        deleteUser(){
            this.usersCount=0
            axios({method:"post",url:"/backend/deleteUser",data:{userId:this.deleteUserId}})
            .then(r=>{
                console.log(r)
            })
            .catch(e=>{
                console.log(e)
            })
            this.action='delete'
            this.$forceUpdate()
            this.getUsers();
            
        },
        setDeleteUser(userId){
            this.deleteUserId=userId
        },
        editUser(id,index){
            this.user.id=id,
            this.user.name=this.users[index].name,
            this.user.role=this.users[index].role,
            this.user.email=this.users[index].email
           
            this.getUsers()
        },
        empty(){
            this.user={name:'',email:'',password:'',role:''}
        },
        getRoles(){
            axios({method:"get",url:"/backend/getRoles"})
            .then(r=>{
                r.data.roles.forEach((role)=>{
                    this.roles.push(role.name)
                })
            })
            .catch(e=>{
                console.log(e)
            })
        },
        getLoggedInUser(){
            this.loggedInUser.name=JSON.parse(window.localStorage.getItem('Name'))
            this.loggedInUser.role=JSON.parse(window.localStorage.getItem('Role'))
            console.log(this.loggedInUser)
        },
        getPostsCount(){
            axios({method:"get",url:"/backend/getPosts"})
            .then(r=>{
                this.pendingCount=0;
                this.publishedCount=0;
                this.checkedCount=0;
                this.writtenCount=0;
                let posts=r.data.posts;
                posts.forEach((d)=>{
                    const writtenYear=(new Date(d.writtenDate).getFullYear());
                    const writtenMonth=(new Date(d.writtenDate).toLocaleString('default',{month:'long'}));
                    const writtenDay=(new Date(d.writtenDate).getDate())

                    const checkedYear=(new Date(d.checkedDate).getFullYear());
                    const checkedMonth=(new Date(d.checkedDate).toLocaleString('default',{month:'long'}));
                    const checkedDay=(new Date(d.checkedDate).getDate());

                    if(d.writtenBy==this.user.name && d.status=='pending' && writtenYear===this.year && writtenMonth===this.month && writtenDay===this.day){
                        this.pendingCount=this.pendingCount+1
                      }
                      else if(d.writtenBy==this.user.name && d.status=='published'  && writtenYear===this.year && writtenMonth===this.month && writtenDay===this.day){
                        this.publishedCount=this.publishedCount+1
                      }
                    if(d.checkedBy==this.user.name  && checkedYear===this.year && checkedMonth===this.month && checkedDay===this.day){
                        this.checkedCount=this.checkedCount+1
                      }
                     if(d.writtenBy==this.user.name  && writtenYear===this.year && writtenMonth===this.month && writtenDay===this.day){
                        this.writtenCount=this.writtenCount+1
                      }
                   
                })
                
            })
            .catch(e=>{
                console.log(e)
            })
            },
        showUserDetails(name,role,joinedDate){
            this.getCurrentDate()
            this.user.name=name,
            this.user.role=role,
            this.user.joinedDate=joinedDate,
            axios({method:"get",url:"/backend/getPosts"})
            .then(r=>{
                 this.pendingCount=0;
                 this.publishedCount=0;
                 this.checkedCount=0;
                 this.writtenCount=0;
                 let posts=r.data.posts;
                posts.forEach((d)=>{
                    const writtenYear=(new Date(d.writtenDate).getFullYear());
                    const writtenMonth=(new Date(d.writtenDate).toLocaleString('default',{month:'long'}));
                    const writtenDay=(new Date(d.writtenDate).getDate())

                    const checkedYear=(new Date(d.checkedDate).getFullYear());
                    const checkedMonth=(new Date(d.checkedDate).toLocaleString('default',{month:'long'}));
                    const checkedDay=(new Date(d.checkedDate).getDate());

                    if(d.writtenBy==this.user.name && d.status=='pending' && writtenYear===this.year && writtenMonth===this.month && writtenDay===this.day){
                        this.pendingCount=this.pendingCount+1
                      }
                      if(d.writtenBy==this.user.name && d.status=='published'  && writtenYear===this.year && writtenMonth===this.month && writtenDay===this.day){
                        this.publishedCount=this.publishedCount+1
                      }
                     if(d.checkedBy==this.user.name  && checkedYear===this.year && checkedMonth===this.month && checkedDay===this.day){
                        this.checkedCount=this.checkedCount+1
                      }
                     if(d.writtenBy==this.user.name && writtenYear===this.year && writtenMonth===this.month && writtenDay===this.day){
                        this.writtenCount=this.writtenCount+1
                      }
                   
                })
               

                const joinedYear=new Date(this.user.joinedDate).getFullYear();
                const currentYear=new Date().getFullYear();
                let years=[]
                for(i=joinedYear;i<=currentYear+3;i++){
                  
                   years.push(i)
                }
                this.years=years
                for(var i=1;i<=32;i++){
                    this.date.push(i)
                }
    
            })
            .catch(e=>{
                console.log(e)
            })
        },
       
       

    }

})