import PropTypes from 'prop-types';

export const SeatGrid = ({ selectedSeats, onSeatClick }) => {
  const ROWS = 6;
  const SEATS_PER_ROW = 8;
  const occupiedSeats = [3, 4, 14, 15, 22, 23, 34, 35, 44, 45, 46];

  const renderSeat = (rowIndex, seatIndex) => {
    const index = rowIndex * SEATS_PER_ROW + seatIndex +1;
    console.log('index:', index);
    const isOccupied = occupiedSeats.includes(index);
    const isSelected = selectedSeats.includes(index);

    return (
      <div
        key={`seat-${index}`}
        className={`seat${isSelected ? ' selected' : ''}${isOccupied ? ' occupied' : ''}`}
        onClick={() => !isOccupied && onSeatClick(index)}
        role="button"
        tabIndex={isOccupied ? -1 : 0}
        aria-label={`Seat ${index + 1} ${isOccupied ? 'occupied' : isSelected ? 'selected' : 'available'}`}
      />
    );
  };

  return (
    <div className="seat-grid">
      <ul className="showcase">
        <li>
          <div className="seat" />
          <small>N/A</small>
        </li>
        <li>
          <div className="seat selected" />
          <small>Selected</small>
        </li>
        <li>
          <div className="seat occupied" />
          <small>Occupied</small>
        </li>
      </ul>

      <div className="container">
        <div className="screen" />
        {Array(ROWS).fill(null).map((_, rowIndex) => (
          <div key={`row-${rowIndex}`} className="row">
            {Array(SEATS_PER_ROW).fill(null).map((_, seatIndex) => 
              renderSeat(rowIndex, seatIndex)
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

SeatGrid.propTypes = {
  selectedSeats: PropTypes.arrayOf(PropTypes.number).isRequired,
  onSeatClick: PropTypes.func.isRequired
};