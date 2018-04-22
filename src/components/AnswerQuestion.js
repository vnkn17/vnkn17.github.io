// import React, { Component } from 'react'
// import { Dropdown, DropdownMenu, DropdownToggle } from 'reactstrap';
// import { Button } from 'reactstrap';
// import GithubUsers from './helpers/GithubUsers';
// import ReactDOM from 'react-dom';
// import firebase from 'firebase';

// const INITIAL_STATE = {
//   selectedQuestionID : -1,
//   askerID : -1,
//   tokensInEscrow : 0,
//   resolveDate : '',
//   selectedQuestionText : '',
//   currentAnswerList : [],
//   proposedAnswer : '',
//   error : null,
// };

// export default class AnswerQuestion extends Component {
//   constructor(props) {
//     super(props);
//     this.toggle = this.toggle.bind(this);
//     this.state = {
//       dropdownOpen: false,
//       answerable: ["BLAH", "AYYY"],
//       test_list: ["question1", "question2", "question3"],
//       a1: ["bbbb", "kms"]
//     };

//     // Parsing available questions to answer with Firebase:
//     var database = firebase.database();
//     var answerableInds = [];
//     var answerable = [];
//     console.log('HELLO');
//     console.log(this.state.answerable);
  
  
//     database.ref('/questions/unresolved').once("value").then(function(snapshot) {
//       console.log('IS THIS HAPPENING')
//       var dict = snapshot.val();
//       for (var key in dict) {
//         answerableInds.push(dict[key]);
//       }

//       for (var ind in answerableInds) {
//         database.ref('/questions/questionData/' + ind).once("value").then(function(snapshot) {
//           var qInfo = snapshot.val();
//           console.log('answerable1 is ');
//           answerable.push(qInfo); // Creating array of answerable questions.
//           // this.state.a1.push(qInfo);
//         });
//       }
//     });
//     console.log('modified')
//     console.log(this.state.answerable)

//     this.createSelectItems = this.createSelectItems.bind(this);
//     this.renderAnswerable = this.renderAnswerable.bind(this);
//   }

//  createSelectItems() {
//   console.log('answerable2 is');
//   console.log(this.state.test_list);
//   console.log(this.state.a1);
//   console.log(this.state.answerable);
//   let l = this.state.test_list.length;
//   let items=[];         
//      for (let i = 0; i <= l; i++) {             
//           items.push(<option key={i} value={this.state.test_list[i]}>{this.state.test_list[i]}</option>);   
//           //here I will be creating my options dynamically based on
//           //what props are currently passed to the parent component
//      }
//      return items;
//  }  

// onDropdownSelected(e) {
//     console.log("THE VAL", e.target.value);
//     //here you will see the current selected value of the select input
// }

//   renderAnswerable() {
//     console.log('PLS');
//     console.log(this.state.test_list);
//     console.log(this.state.test_list.length);
//     var i;
//     // for (i=0; 5; i++) {
//       // console.log('i is ');
//       // console.log(i);
//       // this.state.test_list.push(<option> key={i} value={i}>{i}</option>);
//     // }
//     return this.state.test_list;
//   }

//   onSubmit = (event) => {
//     const {
//       selectedQuestionID,
//       askerID,
//       tokensInEscrow,
//       resolveDate,
//       selectedQuestionText,
//       currentAnswerList,
//       proposedAnswer,
//       error,
//     } = this.state;

//     event.preventDefault();

//     /*FIREBASE STUFF GOES HERE*/
//     var database = firebase.database();

//     var user = firebase.auth().currentUser;
//     var currentUserID;

//     database.ref('users/emailsToIDs/' + user.email).once("value").then(function(snapshot) {
//       currentUserID = Number(snapshot.val());

//       if (currentUserID === askerID) {
//         // RETURN ERROR MESSAGE SAYING YOU CANNOT ANSWER YOUR OWN QUESTION
//       }
//       else {
//         database.ref('/questions/questionData/' + selectedQuestionID + '/answers').once("value").then(function(snapshot) {
//           // Do some stuff with parsing and attaching to answers array.
//           // Need to deal with answer IDs, and other such things.
//           // See User storage and question storage for examples.
//           if(!snapshot.exists()) {
//             database.ref('/questions/questionData' + selectedQuestionID + '/answers').set({
//               answerCount : 1,
//               answerData : {}
//             });
//             database.ref('/questions/questionData' + selectedQuestionID + '/answers/answerData/0').set({
//               answererID : currentUserID,
//               answerText : proposedAnswer,
//               tokensAwarded : 0
//             });
//           }
//           else {
//             var newAnswerID;
//             database.ref('/questions/questionData' + selectedQuestionID + '/answers/answerCount').once("value").then(function(snapshot) {
//               newAnswerID = Number(snapshot.val());
//               database.ref('/questions/questionData' + selectedQuestionID + '/answers/answerCount').set(newAnswerID + 1);
//               database.ref('/questions/questionData' + selectedQuestionID + '/answers/answerData/' + newAnswerID).set({
//                 answererID : currentUserID,
//                 answerText : proposedAnswer,
//                 tokensAwarded : 0
//               });
//             });
//           }
//         });
//       }
//     });

