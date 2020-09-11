new Vue({
    el:"#role",
    data:{
        role:{name:'',id:''},
        roles:[],
        deleteRoleId:'',
        rolesCount:0,
        action:'',
        loggedInUser:{name:'',role:''}
    },
    created(){
        this.getRoles()
        this.getLoggedInUser()
    },
    methods:{
        addRole(){
            
            this.rolesCount=0
            console.log(this.role.name)
            axios({method:"post",url:'/backend/addRole',data:{role:this.role}})
            .then(r=>{
                console.log(r)
                
               
            })
            .catch(e=>{
                console.log(e)
            })
            if(this.role.id!=null && this.role.id!=''){
                this.action="edit"
            }
            else{
                this.action="add"
            }
            this.getRoles();
            this.$forceUpdate();
            this.empty()

        },
        
        getRoles(){
            
            this.action.msg=''
            axios({method:"get",url:"/backend/getRoles"})
            .then(r=>{
                this.roles=r.data.roles
                this.rolesCount+=r.data.roles.length
            })
            .catch(e=>{
                console.log(e)
            })
        },
        setDeleteRole(id){
            this.deleteRoleId=id,
            console.log(this.deleteRoleId)
        },
        deleteRole(){
            this.rolesCount=0
            console.log(this.deleteRoleId)
            axios({method:"post",url:"/backend/deleteRole",data:{roleId:this.deleteRoleId}})
            .then(r=>{
                console.log(r)
            })
            .catch(e=>{
                console.log(e)
            })
            this.action="delete";
            
            this.getRoles();
            this.$forceUpdate();
        },
        editRole(id,name){
            this.role.id=id,
            this.role.name=name,
             this.getRoles()
        },
        empty(){
            this.role={name:'',id:''}
           
        },
        getLoggedInUser(){
            this.loggedInUser.name=JSON.parse(window.localStorage.getItem('Name'))
            this.loggedInUser.role=JSON.parse(window.localStorage.getItem('Role'))
            console.log(this.loggedInUser)
        }
    }

})