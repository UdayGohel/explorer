import backgroundImage from "../assets/github.svg";

const Header = () => {
  return (
    <div className="bg-gray-900 p-4 flex justify-between items-center font-serif text-2xl">
      <h1 className="text-white text-center">React Github Explorer</h1>
      <img
        className="h-12 w-12 rounded-full"
        src={backgroundImage}
        alt="Github icon"
      />
    </div>
  );
};

export default Header;