//     database.ref('/questions/')

//   }

//   toggle() {
//     this.setState({dropdownOpen: !this.state.dropdownOpen});
//     ReactDOM.render(<div><GithubUsers label="GitHub users (Async with fetch.js)" /></div>);
//   }
  

//    render () {                                   
//       return (
//         <div className='mainBox'>
//           <div className='headerBox'>
//             <div className='linksParentBox'>
//               <div className='linkBox'>
//                 <a href="signin" className='href'>Sign In</a>
//               </div> 
//               <div className='linkBox'>
//                 <a href="signup" className='href'> Sign Up</a>
//               </div>
//               <div className='linkBox'>
//                 <a href="/" className='href'>Home</a>
//               </div>           
//               <div className='linkBox'>
//                 <a href="askquestion" className='href'> Ask Question</a>
//               </div>
//               <div className='linkBox'>
//                 <a href="answerquestion" className='href'> Answer Question</a>
//               </div>
//               <div className='linkBox'>
//                 <a href="pledgetokens" className='href'> Pledge Tokens</a>
//               </div>
//             </div>
//           </div>
//           <h4 className='title1'>Select a question to answer</h4>
//           <div>
//           <select type="select" onChange={this.onDropdownSelected} label="Multiple Select" multiple>
//            {this.createSelectItems()}
//           </select>
//             <select multiple={true} value={['b', 'c', 'd']}></select>
//             <select 
//               className='selectBox'
//               value={this.state.value} 
//               onChange={this.handleChange}
//             >
// {/*              {this.answerables.map((e, key) => {
//                 return <option key={key} value={e.value}>{e.name}</option>
//               })}*/}
//               <option value="mango">mango</option>
// {/*               <input
//                 type="select"
//                 // onChange={this.onDropdownSelected} 
//                 label="Multiple Select" 
//                 multiple
//               >
//                 {this.renderAnswerable()}
//               </input>}}}*/}
//             </select>          
//         <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
//         <DropdownToggle
//           tag="span"
//           onClick={this.toggle}
//           data-toggle="dropdown"
//           aria-expanded={this.state.dropdownOpen}
//         >
//           List of Questions
//         </DropdownToggle>
//         <DropdownMenu>
//           <div onClick={this.toggle}>Question 1</div>
//           <div onClick={this.toggle}>Question 2</div>
//           <div onClick={this.toggle}>Question 3</div>
//           <div onClick={this.toggle}>Question 4</div>
//         </DropdownMenu>
//       </Dropdown>
//             <p></p>
//       <form className='questionForm'> 
//           <input
//             className='questionBox'
//                 type='text'
//                 placeholder='Write Answer here...'
//                 /*value={this.getstate.question}*/
// /*                onChange={event => this.setState(byPropKey('password', event.target.value))}*/
//           />
//           <div className='extras'>
//             <h5>Tokens </h5>
//             <input
//               className='tokens'
//               type='number'
//               /*value={this.getstate.numTokens}*/
//               placeholder='Pledge tokens'
//             />
//             <h5>Resolve Date </h5>
//             <input
//               className='resolveDate'
//               type='date'
//               placeholder='Resolve date'
//                       /*value={this.getstate.resolveDate}*/
//             />
//           </div>
//           <button
//             className='submitButton'
//             type='submit'
//             /*onClick={() => this.}*/
//           >
//           Validate
//           </button>
//           <button
//             className='submitButton'
//             type='submit'
//             /*onClick={() => this.}*/
//           >
//           Submit
//           </button>
//         </form>
//         </div>
//       </div>
//       )
//    }
// }



import React, { Component } from 'react'
import { Dropdown, DropdownMenu, DropdownToggle } from 'reactstrap';
import { Button } from 'reactstrap';
import GithubUsers from './helpers/GithubUsers';
import ReactDOM from 'react-dom';
import firebase from 'firebase';

const INITIAL_STATE = {
  selectedQuestionID : -1,
  askerID : -1,
  tokensInEscrow : 0,
  resolveDate : '',
  selectedQuestionText : '',
  currentAnswerList : [],
  proposedAnswer : '',
  error : null,
  answerableCarry : [],
};

