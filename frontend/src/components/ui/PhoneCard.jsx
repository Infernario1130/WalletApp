import Wally from '../../assets/Wally.png';

export function PhoneCard() {
  return (
    <div className="flex justify-center">
     <img src={Wally} alt="Wally" className="max-w-[90%] md:max-w-[300px] -mt-20 md:-mt-20 transition delay-50 duration-300  ease-in-out hover:scale-110 " />
    </div>
  );
}
