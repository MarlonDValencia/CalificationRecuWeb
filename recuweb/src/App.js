import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.js";
import Swal from 'sweetalert2'

function App() {
const [user, setUser] = useState(null)
const [isReccomended, setIsReccomended] = useState(false)
const [profileRec, setProfileRec] = useState('')
const [colabRec, setColabRec] = useState('')

const [juego1, setJuego1] = useState(0)
const [juego2, setJuego2] = useState(0)
const [juego3, setJuego3] = useState(0)
const [juego4, setJuego4] = useState(0)
const [juego5, setJuego5] = useState(0)
const [juego6, setJuego6] = useState(0)
const [juego7, setJuego7] = useState(0)
const [juego8, setJuego8] = useState(0)
const [juego9, setJuego9] = useState(0)
const [juego10, setJuego10] = useState(0)
const [juego11, setJuego11] = useState(0)
const [juego13, setJuego13] = useState(0)
const [juego14, setJuego14] = useState(0)
const [juego15, setJuego15] = useState(0)
const [juego16, setJuego16] = useState(0)
const [juego17, setJuego17] = useState(0)
const [juego18, setJuego18] = useState(0)
const [juego19, setJuego19] = useState(0)
const [juego20, setJuego20] = useState(0)
const [juego21, setJuego21] = useState(0)
const [juego22, setJuego22] = useState(0)
const [juego23, setJuego23] = useState(0)
const [juego24, setJuego24] = useState(0)
const [juego25, setJuego25] = useState(0)
const [juego26, setJuego26] = useState(0)
const [juego27, setJuego27] = useState(0)
const [juego28, setJuego28] = useState(0)
const [juego29, setJuego29] = useState(0)
const [juego30, setJuego30] = useState(0)
const [juego31, setJuego31] = useState(0)

const handleInputChange1 = ({target}) => {
  console.log(target.value)
  setJuego1(parseInt(target.value))
}

const handleInputChange2 = ({target}) => {
  console.log(target.value)
  setJuego2(parseInt(target.value))
}

const handleInputChange3 = ({target}) => {
  console.log(target.value)
  setJuego3(parseInt(target.value))
}

const handleInputChange4 = ({target}) => {
  console.log(target.value)
  setJuego4(parseInt(target.value))
}

const handleInputChange5 = ({target}) => {
  console.log(target.value)
  setJuego5(parseInt(target.value))
}

const handleInputChange6 = ({target}) => {
  console.log(target.value)
  setJuego6(parseInt(target.value))
}

const handleInputChange7 = ({target}) => {
  console.log(target.value)
  setJuego7(parseInt(target.value))
}

const handleInputChange8 = ({target}) => {
  console.log(target.value)
  setJuego8(parseInt(target.value))
}

const handleInputChange9 = ({target}) => {
  console.log(target.value)
  setJuego9(parseInt(target.value))
}

const handleInputChange10 = ({target}) => {
  console.log(target.value)
  setJuego10(parseInt(target.value))
}

const handleInputChange11 = ({target}) => {
  console.log(target.value)
  setJuego11(parseInt(target.value))
}

const handleInputChange13 = ({target}) => {
  console.log(target.value)
  setJuego13(parseInt(target.value))
}

const handleInputChange14 = ({target}) => {
  console.log(target.value)
  setJuego14(parseInt(target.value))
}

const handleInputChange15 = ({target}) => {
  console.log(target.value)
  setJuego15(parseInt(target.value))
}

const handleInputChange16 = ({target}) => {
  console.log(target.value)
  setJuego16(parseInt(target.value))
}

const handleInputChange17 = ({target}) => {
  console.log(target.value)
  setJuego17(parseInt(target.value))
}

const handleInputChange18 = ({target}) => {
  console.log(target.value)
  setJuego18(parseInt(target.value))
}

const handleInputChange19 = ({target}) => {
  console.log(target.value)
  setJuego19(parseInt(target.value))
}

const handleInputChange20 = ({target}) => {
  console.log(target.value)
  setJuego20(parseInt(target.value))
}

const handleInputChange21 = ({target}) => {
  console.log(target.value)
  setJuego21(parseInt(target.value))
}

const handleInputChange22 = ({target}) => {
  console.log(target.value)
  setJuego22(parseInt(target.value))
}

const handleInputChange23 = ({target}) => {
  console.log(target.value)
  setJuego23(parseInt(target.value))
}

const handleInputChange24 = ({target}) => {
  console.log(target.value)
  setJuego24(parseInt(target.value))
}

const handleInputChange25 = ({target}) => {
  console.log(target.value)
  setJuego25(parseInt(target.value))
}

const handleInputChange26 = ({target}) => {
  console.log(target.value)
  setJuego26(parseInt(target.value))
}
const handleInputChange27 = ({target}) => {
  console.log(target.value)
  setJuego27(parseInt(target.value))
}

const handleInputChange28 = ({target}) => {
  console.log(target.value)
  setJuego28(parseInt(target.value))
}

const handleInputChange29 = ({target}) => {
  console.log(target.value)
  setJuego29(parseInt(target.value))
}

const handleInputChange30 = ({target}) => {
  console.log(target.value)
  setJuego30(parseInt(target.value))
}

const handleInputChange31 = ({target}) => {
  console.log(target.value)
  setJuego31(parseInt(target.value))
}

//const handleSubmit = (e) => {
 // var id = [];

  //axios
  //.post("http://127.0.0.1:8000/users", profileCalification)
  //.then(res => id.push(res))
  //.catch(err => console.log(err));
  //e.preventDefault()
  //callQuery(id)
//}

  const handleSubmit = async (e) => {
    e.preventDefault()
    const returnCall = await fetch("http://127.0.0.1:8000/users",{
      method:"POST",
      body: JSON.stringify(profileCalification),
      headers: {"Content-type": "application/json; charset=UTF-8"}
    }
    )
      .then(response => response.json())
      .then((responseData) => {
        return responseData;
      });
      console.log(returnCall)
      setUser(returnCall)
      callQuery(returnCall)
      return returnCall;
  }

const callQuery = async (id) => {

  const returnCall = await fetch("http://127.0.0.1:8000/query")
    .then(response => response.json())
    .then((responseData) => {
      return responseData;
    });
    console.log(returnCall)
    setUser(returnCall)
    callProfile(id)
    return returnCall;
}

const callProfile = async (id) => {
  const returnCall = await fetch("http://127.0.0.1:8000/profileQuery/".concat(id))
    .then(response => response.json())
    .then((responseData) => {
      return responseData;
    });
    setUser(returnCall)
    setProfileRec(returnCall)
    callColaboratory(id,returnCall)
    return returnCall;
}

const callColaboratory = async (id, profile) => {

  const returnCall = await fetch("http://127.0.0.1:8000/colaborativeRecomendation/".concat(id))
  .then(response => response.json())
  .then((responseData) => {
    return responseData;
  });
  setUser(returnCall)
  setColabRec(returnCall)
  setIsReccomended(true)
  return returnCall;
}



useEffect(() => {
}, [isReccomended,profileRec,colabRec,juego1,juego2,juego3,juego4,juego5,juego6,juego7,juego8,juego9,juego10,juego11,juego13,juego14,juego15,juego16,juego17,juego18,juego19,juego20,juego21,juego22,juego23,juego24,juego25,juego26,juego27,juego28,juego29,juego30,juego31])


const profileCalification = {
  "id": "",
  "name": "",
  "GameCalification":{"Among Us":juego1,
  "Minecraft":juego2,
  "Grand Theft Auto V":juego3,
  "PUBG: Battlegrounds":juego4,
  "Gran Turismo":juego5,
  "Mario Kart 8 Deluxe":juego6,
  "Red Dead Redemption 2":juego7,
  "The Witcher 3: Wild Hunt":juego8,
  "Animal Crossing: New Horizons":juego9,
  "Terraria":juego10,
  "New Super Mario Bros. Wii":juego11,
  "Human: Fall Flat":juego13,
  "The Legend of Zelda: Breath of the Wild":juego14,
  "Super Smash Bros. Ultimate":juego15,
  "Borderlands 2":juego16,
  "Pokémon Sword and Shield":juego17,
  "Super Mario Odyssey":juego18,
  "God of War":juego19,
  "Super Mario World":juego20,
  "Stardew Valley":juego21,
  "Dying Light":juego22,
  "Horizon Zero Dawn":juego23,
  "Cyberpunk 2077":juego24,
  "Mario Kart 7":juego25,
  "Monster Hunter: World":juego26,
  "Super Mario Party":juego27,
  "Pokémon X and Y":juego28,
  "Pokémon Sun and Moon":juego29,
  "Mortal Kombat 11":juego30,
  "Borderlands 3":juego31}
  ,
    "ColaborativeRecomendation": [],
    "ProfileRecomendation": [],
    "email": "",
    "password": ""
}
  return (
    <>
    <div className="row">
      { //Check if message failed
        (isReccomended)
          ? <div> 
              <div>
                <h5>Las recomendaciones en base a tu perfil son:</h5>
                <h6>{profileRec.replace("[","").replace("]","").replace(",","")}</h6>
              </div>
              <div>
                <h5>Las recomendaciones en base a colaboracion son:</h5>
                <h6>{colabRec.replace('"',"")}</h6>
              </div> 
            </div> 
          : <div>
              <div className="container text-center">
      <div className="col">
        <h2>
          Bienvenido al sistema de recomendación
        </h2>
      </div>

        <form onSubmit={handleSubmit}>

        <div>
        <div className="row">
          <div className="col-md-6">
            <h5>
              Among Us
            </h5>
          </div>
          <div className="col-md-6">
            <input className="form-control" value={juego1} onChange={handleInputChange1}/>
          </div>
        </div>
      </div>

      <div>
        <div className="row">
          <div className="col-md-6">
            <h5>
              Minecraft
            </h5>
          </div>
          <div className="col-md-6">
            <input className="form-control" value={juego2} onChange={handleInputChange2}/>
          </div>
        </div>
      </div>

      <div>
        <div className="row">
          <div className="col-md-6">
            <h5>
              Grand Theft Auto V
            </h5>
          </div>
          <div className="col-md-6">
            <input className="form-control" value={juego3} onChange={handleInputChange3}/>
          </div>
        </div>
      </div>

      <div>
        <div className="row">
          <div className="col-md-6">
            <h5>
              PUBG: Battlegrounds
            </h5>
          </div>
          <div className="col-md-6">
            <input className="form-control" value={juego4} onChange={handleInputChange4}/>
          </div>
        </div>
      </div>

      <div>
        <div className="row">
          <div className="col-md-6">
            <h5>
              Gran Turismo 6
            </h5>
          </div>
          <div className="col-md-6">
            <input className="form-control" value={juego5} onChange={handleInputChange5}/>
          </div>
        </div>
      </div>

      <div>
        <div className="row">
          <div className="col-md-6">
            <h5>
              Mario Kart 8 Deluxe
            </h5>
          </div>
          <div className="col-md-6">
            <input className="form-control" value={juego6} onChange={handleInputChange6}/>
          </div>
        </div>
      </div>

      <div>
        <div className="row">
          <div className="col-md-6">
            <h5>
              Red Dead Redemption 2
            </h5>
          </div>
          <div className="col-md-6">
            <input className="form-control" value={juego7} onChange={handleInputChange7}/>
          </div>
        </div>
      </div>

      <div>
        <div className="row">
          <div className="col-md-6">
            <h5>
              The Witcher 3: Wild Hunt
            </h5>
          </div>
          <div className="col-md-6">
            <input className="form-control" value={juego8} onChange={handleInputChange8}/>
          </div>
        </div>
      </div>

      <div>
        <div className="row">
          <div className="col-md-6">
            <h5>
              Animal Crossing: New Horizons
            </h5>
          </div>
          <div className="col-md-6">
            <input className="form-control" value={juego9} onChange={handleInputChange9}/>
          </div>
        </div>
      </div>

      <div>
        <div className="row">
          <div className="col-md-6">
            <h5>
              Terraria
            </h5>
          </div>
          <div className="col-md-6">
            <input className="form-control" value={juego10} onChange={handleInputChange10}/>
          </div>
        </div>
      </div>

      <div>
        <div className="row">
          <div className="col-md-6">
            <h5>
              New Super Mario Bros. Wii
            </h5>
          </div>
          <div className="col-md-6">
            <input className="form-control" value={juego11} onChange={handleInputChange11}/>
          </div>
        </div>
      </div>

      <div>
        <div className="row">
          <div className="col-md-6">
            <h5>
              Human: Fall Flat
            </h5>
          </div>
          <div className="col-md-6">
            <input className="form-control" value={juego13} onChange={handleInputChange13}/>
          </div>
        </div>
      </div>

      <div>
        <div className="row">
          <div className="col-md-6">
            <h5>
              The Legend of Zelda: Breath of the Wild
            </h5>
          </div>
          <div className="col-md-6">
            <input className="form-control" value={juego14} onChange={handleInputChange14}/>
          </div>
        </div>
      </div>

      <div>
        <div className="row">
          <div className="col-md-6">
            <h5>
              Super Smash Bros. Ultimate
            </h5>
          </div>
          <div className="col-md-6">
            <input className="form-control" value={juego15} onChange={handleInputChange15}/>
          </div>
        </div>
      </div>

      <div>
        <div className="row">
          <div className="col-md-6">
            <h5>
              Borderlands 2
            </h5>
          </div>
          <div className="col-md-6">
            <input className="form-control" value={juego16} onChange={handleInputChange16}/>
          </div>
        </div>
      </div>

      <div>
        <div className="row">
          <div className="col-md-6">
            <h5>
              Pokémon Sword and Shield
            </h5>
          </div>
          <div className="col-md-6">
            <input className="form-control" value={juego17} onChange={handleInputChange17}/>
          </div>
        </div>
      </div>

      <div>
        <div className="row">
          <div className="col-md-6">
            <h5>
              Super Mario Odyssey
            </h5>
          </div>
          <div className="col-md-6">
            <input className="form-control" value={juego18} onChange={handleInputChange18}/>
          </div>
        </div>
      </div>

      <div>
        <div className="row">
          <div className="col-md-6">
            <h5>
              God of War
            </h5>
          </div>
          <div className="col-md-6">
            <input className="form-control" value={juego19} onChange={handleInputChange19}/>
          </div>
        </div>
      </div>

      <div>
        <div className="row">
          <div className="col-md-6">
            <h5>
              Super Mario World
            </h5>
          </div>
          <div className="col-md-6">
            <input className="form-control" value={juego20} onChange={handleInputChange20}/>
          </div>
        </div>
      </div>

      <div>
        <div className="row">
          <div className="col-md-6">
            <h5>
              Stardew Valley
            </h5>
          </div>
          <div className="col-md-6">
            <input className="form-control" value={juego21} onChange={handleInputChange21}/>
          </div>
        </div>
      </div>

      <div>
        <div className="row">
          <div className="col-md-6">
            <h5>
              Dying Light
            </h5>
          </div>
          <div className="col-md-6">
            <input className="form-control" value={juego22} onChange={handleInputChange22}/>
          </div>
        </div>
      </div>

      <div>
        <div className="row">
          <div className="col-md-6">
            <h5>
              Horizon Zero Dawn
            </h5>
          </div>
          <div className="col-md-6">
            <input className="form-control" value={juego23} onChange={handleInputChange23}/>
          </div>
        </div>
      </div>

      <div>
        <div className="row">
          <div className="col-md-6">
            <h5>
              Cyberpunk 2077
            </h5>
          </div>
          <div className="col-md-6">
            <input className="form-control" value={juego24} onChange={handleInputChange24}/>
          </div>
        </div>
      </div>

      <div>
        <div className="row">
          <div className="col-md-6">
            <h5>
              Mario Kart 7
            </h5>
          </div>
          <div className="col-md-6">
            <input className="form-control" value={juego25} onChange={handleInputChange25}/>
          </div>
        </div>
      </div>

      <div>
        <div className="row">
          <div className="col-md-6">
            <h5>
              Monster Hunter: World
            </h5>
          </div>
          <div className="col-md-6">
            <input className="form-control" value={juego26} onChange={handleInputChange26}/>
          </div>
        </div>
      </div>

      <div>
        <div className="row">
          <div className="col-md-6">
            <h5>
              Super Mario Party
            </h5>
          </div>
          <div className="col-md-6">
            <input className="form-control" value={juego27} onChange={handleInputChange27}/>
          </div>
        </div>
      </div>

      <div>
        <div className="row">
          <div className="col-md-6">
            <h5>
              Pokémon X and Y
            </h5>
          </div>
          <div className="col-md-6">
            <input className="form-control" value={juego28} onChange={handleInputChange28}/>
          </div>
        </div>
      </div>

      <div>
        <div className="row">
          <div className="col-md-6">
            <h5>
              Pokémon Sun and Moon
            </h5>
          </div>
          <div className="col-md-6">
            <input className="form-control" value={juego29} onChange={handleInputChange29}/>
          </div>
        </div>
      </div>

      <div>
        <div className="row">
          <div className="col-md-6">
            <h5>
              Mortal Kombat 11
            </h5>
          </div>
          <div className="col-md-6">
            <input className="form-control" value={juego30} onChange={handleInputChange30}/>
          </div>
        </div>
      </div>

      <div>
        <div className="row">
          <div className="col-md-6">
            <h5>
              Borderlands 3
            </h5>
          </div>
          <div className="col-md-6">
            <input className="form-control" value={juego31} onChange={handleInputChange31}/>
          </div>
        </div>
      </div>

      <div className="row">
          <div className="col-md-5">
            </div>  <></>
        <input className="col-md-2 btn btn-primary" type="submit" value="Submit"/>
        <div className="col-md-5"></div>
        </div>        
        </form>
      </div>
             </div> 
      }
    </div>

  </>
  );
}

export default App;