export default class AnswerQuestion extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      INITIAL_STATE,
      test: [],
      dropdownOpen: false
    };    

    // Parsing available questions to answer with Firebase:
    var database = firebase.database();
    var answerableInds = [];
    var answerable = [];
    var temp=['s']
    database.ref('/questions/unresolved').once("value").then(function(snapshot) {
      var dict = snapshot.val();
      console.log('check1');
      for (var key in dict) {
        answerableInds.push(dict[key]);
      }
      console.log('check2');

      for (var ind in answerableInds) {
        database.ref('/questions/questionData/' + ind).once("value").then(function(snapshot) {
          var qInfo = snapshot.val();
          console.log(qInfo);
          answerable.push(qInfo);
          temp.push(qInfo); // Creating array of answerable questions.
          // this.state.test.push(qInfo);
          console.log('printing1');
          console.log(temp);
        });
      }
    });
    console.log('check4');
    console.log(answerable);

    this.state.answerableCarry = answerable;
    console.log('check5')
    console.log(((this.state.answerableCarry)[0])['text']);
    // console.log(temp[1].text);

    // console.log('printing');
    // this.state.test.push(temp[0].text);
    // console.log(this.state.test);

  }




  onSubmit = (event) => {
    const {
      selectedQuestionID,
      askerID,
      tokensInEscrow,
      resolveDate,
      selectedQuestionText,
      currentAnswerList,
      proposedAnswer,
      error,
      answerableCarry,
    } = this.state;

    event.preventDefault();

    /*FIREBASE STUFF GOES HERE*/
    var database = firebase.database();

    var user = firebase.auth().currentUser;
    var currentUserID;

    database.ref('users/emailsToIDs/' + user.email).once("value").then(function(snapshot) {
      currentUserID = Number(snapshot.val());

      if (currentUserID === askerID) {
        // RETURN ERROR MESSAGE SAYING YOU CANNOT ANSWER YOUR OWN QUESTION
      }
      else {
        database.ref('/questions/questionData/' + selectedQuestionID + '/answers').once("value").then(function(snapshot) {
          // Do some stuff with parsing and attaching to answers array.
          // Need to deal with answer IDs, and other such things.
          // See User storage and question storage for examples.
          if(!snapshot.exists()) {
            database.ref('/questions/questionData' + selectedQuestionID + '/answers').set({
              answerCount : 1,
              answerData : {}
            });
            database.ref('/questions/questionData' + selectedQuestionID + '/answers/answerData/0').set({
              answererID : currentUserID,
              answerText : proposedAnswer,
              tokensAwarded : 0
            });
          }
          else {
            var newAnswerID;
            database.ref('/questions/questionData' + selectedQuestionID + '/answers/answerCount').once("value").then(function(snapshot) {
              newAnswerID = Number(snapshot.val());
              database.ref('/questions/questionData' + selectedQuestionID + '/answers/answerCount').set(newAnswerID + 1);
              database.ref('/questions/questionData' + selectedQuestionID + '/answers/answerData/' + newAnswerID).set({
                answererID : currentUserID,
                answerText : proposedAnswer,
                tokensAwarded : 0
              });
            });
          }
        });
      }
    });

    database.ref('/questions/')

  }

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  ReactDOM.render(
    <div>
    <GithubUsers label="GitHub users (Async with fetch.js)" />  
    </div>
  );
  }
  
   render () {                                   
      return (
        <div className='mainBox'>
          <h1> Answer a question! </h1>
        <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
        <DropdownToggle
          tag="span"
          onClick={this.toggle}
          data-toggle="dropdown"
          aria-expanded={this.state.dropdownOpen}
        >
          List of Questions
        </DropdownToggle>
        <DropdownMenu>
          <div onClick={this.toggle}>Question 1</div>
          <div onClick={this.toggle}>Question 2</div>
          <div onClick={this.toggle}>Question 3</div>
          <div onClick={this.toggle}>Question 4</div>
        </DropdownMenu>
      </Dropdown>
            <p></p>
      <form className='questionForm'> 
          <input
            className='questionBox'
                type='text'
                placeholder='Write Answer here...'
                /*value={this.getstate.question}*/
/*                onChange={event => this.setState(byPropKey('password', event.target.value))}*/
          />
          <div className='extras'>
            <h5>Tokens </h5>
            <input
              className='tokens'
              type='number'
              /*value={this.getstate.numTokens}*/
              placeholder='Pledge tokens'
            />
            <h5>Resolve Date </h5>
            <input
              className='resolveDate'
              type='date'
              placeholder='Resolve date'
                      /*value={this.getstate.resolveDate}*/
            />
          </div>
          <button
            className='submitButton'
            type='submit'
            /*onClick={() => this.}*/
          >
          Validate
          </button>
          <button
            className='submitButton'
            type='submit'
            /*onClick={() => this.}*/
          >
          Submit
          </button>
        </form>
        
      </div>
      )
   }
}