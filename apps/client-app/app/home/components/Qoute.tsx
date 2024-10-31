import Link from "next/link";

export default function Qoute() {
  return (
    <>
      <section
        className=" flex justify-between items-center h-[400px] lg:h-[800px]"
        style={{
          backgroundImage: `url('/images/home/UI_Curves.gif')`,
          backgroundSize: "cover",
          backgroundPosition: "center left",
        }}
      >
        <div className="px-6 sm:px-8 lg:px-36 text-center relative bg-blue-900 h-full flex justify-center items-center bg-opacity-20">
          {/* Section quote test*/}
          <div className="relative bg-cover bg-center bg-no-repeat qoute">
            <div className="relative z-10 flex flex-col items-center justify-center text-center w-auto h-full">
              <h2 className="leading-loose md:mx-[150px] text-white sm:text-[18px] md:text-3xl lg:text-4xl font-bold justify-center items-center">
                Seamlessly integrate your data with{" "}
                <span className="text-blue-700">DAVI</span>, and unlock the true
                potential of real-time insights for smarter decision-making.
              </h2>
              <Link href="/signup">
                <button className="mt-6 bg-[#443DFF] text-white font-semibold py-3 px-8 rounded-lg hover:opacity-90 transition">
                  Request Demo
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
