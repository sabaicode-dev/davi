import React from "react";
import BookIcon from "@/public/images/Book-icon.png";
const DisplayTable = () => {
  return (
    <div className="container w-[20%] h-[700px] space-y-2 border  border-[#C4C1D8]  rounded-lg">
      <header className=" ml-10 py-3 font-medium text-[20px]">Display Table</header>
      <table className="w-full ">
        <ul className="space-y-3 font-medium text-[14px] ml-10">
          {/* Table1 */}
          <div className="flex justify-start items-start text-center">
            <img src={BookIcon} alt="" width={24} />
            <p className="ml-2">Table1</p>
          </div>

          {/* Table2 */}
          <div className="flex justify-start items-center text-center">
            <img src={BookIcon} alt="" width={24} />
            <p className="ml-2">Table2</p>
          </div>

          {/* Table3 */}
          <div className="flex justify-start items-center text-center">
            <img src={BookIcon} alt="" width={24} />
            <p className="ml-2">Table3</p>
          </div>

          {/* Table4*/}
          <div className="flex justify-start items-center text-center">
            <img src={BookIcon} alt="" width={24} />
            <p className="ml-2">Table4</p>
          </div>

          {/* Table5 */}
          <div className="flex justify-start items-center text-center">
            <img src={BookIcon} alt="" width={24} />
            <p className="ml-2">Table5</p>
          </div>
        </ul>
      </table>
    </div>
  );
};

export default DisplayTable;
