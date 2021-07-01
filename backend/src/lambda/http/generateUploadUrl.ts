import 'source-map-support/register'
import { getUploadUrl,addTodoAttachment } from '../../businessLogic/todos'
import { getUserId } from '../utils'

import { APIGatewayProxyEvent, APIGatewayProxyResult, APIGatewayProxyHandler } from 'aws-lambda'

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const todoId = event.pathParameters.todoId
  const userId:string = getUserId(event)

  // TODO: Return a presigned URL to upload a file for a TODO item with the provided id
  const signedURL:string = getUploadUrl(todoId)
  await  addTodoAttachment(todoId,userId)
  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
    body: JSON.stringify({
      uploadUrl: signedURL
    })
  }
}
