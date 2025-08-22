export type NodeId = string
export type ActionId = string

export type FlowNodeConfig = {
  id: NodeId
  component: string
  edges: Record<ActionId, NodeId | ((state: any) => NodeId)>
}

export type FlowGraph = {
  start: NodeId
  nodes: Record<NodeId, FlowNodeConfig>
}