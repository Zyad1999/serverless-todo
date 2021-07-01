import 'source-map-support/register'
import * as uuid from 'uuid'
import { getUserId } from '../utils'
import { createTodo } from '../../businessLogic/todos'


import { APIGatewayProxyEvent, APIGatewayProxyHandler, APIGatewayProxyResult } from 'aws-lambda'
import { CreateTodoRequest } from '../../requests/CreateTodoRequest'
import { TodoItem } from '../../models/TodoItem'


export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  
  const newTodoBody: CreateTodoRequest = JSON.parse(event.body)
  const todoId:string = uuid.v4()
  const userId:string = getUserId(event)

  const newTodo:TodoItem = await createTodo(newTodoBody,todoId,userId)
  console.log("Creat new todo "+newTodo)
  // TODO: Implement creating a new TODO item
  return {
    statusCode: 201,
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
    body: JSON.stringify({item: newTodo})
  }
}