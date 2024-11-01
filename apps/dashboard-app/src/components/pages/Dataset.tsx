import CardContainer from "../atoms/CardContainer";
import Card from "../atoms/Card";
export default function Dataset() {
  return (
    <div className="container max-w-[80%] w-full ml-32">
      <div className="mt-24">
        <header className=" text-[20px] font-bold">Datasets</header>
      </div>

      {/* card1 */}
      <div className="mt-10 space-y-5">
        <CardContainer numCards={7} />
      </div>
    </div>
  );
}
