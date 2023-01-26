const express = require('express');
const http = require('http');
const cors = require('cors');
const app = express();
const server = http.createServer(app);
app.use(cors());


app.use(express.json({ extended: false }));
app.get('/', (req, res) => res.send('API Running'));


// // @route    Post api/todos/
// // @desc     add todo 
// // @access   Private
app.post('/',async (req, res) => {
      try {
        let SetP1=0
        let SetP2=0
        let jeuxP1=0
        let jeuxP2=0
        let pointP1=0
        let pointP2=0
        let Tiebreak=false
        let resultat=[]
        let CurrentGame={}

        const points=req.body.points
          for (var i = 0; i < points.length; i++) {

              if(points[i].index===1)
                {
                   pointP1++
               }else{
                 pointP2++             
              }
              if(Tiebreak==false){
              if (pointP1 >= 4 && pointP2 <= pointP1 - 2) {
                jeuxP1++
                pointP1 = 0;
                pointP2 = 0;
              } else if (pointP2 >= 4 && pointP1 <= pointP2 - 2) {
                jeuxP2++;
                pointP1 = 0; 
                pointP2 = 0; 
              } 
            }
              if (jeuxP1 >= 6 && jeuxP2 <= jeuxP1 - 2) {
                let setresult={}
                setresult.jeuxP1=jeuxP1
                setresult.jeuxP2=jeuxP2
                resultat.push(setresult);
                SetP1++
                console.log("p1:"+jeuxP1 +"|"+"p2:"+jeuxP2 )
                jeuxP1 = 0; 
                jeuxP2 = 0; 
                pointP1 = 0;
                pointP2 = 0;
              } else if (jeuxP2 >= 6 && jeuxP1 <= jeuxP2 - 2) {
                SetP2++
                let setresult={}
                setresult.jeuxP1=jeuxP1
                setresult.jeuxP2=jeuxP2
                resultat.push(setresult);
                jeuxP1 = 0;
                jeuxP2 = 0;
                pointP1 = 0;
                pointP2 = 0;
              } else if (jeuxP1 === 6 && jeuxP2 === 6) {
                console.log("Tiebreak!");
                Tiebreak=true
                if(pointP1 >= 7 && pointP2 <= pointP1 - 2){
                  SetP1++
                  let setresult={}
                  jeuxP1++
                  setresult.jeuxP1=jeuxP1
                  setresult.jeuxP2=jeuxP2
                  resultat.push(setresult);  
                  jeuxP1 = 0;
                  jeuxP2 = 0;
                  pointP1 = 0;
                  pointP2 = 0;
                Tiebreak=false

                }
                else if (pointP2 >= 7 && pointP1 <= pointP2 - 2) {
                  let setresult={}
                  jeuxP2++
                  setresult.jeuxP1=jeuxP1
                  setresult.jeuxP2=jeuxP2
                  resultat.push(setresult);
                  SetP2++
                  jeuxP1 = 0;
                  jeuxP2 = 0;
                  pointP1 = 0;
                  pointP2 = 0;
                  Tiebreak=false
                } 
              }
              if(SetP1==3||SetP2==3)
          {                  
              jeuxP1 = null; 
              jeuxP2 = null; 
              pointP1 = null;
              pointP2 = null;
              break;         
            }                
        }             
        let CurrentScore={}
        if(jeuxP1 === 6 && jeuxP2 === 6){
          CurrentScore.p1=pointP1
          CurrentScore.p2=pointP2

        }else
        if (pointP1 === 0 && pointP2 === 0) {
          CurrentScore.p1="0"
          CurrentScore.p2="0"
        } else if (pointP1 === 1 && pointP2 === 0) {
          CurrentScore.p1="15"
          CurrentScore.p2="0"
                } else if (pointP1 === 2 && pointP2 === 0) {
                  CurrentScore.p1="30"
                  CurrentScore.p2="0"
                        } else if (pointP1 === 3 && pointP2 === 0) {
                          CurrentScore.p1="40"
                          CurrentScore.p2="0"
        } else if (pointP1 === 1 && pointP2 === 1) {
          CurrentScore.p1="15"
          CurrentScore.p2="15"
        } else if (pointP1 === 2 && pointP2 === 1) {
          CurrentScore.p1="30"
          CurrentScore.p2="15"
        } else if (pointP1 === 3 && pointP2 === 1) {
          CurrentScore.p1="40"
          CurrentScore.p2="15"    
            } 
        else if (pointP1 === 1 && pointP2 === 2) {
          CurrentScore.p1="15"
          CurrentScore.p2="30"
                    } else if (pointP1 === 2 && pointP2 === 2) {
                      CurrentScore.p1="30"
                      CurrentScore.p2="30"
        } else if (pointP1 === 3 && pointP2 === 2) {
          CurrentScore.p1="40"
           CurrentScore.p2="30"
        } else if (pointP1 === 1 && pointP2 === 3) {
          CurrentScore.p1="15"
          CurrentScore.p2="40"
        } else if (pointP1 === 2 && pointP2 === 3) {
          CurrentScore.p1="30"
          CurrentScore.p2="40"
        } 
        else if (pointP1 === 0 && pointP2 === 1) {
          CurrentScore.p1="0"
          CurrentScore.p2="15"
        
        } else if (pointP1 === 0 && pointP2 === 2) {
          CurrentScore.p1="0"
          CurrentScore.p2="30"
                } else if (pointP1 === 0 && pointP2 === 3) {
                  CurrentScore.p1="0"
                  CurrentScore.p2="40"     
                   } 
        else if (pointP1 === 1 && pointP2 === 1) {
          CurrentScore.p1="15"
          CurrentScore.p2="15"   
        }  else if (pointP1 === 1 && pointP2 === 2) {
          CurrentScore.p1="15"
          CurrentScore.p2="30"   
                }  else if (pointP1 === 1 && pointP2 === 3) {
                  CurrentScore.p1="15"
                  CurrentScore.p2="40"   
        }  else if (pointP1 === 2 && pointP2 === 1) {
          CurrentScore.p1="30"
          CurrentScore.p2="15" 
                }  else if (pointP1 === 2 && pointP2 === 2) {
                  CurrentScore.p1="30"
                  CurrentScore.p2="30" 
                        }  else if (pointP1 === 2 && pointP2 === 3) {
                          CurrentScore.p1="30"
                          CurrentScore.p2="40" 
                                }  else if (pointP1 === 3 && pointP2 === 1) {
                                  CurrentScore.p1="40"
                                  CurrentScore.p2="15" 
        }  else if (pointP1 === 3 && pointP2 === 2) {
          CurrentScore.p1="40"
          CurrentScore.p2="30" 
        } 
        else if (pointP1 === 3 && pointP2 === 3) {
          CurrentScore.p1="40"
          CurrentScore.p2="40" 
        } 
        
        
        else if (pointP1 === pointP2 && pointP1 >= 4) {
          CurrentScore.p1="40"
          CurrentScore.p2="40"
                } else if (pointP1 === pointP2 + 1) {
                  CurrentScore.p1="AV"
                  CurrentScore.p2="-"
       } else if (pointP2 === pointP1 + 1) {
        CurrentScore.p1="-"
        CurrentScore.p2="AV"        } 

        CurrentGame.jeuxP1=jeuxP1
        CurrentGame.jeuxP1=jeuxP1      
console.log("pointP1"+pointP1)
console.log("pointP2"+pointP2)
console.log("jeuxP1:"+jeuxP1)
console.log("jeuxP2"+jeuxP2)
console.log("set1"+SetP1)
console.log("set2"+SetP2)
console.log("resultat",resultat)
        res.json({result:resultat,CurrentScore,CurrentGame});
      } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
      }
    }
  );
server.listen(process.env.PORT || 5000, () =>
  console.log(`Server has started on.`)
);