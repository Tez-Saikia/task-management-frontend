import { useState } from "react";
import { BiFilterAlt } from "react-icons/bi";
import { GoChevronDown } from "react-icons/go";

type CategorySliderProps = {
  setFilterStatus: (status: string | null) => void;
};

const CategorySlider: React.FC<CategorySliderProps> = ({ setFilterStatus }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string>("All");

  const options: string[] = ["All", "To Do", "On Progress", "Done"];

  const handleSelect = (option: string) => {
    setSelectedOption(option);
    setFilterStatus(option === "All" ? null : option);
    setIsOpen(false);
  };

  return (
    <div className="slider-box" onClick={() => setIsOpen(!isOpen)}>
      <div className="filter-icon">
        <BiFilterAlt />
      </div>
      <div className="filter-text">{selectedOption}</div>
      <div className="chevron-icon">
        <GoChevronDown />
      </div>
      {isOpen && (
        <div className="dropdown-menu">
          {options.map((option) => (
            <div
              key={option}
              className="dropdown-item"
              onClick={() => handleSelect(option)}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CategorySlider;
