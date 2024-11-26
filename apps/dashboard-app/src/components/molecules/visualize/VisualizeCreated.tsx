import React, { useState, useRef, useEffect } from "react";
import Button from "@/src/components/atoms/Button";
import Input from "@/src/components/atoms/Input";
import { FaPlus } from "react-icons/fa6";
import { SortIcon } from "@/src/components/atoms/icons/Icon";
import CardContainer from "../../atoms/CardContainer";
import { useNavigate } from "react-router-dom"; // Import useNavigate if you're using react-router
import { IoMdCheckmark } from 'react-icons/io';

const VisualizeCreated: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedSort, setSelectedSort] = useState<string>("Recent");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const modalRef = useRef<HTMLDivElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null); // Ref for the button
  const navigate = useNavigate();

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
    if (isProfileDropdownOpen) {
      setIsProfileDropdownOpen(false);
    }
  };

  const toggleProfileDropdown = () => {
    setIsProfileDropdownOpen(!isProfileDropdownOpen);
    if (isDropdownOpen) {
      setIsDropdownOpen(false);
    }
  };

  const handleProfileClick = () => {
    navigate("/accountsetting");
    closeDropdown();
  };

  const closeDropdown = () => {
    setIsDropdownOpen(false);
    setIsProfileDropdownOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        closeModal();
      }
      // Also close dropdowns if clicked outside
      if (!isDropdownOpen && !isProfileDropdownOpen) return; // If both dropdowns are closed, do nothing
      setIsDropdownOpen(false);
      setIsProfileDropdownOpen(false);
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownOpen, isProfileDropdownOpen]);

  const handleSortChange = (sortOption: string) => {
    setSelectedSort(sortOption);
    closeModal();
  };

  return (
    <div className="flex flex-col relative w-full px-12">
      <h1 className="font-bold text-[20px] mt-4">Visualize</h1>
      <div className="flex flex-row justify-between items-center mt-4">
        <div className="flex flex-row">
          <Button
            onClick={toggleDropdown}
            children={<SortIcon />}
            color="none"
            className="!bg-transparent !hover:bg-gray-500"
            radius="full"
          />
          <Input
            type="text"
            label=""
            placeholder="What do you want to do with your data"
            defaultValue=""
            size="lg"
            color="secondary"
            variant="bordered"
            radius="2xl"
            labelPlacement="outside"
            isDisabled={false}
            isReadOnly={false}
            isRequired={false}
            isIconLeft={true}
            className="max-w-input min-w-[600px] w-[700px]"
          />
        </div>
        <div>
          <Button
            children={"Start New Project"}
            size="medium"
            radius="2xl"
            isLoading={false}
            color="secondary"
            startContent={<FaPlus />}
          />
        </div>
      </div>
      <div className="flex flex-col justify-items-center mt-4 gap-y-4 w-full">
        <CardVisualize />
      </div>

      {isDropdownOpen && (
        <div className="absolute left-4 mt-24  w-80 bg-white shadow-lg rounded-md z-10 p-4">
          <div className="flex justify-between items-center">
            <span className="text-lg font-semibold">Sort Options</span>
            <button
              onClick={closeDropdown}
              className="text-lg text-gray-500 font-medium"
            >
              &#x2715;
            </button>
          </div>
          <div className="flex justify-between items-center cursor-pointer p-2">
            <span onClick={() => handleSortChange("Recent")}>Sort by Recent</span>
            {selectedSort === "Recent" && <IoMdCheckmark />}
          </div>
          <div className="flex justify-between items-center cursor-pointer p-2">
            <span onClick={() => handleSortChange("Alphabetical")}>Sort by Alphabetical</span>
            {selectedSort === "Alphabetical" && <IoMdCheckmark />}
          </div>
        </div>
      )}

      <ModalSort
        ref={modalRef}
        isOpen={isModalOpen}
        onClose={closeModal}
        selectedSort={selectedSort}
        onSortChange={handleSortChange}
      />
    </div>
  );
};

const CardVisualize = () => {
  return (
    <div className="mt-10 w-full">
      <CardContainer numCards={7} />
    </div>
  );
};

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedSort: string;
  onSortChange: (sortOption: string) => void;
}

const ModalSort = React.forwardRef<HTMLDivElement, ModalProps>(
  ({ isOpen, selectedSort, onSortChange }, ref) => {
    if (!isOpen) return null;

    return (
      <div style={styles.overlay} className="absolute z-0 top-0 left-0">
        <div ref={ref} style={styles.modal}>
          <div className="w-[200px]">
            <div
              className={`flex justify-between p-2 cursor-pointer items-center ${
                selectedSort === "Recent" ? "bg-gray-100" : ""
              }`}
              onClick={() => onSortChange("Recent")}
            >
              <span>Sort by Recent</span>
              {selectedSort === "Recent" && <IoMdCheckmark />}
            </div>
            <div
              className={`flex justify-between p-2 cursor-pointer items-center ${
                selectedSort === "Alphabetical" ? "bg-gray-100" : ""
              }`}
              onClick={() => onSortChange("Alphabetical")}
            >
              <span>Sort by Alphabetical</span>
              {selectedSort === "Alphabetical" && <IoMdCheckmark />}
            </div>
          </div>
        </div>
      </div>
    );
  }
);

const styles = {
  overlay: {
    position: "fixed" as "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  modal: {
    backgroundColor: "white",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
    position: "absolute", // Ensure modal is absolutely positioned
  },
};

export default VisualizeCreated;
