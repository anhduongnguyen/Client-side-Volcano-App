import Navigation from "../helpers/Navigation";

// the header of the app
export default function Header() {
  return (
    <header>
      {/* Volcano icon taken from flaticon.com */}
      <div id="icon">
        <img src="img/volcano.png" alt="Icon" />
      </div>
      <Navigation />
    </header>
  );
}

