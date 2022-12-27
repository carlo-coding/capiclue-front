interface IErrorCodeMessages {
  [s: string]: string
}

export async function checkError<T>(
  response: Response,
  codeMessages?: IErrorCodeMessages
): Promise<T> {
  if (response.status >= 200 && response.status <= 299) {
    return (await response.json()) as T
  } else {
    const errorText =
      codeMessages?.[response.status] !== undefined
        ? codeMessages[response.status]
        : response.statusText
    throw Error(errorText)
  }
}
