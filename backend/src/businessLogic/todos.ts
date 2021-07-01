import { TodoItem } from '../models/TodoItem'
import { TodoAccess } from '../dataLayer/todossAccess'
import { StorageAccess } from '../dataLayer/storageAccess'
import { CreateTodoRequest } from '../requests/CreateTodoRequest'
import { UpdateTodoRequest } from '../requests/UpdateTodoRequest'

const todoAccess = new TodoAccess()
const storageAccess = new StorageAccess()

export async function getAllTodos(userId:string): Promise<TodoItem[]> {
    return await todoAccess.getAllTodos(userId)
}

export async function createTodo(newTodo: CreateTodoRequest,todoId:string,userId:string): Promise<TodoItem>{
    const createdAt = new Date().toISOString()
    const newItem:TodoItem = {
        userId,
        createdAt,
        todoId,
        ...newTodo,
        done: false
    }
    console.log("Created new item " + newItem)
    await todoAccess.createTodo(newItem)
    console.log("Added new item")
    return newItem
}

export async function deleteTodo(todoId:string,userId:string){
    await todoAccess.deleteTodo(todoId,userId)
}

export async function updateTodo(todoId:string,userId:string,updatedTodo: UpdateTodoRequest){
    await todoAccess.updateTodo(todoId,userId,updatedTodo)
}

export function getUploadUrl(todoId:string): string{
    return storageAccess.getS3UploadUrl(todoId)
}

export async function addTodoAttachment(todoId:string,userId:string){
    await todoAccess.addAtatchment(todoId,userId)
}