
import koreaImg from './assets/images/SouthKorea.png'
// css 로딩
import './assets/css/custom.css'
// npm install bootstrap 해서 설치한 이후 bootsrap css 로딩하기
import 'bootstrap/dist/css/bootstrap.css'


function App() {

  //react에서 inline css는 object로 작성한다.
  const myStyle={
    width:"100px",
    height:"100px",
    border:"2px solid green",
    borderRadius:"50%"
  };

  return (
    <div className="container">
      <h1>인덱스 페이지</h1>
      <img src={koreaImg} alt="대한민국" style={myStyle}/>
      <br />
      <button className="btn btn-primary" onClick={()=>{
        fetch("/api/v1/member/hello2")
        .then(res=>res.text())
        .then(data=>{
          console.log(data);
        });
      }}>버튼</button>
    </div>
  )
}

export default App
