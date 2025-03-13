import AutocompleteInput from "./AutocompleteInput";
import mapLogo from "../assets/maps.svg";
function Header() {
  return (
    <header className="grid min-h-44 grid-cols-[1fr_2fr_1fr] items-center justify-center max-md:flex">
      <div className="col-span-1 hidden w-fit justify-self-center md:block">
        <img className="h-20 w-32" src={mapLogo} alt="Map Logo"></img>
      </div>

      <div className="col-span-1 justify-self-center">
        <h1 className="mb-7 text-center text-3xl">
          Local Travel & Weather Dashboard
        </h1>
        <AutocompleteInput />
      </div>
    </header>
  );
}
export default Header;
