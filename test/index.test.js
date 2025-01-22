const axios = require('axios')

//taking a demo backend url
const BACKEND_URL = "http://localhost:3000"

//first we have to check for authentication 
describe("Authentication", ()=>{

    test("user can only signup once with the same username", async ()=>{

        let username = `testUser-${Math.random()}`
        let password = "123456"

        const signUpResponse = await axios.post(`${BACKEND_URL}/api/user`, {
            username,
            password
        })
    
        expect(signUpResponse.status).toBe(200)

        const updatedSignUpResponse = await axios.post(`${BACKEND_URL}/api/user`, {
            username,
            password
        })
    
        expect(updatedSignUpResponse.status).toBe(400)
    })

    test("User cannot signup without a username", async ()=>{
        let username = `testUser-${Math.random()}`
        let password = "123456"

        const signUpResponse = await axios.post(`${BACKEND_URL}/api/user`, {
            password
        })
    
        expect(signUpResponse.status).toBe(400)
    })
    
    test("Successful signin with correct username and password", async ()=>{
        let username = `testUser-${Math.random()}`
        let password = "123456"

        const signUpResponse = await axios.post(`${BACKEND_URL}/api/user`, {
            username,
            password
        })

        const signInResponse = await axios.post(`${BACKEND_URL}/api/auth/signin`, {
            username,
            password
        })

        expect(signInResponse.status).toBe(200)
        expect(signInResponse.body.token).toBeDefined()
    })

    test("Signin fails if the username or password is wrong", async ()=>{
        let username = `testUser-${Math.random()}`
        let password = "123456"

        const signUpResponse = await axios.post(`${BACKEND_URL}/api/user`, {
            username,
            password
        })

        const signInResponse = await axios.post(`${BACKEND_URL}/api/auth/signin`, {
            username : "testUser",
            password : "Something wrong"
        })

        expect(signInResponse.status).toBe(403)
    })
})

describe("Creating a Todo", ()=>{
    let token;

    beforeAll(async()=>{
        let username = `testUser-${Math.random()}`;
        let password = "123456";

        const signUpResponse = await axios.post(`${BACKEND_URL}/api/user`, {
            username,
            password
        })

        const signInResponse = await axios.post(`${BACKEND_URL}/api/auth/signin`, {
            username,
            password
        })

        token = signInResponse.data.token
    })

    test("User is able to create a todo with token",async ()=>{
        const createTodo = await axios.post(`${BACKEND_URL}/api/user/todo`, {
            title : "Test Todo",
            completed : false
        }, {
            headers : {
                authorization : `Bearer ${token}`
            }
        })

        expect(createTodo.status).toBe(201)
        expect(createTodo.data.todoId).toBeDefined()
    })

    test("user is not able to create a todo without token",async ()=>{
        const createTodo = await axios.post(`${BACKEND_URL}/api/user/todo`, {
            title : "Test Todo",
            completed : false
        })

        expect(createTodo.status).toBe(403)
    })
})

describe("Updating a todo", ()=>{

    let token;
    let todoId;

    beforeAll(async()=>{
        let username = `testUser-${Math.random()}`;
        let password = "123456";

        const signUpResponse = await axios.post(`${BACKEND_URL}/api/user`, {
            username,
            password
        })

        const signInResponse = await axios.post(`${BACKEND_URL}/api/auth/signin`, {
            username,
            password
        })

        token = signInResponse.data.token

         const createTodo = await axios.post(`${BACKEND_URL}/api/user/todo`, {
                title : "Test Todo",
                completed : false
            }, {
                headers : {
                    authorization : `Bearer ${token}`
                }
            })

            todoId = createTodo.data.todoId
        })

        
    test("user is able to update the completion of specific todo",async ()=>{
        const completedToDo = await axios.put(`${BACKEND_URL}/api/user/todo/${todoId}`, {
            completed : true
        }, {
            headers : {
                authorization : `Bearer ${token}`
            }
        })

        expect(completedToDo.status).toBe(200)
    })

    test("user is not able to update the completion without token",async ()=>{
        const completedToDo = await axios.put(`${BACKEND_URL}/api/user/todo/${todoId}`, {
            completed : true
        })

        expect(completedToDo.status).toBe(403)
    })

    test("User is able to update the title of todo ", async ()=>{
        const updateToDo = await axios.put(`${BACKEND_URL}/api/user/todo/${todoId}`, {
            title : "New todo"
        }, {
            headers : {
                authorization : `Bearer ${token}`
            }
        })
        expect(updateToDo.status).toBe(200)
    })  

    test("User is not able to update the title without token", async ()=>{
        const updateToDo = await axios.put(`${BACKEND_URL}/api/user/todo/${todoId}`, {
            title : "New todo"
        })
        expect(updateToDo.status).toBe(403)
    }) 

    test("User cannot update todo with an empty title", async ()=>{
        const updateToDo = await axios.put(`${BACKEND_URL}/api/user/todo/${todoId}`, {
            title : ""
        }, {
            headers : {
                authorization : `Bearer ${token}`

            }
        })
        expect(updateToDo.status).toBe(400)
    })
})

describe("Deleting a todo", ()=>{
    let token;
    let todoId;

    beforeAll(async()=>{
        let username = `testUser-${Math.random()}`;
        let password = "123456";

        const signUpResponse = await axios.post(`${BACKEND_URL}/api/user`, {
            username,
            password
        })

        const signInResponse = await axios.post(`${BACKEND_URL}/api/auth/signin`, {
            username,
            password
        })

        token = signInResponse.data.token

         const createTodo = await axios.post(`${BACKEND_URL}/api/user/todo`, {
                title : "Test Todo",
                completed : false
            }, {
                headers : {
                    authorization : `Bearer ${token}`
                }
            })

            todoId = createTodo.data.todoId
        })

    test("User is able to delete a todo with token", async ()=>{
        const deleteResponse = await  axios.delete(`${BACKEND_URL}/api/user/todo/${todoId}`, {
            headers : {
                authorization : `Bearer ${token}`
            }
        })

        expect(deleteResponse.status).toBe(200)
    })

    test("User is not able to delete a todo without token", async ()=>{
        const deleteResponse = await axios.delete(`${BACKEND_URL}/api/user/todo/${todoId}`)

        expect(deleteResponse.status).toBe(403)
    })
})









