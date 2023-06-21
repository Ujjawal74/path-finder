import Block from "./Block";

const Grid = ({
  grid,
  handleBlockClick,
  handleOnMouseEnter,
  handleOnMouseLeave,
}) => {
  return (
    <div className="block-container">
      {grid.map((row, i) => {
        return (
          <div className="block-row" key={i}>
            {row.map((block, j) => {
              return (
                <Block
                  handleBlockClick={handleBlockClick}
                  handleOnMouseEnter={handleOnMouseEnter}
                  handleOnMouseLeave={handleOnMouseLeave}
                  block={block}
                  key={j}
                />
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default Grid;
