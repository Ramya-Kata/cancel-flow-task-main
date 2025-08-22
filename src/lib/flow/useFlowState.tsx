'use client'
import { useEffect, useMemo, useState } from 'react'
import type { FlowGraph, NodeId } from './types'
import { useVariant } from './useVarient'

type FlowState = {
  reason?: string
  accepted_downsell?: boolean
  variant: 'A' | 'B'
}

export function useFlowState(graph: FlowGraph, startNode?: NodeId) {
  const variant = useVariant()

  const initialNode: NodeId =
    startNode && graph.nodes[startNode] ? startNode : graph.start

  const [nodeId, setNodeId] = useState<NodeId>(initialNode)
  const [state, setState] = useState<FlowState>({ variant })

  useEffect(() => setState((s) => ({ ...s, variant })), [variant])

  const go = (next: NodeId) => setNodeId(next)

  return useMemo(() => ({ nodeId, state, setState, go }), [nodeId, state])
}