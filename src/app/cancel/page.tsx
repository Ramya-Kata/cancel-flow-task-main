'use client'
import FlowEngine from './FlowEngine'

export default function CancelPage({ searchParams }: { searchParams: { node?: string } }) {
  return <FlowEngine startNode={searchParams?.node} />
}