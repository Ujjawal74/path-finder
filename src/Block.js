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
      <p>{block.value > 0 ? block.value : <></>}</p>
    </div>
  );
};

export default Block;

/*
Created By: Connect/Follow me on LinkedIn.
=> https://www.linkedin.com/in/ujjawal-biswas-b40611142/
          _   _                         _  _      _                           
  _   _  (_) (_)  __ _ __      __ __ _ | || |__  (_) ___ __      __ __ _  ___ 
 | | | | | | | | / _` |\ \ /\ / // _` || || '_ \ | |/ __|\ \ /\ / // _` |/ __|
 | |_| | | | | || (_| | \ V  V /| (_| || || |_) || |\__ \ \ V  V /| (_| |\__ \
  \__,_|_/ |_/ | \__,_|  \_/\_/  \__,_||_||_.__/ |_||___/  \_/\_/  \__,_||___/
       |__/|__/                                                                                                                                                                               
*/
