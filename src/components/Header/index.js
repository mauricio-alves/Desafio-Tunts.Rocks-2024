import banner from "../../assets/images/dev-training_banner.jpg";

export function Header() {
  return (
    <div className="flex justify-evenly p-10 mb-10 bg-purple text-white">
      <img
        className="max-w-64 md:hidden sm:hidden"
        src={banner}
        alt="dev training banner"
      />
      <h1 className="text-2xl font-bold font-mono self-center">
        Desafio Tunts.Rocks - 2024
      </h1>
    </div>
  );
}
