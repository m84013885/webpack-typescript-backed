// import style from "./index.css"
import ReactFlow, { addEdge, removeElements } from 'react-flow-renderer';

const _elements: any = [
    {
        id: '1',
        type: 'input', // input node
        data: { label: 'Input Node' },
        position: { x: 250, y: 25 },
    },
    // default node
    {
        id: '2',
        // you can also pass a React component as a label
        data: { label: <div>Default Node</div> },
        position: { x: 100, y: 125 },
    },
    {
        id: '3',
        type: 'output', // output node
        data: { label: 'Output Node' },
        position: { x: 250, y: 250 },
    },
    // animated edge
    { id: 'e1-2', source: '1', target: '2', animated: true },
    { id: 'e2-3', source: '2', target: '3' },
];

const onLoad = (reactFlowInstance: any) => reactFlowInstance.fitView();
const onNodeDragStop = (event: any, node: any) => console.log('drag stop', node);
const onElementClick = (event: any, element: any) => console.log('click', element);

const BasicFlow = () => {
    const [elements, setElements] = useState(_elements);
    const onElementsRemove = (elementsToRemove: any) =>
        setElements((els: any) => removeElements(elementsToRemove, els));
    const onConnect = (params: any) => setElements((els: any) => addEdge(params, els));
    return (
        <ReactFlow
            elements={elements}
            onLoad={onLoad}
            onNodeDragStop={onNodeDragStop}
            onElementClick={onElementClick}
            onConnect={onConnect}
            onElementsRemove={onElementsRemove}
        />
    )
}


export default BasicFlow