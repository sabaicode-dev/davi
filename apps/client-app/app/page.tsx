import { Metadata } from "next";
import HomePage from "./home/Home";

export const metadata: Metadata = {
  title: "DAVI | Home",
  description:
    "Welcome to DAVI - An all-in-one platform for data analysis, visualization, and integration. Empower your team to make data-driven decisions faster and smarter.",
  openGraph: {
    title: "Home",
    description:
      "Welcome to DAVI - An all-in-one platform for data analysis, visualization, and integration. Empower your team to make data-driven decisions faster and smarter.",
    images: "./opengraph-image.png",
  },
};

export default function Home() {
  return (
    <div>
      <HomePage />
    </div>
  );
}
