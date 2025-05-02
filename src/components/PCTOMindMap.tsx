import React, { useState, useCallback } from 'react';
import ReactFlow, {
  Node,
  Edge,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  Position,
  MarkerType,
} from 'reactflow';
import 'reactflow/dist/style.css';

// Definizione dei nodi principali e secondari
const initialNodes: Node[] = [
  // Nodo centrale
  {
    id: 'pcto',
    type: 'special',
    data: { label: 'PCTO' },
    position: { x: 400, y: 200 },
    style: {
      background: 'linear-gradient(45deg, #9333ea, #6366f1)',
      color: 'white',
      border: '1px solid #9333ea',
      borderRadius: '12px',
      padding: '10px 20px',
      width: 150,
      textAlign: 'center',
      fontSize: '18px',
      fontWeight: 'bold',
      boxShadow: '0 4px 14px rgba(147, 51, 234, 0.3)',
    },
  },
  
  // Nodi principali
  {
    id: 'competenze',
    data: { label: 'Competenze trasversali' },
    position: { x: 150, y: 50 },
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
    style: {
      background: '#ec4899',
      color: 'white',
      border: '1px solid #ec4899',
      borderRadius: '8px',
      padding: '8px 16px',
      width: 180,
      textAlign: 'center',
      fontSize: '14px',
      fontWeight: 'bold',
      boxShadow: '0 4px 14px rgba(236, 72, 153, 0.3)',
    },
  },
  {
    id: 'orientamento',
    data: { label: 'Orientamento al futuro' },
    position: { x: 650, y: 50 },
    sourcePosition: Position.Left,
    targetPosition: Position.Right,
    style: {
      background: '#3b82f6',
      color: 'white',
      border: '1px solid #3b82f6',
      borderRadius: '8px',
      padding: '8px 16px',
      width: 180,
      textAlign: 'center',
      fontSize: '14px',
      fontWeight: 'bold',
      boxShadow: '0 4px 14px rgba(59, 130, 246, 0.3)',
    },
  },
  {
    id: 'opportunita',
    data: { label: 'Opportunità lavorative' },
    position: { x: 150, y: 350 },
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
    style: {
      background: '#10b981',
      color: 'white',
      border: '1px solid #10b981',
      borderRadius: '8px',
      padding: '8px 16px',
      width: 180,
      textAlign: 'center',
      fontSize: '14px',
      fontWeight: 'bold',
      boxShadow: '0 4px 14px rgba(16, 185, 129, 0.3)',
    },
  },
  {
    id: 'interessi',
    data: { label: 'Scoperta degli interessi personali' },
    position: { x: 650, y: 200 },
    sourcePosition: Position.Left,
    targetPosition: Position.Right,
    style: {
      background: '#f59e0b',
      color: 'white',
      border: '1px solid #f59e0b',
      borderRadius: '8px',
      padding: '8px 16px',
      width: 180,
      textAlign: 'center',
      fontSize: '14px',
      fontWeight: 'bold',
      boxShadow: '0 4px 14px rgba(245, 158, 11, 0.3)',
    },
  },
  {
    id: 'esperienze',
    data: { label: 'Esperienze pratiche' },
    position: { x: 650, y: 350 },
    sourcePosition: Position.Left,
    targetPosition: Position.Right,
    style: {
      background: '#8b5cf6',
      color: 'white',
      border: '1px solid #8b5cf6',
      borderRadius: '8px',
      padding: '8px 16px',
      width: 180,
      textAlign: 'center',
      fontSize: '14px',
      fontWeight: 'bold',
      boxShadow: '0 4px 14px rgba(139, 92, 246, 0.3)',
    },
  },
  
  // Sottopunti per Competenze trasversali
  {
    id: 'comp1',
    data: { label: 'Problem solving' },
    position: { x: 0, y: 0 },
    parentNode: 'competenze',
    extent: 'parent',
    style: {
      background: 'rgba(236, 72, 153, 0.2)',
      color: 'white',
      border: '1px solid rgba(236, 72, 153, 0.5)',
      borderRadius: '6px',
      padding: '4px 8px',
      fontSize: '12px',
      width: 140,
      opacity: 0,
      transition: 'opacity 0.3s ease-in-out',
    },
  },
  {
    id: 'comp2',
    data: { label: 'Lavoro di squadra' },
    position: { x: 0, y: 30 },
    parentNode: 'competenze',
    extent: 'parent',
    style: {
      background: 'rgba(236, 72, 153, 0.2)',
      color: 'white',
      border: '1px solid rgba(236, 72, 153, 0.5)',
      borderRadius: '6px',
      padding: '4px 8px',
      fontSize: '12px',
      width: 140,
      opacity: 0,
      transition: 'opacity 0.3s ease-in-out',
    },
  },
  {
    id: 'comp3',
    data: { label: 'Comunicazione efficace' },
    position: { x: 0, y: 60 },
    parentNode: 'competenze',
    extent: 'parent',
    style: {
      background: 'rgba(236, 72, 153, 0.2)',
      color: 'white',
      border: '1px solid rgba(236, 72, 153, 0.5)',
      borderRadius: '6px',
      padding: '4px 8px',
      fontSize: '12px',
      width: 140,
      opacity: 0,
      transition: 'opacity 0.3s ease-in-out',
    },
  },
  
  // Sottopunti per Orientamento al futuro
  {
    id: 'orient1',
    data: { label: 'Scelte universitarie' },
    position: { x: 20, y: 0 },
    parentNode: 'orientamento',
    extent: 'parent',
    style: {
      background: 'rgba(59, 130, 246, 0.2)',
      color: 'white',
      border: '1px solid rgba(59, 130, 246, 0.5)',
      borderRadius: '6px',
      padding: '4px 8px',
      fontSize: '12px',
      width: 140,
      opacity: 0,
      transition: 'opacity 0.3s ease-in-out',
    },
  },
  {
    id: 'orient2',
    data: { label: 'Percorsi professionali' },
    position: { x: 20, y: 30 },
    parentNode: 'orientamento',
    extent: 'parent',
    style: {
      background: 'rgba(59, 130, 246, 0.2)',
      color: 'white',
      border: '1px solid rgba(59, 130, 246, 0.5)',
      borderRadius: '6px',
      padding: '4px 8px',
      fontSize: '12px',
      width: 140,
      opacity: 0,
      transition: 'opacity 0.3s ease-in-out',
    },
  },
  
  // Sottopunti per Opportunità lavorative
  {
    id: 'opp1',
    data: { label: 'Stage aziendali' },
    position: { x: 0, y: 0 },
    parentNode: 'opportunita',
    extent: 'parent',
    style: {
      background: 'rgba(16, 185, 129, 0.2)',
      color: 'white',
      border: '1px solid rgba(16, 185, 129, 0.5)',
      borderRadius: '6px',
      padding: '4px 8px',
      fontSize: '12px',
      width: 140,
      opacity: 0,
      transition: 'opacity 0.3s ease-in-out',
    },
  },
  {
    id: 'opp2',
    data: { label: 'Contatti professionali' },
    position: { x: 0, y: 30 },
    parentNode: 'opportunita',
    extent: 'parent',
    style: {
      background: 'rgba(16, 185, 129, 0.2)',
      color: 'white',
      border: '1px solid rgba(16, 185, 129, 0.5)',
      borderRadius: '6px',
      padding: '4px 8px',
      fontSize: '12px',
      width: 140,
      opacity: 0,
      transition: 'opacity 0.3s ease-in-out',
    },
  },
  {
    id: 'opp3',
    data: { label: 'Inserimento lavorativo' },
    position: { x: 0, y: 60 },
    parentNode: 'opportunita',
    extent: 'parent',
    style: {
      background: 'rgba(16, 185, 129, 0.2)',
      color: 'white',
      border: '1px solid rgba(16, 185, 129, 0.5)',
      borderRadius: '6px',
      padding: '4px 8px',
      fontSize: '12px',
      width: 140,
      opacity: 0,
      transition: 'opacity 0.3s ease-in-out',
    },
  },
  
  // Sottopunti per Scoperta degli interessi personali
  {
    id: 'int1',
    data: { label: 'Attitudini personali' },
    position: { x: 20, y: 0 },
    parentNode: 'interessi',
    extent: 'parent',
    style: {
      background: 'rgba(245, 158, 11, 0.2)',
      color: 'white',
      border: '1px solid rgba(245, 158, 11, 0.5)',
      borderRadius: '6px',
      padding: '4px 8px',
      fontSize: '12px',
      width: 140,
      opacity: 0,
      transition: 'opacity 0.3s ease-in-out',
    },
  },
  {
    id: 'int2',
    data: { label: 'Passioni da coltivare' },
    position: { x: 20, y: 30 },
    parentNode: 'interessi',
    extent: 'parent',
    style: {
      background: 'rgba(245, 158, 11, 0.2)',
      color: 'white',
      border: '1px solid rgba(245, 158, 11, 0.5)',
      borderRadius: '6px',
      padding: '4px 8px',
      fontSize: '12px',
      width: 140,
      opacity: 0,
      transition: 'opacity 0.3s ease-in-out',
    },
  },
  
  // Sottopunti per Esperienze pratiche
  {
    id: 'esp1',
    data: { label: 'Applicazione conoscenze' },
    position: { x: 20, y: 0 },
    parentNode: 'esperienze',
    extent: 'parent',
    style: {
      background: 'rgba(139, 92, 246, 0.2)',
      color: 'white',
      border: '1px solid rgba(139, 92, 246, 0.5)',
      borderRadius: '6px',
      padding: '4px 8px',
      fontSize: '12px',
      width: 140,
      opacity: 0,
      transition: 'opacity 0.3s ease-in-out',
    },
  },
  {
    id: 'esp2',
    data: { label: 'Progetti reali' },
    position: { x: 20, y: 30 },
    parentNode: 'esperienze',
    extent: 'parent',
    style: {
      background: 'rgba(139, 92, 246, 0.2)',
      color: 'white',
      border: '1px solid rgba(139, 92, 246, 0.5)',
      borderRadius: '6px',
      padding: '4px 8px',
      fontSize: '12px',
      width: 140,
      opacity: 0,
      transition: 'opacity 0.3s ease-in-out',
    },
  },
  {
    id: 'esp3',
    data: { label: 'Feedback costruttivo' },
    position: { x: 20, y: 60 },
    parentNode: 'esperienze',
    extent: 'parent',
    style: {
      background: 'rgba(139, 92, 246, 0.2)',
      color: 'white',
      border: '1px solid rgba(139, 92, 246, 0.5)',
      borderRadius: '6px',
      padding: '4px 8px',
      fontSize: '12px',
      width: 140,
      opacity: 0,
      transition: 'opacity 0.3s ease-in-out',
    },
  },
];

