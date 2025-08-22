'use client'
import { useMemo } from 'react'
import CancelLayout from './CancelLayout'
import { flowGraph } from '../../lib/flow/graph'
import { useFlowState } from '../../lib/flow/useFlowState'
import { registry } from './nodes/_registry'

export default function FlowEngine({ startNode }: { startNode?: string }) {
    const { nodeId, state, setState, go } = useFlowState(flowGraph, startNode as any)
    const cfg = flowGraph.nodes[nodeId]
  const NodeComp = useMemo(() => registry[cfg.component as keyof typeof registry], [cfg])

  const onAction = (action: string) => {
    const edge = cfg.edges[action]
    if (!edge) return
    const next = typeof edge === 'function' ? edge(state) : edge
    go(next)
  }

  return (
    <CancelLayout>
      <NodeComp onAction={onAction as any} state={state} setState={setState} />
    </CancelLayout>
  )
}
