const Block = ({
  block,
  handleBlockClick,
  handleOnMouseEnter,
  handleOnMouseLeave,
}) => {
  let extraClass = "";
  let paintClass = "";
  if (block.isSource) {
    extraClass = "source";
  } else if (block.isDestination) {
    extraClass = "destination";
  } else if (block.isWall) {
    extraClass = "wall";
  }
  if (extraClass != "wall" && block.animate) {
    paintClass = "ripple";
  }
  if (block.painted) {
    paintClass = "painted";
  }
  return (
    <div
      onClick={() => handleBlockClick(block)}
      onMouseEnter={() => handleOnMouseEnter(block)}
      onMouseLeave={() => handleOnMouseLeave(block)}
      className={`block ${extraClass} ${paintClass}`}
    >
      {block.isSource ? <i className="fa fa-smile"></i> : <></>}
      {block.isDestination ? <i className="fa fa-map-marker-alt"></i> : <></>}
      {block.isWall ? <i className="fa fa-skull-crossbones"></i> : <></>}
    </div>
  );
};

export default Block;