// Definizione delle connessioni tra i nodi
const initialEdges: Edge[] = [
  // Connessioni dal nodo centrale ai nodi principali
  {
    id: 'pcto-competenze',
    source: 'pcto',
    target: 'competenze',
    animated: true,
    style: { stroke: '#ec4899', strokeWidth: 2 },
    markerEnd: {
      type: MarkerType.ArrowClosed,
      color: '#ec4899',
    },
  },
  {
    id: 'pcto-orientamento',
    source: 'pcto',
    target: 'orientamento',
    animated: true,
    style: { stroke: '#3b82f6', strokeWidth: 2 },
    markerEnd: {
      type: MarkerType.ArrowClosed,
      color: '#3b82f6',
    },
  },
  {
    id: 'pcto-opportunita',
    source: 'pcto',
    target: 'opportunita',
    animated: true,
    style: { stroke: '#10b981', strokeWidth: 2 },
    markerEnd: {
      type: MarkerType.ArrowClosed,
      color: '#10b981',
    },
  },
  {
    id: 'pcto-interessi',
    source: 'pcto',
    target: 'interessi',
    animated: true,
    style: { stroke: '#f59e0b', strokeWidth: 2 },
    markerEnd: {
      type: MarkerType.ArrowClosed,
      color: '#f59e0b',
    },
  },
  {
    id: 'pcto-esperienze',
    source: 'pcto',
    target: 'esperienze',
    animated: true,
    style: { stroke: '#8b5cf6', strokeWidth: 2 },
    markerEnd: {
      type: MarkerType.ArrowClosed,
      color: '#8b5cf6',
    },
  },
];

