import 'source-map-support/register'

import { APIGatewayProxyEvent, APIGatewayProxyResult, APIGatewayProxyHandler } from 'aws-lambda'
import { getUserId } from '../utils'
import { deleteTodo } from '../../businessLogic/todos'


export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const todoId = event.pathParameters.todoId
  const userId:string = getUserId(event)
  console.log("Delete todo "+todoId)

  // TODO: Remove a TODO item by id
  if(todoId){
    await deleteTodo(todoId,userId)
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
