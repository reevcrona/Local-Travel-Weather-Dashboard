import AutocompleteInput from "./AutocompleteInput";
import mapLogo from "../assets/maps.svg";
function Header() {
  return (
    <header className="grid grid-cols-3 items-center min-h-44 px-16">
      <div className="col-span-1">
        <img className="w-32 h-20 " src={mapLogo} alt="Map Logo"></img>
      </div>

      <div className="col-span-1 justify-self-center">
        <h1 className="text-3xl text-center mb-7">
          Local Travel & Weather Dashboard
        </h1>
        <AutocompleteInput />
      </div>
    </header>
  );
}
export default Header;
