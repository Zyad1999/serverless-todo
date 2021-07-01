import 'source-map-support/register'

import { APIGatewayProxyEvent, APIGatewayProxyHandler, APIGatewayProxyResult } from 'aws-lambda'

import { UpdateTodoRequest } from '../../requests/UpdateTodoRequest'
import { getUserId } from '../utils'
import { updateTodo } from '../../businessLogic/todos'


export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const todoId = event.pathParameters.todoId
  const updatedTodo: UpdateTodoRequest = JSON.parse(event.body)
  const userId:string = getUserId(event)

  // TODO: Update a TODO item with the provided id using values in the "updatedTodo" object
  if(todoId){
    await updateTodo(todoId,userId,updatedTodo)
    console.log("Updated Todo "+todoId)
    return {
      statusCode: 202,
      headers: {
        'Access-Control-Allow-Origin': '*'
      },
      body:''
    }
  }
  return {
    statusCode: 400,
    body:'Invalid Todo ID'
  }
}
