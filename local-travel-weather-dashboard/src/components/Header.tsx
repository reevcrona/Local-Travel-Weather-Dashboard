import AutocompleteInput from "./AutocompleteInput";
import mapLogo from "../assets/maps.svg";
function Header() {
  return (
    <header className="grid min-h-44 grid-cols-3 items-center px-16">
      <div className="col-span-1">
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
