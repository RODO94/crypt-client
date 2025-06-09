import "./HomeHero.scss";
import NavButton from "../NavButton/NavButton";
import logo from "../../../../assets/logo.svg";
import { useUserStore } from "../../../../store/user";

export default function HomeHero() {
  const { currentUser } = useUserStore();

  return (
    <section className='hero'>
      <h1 className='hero__title'>
        The Crypt is a Warhammer gaming club in the East Neuk of Fife
      </h1>
      <div className='hero__logo-wrap'>
        <img src={logo} alt='the crest of the Crypt' className='hero__logo' />
      </div>
      <div className='hero__button-wrap'>
        {!currentUser ? (
          <>
            <NavButton colour='blue' text='Log In' page='/login' />
            <NavButton colour='dark' text='Sign Up' page='/signup' />
          </>
        ) : (
          <>
            <NavButton colour='blue' text='Add Army' page='/armies/add' />
            <NavButton
              colour='dark'
              text='Create Battle'
              page='/battles/create'
            />
          </>
        )}
      </div>
    </section>
  );
}
