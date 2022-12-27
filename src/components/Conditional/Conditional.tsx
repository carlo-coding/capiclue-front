import { cloneElement } from 'react'

interface IConditionalRenderProps {
  children?: React.ReactNode
  parent: React.ReactElement
}

function ConditionalRender({
  parent,
  children
}: IConditionalRenderProps): JSX.Element | null {
  if (children !== null && children !== undefined && children !== '') {
    return cloneElement(parent, {}, children)
  }
  return null
}
export default ConditionalRender
