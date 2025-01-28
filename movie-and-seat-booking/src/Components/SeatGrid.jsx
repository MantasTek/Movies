import PropTypes from 'prop-types';

export const SeatGrid = ({ selectedSeats, bookedSeats, onSeatClick }) => {
  const ROWS = 6;
  const SEATS_PER_ROW = 8;
  const occupiedSeats = [3, 4, 14, 15, 22, 23, 34, 35, 44, 45, 46];

  const renderSeat = (rowIndex, seatIndex) => {
    const index = (rowIndex * SEATS_PER_ROW) + seatIndex;
    const isOccupied = occupiedSeats.includes(index) || bookedSeats.includes(index);
    const isSelected = selectedSeats.includes(index);

    return (
      <div
        key={`seat-${rowIndex}-${seatIndex}`}
        className={`seat ${isOccupied ? 'occupied' : ''} 
          ${isSelected ? 'selected' : ''}`}
        onClick={() => !isOccupied && onSeatClick(index)}
      />
    );
  };

  return (
    <>
      <ul className="showcase">
        <li><div className="seat"></div><small>N/A</small></li>
        <li><div className="seat selected"></div><small>Selected</small></li>
        <li><div className="seat occupied"></div><small>Occupied</small></li>
      </ul>

      <div className="container">
        <div className="screen"></div>
        {[...Array(ROWS)].map((_, rowIndex) => (
          <div key={rowIndex} className="row">
            {[...Array(SEATS_PER_ROW)].map((_, seatIndex) => 
              renderSeat(rowIndex, seatIndex)
            )}
          </div>
        ))}
      </div>
    </>
  );
};

SeatGrid.propTypes = {
  selectedSeats: PropTypes.arrayOf(PropTypes.number).isRequired,
  bookedSeats: PropTypes.arrayOf(PropTypes.number).isRequired,
  onSeatClick: PropTypes.func.isRequired
};