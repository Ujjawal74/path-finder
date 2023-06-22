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