const PCTOMindMap: React.FC = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set());

  // Gestisce il click su un nodo principale per espandere/contrarre i sottopunti
  const onNodeClick = useCallback((event: React.MouseEvent, node: Node) => {
    // Ignora i click sui sottopunti
    if (node.parentNode) return;
    
    // Ignora il nodo centrale PCTO
    if (node.id === 'pcto') return;
    
    const newExpandedNodes = new Set(expandedNodes);
    
    if (expandedNodes.has(node.id)) {
      newExpandedNodes.delete(node.id);
    } else {
      newExpandedNodes.add(node.id);
    }
    
    setExpandedNodes(newExpandedNodes);
    
    // Aggiorna lo stile dei sottopunti per mostrarli o nasconderli
    setNodes((nds) =>
      nds.map((n) => {
        if (n.parentNode === node.id) {
          return {
            ...n,
            style: {
              ...n.style,
              opacity: newExpandedNodes.has(node.id) ? 1 : 0,
            },
          };
        }
        return n;
      })
    );
  }, [expandedNodes, setNodes]);

  return (
    <div className="mt-10 mb-10 h-[500px] bg-dark-300/50 rounded-xl shadow-inner border border-accent-purple/20 overflow-hidden">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onNodeClick={onNodeClick}
        fitView
        attributionPosition="bottom-left"
        nodesDraggable={false}
        nodesConnectable={false}
        elementsSelectable={true}
        zoomOnScroll={false}
        panOnScroll={true}
        panOnDrag={true}
      >
        <Controls showInteractive={false} />
        <Background color="#6366f1" gap={16} size={1} />
      </ReactFlow>
      <div className="text-center text-sm text-gray-400 mt-2 mb-4">
        Clicca sui nodi colorati per espandere i sottopunti
      </div>
    </div>
  );
};

export default PCTOMindMap;
