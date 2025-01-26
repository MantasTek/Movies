import PropTypes from 'prop-types';

export const SeatGrid = ({ selectedSeats, onSeatClick }) => {
  const occupiedSeats = [3, 4, 14, 15, 22, 23, 34, 35, 44, 45, 46];

  return (
    <>
      <ul className="showcase">
        <li><div className="seat"></div><small>N/A</small></li>
        <li><div className="seat selected"></div><small>Selected</small></li>
        <li><div className="seat occupied"></div><small>Occupied</small></li>
      </ul>

      <div className="container">
        <div className="screen"></div>
        {Array(6).fill(null).map((_, rowIndex) => (
          <div key={rowIndex} className="row">
            {Array(8).fill(null).map((_, seatIndex) => {
              const index = rowIndex * 8 + seatIndex;
              const isOccupied = occupiedSeats.includes(index);
              return (
                <div
                  key={seatIndex}
                  className={`seat ${isOccupied ? 'occupied' : ''} 
                    ${selectedSeats.includes(index) ? 'selected' : ''}`}
                  onClick={() => !isOccupied && onSeatClick(index)}
                />
              );
            })}
          </div>
        ))}
      </div>
    </>
  );
};

SeatGrid.propTypes = {
  selectedSeats: PropTypes.arrayOf(PropTypes.number).isRequired,
  onSeatClick: PropTypes.func.isRequired
};