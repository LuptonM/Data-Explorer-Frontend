export default function DragableColumn({ column, handleDraggedItem }) {
  const handleDragStart = (event, column) => {
    event.dataTransfer.setData("text", column);
    handleDraggedItem(event.target.id);
  };

  return (
    <>
      <li className="draggableColumnList">
        <div
          id={column.concat("dragable")}
          className="draggableColumn"
          draggable="true"
          onDragStart={(event) => handleDragStart(event, column)}
        >
          {column}
        </div>
      </li>
    </>
  );
}
