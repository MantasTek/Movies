import PropTypes from 'prop-types';

export const SeatGrid = ({ selectedSeats, onSeatClick }) => {
  const ROWS = 6;
  const SEATS_PER_ROW = 8;
  const occupiedSeats = [3, 4, 14, 15, 22, 23, 34, 35, 44, 45, 46];

  const renderSeat = (rowIndex, seatIndex) => {
    const index = rowIndex * SEATS_PER_ROW + seatIndex;
    const isOccupied = occupiedSeats.includes(index);
    const isSelected = selectedSeats.includes(index);

    return (
      <div
        key={`seat-${index}`}
        className={`seat ${isOccupied ? 'occupied' : ''} ${isSelected ? 'selected' : ''}`}
        onClick={() => !isOccupied && onSeatClick(index)}
        role="button"
        tabIndex={isOccupied ? -1 : 0}
        aria-label={`Seat ${index + 1} ${isOccupied ? 'occupied' : isSelected ? 'selected' : 'available'}`}
        aria-disabled={isOccupied}
        onKeyPress={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            !isOccupied && onSeatClick(index);
          }
        }}
      />
    );
  };

  const renderRow = (rowIndex) => (
    <div key={`row-${rowIndex}`} className="row" role="group" aria-label={`Row ${rowIndex + 1}`}>
      {Array(SEATS_PER_ROW).fill(null).map((_, seatIndex) => renderSeat(rowIndex, seatIndex))}
    </div>
  );

  return (
    <>
      <ul className="showcase" aria-label="Seat types">
        <li>
          <div className="seat" role="img" aria-label="Available seat example" />
          <small>N/A</small>
        </li>
        <li>
          <div className="seat selected" role="img" aria-label="Selected seat example" />
          <small>Selected</small>
        </li>
        <li>
          <div className="seat occupied" role="img" aria-label="Occupied seat example" />
          <small>Occupied</small>
        </li>
      </ul>

      <div className="container">
        <div className="screen" role="img" aria-label="Screen" />
        {Array(ROWS).fill(null).map((_, rowIndex) => renderRow(rowIndex))}
      </div>
    </>
  );
};

SeatGrid.propTypes = {
  selectedSeats: PropTypes.arrayOf(PropTypes.number).isRequired,
  onSeatClick: PropTypes.func.isRequired
};