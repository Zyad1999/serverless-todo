import * as AWS  from 'aws-sdk'
import { DocumentClient } from 'aws-sdk/clients/dynamodb'

import { TodoItem } from '../models/TodoItem'
import { UpdateTodoRequest } from '../requests/UpdateTodoRequest'



export class TodoAccess {

  constructor(
    private readonly docClient: DocumentClient = new AWS.DynamoDB.DocumentClient(),
    private readonly todosIndex = process.env.INDEX_NAME,
    private readonly bucketName = process.env.TODOS_S3_BUCKET,
    private readonly todosTable = process.env.TODOS_TABLE) {
  }

  async getAllTodos(userId:string): Promise<TodoItem[]> {
    const result = await this.docClient.query({
        TableName: this.todosTable,
        IndexName: this.todosIndex,
        KeyConditionExpression: 'userId = :userId',
        ExpressionAttributeValues: {
          ':userId': userId
        }
      })
      .promise()
    console.log("Return all todos for user " + userId)
    return result.Items as TodoItem[]
  }

  async createTodo(todo:TodoItem){
    await this.docClient
    .put({
      TableName: this.todosTable,
      Item: todo
    })
    .promise()
    console.log("Create new todo")
  }

  async deleteTodo(todoId:string,userId:string){
    await this.docClient
    .delete({
      TableName: this.todosTable,
      Key: {
        userId: userId,
        todoId: todoId
      }
    })
    .promise()
    console.log("Delete todo item " + todoId + "for the user "+ userId)
  }

  async updateTodo(todoId:string,userId:string,updatedTodo: UpdateTodoRequest){
    await this.docClient
    .update({
      TableName: this.todosTable,
      Key: {
        userId: userId,
        todoId: todoId
      },
      ExpressionAttributeNames: {
        '#name': 'name'
      },
      UpdateExpression:
        'set #name = :name, dueDate = :dueDate, done = :done',
      ExpressionAttributeValues: {
        ':name': updatedTodo.name,
        ':dueDate': updatedTodo.dueDate,
        ':done': updatedTodo.done
      }
    })
    .promise()
    console.log("Update todo item "+ todoId+"for user "+ userId)
  }
  
  async addAtatchment(todoId:string,userId:string){
    await this.docClient
    .update({
      TableName: this.todosTable,
      Key: {
        userId: userId,
        todoId: todoId
      },
      UpdateExpression:
        'set attachmentUrl = :attachmentUrl',
      ExpressionAttributeValues: {
        ':attachmentUrl': `https://${this.bucketName}.s3.amazonaws.com/${todoId}`
      }
    })
    .promise()
    console.log("Add atachment for the todo item "+todoId + "of the user "+userId)
  }
}